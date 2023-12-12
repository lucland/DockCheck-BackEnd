const Beacon = require('../models/Beacon');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new beacon
exports.createBeacon = async (req, res) => {
  const { rssi, found, updated_at, id } = req.body;
  
  try {
    // Save to PostgreSQL
    const newBeacon = await Beacon.create({
      id,
      rssi,
      found,
      updated_at,
    });

    // Save to Firebase
    const beaconRef = db.collection('beacons').doc(); // Create a new doc with auto-generated ID
    await beaconRef.set({
      id: beaconRef.id, // Use auto-generated ID from Firebase
      rssi,
      found,
      updated_at,
    });

    console.log("201 - beacon created successfully");
    res.status(201).json({
      message: 'Beacon created successfully',
      beacon: newBeacon,
    });
  } catch (error) {
    console.log("400 - error creating beacon");
    res.status(400).json({
      message: 'Error creating beacon',
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

// Update a beacon by ID
exports.updateBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByPk(req.params.id);
    if (!beacon) {
      console.log("404 - beacon not found");
      return res.status(404).json({ message: 'Beacon not found' });
    }
    const { rssi, found, updated_at } = req.body;
    await beacon.update({
      rssi,
      found,
      updated_at
    });
    console.log("200 - beacon updated successfully");
    res.status(200).json({
      message: 'Beacon updated successfully',
      beacon
    });
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