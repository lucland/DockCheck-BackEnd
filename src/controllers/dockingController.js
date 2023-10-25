const Docking = require('../models/Docking');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new docking
exports.createDocking = async (req, res) => {
  try {
    // Save to PostgreSQL
    const newDocking = await Docking.create(req.body);

    // Save to Firebase
    const dockingRef = db.collection('dockings').doc(); // Create a new doc with auto-generated ID
    await dockingRef.set({
      id: dockingRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    res.status(201).json({
      message: 'Docking created successfully',
      docking: newDocking,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating docking', error });
  }
};

// Get a docking by ID
exports.getDocking = async (req, res) => {
  try {
    const docking = await Docking.findByPk(req.params.id);
    if (!docking) {
      return res.status(404).json({ message: 'Docking not found' });
    }
    res.status(200).json(docking);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching docking', error });
  }
};

// Update a docking by ID
exports.updateDocking = async (req, res) => {
    try {
      const docking = await Docking.findByPk(req.params.id);
      if (!docking) {
        return res.status(404).json({ message: 'Docking not found' });
      }
  
      // Update in PostgreSQL
      const updatedDocking = await docking.update(req.body);
  
      // Update in Firebase
      const dockingRef = db.collection('dockings').doc(req.params.id);
      await dockingRef.update(req.body);
  
      res.status(200).json(updatedDocking);
    } catch (error) {
      res.status(400).json({ message: 'Error updating docking', error });
    }
  };
  
  // Delete a docking by ID
  exports.deleteDocking = async (req, res) => {
    try {
      const docking = await Docking.findByPk(req.params.id);
      if (!docking) {
        return res.status(404).json({ message: 'Docking not found' });
      }
  
      // Delete from PostgreSQL
      await docking.destroy();
  
      // Delete from Firebase
      const dockingRef = db.collection('dockings').doc(req.params.id);
      await dockingRef.delete();
  
      res.status(204).json({ message: 'Docking deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting docking', error });
    }
  };

// Get all dockings
exports.getAllDockings = async (req, res) => {
  try {
    const dockings = await Docking.findAll();
    res.status(200).json(dockings);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching dockings', error });
  }
};
