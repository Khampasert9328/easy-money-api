const Contract = require("../../models/contracts/contract_models"); // Import the Contract model

// Create a new contract
exports.createContract = async (req, res) => {
  try {
    const {
      customerid,
      customername,
      productname,
      productdesc,
      term_code,
      amount,
      startdate,
      enddate,
      status,
      maker_id,
    } = req.body;

    const newContract = new Contract({
      customerid,
      customername,
      productname,
      productdesc,
      term_code,
      amount,
      startdate,
      enddate,
      status,
      maker_id,
    });

    const savedContract = await newContract.save();

    res.status(201).json({
      message: "Contract created successfully!",
      data: savedContract,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// List all contracts
exports.getContract = async (req, res) => {
  try {
    const contracts = await Contract.find().populate("customerid"); // Populate customer details
    res.status(200).json(contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get a specific contract by ID
exports.getContractById = async (req, res) => {
  try {
    const { contractid } = req.params;

    const contract = await Contract.findById(contractid).populate("customerid");
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.status(200).json(contract);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Update a contract by ID
exports.updateContract = async (req, res) => {
  try {
    const { contractid } = req.params;
    const {
      customerid,
      customername,
      productname,
      productdesc,
      term_code,
      amount,
      startdate,
      enddate,
      status,
      maker_id,
    } = req.body;

    const updatedContract = await Contract.findByIdAndUpdate(
      contractid,
      {
        customerid,
        customername,
        productname,
        productdesc,
        term_code,
        amount,
        startdate,
        enddate,
        status,
        maker_id,
      },
      { new: true, runValidators: true } // Return updated document and validate changes
    );

    if (!updatedContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.status(200).json({
      message: "Contract updated successfully!",
      data: updatedContract,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete a contract by ID
exports.DeleteContract = async (req, res) => {
  try {
    const { contractid } = req.params;

    const deletedContract = await Contract.findByIdAndDelete(contractid);
    if (!deletedContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.status(200).json({
      message: "Contract deleted successfully!",
      data: deletedContract,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
