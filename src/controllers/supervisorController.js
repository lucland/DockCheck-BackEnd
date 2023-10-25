const Supervisor = require('../models/Supervisor');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new supervisor
exports.createSupervisor = async (req, res) => {
  try {
    // Save to PostgreSQL
    const newSupervisor = await Supervisor.create(req.body);

    // Save to Firebase
    const supervisorRef = db.collection('supervisors').doc(); // Create a new doc with auto-generated ID
    await supervisorRef.set({
      id: supervisorRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    res.status(201).json({
      message: 'Supervisor created successfully',
      supervisor: newSupervisor,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating supervisor', error });
  }
};

// Get a supervisor by ID
exports.getSupervisor = async (req, res) => {
  try {
    const supervisor = await Supervisor.findByPk(req.params.id);
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching supervisor', error });
  }
};

// Update a supervisor by ID
exports.updateSupervisor = async (req, res) => {
    try {
      const supervisor = await Supervisor.findByPk(req.params.id);
      if (!supervisor) {
        return res.status(404).json({ message: 'Supervisor not found' });
      }
  
      // Update in PostgreSQL
      const updatedSupervisor = await supervisor.update(req.body);
  
      // Update in Firebase
      const supervisorRef = db.collection('supervisors').doc(req.params.id);
      await supervisorRef.update(req.body);
  
      res.status(200).json(updatedSupervisor);
    } catch (error) {
      res.status(400).json({ message: 'Error updating supervisor', error });
    }
  };
  
  // Delete a supervisor by ID
  exports.deleteSupervisor = async (req, res) => {
    try {
      const supervisor = await Supervisor.findByPk(req.params.id);
      if (!supervisor) {
        return res.status(404).json({ message: 'Supervisor not found' });
      }
  
      // Delete from PostgreSQL
      await supervisor.destroy();
  
      // Delete from Firebase
      const supervisorRef = db.collection('supervisors').doc(req.params.id);
      await supervisorRef.delete();
  
      res.status(204).json({ message: 'Supervisor deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting supervisor', error });
    }
  };

// Get all supervisors
exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.findAll();
    res.status(200).json(supervisors);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching supervisors', error });
  }
};
