const User = require('../models/User');
const Login = require('../models/Login'); // Import the Login model
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../config/database');

exports.login = async (req, res) => {
  let t; // Declare transaction variable here so it's accessible in the catch block
  try {
    console.log("Starting login...");
    const { username, password, role, system } = req.body;

    let user;
    if (role === 'admin') {
      user = await User.findOne({ where: { username } });
    }  else {
      console.log("Invalid role");
      console.log("400 - invalid role");
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      console.log("User not found");
      console.log("401 - user not found");
      return res.status(401).json({ message: 'User not found' });
    }

    console.log("Checking password...");
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    const validPassword = (user.hash === hash);
    console.log("Password is valid:", validPassword);
    console.log(hash, user.hash);
    console.log(password, user.salt, user.hash, hash);

    if (!validPassword) {
      console.log("Invalid credentials");
      console.log("401 - invalid credentials");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("Starting transaction...");
    t = await sequelize.transaction();

    try {
      console.log("Checking existing login...");
      // Check if the user is already logged in on the same system
      const existingLogin = await Login.findOne({ where: { user_id: user.id, system } }, { transaction: t });
      /*
      if (existingLogin) {
        console.log("User already logged in");
        if (t && !t.finished) {
          await t.rollback();
        }
        console.log("400 - user already logged in");
        return res.status(400).json({ message: 'User is already logged in on this system' });
      }
*/
      console.log("Creating login record...");
      // Save login info
      await Login.create({
        id: crypto.randomBytes(16).toString('hex'),
        user_id: user.id,
        timestamp: new Date(),
        expiration: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        system,
        created_at: new Date(),
        updated_at: new Date(),
      }, { transaction: t });

      console.log("Committing transaction...");
      await t.commit();

       //get list of authorizations from user.authorizations_id
       let authorizations = user.authorizations_id;

      const token = jwt.sign({ id: user.id, role }, process.env.SECRET_KEY, { expiresIn: '2 days' });
      console.log("Login successful");

      return res.json({ token, user_id: user.id, authorizations_id: authorizations });
    } catch (innerError) {
      console.error("Inner catch block error:", innerError);
      if (t && !t.finished) {
        await t.rollback();
      }
      throw innerError;
    }
  } catch (error) {
    console.error("Outer catch block error:", error);
    if (t) {
      if (t && !t.finished) {
        await t.rollback();
      }
    }
    console.log("400 - error during login");
    res.status(400).json({ message: 'Error during login', error });
  }
};

exports.logout = async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log("Logging out user", user_id);
    // Find and delete the login entry for the user on the specified system
    const existingLogin = await Login.findOne({ where: { user_id: user_id } });
    if (existingLogin) {
      await existingLogin.destroy();
      console.log("Logged out successfully");
      return res.status(200).json({ message: 'Successfully logged out' });
    } else {
      console.log("User not logged in");
      return res.status(400).json({ message: 'User is not logged in on this system' });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(400).json({ message: 'Error during logout', error });
  }
  };
