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
const { update } = require("../models/User");
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
          company: companyId,
        });

        const locationIds = locations.map((location) => {
          return location._id;
        });

        const eventData = await Event.find({
          location: { $in: locationIds },
          active: true,
        }).populate("location");

        return eventData;
      }

      throw new AuthenticationError("Not logged in");
    },
    deptEvents: async (parent, args, context) => {
      if (context.user) {
        let deptId = context.user.department._id;

        const events = await EventTask.find({
          department: deptId,
        });

        const eventIds = events.map((event) => {
          return event.eventId;
        });

        const eventData = await Event.find({
          _id: { $in: eventIds },
          active: true,
        }).populate("location");

        return eventData;
      }

      throw new AuthenticationError("Not logged in");
    },
    event: async (parent, { eventId }, context) => {
      if (context.user) {
        let companyId = context.user.department.company;

        const eventData = await Event.findOne({
          _id: eventId,
          active: true,
        }).populate("location");

        return eventData;
      }

      throw new AuthenticationError("Not logged in");
    },
    locations: async (parent, args, context) => {
      if (context.user) {
        let companyId = context.user.department.company;

        const locations = await Location.find({
          company: companyId,
        });
        return locations;
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
      const tasks = await EventTask.find({ eventId: eventId }).populate(
        "department"
      );
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

        department = await Department.find().then((departments) =>
          departments.filter((department) => {
            if (department.signUpLink === signUpCode) {
              return true;
            }
            return false;
          })
        );

        if (!department) {
          throw new GraphQLError("Invalid SignUp Code", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        department = department[0];
        //placeholder
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
    updateDepartment: async (parent, { deptId, deptName }, context) => {
      //may need to prevent updating the admin department
      console.log(deptName, deptId);
      if (context.user) {
        const userCompany = context.user.department.company;

        const updatedDept = Department.findByIdAndUpdate(
          deptId,
          { deptName },
          {
            new: true,
          }
        );
        console.log(updatedDept);
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
    updateLocation: async (
      parent,
      { locationId, ...locationInfo },
      context
    ) => {
      if (context.user) {
        const updatedLocation = await Location.findOneAndUpdate(
          { _id: locationId },
          { ...locationInfo },
          { runValidators: true, context: "query", new: true }
        );
        return updatedLocation;
      }
    },
    deleteLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        return deletedLocation;
      }
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
        console.log(newTask.department.toString());
        pusher.trigger(newTask.department.toString(), "newTask", {
          newTask,
        });
        return newTask;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateEventTask: async (parent, args, context) => {
      if (context.user) {
        const { taskId, ...data } = args;
        // alerts old department if department is changed
        if (data.department) {
          const updated = await EventTask.findById(taskId);
          pusher.trigger(updated.department.toString(), "taskChange", {
            updated,
          });
        }
        const updated = await EventTask.findByIdAndUpdate(taskId, data, {
          new: true,
        });

        //   pusher test, logs hellow world to console in front end when addUser is called
        console.log(updated.department.toString());
        pusher.trigger(updated.department.toString(), "taskChange", {
          updated,
        });
        return updated;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateEvent: async (parent, { eventId, ...eventInfo }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { ...eventInfo },
          { runValidators: true, context: "query", new: true }
        ).populate("location", '-image');

        pusher.trigger(
          updatedEvent.location.company.toString(),
          "updatedEvent",
          {
            updatedEvent,
          }
        );
        return updatedEvent;
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteEventTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const deleted = await EventTask.findByIdAndDelete(taskId);
        // this is just to make pusher trigger easier
        const updated = deleted;
        pusher.trigger(updated.department.toString(), "taskChange", {
          updated,
        });
        return deleted;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
