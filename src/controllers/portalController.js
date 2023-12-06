const Portal = require('../models/Portal');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new portal
exports.createPortal = async (req, res) => {
  try {
    // Save to PostgreSQL
    const newPortal = await Portal.create(req.body);

    // Save to Firebase
    const portalRef = db.collection('portals').doc(); // Create a new doc with auto-generated ID
    await portalRef.set({
      id: portalRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    console.log("201 - portal created successfully");
    res.status(201).json({
      message: 'Portal created successfully',
      portal: newPortal,
    });
  } catch (error) {
    console.log("400 - error creating portal");
    res.status(400).json({ message: 'Error creating portal', error });
  }
};

// Get a portal by ID
exports.getPortal = async (req, res) => {
  try {
    const portal = await Portal.findByPk(req.params.id);
    if (!portal) {
      console.log("404 - portal not found");
      return res.status(404).json({ message: 'Portal not found' });
    }
    console.log("200 - portal fetched successfully");
    res.status(200).json(portal);
  } catch (error) {
    console.log("400 - error fetching portal");
    res.status(400).json({ message: 'Error fetching portal', error });
  }
};

// Update a portal by ID
exports.updatePortal = async (req, res) => {
    try {
      const portal = await Portal.findByPk(req.params.id);
      if (!portal) {
        console.log("404 - portal not found");
        return res.status(404).json({ message: 'Portal not found' });
      }
  
      // Update in PostgreSQL
      const updatedPortal = await portal.update(req.body);
  
      // Update in Firebase
      const portalRef = db.collection('portals').doc(req.params.id);
      await portalRef.update(req.body);
  
      console.log("200 - portal updated successfully");
      res.status(200).json(updatedPortal);
    } catch (error) {
      console.log("400 - error updating portal");
      res.status(400).json({ message: 'Error updating portal', error });
    }
  };
  
  // Delete a portal by ID
  exports.deletePortal = async (req, res) => {
    try {
      const portal = await Portal.findByPk(req.params.id);
      if (!portal) {
        console.log("404 - portal not found");
        return res.status(404).json({ message: 'Portal not found' });
      }
  
      // Delete from PostgreSQL
      await portal.destroy();
  
      // Delete from Firebase
      const portalRef = db.collection('portals').doc(req.params.id);
      await portalRef.delete();
  
      console.log("204 - portal deleted successfully");
      res.status(204).json({ message: 'Portal deleted successfully' });
    } catch (error) {
      console.log("400 - error deleting portal");
      res.status(400).json({ message: 'Error deleting portal', error });
    }
  };

  // Get all portals for a specific vessel
exports.getPortalsByVessel = async (req, res) => {
  try {
    const { vessel_id } = req.params;
    const portals = await Portal.findAll({
      where: {
        vessel_id: vessel_id
      }
    });
    if (portals.length === 0) {
      console.log("404 - no portals found for this vessel");
      return res.status(404).json({ message: 'No portals found for this vessel' });
    }
    console.log("200 - portals fetched successfully");
    res.status(200).json(portals);
  } catch (error) {
    console.log("400 - error fetching portals");
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};


// Get all portals
exports.getAllPortals = async (req, res) => {
  try {
    const portals = await Portal.findAll();
    console.log("200 - portals fetched successfully");
    res.status(200).json(portals);
  } catch (error) {
    console.log("400 - error fetching portals");
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};

//get all portals ids
exports.getAllPortalsIds = async (req, res) => {
  try {
    const portals = await Portal.findAll({
      attributes: ['id']
    });
    console.log("200 - portals fetched successfully");
    res.status(200).json(portals);
  } catch (error) {
    console.log("400 - error fetching portals");
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};
