const Payment = require("../../models/payments/payments_models"); // Import the Payment model

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
      const { contractid, paymentdate, amount, status, maker_id } = req.body;
  
      // Ensure contractid is provided and valid
      if (!contractid) {
        return res.status(400).json({ message: "Contract ID is required" });
      }
  
      const newPayment = new Payment({
        contractid,
        paymentdate,
        amount,
        status,
        maker_id,
      });
  
      const savedPayment = await newPayment.save();
  
      res.status(201).json({
        message: "Payment created successfully!",
        data: savedPayment,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error",
        error: err.message,
      });
    }
  };
  

// List all payments
exports.getPayment = async (req, res) => {
  try {
    const payments = await Payment.find().populate("contractid"); // Populate contract details
    res.status(200).json({
        data:payments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get a specific payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { paymentid } = req.params;

    const payment = await Payment.findById(paymentid).populate("contractid");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const { paymentid } = req.params;
    const { contractid, paymentdate, amount, status, maker_id } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentid,
      {
        contractid,
        paymentdate,
        amount,
        status,
        maker_id,
        updatedat: Date.now(), // Automatically update the updatedat field
      },
      { new: true, runValidators: true } // Return updated document and validate changes
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({
      message: "Payment updated successfully!",
      data: updatedPayment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete a payment by ID
exports.removePayment = async (req, res) => {
  try {
    const { paymentid } = req.params;

    const deletedPayment = await Payment.findByIdAndDelete(paymentid);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({
      message: "Payment deleted successfully!",
      data: deletedPayment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
