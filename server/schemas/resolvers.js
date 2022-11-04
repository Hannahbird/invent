const {
  User,
  Company,
  Department,
  Location,
  Event,
  EventTask,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLError } = require("graphql");
const { signToken } = require("../utils/auth");
const pusher = require("../utils/pusher");
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

        if (deptData) {
          deptData["teamMembers"] = await User.find({
            department: deptId,
          });
        }

        return deptData;
      }

      throw new AuthenticationError("Not logged in");
    },
    events: async (parent, args, context) => {
      if (context.user) {
        let companyId = context.user.department.company;

        const locations = await Location.find({
          company: companyId
        })

        const locationIds = locations.map(location => {
          return location._id
        })

        const eventData = await Event.find({
          location: {$in : locationIds}
        }).populate('location')

        return eventData;
      }

      throw new AuthenticationError("Not logged in");
    },

    locations: async (parent, args, context) => {
      if (context.user) {
        let companyId = context.user.department.company;

        const locations = await Location.find({
          company: companyId
        })
        return locationData;
      }
      throw new AuthenticationError("Not logged in");
    },

    checkEmail: async (parent, { email }) => {
      const exists = await User.findOne({
        email: email,
      });

      if (exists) {
        return { available: false };
      }

      return { available: true };
    },
    checkUsername: async (parent, { username }) => {
      const exists = await User.findOne({
        username: username,
      });

      if (exists) {
        return { available: false };
      }

      return { available: true };
    },
    eventTasks: async (parent, { eventId }, context) => {
      const tasks = await EventTask.find({ eventId: eventId });
      if (context.user) {
        if (!tasks) {
          throw new GraphQLError("Couldn't find any event with this id", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        return tasks;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (
      parent,
      { newCompany, signUpCode, companyTitle, ...userArgs }
    ) => {
      //   pusher test, logs hellow world to console in front end when addUser is called
      pusher.trigger("test-channel", "test-event", {
        message: "hello world",
      });
      let company;
      let department;
      //check for new company
      //front end validation should check for the presence of a company title  before submit of company registration
      if (newCompany && companyTitle) {
        company = await Company.create({
          title: companyTitle,
          companyEmail: userArgs.email,
        });

        department = await Department.create({
          company: company._id,
          deptName: "Admin",
        });
      } else if (signUpCode) {
        //decode signup code and create user for department
        department = "placeholder"; //placeholder
      } else {
        throw new GraphQLError("Some data is missing", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const user = await User.create({
        ...userArgs,
        department: department._id,
      })
        .then((data) => {
          return data.populate("department");
        })
        .catch((err) => {
          Company.findByIdAndRemove(company._id);
          throw new GraphQLError("user creation failed", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        });

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate("department");

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addDepartment: async (parent, { deptName }, context) => {
      if (context.user) {
        const userCompany = context.user.department.company;

        const department = await Department.create({
          deptName: deptName,
          company: userCompany,
        });

        return department;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateDepartment: async (parent, { deptId, ...deptArgs }, context) => {
      //may need to prevent updating the admin department
      if (context.user) {
        const userCompany = context.user.department.company;

        const updatedDept = await Department.findOneAndReplace(
          { _id: deptId, company: userCompany },
          { ...deptArgs, company: userCompany },
          { runValidators: true, context: "query", new: true }
        );

        return updatedDept;
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteDepartment: async (parent, { deptId }, context) => {
      if (context.user) {
        let affectedUsers;
        let userCompanyId = context.user.department.company;

        //should we throw an error when no results are returned?
        const deptData = await Department.findOne({
          _id: deptId,
          company: userCompanyId, //adds tenant security
        });

        if (deptData && deptData.deptName === "Admin") {
          throw new GraphQLError("You cannot delete an admin department", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        if (deptData) {
          affectedUsers = await User.find({ department: deptId });
          deptData.remove();
          // deptData['teamMembers'] = await User.where({ department: deptId })
          //     .setOptions({ multi: true, new: true })
          //     .update({ department: null })
          deptData["teamMembers"] = affectedUsers;
        }

        return deptData;
      }

      throw new AuthenticationError("Not logged in");
    },
    addLocation: async (parent, locationData, context) => {
      if (context.user) {
        const userCompany = context.user.department.company;

        const location = await Location.create({
          company: userCompany,
          ...locationData,
        });
        return location;
      }
      throw new AuthenticationError("Not logged in");
    },
    addEvent: async (parent, eventData, context) => {
      if (context.user) {
        const event = await Event.create({
          ...eventData,
        });

        return event;
      }
      throw new AuthenticationError("Not logged in");
    },
    addEventTask: async (parent, taskData, context) => {
      if (context.user) {
        const newTask = await EventTask.create(taskData);
        return newTask;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateEventTask: async (parent, args, context) => {
      if (context.user) {
        const { taskId, ...data } = args;
        const updated = await EventTask.findByIdAndUpdate(taskId, data, {
          new: true,
        });
        return updated;
      }
      throw new AuthenticationError("Not logged in");
    },
    deleteEventTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const deleted = await EventTask.findByIdAndDelete(taskId);
        return deleted;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
