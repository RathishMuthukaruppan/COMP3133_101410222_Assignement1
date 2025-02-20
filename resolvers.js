const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Employee = require("./models/Employee");

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) throw new Error("Invalid Credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid Credentials");

      const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

      return { token, user };
    },

    getAllEmployees: async () => {
      return await Employee.find();
    },

    searchEmployeeByEID: async (_, { eid }) => {
      return await Employee.findById(eid);
    },

    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      return newUser;
    },

    addNewEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      await newEmployee.save();
      return newEmployee;
    },

    updateEmployeeByEID: async (_, { eid, ...updateData }) => {
      return await Employee.findByIdAndUpdate(eid, updateData, { new: true });
    },

    deleteEmployeeByEID: async (_, { eid }) => {
      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
