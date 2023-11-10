const Purpose =require('../models/Purpose')

module.exports = {
  AddPurpose: async (req, res) => {
    try {
      const data = req.body;
      const existingPurpose = await Purpose.findOne({ name: data.name });

      if (existingPurpose) {
        return res.status(409).json({
          success: false,
          message: "Purpose already exists.",
        });
      }

      const newPurpose = new Purpose(data);

      await newPurpose.save();

      console.log("Purpose Added Successfully");
      res.status(200).json({
        success: true,
        message: "Purpose added successfully.",
        data:newPurpose
      });
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
      console.log("Purpose Edited Successfully");
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
      console.log(" Deleted Successfully");
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
      const Purposedata = await Purpose.find({ isdeleted: { $ne: true } });

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
};
