const Account = require('../models/Account');
const User = require('../models/User');

// Controller function to create a new account
exports.createAccount = async (req, res) => {
  try {
    const { username, password, role, userId } = req.body;

    // Check if the user already exists
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new account
    const account = new Account({ username, password, role });

    // If the role is 'user', associate it with the user
    if (role === 'user' && userId) {
      account.user = userId;
    }

    await account.save();
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const user = new User({ firstName, lastName, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
