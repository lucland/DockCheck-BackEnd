const Receptor = require('../models/Sensor');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new receptor
exports.createReceptor = async (req, res) => {
  const { beacons, vessel, updated_at, id } = req.body;
  
  try {
    // Save to PostgreSQL
    const newReceptor = await Receptor.create({
      beacons,
      vessel,
      updated_at,
      id,
      status: 'active',
    });

    // Save to Firebase
    const receptorRef = db.collection('receptors').doc(); // Create a new doc with auto-generated ID
    await receptorRef.set({
      id: receptorRef.id, // Use auto-generated ID from Firebase
      beacons,
      vessel,
      updated_at,
      status: 'active',
    });

    console.log("201 - receptor created successfully");
    res.status(201).json({
      message: 'Receptor created successfully',
      receptor: newReceptor,
    });
  } catch (error) {
    console.log("400 - error creating receptor");
    res.status(400).json({
      message: 'Error creating receptor',
      error
    });
  }
};

// Get a receptor by ID
exports.getReceptor = async (req, res) => {
  try {
    const receptor = await Receptor.findByPk(req.params.id);
    if (!receptor) {
      console.log("404 - receptor not found");
      return res.status(404).json({ message: 'Receptor not found' });
    }
    console.log("200 - receptor fetched successfully");
    res.status(200).json(receptor);
  } catch (error) {
    console.log("400 - error fetching receptor");
    res.status(400).json({ message: 'Error fetching receptor', error });
  }
};

// Get all receptors
exports.getAllReceptors = async (req, res) => {
  try {
    const receptors = await Receptor.findAll();
    console.log("200 - receptors fetched successfully");
    res.status(200).json(receptors);
  } catch (error) {
    console.log("400 - error fetching receptors");
    res.status(400).json({ message: 'Error fetching receptors', error });
  }
};

// Update a receptor by ID
exports.updateReceptor = async (req, res) => {
  try {
    const receptor = await Receptor.findByPk(req.params.id);
    if (!receptor) {
      console.log("404 - receptor not found");
      return res.status(404).json({ message: 'Receptor not found' });
    }

    const { beacons, vessel, updated_at, status } = req.body;
    await receptor.update({
      beacons,
      vessel,
      updated_at,
      status,
    });

    // Update Firebase
    const receptorRef = db.collection('receptors').doc(receptor.id);
    await receptorRef.update({
      beacons,
      vessel,
      updated_at,
      status,
    });

    console.log("200 - receptor updated successfully");
    res.status(200).json({
      message: 'Receptor updated successfully',
      receptor,
    });
  } catch (error) {
    console.log("400 - error updating receptor");
    res.status(400).json({
      message: 'Error updating receptor',
      error
    });
  }
};

// Delete a receptor by ID
exports.deleteReceptor = async (req, res) => {
  try {
    const receptor = await Receptor.findByPk(req.params.id);
    if (!receptor) {
      console.log("404 - receptor not found");
      return res.status(404).json({ message: 'Receptor not found' });
    }

    // Delete from PostgreSQL
    await receptor.destroy();

    // Delete from Firebase
    const receptorRef = db.collection('receptors').doc(receptor.id);
    await receptorRef.delete();

    console.log("200 - receptor deleted successfully");
    res.status(200).json({
      message: 'Receptor deleted successfully',
      receptor,
    });
  } catch (error) {
    console.log("400 - error deleting receptor");
    res.status(400).json({
      message: 'Error deleting receptor',
      error
    });
  }
};