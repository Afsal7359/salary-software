const Employee = require("../models/Employeemaster");

module.exports = {
  AddEmployee: async (req, res) => {
    try {
      console.log(req.body);
      const data = req.body;
      const existingEmployee = await Employee.findOne({ employeeno: data.employeeno });

      if (existingEmployee) {
        return res.status(409).json({
          success: false,
          message: "Employee already exists.",
        });
      }
console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data);
      const newEmployee = new Employee(data);
      console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',newEmployee);
      await newEmployee.save();

      console.log("Employee Added Successfully");
      res.status(200).json({
        success: true,
        message: "Employee added successfully.",
        data:newEmployee
      });
    } catch (err) {
      console.log(err,"error");
      res.status(500).json({
        success: false,
        message: "Failed to add Employee.",
        error: err.message,
      });
    }
  },

  EditEmployee: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employee with the specified employeeid exists
      const existingEmployee = await Employee.findOne({_id:id});

      if (!existingEmployee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }
      // Update the existing Employee with new data
      await Employee.updateOne({ _id: id }, data);
      console.log("Employee Edited Successfully");
      res.status(200).json({
        success: true,
        message: "Employee edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit Employee.",
        error: err.message,
      });
    }
  },

  DeleteEmployee: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an Employee with the specified employeeid exists
      const existingEmployee = await Employee.findOne({_id:id });

      if (!existingEmployee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
          
        });
      }
     
     
     // Soft delete by updating isdeleted field
  await Employee.updateOne({ _id: id }, { $set: { isdeleted: true } });
      console.log(" Deleted Successfully");
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete Employee.",
        error: err.message,
      });
    }
  },

  GetallEmployee: async (req, res) => {
    try {
      // Retrieve a single Employee record based on the specified employeeid
      const Employeess = await Employee.find({ isdeleted: { $ne: true } });

      if (!Employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: Employeess,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Employee.",
        error: err.message,
      });
    }
  },
};
