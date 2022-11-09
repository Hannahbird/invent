const db = require("../config/connection");
const {
  Company,
  Department,
  Event,
  EventTask,
  Location,
  User,
} = require("../models");

db.once("open", async () => {
  console.log("seeding...");
  try {
    // clear database
    await User.deleteMany({});
    await Company.deleteMany({});
    await Department.deleteMany({});
    await Event.deleteMany({});
    await EventTask.deleteMany({});
    await Location.deleteMany({});

    const company = await Company.create({
      title: "Seedy Inc.",
      companyEmail: "admin@admin.com",
    });
    const adminDept = await Department.create({
      deptName: "admin",
      company: company._id,
    });
    const adminUser = await User.create({
      username: "admin",
      password: "admin",
      email: "admin@admin.com",
      department: adminDept._id,
    });

    const techDept = await Department.create({
      deptName: "Tech",
      company: company._id,
    });
    const techEmployee = await User.create({
      username: "techguy",
      email: "techguy@techguy.com",
      password: "techguy",
      department: techDept._id,
    });
    const foodDept = await Department.create({
      deptName: "food",
      company: company._id,
    });
    const foodEmployee = await User.create({
      username: "foodguy",
      email: "foodguy@foodguy.com",
      password: "foodguy",
      department: foodDept._id,
    });
    const locationExample = await Location.create({
      locationName: "example location",
      company: company._id,
      capacity: 100,
    });
    const eventExample1 = await Event.create({
      eventName: "example event",
      location: locationExample._id,
      departments: [techDept._id, foodDept._id],
      contactInfo: "customer@customer.com",
      contactName: "Big Dave",
      eventDate: Date(),
      eventStartDate: Date(),
      eventEndDate: Date() + 1,
    });
    const taskExample1 = await EventTask.create({
      description: "example event task",
      department: techDept._id,
      eventId: eventExample1._id,
      startTime: "2022-11-03T06:00:00.000Z",
      endTime: "2022-11-03T06:00:00.000Z",
    });
    const taskExample12 = await EventTask.create({
      description: "second example event task",
      department: foodDept._id,
      eventId: eventExample1._id,
      startTime: "2022-11-03T06:00:00.000Z",
      endTime: "2022-11-03T06:00:00.000Z",
    });
    const eventExample2 = await Event.create({
      eventName: "second example event",
      location: locationExample._id,
      departments: [techDept._id, foodDept._id],
      contactInfo: "customer2@customer.com",
      contactName: "Big Dave",
      eventDate: Date(),
      eventStartDate: Date(),
      eventEndDate: Date() + 1,
    });
    const taskExample2 = await EventTask.create({
      description: "example event task",
      department: techDept._id,
      eventId: eventExample2._id,
      startTime: "2022-11-03T06:00:00.000Z",
      endTime: "2022-11-03T06:00:00.000Z",
    });
    // const taskExample22 = await EventTask.create({
    //   description: "second example event task",
    //   department: foodDept._id,
    //   eventId: eventExample2._id,
    //   startTime: "13:00",
    //   endTime: "14:00",
    // });
    console.log(techDept.signUpLink, foodDept.signUpLink);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("all done!");
  console.log(
    "ADMIN LOGIN: username: 'admin', email: admin@admin.com, password: 'admin"
  );
  console.log(
    "TECH DEPT LOGIN: username: 'techguy', email: techguy@techguy.com, password: 'techguy'"
  );
  console.log(
    "FOOD DEPT LOGIN: username: 'foodguy', email: foodguy@foodguy.com, password: 'foodguy'"
  );
  process.exit(0);
});
