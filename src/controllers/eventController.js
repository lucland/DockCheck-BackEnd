const Event = require('../models/Event');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // Save to PostgreSQL
    const newEvent = await Event.create(req.body);

    // Save to Firebase
    const eventRef = db.collection('events').doc(); // Create a new doc with auto-generated ID
    await eventRef.set({
      id: eventRef.id, // Use auto-generated ID from Firebase
      ...req.body
    });

    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

// Get an event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching event', error });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Update in PostgreSQL
      const updatedEvent = await event.update(req.body);
  
      // Update in Firebase
      const eventRef = db.collection('events').doc(req.params.id);
      await eventRef.update(req.body);
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: 'Error updating event', error });
    }
  };
  
  // Delete an event by ID
  exports.deleteEvent = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Delete from PostgreSQL
      await event.destroy();
  
      // Delete from Firebase
      const eventRef = db.collection('events').doc(req.params.id);
      await eventRef.delete();
  
      res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting event', error });
    }
  };

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;  // Default limit is 10
    const offset = parseInt(req.query.offset) || 0;  // Default offset is 0

    const events = await Event.findAll({
      limit: limit,
      offset: offset
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching events', error });
  }
};


exports.syncEvents = async (req, res) => {
  try {
    const incomingEvents = req.body.events; // Assuming events is an array of objects
    if (incomingEvents.length > 100) {
      return res.status(400).json({ message: 'Batch size too large. Limit to 100 records.' });
    }

    // Loop through the events and update the databases
    for (const event of incomingEvents) {
      // Update or Create in PostgreSQL
      await Event.upsert(event);

      // Update or Create in Firebase
      const eventRef = db.collection('events').doc(event.id || ''); // Use existing ID or create new
      await eventRef.set(event, { merge: true }); // Merge true will update or create
    }

    res.status(200).json({ message: 'Events synced successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing events', error });
  }
};
