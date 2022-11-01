const { User, Company, Department } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('department');
                
                 return userData
            }
            
            throw new AuthenticationError('Not logged in');
        },
        departments: async (parent, args, context) => {
            
            if (context.user) {
                let companyId = context.user.department.company;

                const deptData = await Department.find({
                    company: companyId
                })

                return deptData
            }

            throw new AuthenticationError('Not logged in');
        },
        department: async (parent, {deptId}, context) => {
            if (context.user) {
                let userCompanyId = context.user.department.company;

                const deptData = await Department.findOne({
                    _id: deptId,
                    company: userCompanyId //adds tenant security
                })
                    .populate('company')
                
                if (deptData) {
                    deptData['teamMembers'] = await User.find({
                        department: deptId
                    })
                }

                return deptData
            }

            throw new AuthenticationError('Not logged in');
        }

    },
    Mutation: {
        addUser: async (parent, { newCompany, signUpCode, companyTitle, ...userArgs }) => {

            let department;
            //check for new company
            //front end validation should check for the presence of a company title  before submit of company registration
            if (newCompany && companyTitle) {

                const company = await Company.create({
                    title: companyTitle,
                    companyEmail: userArgs.email
                })

                department = await Department.create({
                    company: company._id,
                    deptName: 'Admin'
                })
            }
            else if (signUpCode) {
                //decode signup code and create user for department
                department = 'placeholder' //placeholder
            }
            else {
                throw new GraphQLError('Some data is missing', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            console.log(department._id)

            const user = await User.create({
                ...userArgs,
                department: department._id
            })
                .then(data => {
                    return data
                        .populate('department')

            })

            const token = signToken(user);
            return {token, user};

        },
        updateUser: async (parent, { userId, ...userInfo }, context) => {
                        
            if (context.user) {
                const userCompany = context.user.department.company

                const updatedUser = await User.findOneAndReplace(
                    { _id: userId },
                    {...userInfo},
                    { runValidators: true, context: 'query', new: true }
                )
                    .populate('department')

                return updatedUser
            }

            throw new AuthenticationError('Not logged in');
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email })
                .populate('department');

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        addDepartment: async (parent, { deptName }, context) => {
            
            if (context.user) {
                const userCompany = context.user.department.company

                const department = await Department.create({
                    deptName: deptName,
                    company: userCompany
                })

                return department
            }

            throw new AuthenticationError('Not logged in');
        },
        updateDepartment: async (parent, { deptId, ...deptArgs }, context) => {
            //may need to prevent updating the admin department
            if (context.user) {
                const userCompany = context.user.department.company

                if (deptId === userCompany) {
                    throw new GraphQLError('Updating the Admin Department is not permitted', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                }

                const updatedDept = await Department.findOneAndReplace(
                    { _id: deptId, company: userCompany },
                    {...deptArgs, company: userCompany},
                    { runValidators: true, context: 'query', new: true }
                )

                return updatedDept
            }

            throw new AuthenticationError('Not logged in');
        },
        deleteDepartment: async (parent, { deptId }, context) => {
            if (context.user) {
                let affectedUsers;
                let userCompanyId = context.user.department.company;

                //should we throw an error when no results are returned?
                const deptData = await Department.findOne({
                    _id: deptId,
                    company: userCompanyId //adds tenant security
                })

                if (deptData && deptData.deptName === 'Admin') {
                    throw new GraphQLError('You cannot delete an admin department', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                }
                
                if (deptData) {
                    affectedUsers = await User.find({ department: deptId });
                    deptData.remove();
                    // deptData['teamMembers'] = await User.where({ department: deptId })
                    //     .setOptions({ multi: true, new: true })
                    //     .update({ department: null })
                    deptData['teamMembers'] = affectedUsers
                }

                return deptData
            }

            throw new AuthenticationError('Not logged in');
        }
    //     addThought: async (parent, args, context) => {
    //         if (context.user) {
    //             const thought = await Thought.create({ ...args, username: context.user.username });

    //             await User.findByIdAndUpdate(
    //                 { _id: context.user._id },
    //                 { $push: { thoughts: thought._id } },
    //                 { new: true }
    //             );

    //             return thought;
    //         }

    //         throw new AuthenticationError('You need to be logged in!');
    //     },
    //     addReaction: async (parent, { thoughtId, reactionBody }, context) => {
    //         if (context.user) {
    //             const updatedThought = await Thought.findOneAndUpdate(
    //                 { _id: thoughtId },
    //                 { $push: { reactions: { reactionBody, username: context.user.username } } },
    //                 { new: true, runValidators: true }
    //             );

    //             return updatedThought;
    //         }

    //         throw new AuthenticationError('You need to be logged in!');
    //     },
    //     addFriend: async (parent, { friendId }, context) => {
    //         if (context.user) {
    //             const updatedUser = await User.findOneAndUpdate(
    //                 { _id: context.user._id },
    //                 { $addToSet: { friends: friendId } },
    //                 { new: true }
    //             ).populate('friends');

    //             return updatedUser;
    //         }

    //         throw new AuthenticationError('You need to be logged in!');
    //     }
     }
}

module.exports = resolvers;