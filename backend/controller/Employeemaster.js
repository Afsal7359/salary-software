const Employee = require("../models/Employeemaster");

module.exports = {
  AddEmployee: async (req, res) => {
    try {
      const data = req.body;
      const existingEmployee = await Employee.findOne({ employeeno: data.employeeno });
  
      if (existingEmployee && existingEmployee.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedEmployee = await Employee.findOneAndUpdate(
          { employeeno: data.employeeno },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
  
        console.log("Employee marked as not deleted.");
        res.status(200).json({
          success: true,
          message: "Employee added successfully.",
          data: updatedEmployee,
        });
      } else if (existingEmployee) {
        return res.status(409).json({
          success: false,
          message: "Employee already exists.",
        });
      } else {
        const newEmployee = new Employee(data);
        await newEmployee.save();
  
        console.log("Employee Added Successfully");
        res.status(200).json({
          success: true,
          message: "Employee added successfully.",
          data: newEmployee,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add Employee.",
        error: err.message,
      });
    }
  },
  EditEmployee: async (req, res) => {
    console.log('okokokokokokokokokookoookoookokk');
    try {
      console.log('reqqqqbody',req.body);
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
      console.log('haaaaaaaaaaaaaaaaai',req.params);
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
      const Employees = await Employee
      .find({ isdeleted: { $ne: true } })
      .populate({
        path: 'PostId',
        // Include 'designation' and 'DesignationId' fields from the referenced document
        populate: {
          path: 'designation' // Populate the 'DesignationId' field within the 'PostId'
        }
      })
      .populate('EmployeeTypeId');
      if (!Employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: Employees,
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
