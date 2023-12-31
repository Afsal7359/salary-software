const Employeetype = require("../models/Employeetype");

module.exports = {
  AddEmployeetype: async (req, res) => {
    try {
      const data = req.body;
      const existingEmployeetype = await Employeetype.findOne({ name: data.name });
  
      if (existingEmployeetype && existingEmployeetype.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedEmployeetype = await Employeetype.findOneAndUpdate(
          { name: data.name },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
        res.status(200).json({
          success: true,
          message: "Employeetype added successfully.",
          data: updatedEmployeetype,
        });
      } else if (existingEmployeetype) {
        return res.status(409).json({
          success: false,
          message: "Employeetype already exists.",
        });
      } else {
        const newEmployeetype = new Employeetype(data);
        await newEmployeetype.save();
        res.status(200).json({
          success: true,
          message: "Employeetype added successfully.",
          data: newEmployeetype,
        });
      }
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
      // Check if an Employeetype with the specified employeetypeid exists
      const existingEmployeetype = await Employeetype.findOne({_id:id});

      if (!existingEmployeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }
      // Update the existing Employeetype with new data
      await Employeetype.updateOne({ _id: id }, data);
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

      // Check if an Employeetype with the specified employeetypeid exists
      const existingEmployeetype = await Employeetype.findOne({_id:id });

      if (!existingEmployeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
          
        });
      }
     
     
     // Soft delete by updating isdeleted field
  await Employeetype.updateOne({ _id: id }, { $set: { isdeleted: true } });
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
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
      // Retrieve a single Employeetype record based on the specified employeetypeid
      const Employeetypess = await Employeetype.findOne({_id:id});
      if (!Employeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }
      res.status(200).json({
        success: true,
        Employeetypess,
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
      // Retrieve a single Employeetype record based on the specified employeetypeid
      const Employeetypess = await Employeetype.find({ isdeleted: { $ne: true } })

      if (!Employeetype) {
        return res.status(404).json({
          success: false,
          message: "Employeetype not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: Employeetypess,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Employeetype.",
        error: err.message,
      });
    }
  },
  GetEmployeeTypeCount : async (req, res) => {
    try {
      const EmployeetypeCount = await Employeetype.countDocuments();
      
      res.status(200).json({
        success: true,
        message: "EmployeetypeCount count retrieved successfully.",
        data: { count: EmployeetypeCount },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  }
};
