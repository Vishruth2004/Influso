const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, connectDB, syncDB } = require("./db");
const cors = require('cors');  // Enable CORS for communication between frontend and backend
const path = require("path");

const app = express();
const JWT_SECRET = "supersecretjwtkey";  // You should store this in an environment variable

// Connect to the SQLite database
connectDB();
syncDB();  // Ensures tables are created

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS for all routes (necessary for API requests from React)
app.use(cors());

// Middleware for protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send("Token is missing!");

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);  // Token comes as "Bearer <token>"
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Return token to the user (store this token in localStorage on frontend)
    res.json({ message: "Login successful", token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save to the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Home route (Protected) — only accessible with valid JWT token
app.get('/home', verifyToken, (req, res) => {
  res.json({ message: "Welcome to the Home Page!", user: req.user });
});

// "Forgot Password" route (for now, it's just a placeholder)
app.get('/forgot-password', (req, res) => {
  res.send('Forgot Password page will be implemented.');
});

// // Serve the React build (Optional for production)
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
