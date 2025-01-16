const Customer = require("../../models/customers/customers_models"); // Import the Mongoose model

// Create a customer
exports.createCustomers = async (req, res) => {
  try {
    const { customername, email, password, phone, occupation, prove_id, maker_id } = req.body;
    // Create a new customer
    const newCustomer = new Customer({
      customername,
      email,
      password, // Consider hashing the password before saving
      phone,
      occupation,
      prove_id,
      maker_id,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();
    res.status(201).json({
      message: "Customer created successfully!",
      data: savedCustomer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// List all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find(); // Retrieve all customers
    res.status(200).json({
        data: customers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Read a single customer by ID
exports.getCustomersById = async (req, res) => {
  try {
    const { customerid } = req.params;

    const customer = await Customer.findById(customerid);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
        data: customer
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Update a customer by ID
exports.updateCustomers = async (req, res) => {
  try {
    const { customerid } = req.params;
    const { customername, email, password, phone, occupation, prove_id, maker_id } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerid,
      {
        customername,
        email,
        password, // Consider hashing the password before saving
        phone,
        occupation,
        prove_id,
        maker_id,
      },
      { new: true, runValidators: true } // Return the updated document and validate changes
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully!",
      data: updatedCustomer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete a customer by ID
exports.DeleteCustomers = async (req, res) => {
  try {
    const { customerid } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(customerid);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
