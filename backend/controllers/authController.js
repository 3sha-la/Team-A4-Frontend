const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

// @desc    Register new user (Mock Mode for Quick Testing)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    // Return direct success response without DB checks
    res.status(201).json({
      _id: "mock_user_id_654321",
      firstName: firstName || "Thrishala",
      lastName: lastName || "Weerasekara",
      email: email || "thrisha@gmail.com",
      phone: phone || "0772586942",
      token: generateToken("mock_user_id_654321"),
      message: "User registered successfully (Mock Test Success)"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token (Mock Mode for Quick Testing)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    res.json({
      _id: "mock_user_id_654321",
      firstName: "Thrishala",
      lastName: "Weerasekara",
      email: email || "thrisha@gmail.com",
      token: generateToken("mock_user_id_654321"),
      message: "User logged in successfully (Mock Test Success)"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };