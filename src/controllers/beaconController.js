const Beacon = require('../models/Beacon');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new beacon
exports.createBeacon = async (req, res) => {
  const { itag, is_valid, employee_id, id } = req.body;
  
  try {
    // Save to PostgreSQL
    const newBeacon = await Beacon.create({
      id,
      itag,
      is_valid,
      employee_id,
      status: 'active',
    });

    // Save to Firebase
    const beaconRef = db.collection('beacons').doc(); // Create a new doc with auto-generated ID
    await beaconRef.set({
      id: beaconRef.id, // Use auto-generated ID from Firebase
      itag,
      is_valid,
      employee_id,
      status: 'active',
    });

    console.log("201 - beacon created successfully");
    res.status(201).json({
      message: 'Beacon created successfully',
      beacon: newBeacon,
    });
  } catch (error) {
    console.log("400 - error creating beacon");
    res.status(400).json({
      message: error.message,
      error
    });
  }
};

// Get a beacon by ID
exports.getBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByPk(req.params.id);
    if (!beacon) {
      console.log("404 - beacon not found");
      return res.status(404).json({ message: 'Beacon not found' });
    }
    console.log("200 - beacon fetched successfully");
    res.status(200).json(beacon);
  } catch (error) {
    console.log("400 - error fetching beacon");
    res.status(400).json({ message: 'Error fetching beacon', error });
  }
};

// Get all beacons
exports.getAllBeacons = async (req, res) => {
  try {
    const beacons = await Beacon.findAll();
    console.log("200 - beacons fetched successfully");
    res.status(200).json(beacons);
  } catch (error) {
    console.log("400 - error fetching beacons");
    res.status(400).json({ message: 'Error fetching beacons', error });
  }
};

//make beacon invalid and clear employee_id
exports.updateBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByPk(req.params.id);
    if (!beacon) {
      console.log("404 - beacon not found");
      return res.status(404).json({ message: 'Beacon not found' });
    }
    const { itag, is_valid, employee_id, status } = req.body;
    await beacon.update({
      itag,
      is_valid,
      employee_id,
      status,
    });
    console.log("200 - beacon updated successfully");
    res.status(200).json(beacon);
  } catch (error) {
    console.log("400 - error updating beacon");
    res.status(400).json({ message: 'Error updating beacon', error });
  }
};

// Delete a beacon by ID
exports.deleteBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByPk(req.params.id);
    if (!beacon) {
      console.log("404 - beacon not found");
      return res.status(404).json({ message: 'Beacon not found' });
    }
    await beacon.destroy();
    console.log("200 - beacon deleted successfully");
    res.status(200).json({ message: 'Beacon deleted successfully' });
  } catch (error) {
    console.log("400 - error deleting beacon");
    res.status(400).json({ message: 'Error deleting beacon', error });
  }
};