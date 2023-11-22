const accounttype =require('../models/AccountType')

module.exports = {
  Adaccounttype: async (req, res) => {
    try {
      const data = req.body;
      const uppercasedName = data.name.toUpperCase();
      const existingAccountType = await accounttype.findOne({
        $or: [{ name: uppercasedName }, { name: data.name.toLowerCase() }],
      });
  
      if (existingAccountType && existingAccountType.isdeleted) {
        // Update the isdeleted flag to false and get the updated document
        const updatedAccountType = await accounttype.findOneAndUpdate(
          {
            $or: [{ name: uppercasedName }, { name: data.name.toLowerCase() }],
          },
          { isdeleted: false },
          { new: true } // To get the updated document
        )
  
        console.log("Account type updated successfully.");
        res.status(200).json({
          success: true,
          message: "Account type updated successfully.",
          data: updatedAccountType,
        });
      } else if (existingAccountType) {
        return res.status(409).json({
          success: false,
          message: "Account type already exists.",
        });
      } else {
        const newAccountType = new accounttype(data);
        await newAccountType.save();
  
        console.log("Account type added successfully.");
        res.status(200).json({
          success: true,
          message: "Account type added successfully.",
          data: newAccountType,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },
  

  Editaccounttype: async (req, res) => {
    try {
      const data = req.body;
      const {id } = req.params;
      // Check if an Employeetype with the specified employeeid exists
      const existingaccounttype= await accounttype.findOne({_id:id});

      if (!existingaccounttype) {
        return res.status(404).json({
          success: false,
          message: "accounttype not found.",
        });
      }
      // Update the existing Employeetype with new data
      await accounttype.updateOne({ _id: id }, data);
      console.log("accounttype Edited Successfully");
      res.status(200).json({
        success: true,
        message: "accounttype edited successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to edit accounttype.",
        error: err.message,
      });
    }
  },

  Deleteaccounttype: async (req, res) => {
    try {
      const {id } = req.params;

      // Check if an operational with the specified employeeid exists
      const existingaccounttype = await accounttype.findOne({_id:id });

      if (!existingaccounttype) {
        return res.status(404).json({
          success: false,
          message: "accounttype not found.",
          
        });
      }

      // Delete the existing operational
      await accounttype.updateOne({ _id: id }, { $set: { isdeleted: true } });
      console.log(" Deleted Successfully");
      res.status(200).json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete accounttype.",
        error: err.message,
      });
    }
  },
  Getallaccounttype: async (req, res) => {
    try {

      const accounttypedata = await accounttype.find({ isdeleted: { $ne: true } }).sort({ _id: -1 }); // Sorting by _id in descending order
      


      if (!accounttypedata) {
        return res.status(404).json({
          success: false,
          message: "accounttype not found.",
        });
      }

      res.status(200).json({
        success: true,
       data: accounttypedata,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get accounttype.",
        error: err.message,
      });
    }
  },
};
