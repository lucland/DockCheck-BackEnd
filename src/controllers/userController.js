const User = require('../models/User');
const Authorization = require('../models/Authorization');
const admin = require('../firebase');
const crypto = require('crypto');
const db = admin.firestore();
const sequelize = require('../config/database'); // Make sure to import sequelize
const { Op } = require('sequelize');

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
    if (userData.is_admin === true && userData.salt !== null) {
      console.log("User is admin. Setting password and salt...");
      // Hash the password and set salt for admin users
      setPassword(userData, userData.salt);
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

      console.log("Committing transaction...");
      // Commit the transaction
      await t.commit();
      console.log("Transaction committed");

      console.log("Creating new user in Firebase...");
      // Save to Firebase
      const userRef = db.collection('users').doc(newUser.id);
      await userRef.set({
        ...userData,
      });
      console.log("User created in Firebase");

      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
      console.log("201 - User created successfully");
    } catch (innerError) {
      console.error("Inner catch block error:", innerError);
      // If any operation fails, rollback the transaction
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
    res.status(400).json({ message: 'Error creating user', error });
    console.log("400 - Error creating user");
  }
};



// Get a user by ID along with their authorizations
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['authorizations'],  // Include related Authorizations
    });
    if (!user) {
      console.log("404 - User not found");
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    //print the success message
    console.log("200 - User found");
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
    //print the error message
    console.log("400 - Error fetching user");
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log("404 - User not found");
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

    console.log("200 - User updated successfully");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("400 - Error updating user");
    res.status(400).json({ message: 'Error updating user', error });
  }
};
  
  // Delete a user by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        console.log("404 - User not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete from PostgreSQL
      await user.destroy();
  
      // Delete from Firebase
      const userRef = db.collection('users').doc(req.params.id);
      await userRef.delete();
  
      console.log("204 - User deleted successfully");
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.log("400 - Error deleting user");
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

    console.log("200 - Users found");
    res.status(200).json(users);
  } catch (error) {
    console.log("400 - Error fetching users");
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
      console.log("404 - User not found");
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("200 - Authorizations found");
    res.status(200).json(user.authorizations);
  } catch (error) {
    console.log("400 - Error fetching authorizations");
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};

//check if username is already taken in postgresql
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username: username }
    });
    if (user) {
      console.log("200 - Username already taken");
      return res.status(200).json({ message: 'Username already taken' });
    }
    console.log("200 - Username available");
    res.status(200).json({ message: 'Username available' });
  } catch (error) {
    console.log("400 - Error checking username");
    res.status(400).json({ message: 'Error fetching user', error });
  }
};

// Search for a user by name or id with pagination
exports.searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query; // searchTerm should be passed as a query parameter
    const page = parseInt(req.query.page, 10) || 1; // current page number, default is 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // number of records per page, default is 10
    const offset = (page - 1) * pageSize;

    // Use Sequelize's 'or' operator to search by either name or id
    const users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } }, // case-insensitive
          { id: searchTerm }
        ]
      },
      limit: pageSize,
      offset: offset,
      include: ['authorizations'] // Include related Authorizations if needed
    });

    if (users.rows.length === 0) {
      console.log("404 - No users found");
      return res.status(404).json({ message: 'No users found' });
    }

    // Calculate total pages
    const totalPages = Math.ceil(users.count / pageSize);

    console.log("200 - Users found");
    res.status(200).json({
      users: users.rows,
      currentPage: page,
      pageSize: pageSize,
      totalCount: users.count,
      totalPages: totalPages
    });
  } catch (error) {
    console.log("400 - Error searching for users");
    res.status(400).json({ message: 'Error searching for users', error });
  }
};

//retrieve the highest user number
exports.getUserNumber = async (req, res) => {
  //find the highest user number in the users table and return it as a response
  try {
    const user = await User.findOne({
      limit: 1,
      order: [
        ['number', 'DESC']
      ]
    });
    if (!user) {
      console.log("404 - User not found");
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("200 - User number found");
    res.status(200).json((user.number + 1).toString());
  } catch (error) {
    console.log("400 - Error fetching user number");
    res.status(400).json({ message: 'Error fetching user', error });
  }
};

exports.getValidUsersByVesselID = async (req, res) => {
  try {
    const { vesselID } = req.params;

    // Today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const users = await User.findAll({
      attributes: ['rfid'],  // Select only the rfid field
      include: [{
        model: Authorization,
        as: 'authorizations',
        where: { vessel_id: vesselID },
        attributes: []
      }],
      where: {
        nr34: {
          [Op.gt]: today
        },
        aso: {
          [Op.gt]: today
        },
        rfid: {
          [Op.and]: {
            [Op.ne]: null,    // Not null
            [Op.ne]: ''       // Not an empty string
          }
        }
      }
    });

    // Extract the rfid values from the user objects
    const rfids = users.map(user => user.rfid);

    //remove duplicates
    const uniqueRfids = [...new Set(rfids)];

    if (rfids.length === 0) {
      console.log("404 - No RFIDs found for the given vessel ID");
      return res.status(404).json({ message: 'No RFIDs found for the given vessel ID' });
    }
    
    console.log("200 - RFIDs found");
    res.status(200).json(uniqueRfids);
  } catch (error) {
    console.log("400 - Error fetching RFIDs");
    res.status(400).json({ message: 'Error fetching RFIDs', error });
  }
};

//block user by id, setting is_blocked to true and block_reason to the reason provided
exports.blockUser = async (req, res) => {
  try {
    const { block_reason } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log("404 - User not found");
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await user.update({
      is_blocked: true,
      block_reason: block_reason
    });
    console.log("200 - User blocked successfully");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("400 - Error blocking user");
    res.status(400).json({ message: 'Error blocking user', error });
  }
};

//get all users ids
exports.getAllUserIds = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id']
    });
    console.log("200 - User IDs found");
    res.status(200).json(users);
  } catch (error) {
    console.log("400 - Error fetching user IDs");
    res.status(400).json({ message: 'Error fetching users', error });
  }
};