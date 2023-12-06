const Supervisor = require('../models/Supervisor');
const admin = require('../firebase');
const crypto = require('crypto');
const db = admin.firestore();

// Helper function to set password and salt
const setPassword = (supervisor, password) => {
  supervisor.salt = crypto.randomBytes(16).toString('hex');
  supervisor.hash = crypto.pbkdf2Sync(password, supervisor.salt, 1000, 64, 'sha512').toString('hex');
};

exports.createSupervisor = async (req, res) => {
  try {
    const { password, ...supervisorData } = req.body;

    // Hash the password and set salt
    setPassword(supervisorData, password);

    // Save to PostgreSQL
    const newSupervisor = await Supervisor.create(supervisorData);

    // Save to Firebase
    const supervisorRef = db.collection('supervisors').doc(newSupervisor.id);
    await supervisorRef.set(supervisorData);

    console.log("201 - supervisor created successfully");
    res.status(201).json({
      message: 'Supervisor created successfully',
      supervisor: newSupervisor,
    });
  } catch (error) {
    console.log("400 - error creating supervisor");
    res.status(400).json({ message: 'Error creating supervisor', error });
  }
};

// Get a supervisor by ID
exports.getSupervisor = async (req, res) => {
  try {
    const supervisor = await Supervisor.findByPk(req.params.id);
    if (!supervisor) {
      console.log("404 - supervisor not found");
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    console.log("200 - supervisor fetched successfully");
    res.status(200).json(supervisor);
  } catch (error) {
    console.log("400 - error fetching supervisor");
    res.status(400).json({ message: 'Error fetching supervisor', error });
  }
};

// Update a supervisor by ID
exports.updateSupervisor = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const supervisor = await Supervisor.findByPk(req.params.id);
    if (!supervisor) {
      console.log("404 - supervisor not found");
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Update password if provided
    if (password) {
      setPassword(supervisor, password);
    }

    // Update in PostgreSQL
    const updatedSupervisor = await supervisor.update({
      ...updateData,
      salt: supervisor.salt,
      hash: supervisor.hash,
    });

    // Update in Firebase
    const supervisorRef = db.collection('supervisors').doc(req.params.id);
    await supervisorRef.update(updateData);

    console.log("200 - supervisor updated successfully");
    res.status(200).json(updatedSupervisor);
  } catch (error) {
    console.log("400 - error updating supervisor");
    res.status(400).json({ message: 'Error updating supervisor', error });
  }
};
  
  // Delete a supervisor by ID
  exports.deleteSupervisor = async (req, res) => {
    try {
      const supervisor = await Supervisor.findByPk(req.params.id);
      if (!supervisor) {
        console.log("404 - supervisor not found");
        return res.status(404).json({ message: 'Supervisor not found' });
      }
  
      // Delete from PostgreSQL
      await supervisor.destroy();
  
      // Delete from Firebase
      const supervisorRef = db.collection('supervisors').doc(req.params.id);
      await supervisorRef.delete();
  
      console.log("204 - supervisor deleted successfully");
      res.status(204).json({ message: 'Supervisor deleted successfully' });
    } catch (error) {
      console.log("400 - error deleting supervisor");
      res.status(400).json({ message: 'Error deleting supervisor', error });
    }
  };

// Get all supervisors
exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.findAll();
    console.log("200 - supervisors fetched successfully");
    res.status(200).json(supervisors);
  } catch (error) {
    console.log("400 - error fetching supervisors");
    res.status(400).json({ message: 'Error fetching supervisors', error });
  }
};
