const User = require('../models/User');
const Authorization = require('../models/Authorization');
const admin = require('../firebase');
const crypto = require('crypto');
const db = admin.firestore();
const sequelize = require('../config/database'); // Make sure to import sequelize

// Helper function to set password and salt
const setPassword = (user, password) => {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

exports.createUser = async (req, res) => {
  let t; // Declare transaction variable here so it's accessible in the catch block
  try {
    console.log("Starting createUser...");
    const { authorizations, password, ...userData } = req.body;

    // Check if the user is an admin
    if (userData.is_admin === true) {
      console.log("User is admin. Setting password and salt...");
      // Hash the password and set salt for admin users
      setPassword(userData, password);
    } else {
      console.log("User is not admin. Setting username and salt to '-'...");
      // Set username and salt to "-" for non-admin users
      userData.username = "-";
      userData.salt = "-";
      // You may also want to set hash to "-" or null, as it won't be used
      userData.hash = "-";
    }

    console.log("Starting transaction...");
    // Start a transaction
    t = await sequelize.transaction();

    try {
      console.log("Creating new user in PostgreSQL...");
      // Save to PostgreSQL
      const newUser = await User.create(userData, { transaction: t });

      // Save authorizations to PostgreSQL
      if (authorizations && authorizations.length > 0) {
        console.log("Creating authorizations in PostgreSQL...");
        const authObjects = authorizations.map(auth => ({
          ...auth,
          user_id: newUser.id,
        }));
        await Authorization.bulkCreate(authObjects, { transaction: t });
      }

      console.log("Committing transaction...");
      // Commit the transaction
      await t.commit();
      console.log("Transaction committed");

      console.log("Creating new user in Firebase...");
      // Save to Firebase
      const userRef = db.collection('users').doc(newUser.id);
      await userRef.set({
        ...userData,
        authorizations,
      });
      console.log("User created in Firebase");

      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
    } catch (innerError) {
      console.error("Inner catch block error:", innerError);
      // If any operation fails, rollback the transaction
      await t.rollback();
      throw innerError;
    }
  } catch (error) {
    console.error("Outer catch block error:", error);
    if (t) {
      await t.rollback();
    }
    res.status(400).json({ message: 'Error creating user', error });
  }
};



// Get a user by ID along with their authorizations
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['authorizations'],  // Include related Authorizations
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password if provided
    if (password) {
      setPassword(user, password);
    }

    // Update in PostgreSQL
    const updatedUser = await user.update({
      ...updateData,
      salt: user.salt,
      hash: user.hash,
    });

    // Update in Firebase
    const userRef = db.collection('users').doc(req.params.id);
    await userRef.update(updateData);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};
  
  // Delete a user by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete from PostgreSQL
      await user.destroy();
  
      // Delete from Firebase
      const userRef = db.collection('users').doc(req.params.id);
      await userRef.delete();
  
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error });
    }
  };

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // number of records per page
    const offset = parseInt(req.query.offset) || 0; // start index for records

    const users = await User.findAll({
      limit,
      offset
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
};

// Get all authorizations for a user by ID
exports.getUserAuthorizations = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['authorizations'],  // Include related Authorizations
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.authorizations);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};
