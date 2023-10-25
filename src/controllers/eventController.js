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
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching events', error });
  }
};
