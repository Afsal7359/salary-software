const Bankmaster = require("../models/Bankmaster");

module.exports = {
  GetBankMaster: async (req, res) => {
    try {
      const response = await Bankmaster.find({ isdeleted: { $ne: true } });
      res.status(200).json({
        success: true,
        message: "Bank data get Successfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to Get Bank.",
        error: err.message,
      });
    }
  },
  AddBankMaster: async (req, res) => {
    try {
      const data = req.body;

      const existingBankmaster = await Bankmaster.findOne({
        bankid: data.bankid,
      });

      if (existingBankmaster && existingBankmaster.isdeleted) {
        const updatedBankmaster = await Bankmaster.findOneAndUpdate(
          { bankid: data.bankid },
          { isdeleted: false },
          { new: true } // To get the updated document
        );
        res.status(200).json({
          success: true,
          message: "Bankmaster updated successfully.",
          data: updatedBankmaster,
        });
      } else if (existingBankmaster) {
        return res.status(409).json({
          success: false,
          message: "Bankmaster already exists.",
        });
      } else {
        const newBankmaster = new Bankmaster(data);
        await newBankmaster.save();
        res.status(200).json({
          success: true,
          message: "Bankmaster added successfully.",
          data: newBankmaster,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add/update Bankmaster.",
        error: err.message,
      });
    }
  },

  EditBankMaster: async (req, res) => {
    try {
      const data = req.body;
      const { id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingBankMaster = await Bankmaster.findOne({ _id: id });

      if (!existingBankMaster) {
        return res.status(404).json({
          success: false,
          message: "BankMaster not found.",
        });
      }
      // Update the existing Employeetype with new data
      await Bankmaster.updateOne({ _id: id }, data);
      res.status(200).json({
        success: true,
        message: "BankMaster edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit BankMaster.",
        error: err.message,
      });
    }
  },
  GetallBank: async (req, res) => {
    try {
      const response = await Bankmaster.find({ isdeleted: { $ne: true } }).sort(
        { _id: -1 }
      );
      res.status(200).json({
        success: true,
        message: "Bankmaster data get Successfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to Get Bankmaster.",
        error: err.message,
      });
    }
  },
  DeleteBank: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if an Employeetype with the specified employeeid exists
      const existingBankmaster = await Bankmaster.findOne({ _id: id });

      if (!existingBankmaster) {
        return res.status(404).json({
          success: false,
          message: "Bankmaster not found.",
        });
      }

      // Soft delete by updating isdeleted field
      await Bankmaster.updateOne({ _id: id }, { $set: { isdeleted: true } });
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete Bankmaster.",
        error: err.message,
      });
    }
  },
  GetBankCount: async (req, res) => {
    try {
      const BankmasterCount = await Bankmaster.countDocuments();

      res.status(200).json({
        success: true,
        message: "Bankmaster count retrieved successfully.",
        data: { count: BankmasterCount },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  },
};
