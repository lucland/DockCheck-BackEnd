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

    res.status(201).json({
      message: 'Portal created successfully',
      portal: newPortal,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating portal', error });
  }
};

// Get a portal by ID
exports.getPortal = async (req, res) => {
  try {
    const portal = await Portal.findByPk(req.params.id);
    if (!portal) {
      return res.status(404).json({ message: 'Portal not found' });
    }
    res.status(200).json(portal);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching portal', error });
  }
};

// Update a portal by ID
exports.updatePortal = async (req, res) => {
    try {
      const portal = await Portal.findByPk(req.params.id);
      if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
      }
  
      // Update in PostgreSQL
      const updatedPortal = await portal.update(req.body);
  
      // Update in Firebase
      const portalRef = db.collection('portals').doc(req.params.id);
      await portalRef.update(req.body);
  
      res.status(200).json(updatedPortal);
    } catch (error) {
      res.status(400).json({ message: 'Error updating portal', error });
    }
  };
  
  // Delete a portal by ID
  exports.deletePortal = async (req, res) => {
    try {
      const portal = await Portal.findByPk(req.params.id);
      if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
      }
  
      // Delete from PostgreSQL
      await portal.destroy();
  
      // Delete from Firebase
      const portalRef = db.collection('portals').doc(req.params.id);
      await portalRef.delete();
  
      res.status(204).json({ message: 'Portal deleted successfully' });
    } catch (error) {
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
      return res.status(404).json({ message: 'No portals found for this vessel' });
    }
    res.status(200).json(portals);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};


// Get all portals
exports.getAllPortals = async (req, res) => {
  try {
    const portals = await Portal.findAll();
    res.status(200).json(portals);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};

//get all portals ids
exports.getAllPortalsIds = async (req, res) => {
  try {
    const portals = await Portal.findAll({
      attributes: ['id']
    });
    res.status(200).json(portals);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching portals', error });
  }
};
