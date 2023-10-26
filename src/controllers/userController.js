const User = require('../models/User');
const Authorization = require('../models/Authorization'); // Import the Authorization model
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new user along with their authorizations
exports.createUser = async (req, res) => {
  try {
    const { authorizations, ...userData } = req.body;

    // Save to PostgreSQL
    const newUser = await User.create(userData);

    // Save authorizations to PostgreSQL
    if (authorizations && authorizations.length > 0) {
      const authObjects = authorizations.map(auth => ({
        ...auth,
        user_id: newUser.id,
      }));
      await Authorization.bulkCreate(authObjects);
    }

    // Save to Firebase
    const userRef = db.collection('users').doc(newUser.id); // Use the same ID as PostgreSQL
    await userRef.set({
      ...userData,
      authorizations,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
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
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update in PostgreSQL
      const updatedUser = await user.update(req.body);
  
      // Update in Firebase
      const userRef = db.collection('users').doc(req.params.id);
      await userRef.update(req.body);
  
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

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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
