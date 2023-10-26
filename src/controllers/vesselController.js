const Vessel = require('../models/Vessel');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new vessel
exports.createVessel = async (req, res) => {
  try {
    // Save to PostgreSQL
    const newVessel = await Vessel.create(req.body);

    // Save to Firebase
    const vesselRef = db.collection('vessels').doc(); // Create a new doc with auto-generated ID
    await vesselRef.set({
      id: vesselRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    res.status(201).json({
      message: 'Vessel created successfully',
      vessel: newVessel,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating vessel', error });
  }
};

// Get a vessel by ID
exports.getVessel = async (req, res) => {
  try {
    const vessel = await Vessel.findByPk(req.params.id);
    if (!vessel) {
      return res.status(404).json({ message: 'Vessel not found' });
    }
    res.status(200).json(vessel);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching vessel', error });
  }
};

// Update a vessel by ID
exports.updateVessel = async (req, res) => {
    try {
      const vessel = await Vessel.findByPk(req.params.id);
      if (!vessel) {
        return res.status(404).json({ message: 'Vessel not found' });
      }
  
      // Update in PostgreSQL
      const updatedVessel = await vessel.update(req.body);
  
      // Update in Firebase
      const vesselRef = db.collection('vessels').doc(req.params.id);
      await vesselRef.update(req.body);
  
      res.status(200).json(updatedVessel);
    } catch (error) {
      res.status(400).json({ message: 'Error updating vessel', error });
    }
  };
  
  // Delete a vessel by ID
  exports.deleteVessel = async (req, res) => {
    try {
      const vessel = await Vessel.findByPk(req.params.id);
      if (!vessel) {
        return res.status(404).json({ message: 'Vessel not found' });
      }
  
      // Delete from PostgreSQL
      await vessel.destroy();
  
      // Delete from Firebase
      const vesselRef = db.collection('vessels').doc(req.params.id);
      await vesselRef.delete();
  
      res.status(204).json({ message: 'Vessel deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting vessel', error });
    }
  };
  
// Get all vessels for a specific company
exports.getVesselsByCompany = async (req, res) => {
  try {
    const { company_id } = req.params;
    const vessels = await Vessel.findAll({
      where: {
        company_id: company_id
      }
    });
    if (vessels.length === 0) {
      return res.status(404).json({ message: 'No vessels found for this company' });
    }
    res.status(200).json(vessels);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching vessels', error });
  }
};

// Get all vessels
exports.getAllVessels = async (req, res) => {
  try {
    const vessels = await Vessel.findAll();
    res.status(200).json(vessels);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching vessels', error });
  }
};
