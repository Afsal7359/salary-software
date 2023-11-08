const Employeetype = require("../models/Employeetype");

module.exports = {
  AddEmployeetype: async (req, res) => {
    try {
      const data = req.body;
      const existingEmployeetype = await Employeetype.findOne({ name: data.name });

      if (existingEmployeetype) {
        return res.status(409).json({
          success: false,
          message: "Employeetype already exists.",
        });
      }

      const newEmployeetype = new Employeetype(data);

      await newEmployeetype.save();

      console.log("Employeetype Added Successfully");
      res.status(200).json({
        success: true,
        message: "Employeetype added successfully.",
        data:newEmployeetype
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add Employeetype.",
        error: err.message,
      });
    }
  },

  EditEmployeetype: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingEmployeetype = await Employeetype.findOne({_id:id});

      if (!existingEmployeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }
      // Update the existing Employeetype with new data
      await Employeetype.updateOne({ _id: id }, data);
      console.log("Employeetype Edited Successfully");
      res.status(200).json({
        success: true,
        message: "Employeetype edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit Employeetype.",
        error: err.message,
      });
    }
  },

  DeleteEmployeetype: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an Employeetype with the specified employeeid exists
      const existingEmployeetype = await Employeetype.findOne({_id:id });

      if (!existingEmployeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
          
        });
      }

      // Delete the existing Employeetype
   await Employeetype.deleteOne({_id:id });
const response =await Employeetype.find()
      console.log(" Deleted Successfully");
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
        data:response
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete Employeetype.",
        error: err.message,
      });
    }
  },
  GetEmployeetype: async (req, res) => {
    try {
      const { id } = req.params;
      // Retrieve a single Employeetype record based on the specified employeeid
      const employeetype = await Employeetype.findOne({_id:id});
      if (!employeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }
      res.status(200).json({
        success: true,
        employeetype,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Employeetype.",
        error: err.message,
      });
    }
  },
  GetallEmployeetype: async (req, res) => {
    try {
      // Retrieve a single Employeetype record based on the specified employeeid
      const employeetype = await Employeetype.find();

      if (!employeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: employeetype,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Employeetype.",
        error: err.message,
      });
    }
  },
};
