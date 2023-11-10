const accounttype =require('../models/AccountType')

module.exports = {
  Adaccounttype: async (req, res) => {
    try {
      const data = req.body;
      const existingaccounttype = await accounttype.findOne({ name: data.name });

      if (existingaccounttype) {
        return res.status(409).json({
          success: false,
          message: "accounttype type already exists.",
        });
      }

      const newaccounttype = new accounttype(data);
        
      await newaccounttype.save();

      console.log("accounttype Added Successfully");
      res.status(200).json({
        success: true,
        message: "accounttype added successfully.",
        data:newaccounttype
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to add accounttype.",
        error: err.message,
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
      // Retrieve a single operational record based on the specified operational
      const accounttypedata = await accounttype.find({ isdeleted: { $ne: true } });

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
