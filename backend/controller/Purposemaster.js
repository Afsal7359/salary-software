const Purpose =require('../models/Purpose')

module.exports = {
  AddPurpose: async (req, res) => {
    try {
      const data = req.body;
      const existingPurpose = await Purpose.findOne({ name: data.name });
  
      if (existingPurpose && existingPurpose.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedPurpose = await Purpose.findOneAndUpdate(
          { name: data.name },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
        res.status(200).json({
          success: true,
          message: "Purpose added successfully.",
          data: updatedPurpose,
        });
      } else if (existingPurpose) {
        return res.status(409).json({
          success: false,
          message: "Purpose already exists.",
        });
      } else {
        const newPurpose = new Purpose(data);
        await newPurpose.save();
        res.status(200).json({
          success: true,
          message: "Purpose added successfully.",
          data: newPurpose,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add Purpose.",
        error: err.message,
      });
    }
  },

  EditPurpose: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingPurpose= await Purpose.findOne({_id:id});

      if (!existingPurpose) {
        return res.status(404).json({
          success: false,
          message: "Purpose not found.",
        });
      }
      // Update the existing Employeetype with new data
      await Purpose.updateOne({ _id: id }, data);
      res.status(200).json({
        success: true,
        message: "Purpose edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit Purpose.",
        error: err.message,
      });
    }
  },

  DeletePurpose: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an Employeetype with the specified employeeid exists
      const existingPurpose = await Purpose.findOne({_id:id });

      if (!existingPurpose) {
        return res.status(404).json({
          success: false,
          message: "Purpose not found.",
          
        });
      }

      // Delete the existing Employeetype
      await Purpose.updateOne({ _id: id }, { $set: { isdeleted: true } });
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete Purpose.",
        error: err.message,
      });
    }
  },
  GetallPurpose: async (req, res) => {
    try {
      // Retrieve a single Employeetype record based on the specified employeeid
      const Purposedata = await Purpose.find({ isdeleted: { $ne: true } }).sort({_id:-1});

      if (!Purposedata) {
        return res.status(404).json({
          success: false,
          message: "Purpose not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: Purposedata,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get Purpose.",
        error: err.message,
      });
    }
  },

  GetpurposeCount : async (req, res) => {
    try {
      const PurposeCount = await Purpose.countDocuments();
      
      res.status(200).json({
        success: true,
        message: "Account type count retrieved successfully.",
        data: { count: PurposeCount },
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
