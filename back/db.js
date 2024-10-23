const { Sequelize, DataTypes } = require('sequelize');

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './LoginForm.sqlite',  // SQLite database file
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite connected');
  } catch (error) {
    console.error('Unable to connect to SQLite database:', error);
  }
};

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database (creates tables if they do not exist)
const syncDB = async () => {
  await sequelize.sync({ force: false });
  console.log("Tables have been synced.");
};

module.exports = { User, connectDB, syncDB };
