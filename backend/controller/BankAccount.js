const BankAccount = require("../models/Bankaccount");

module.exports = {
  GetBankAccount: async (req, res) => {
    try {
      const response = await BankAccount.find({ isdeleted: { $ne: true } })
        .populate("OperationalId")
        .populate("BankId")
        .populate("accountTypeId")
        .populate("departmentId")
        .populate("unitId");
      res.status(200).json({
        success: true,
        message: "BankAccount data fetched successfully",
        data: response,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to get BankAccount.",
        error: err.message,
      });
    }
  },

  AddBankAccount: async (req, res) => {
    try {
      const {
        unitId,
        OperationalId,
        accountNo,
        departmentId,
        BankId,
        accountTypeId,
        bankAccountId,
      } = req.body;
      const newBank = new BankAccount({
        unitId,
        OperationalId,
        accountNo,
        departmentId,
        BankId,
        accountTypeId,
        bankAccountId,
      });

      await newBank.save();
      const populatedPost = await BankAccount.populate(newBank, [
        { path: "unitId" },
        { path: "departmentId" },
        { path: "accountTypeId" },
        { path: "BankId" },
        { path: "OperationalId" },
      ]);
      res.status(200).json({
        success: true,
        message: "Bank Account added successfully.",
        data: populatedPost,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add Bank Account.",
        error: err.message,
      });
    }
  },
  EditBankAccount: async (req, res) => {
    try {
      const {
        unitId,
        OperationalId,
        accountNo,
        departmentId,
        BankId,
        accountTypeId,
        bankAccountId,
      } = req.body;

      const { id } = req.params;

      // Use updateOne directly on the model to update the document
      await BankAccount.updateOne(
        { _id: id },
        {
          unitId,
          OperationalId,
          accountNo,
          departmentId,
          BankId,
          accountTypeId,
          bankAccountId,
        }
      );

      const PopulatedBankAccount = await BankAccount.findById(id).populate([
        { path: "unitId" },
        { path: "departmentId" },
        { path: "accountTypeId" },
        { path: "BankId" },
        { path: "OperationalId" },
      ]);
      res.status(200).json({
        success: true,
        message: "Bank Account Edited successfully.",
        data: PopulatedBankAccount,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to Edit Bank Account.",
        error: err.message,
      });
    }
  },

  DeleteBankAccount: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if an Employeetype with the specified employeeid exists
      const existingBankAccount = await BankAccount.findOne({ _id: id });

      if (!existingBankAccount) {
        return res.status(404).json({
          success: false,
          message: "BankAccount   not found.",
        });
      }

      // Soft delete by updating isdeleted field
      await BankAccount.updateOne({ _id: id }, { $set: { isdeleted: true } });
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete BankAccount.",
        error: err.message,
      });
    }
  },

  GetBankaccountCount: async (req, res) => {
    try {
      const BankAccountCount = await BankAccount.countDocuments();

      res.status(200).json({
        success: true,
        message: "BankAccountCount retrieved successfully.",
        data: { count: BankAccountCount },
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
