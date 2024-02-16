const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const router = express.Router();


// Route to get all accounts
router.get("/", async (req, res) => {
  try {
    // Find all accounts
    const accounts = await Account.find();

    res.status(200).json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to create a new account
router.post("/signup", async (req, res) => {
  try {
    const { user, username, email, password, role } = req.body;

    // Check if the email is already registered
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newAccount = await Account.create({
      user,
      username,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "Account created successfully", user: newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get account by ID
router.get("/:_id", async (req, res) => {
  try {
    const { accountId } = req.params;

    // Find account by ID and populate the user field
    const account = await Account.findById(accountId).populate("user");

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Return the account details
    res.status(200).json({ account });
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Assuming hashedPassword is the hashed password retrieved from the database
    const hashedPassword = user.password;
console.log(hashedPassword," ,");
console.log(req.body.password);

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secretKey = process.env.JWT_SECRET;

    // Sign JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});






module.exports = router;
