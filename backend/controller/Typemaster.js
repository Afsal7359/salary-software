const Type =require('../models/Type')

module.exports = {
  AddType: async (req, res) => {
    try {
      const data = req.body;
      const existingType = await Type.findOne({ name: data.name });
  
      if (existingType && existingType.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedType = await Type.findOneAndUpdate(
          { name: data.name },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
        res.status(200).json({
          success: true,
          message: "Type added successfully.",
          data: updatedType,
        });
      } else if (existingType) {
        return res.status(409).json({
          success: false,
          message: "Type already exists.",
        });
      } else {
        const newType = new Type(data);
        await newType.save();
        res.status(200).json({
          success: true,
          message: "Type added successfully.",
          data: newType,
        });
      }
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
      const Typedata = await Type.find({ isdeleted: { $ne: true } }).sort({_id:-1});

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

  GetTypeCount : async (req, res) => {
    try {
      const TypeCount = await Type.countDocuments();
      
      res.status(200).json({
        success: true,
        message: "Type count retrieved successfully.",
        data: { count: TypeCount },
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
