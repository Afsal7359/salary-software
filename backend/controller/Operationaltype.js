const operational =require('../models/Operational')

module.exports = {
  Addoperational: async (req, res) => {
    try {
      const data = req.body;
      const existingoperational= await operational.findOne({ name: data.name });
  
      if (existingoperational && existingoperational.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedoperational = await operational.findOneAndUpdate(
          { name: data.name },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
  
        console.log("operational marked as not deleted.");
        res.status(200).json({
          success: true,
          message: "operational added successfully.",
          data: updatedoperational,
        });
      } else if (existingoperational) {
        return res.status(409).json({
          success: false,
          message: "operational already exists.",
        });
      } else {
        const newoperational = new operational(data);
        await newoperational.save();
  
        console.log("operational Added Successfully");
        res.status(200).json({
          success: true,
          message: "operational added successfully.",
          data: newoperational,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add operational.",
        error: err.message,
      });
    }
  },

  Editoperational: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingoperational= await operational.findOne({_id:id});

      if (!existingoperational) {
        return res.status(404).json({
          success: false,
          message: "operational not found.",
        });
      }
      // Update the existing Employeetype with new data
      await operational.updateOne({ _id: id }, data);
      console.log("operational Edited Successfully");
      res.status(200).json({
        success: true,
        message: "operational edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit operational.",
        error: err.message,
      });
    }
  },

  Deleteoperational: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an operational with the specified employeeid exists
      const existingoperational = await operational.findOne({_id:id });

      if (!existingoperational) {
        return res.status(404).json({
          success: false,
          message: "operational not found.",
          
        });
      }

      // Delete the existing operational
      await operational.updateOne({ _id: id }, { $set: { isdeleted: true } });
      console.log(" Deleted Successfully");
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete operational.",
        error: err.message,
      });
    }
  },
  Getalloperational: async (req, res) => {
    try {
      // Retrieve a single operational record based on the specified operational
      const operationaldata = await operational.find({ isdeleted: { $ne: true } });

      if (!operationaldata) {
        return res.status(404).json({
          success: false,
          message: "operational not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: operationaldata,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get operational.",
        error: err.message,
      });
    }
  },
};
