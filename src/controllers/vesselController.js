const Vessel = require('../models/Vessel');
const Event = require('../models/Event');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new vessel
exports.createVessel = async (req, res) => {
  try {
    console.log("Starting createVessel...");
    // Save to PostgreSQL
    const newVessel = await Vessel.create(req.body);

    // Save to Firebase
    const vesselRef = db.collection('vessels').doc(); // Create a new doc with auto-generated ID
    await vesselRef.set({
      id: vesselRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    console.log("201 - vessel created successfully");
    res.status(201).json({
      message: 'Vessel created successfully',
      vessel: newVessel,
    });
  } catch (error) {
    console.log("400 - error creating vessel");
    res.status(400).json({ message: 'Error creating vessel', error });
  }
};

// Get a vessel by ID
exports.getVessel = async (req, res) => {
  try {
    const vessel = await Vessel.findByPk(req.params.id);
    if (!vessel) {
      console.log("404 - vessel not found");
      return res.status(404).json({ message: 'Vessel not found' });
    }
    console.log("200 - vessel fetched successfully");
    res.status(200).json(vessel);
  } catch (error) {
    console.log("400 - error fetching vessel");
    res.status(400).json({ message: 'Error fetching vessel', error });
  }
};

exports.getVesselByName = async (req, res) => {
  try {
    const vessel = await Vessel.findAll({
      where: {
        vessel_name: req.params.vessel_name
      }
    });
    if (!vessel) {
      console.log("404 - vessel not found");
      return res.status(404).json({ message: 'Vessel not found' });
    }
    console.log("200 - vessel fetched successfully");
    res.status(200).json(vessel);
  } catch (error) {
    console.log("400 - error fetching vessel");
    res.status(400).json({ message: 'Error fetching vessel', error });
  }
};

// Update a vessel by ID
exports.updateVessel = async (req, res) => {
    try {
      const vessel = await Vessel.findByPk(req.params.id);
      if (!vessel) {
        console.log("404 - vessel not found");
        return res.status(404).json({ message: 'Vessel not found' });
      }
  
      // Update in PostgreSQL
      const updatedVessel = await vessel.update(req.body);
  
      // Update in Firebase
      const vesselRef = db.collection('vessels').doc(req.params.id);
      await vesselRef.update(req.body);
  
      console.log("200 - vessel updated successfully");
      res.status(200).json(updatedVessel);
    } catch (error) {
      console.log("400 - error updating vessel");
      res.status(400).json({ message: 'Error updating vessel', error });
    }
  };
  
  // Delete a vessel by ID
  exports.deleteVessel = async (req, res) => {
    try {
      const vessel = await Vessel.findByPk(req.params.id);
      if (!vessel) {
        console.log("404 - vessel not found");
        return res.status(404).json({ message: 'Vessel not found' });
      }
  
      // Delete from PostgreSQL
      await vessel.destroy();
  
      // Delete from Firebase
      const vesselRef = db.collection('vessels').doc(req.params.id);
      await vesselRef.delete();
  
      console.log("204 - vessel deleted successfully");
      res.status(204).json({ message: 'Vessel deleted successfully' });
    } catch (error) {
      console.log("400 - error deleting vessel");
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
      console.log("404 - no vessels found for this company");
      return res.status(404).json({ message: 'No vessels found for this company' });
    }
    console.log("200 - vessels fetched successfully");
    res.status(200).json(vessels);
  } catch (error) {
    console.log("400 - error fetching vessels");
    res.status(400).json({ message: 'Error fetching vessels', error });
  }
};

// Get all vessels
exports.getAllVessels = async (req, res) => {
  try {
    const vessels = await Vessel.findAll();
    console.log("200 - vessels fetched successfully");
    res.status(200).json(vessels);
  } catch (error) {
    console.log("400 - error fetching vessels");
    res.status(400).json({ message: 'Error fetching vessels', error });
  }
};

//get all ids of vessels
exports.getAllVesselIds = async (req, res) => {
  try {
    const vessels = await Vessel.findAll({
      attributes: ['id']
    });
    console.log("200 - vessels fetched successfully");
    res.status(200).json(vessels);
  } catch (error) {
    console.log("400 - error fetching vessels");
    res.status(400).json({ message: 'Error fetching vessels', error });
  }
};

//get all onboarded users of a vessel
exports.getOnboardedUsers = async (req, res) => {
  try {
    const vessel = await Vessel.findByPk(req.params.id);
    if (!vessel) {
      console.log("404 - vessel not found");
      return res.status(404).json({ message: 'Vessel not found' });
    }
    const onboardedUsers = vessel.onboarded_users;
    console.log("200 - onboarded users fetched successfully");
    res.status(200).json(onboardedUsers);
  } catch (error) {
    console.log("400 - error fetching onboarded users");
    res.status(400).json({ message: 'Error fetching onboarded users', error });
  }
};

exports.getEventsByVessel = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;  // Default limit is 10
    const offset = parseInt(req.query.offset) || 0;  // Default offset is 0

    console.log("Starting getEventsByVessel...");
    console.log(req.params.vessel_id);

    //return the last event where portal_id == P1, last event where portal_id == P2, last event where portal_id == P3
     const events1 = await Event.findOne({
       where: {
         vessel_id: req.params.vessel_id,
         portal_id: 'P1'
       },
       order: [['created_at', 'DESC']]
     });

     const events2 = await Event.findOne({
       where: {
         vessel_id: req.params.vessel_id,
         portal_id: 'P2'
       },
       order: [['created_at', 'DESC']]
     });

     const events3 = await Event.findOne({
       where: {
         vessel_id: req.params.vessel_id,
         portal_id: 'P3'
       },
       order: [['created_at', 'DESC']]
     });

     const events = [events1, events2, events3];

    if (events.length === 0) {
      console.log("404 - no events found for this vessel");
      return res.status(404).json({ message: 'No events found for this vessel' });
    }

    console.log("200 - events fetched successfully");
    res.status(200).json(events);
  } catch (error) {
    console.log("400 - error fetching events");
    res.status(400).json({ message: 'Error fetching events', error });
  }
};