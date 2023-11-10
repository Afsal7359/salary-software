const Type =require('../models/Type')

module.exports = {
  AddType: async (req, res) => {
    try {
      const data = req.body;
      const existingType = await Type.findOne({ name: data.name });

      if (existingType) {
        return res.status(409).json({
          success: false,
          message: "Type already exists.",
        });
      }

      const newType = new Type(data);

      await newType.save();

      console.log("Type Added Successfully");
      res.status(200).json({
        success: true,
        message: "Type added successfully.",
        data:newType
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add Type.",
        error: err.message,
      });
    }
  },

  EditType: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingType= await Type.findOne({_id:id});

      if (!existingType) {
        return res.status(404).json({
          success: false,
          message: "Type not found.",
        });
      }
      // Update the existing Employeetype with new data
      await Type.updateOne({ _id: id }, data);
      console.log("Type Edited Successfully");
      res.status(200).json({
        success: true,
        message: "Type edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit Type.",
        error: err.message,
      });
    }
  },

  DeleteType: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an Employeetype with the specified employeeid exists
      const existingType = await Type.findOne({_id:id });

      if (!existingType) {
        return res.status(404).json({
          success: false,
          message: "Type not found.",
          
        });
      }

      // Delete the existing Employeetype
      await Type.updateOne({ _id: id }, { $set: { isdeleted: true } });
      console.log(" Deleted Successfully");
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
  GetallType: async (req, res) => {
    try {
      // Retrieve a single Employeetype record based on the specified employeeid
      const Typedata = await Type.find({ isdeleted: { $ne: true } });

      if (!Typedata) {
        return res.status(404).json({
          success: false,
          message: "Type not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: Typedata,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Type.",
        error: err.message,
      });
    }
  },
};
