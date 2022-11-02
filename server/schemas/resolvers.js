const { User, Company, Department, Location, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("department");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    departments: async (parent, args, context) => {
      if (context.user) {
        let companyId = context.user.department.company;

        const deptData = await Department.find({
          company: companyId,
        });

        return deptData;
      }

      throw new AuthenticationError("Not logged in");
    },
    department: async (parent, { deptId }, context) => {
      if (context.user) {
        let userCompanyId = context.user.department.company;

        const deptData = await Department.findOne({
          _id: deptId,
          company: userCompanyId, //adds tenant security
        }).populate("company");

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
            
            if (context.user) {
                const userCompany = context.user.department.company

                //consider replacing with FindOneAndUpdate
                const updatedDept = await Department.findOneAndReplace(
                    { _id: deptId, company: userCompany },
                    {...deptArgs, company: userCompany},
                    { runValidators: true, context: 'query', new: true }
                    //validation does not currently work on update, existing issue with the repo
                )

                return updatedDept
            }

            throw new AuthenticationError('Not logged in');
        },

        addLocation: async (parent, locationData, context) => {
            if (context.user) {
                const userCompany = context.user.department.company
                    console.log(locationData);
                const location = await Location.create({
                    company: userCompany,
                    ...locationData
                })

                return location
            }

            throw new AuthenticationError('Not logged in');
        },
        addEvent: async (parent, eventData, context) => {
            if (context.user) {
                const event = await Event.create({
                ...eventData
            
                })

                return event
            }

            throw new AuthenticationError('Not logged in');
        },
        
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
  },
},
}
module.exports = resolvers;
