const Event = require('../models/Event');
const Vessel = require('../models/Vessel');
const User = require('../models/User');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

exports.createEvent = async (req, res) => {
  try {
    let userId = req.body.user_id;

    // Finding user by beacon_id if user_id is not provided
    if (userId == "-" && req.body.beacon_id) {
      const user = await User.findOne({ where: { itag: req.body.beacon_id }});
      if (user) {
        userId = user.id;
        req.body.user_id = user.id;
      }
    }

    const vessel = await Vessel.findByPk(req.body.vessel_id);
    if (!vessel) {
      throw new Error("Vessel not found");
    }

    if ((req.body.action == 3 || req.body.action == 5) && userId !== "-") {
      const user = await User.findByPk(userId);
      if (user && !user.is_onboarded) {
        user.is_onboarded = true;
        await user.save();
    
        if (!vessel.onboarded_users.includes(userId)) {
          vessel.onboarded_users = [...vessel.onboarded_users, userId];
          vessel.onboarded_count = vessel.onboarded_users.length;
          await vessel.save();
        }
      }
    } else if (req.body.action == 7 && req.body.portal_id == 'P1' && userId !== "-") {
      const user = await User.findByPk(userId);
      if (user && user.is_onboarded) {
        user.is_onboarded = false;
        await user.save();
    
        if (vessel.onboarded_users.includes(userId)) {
          vessel.onboarded_users = vessel.onboarded_users.filter(id => id !== userId);
          vessel.onboarded_count = vessel.onboarded_users.length;
          await vessel.save();
        }
      }
    }

    // Create the event
    const newEvent = await Event.create(req.body);
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error("Error creating event", error);
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
};

    //recieve multiple events from the front end SendEventsAsync function, and save them to the database
    exports.syncEvents = async (req, res) => {
      try {
        const incomingEvents = req.body.events; // Assuming events is an array of objects
        if (incomingEvents.length > 100) {
          console.log("400 - batch size too large");
          return res.status(400).json({ message: 'Batch size too large. Limit to 100 records.' });
        } else if (incomingEvents.length === 0) {
          console.log("400 - no events found");
          return res.status(400).json({ message: 'No events found.' });
        } else {
          //same as createEvent, but for multiple events
          for (const event of incomingEvents) {
            // Update or Create in PostgreSQL
            await Event.upsert(event);
    
            // Update or Create in Firebase
            const eventRef = db.collection('events').doc(event.id || ''); // Use existing ID or create new
            await eventRef.set(event, { merge: true }); // Merge true will update or create
            return res.status(200).json({ message: 'Events synced successfully.' });
          }
        }
      } catch (error) {
        console.error("500 - error syncing events", error);
        res.status(500).json({ message: 'Error syncing events', error: error.message });
      }
    };


// Get an event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      console.log("404 - event not found");
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log("200 - event fetched successfully");
    res.status(200).json(event);
  } catch (error) {
    console.log("400 - error fetching event");
    res.status(400).json({ message: 'Error fetching event', error });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        console.log("404 - event not found");
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Update in PostgreSQL
      const updatedEvent = await event.update(req.body);
  
      // Update in Firebase
      const eventRef = db.collection('events').doc(req.params.id);
      await eventRef.update(req.body);
  
      console.log("200 - event updated successfully");
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.log("400 - error updating event");
      res.status(400).json({ message: 'Error updating event', error });
    }
  };
  
  // Delete an event by ID
  exports.deleteEvent = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        console.log("404 - event not found");
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Delete from PostgreSQL
      await event.destroy();
  
      // Delete from Firebase
      const eventRef = db.collection('events').doc(req.params.id);
      await eventRef.delete();
  
      console.log("204 - event deleted successfully");
      res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.log("400 - error deleting event");
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

    console.log("200 - events fetched successfully");
    res.status(200).json(events);
  } catch (error) {
    console.log("400 - error fetching events");
    res.status(400).json({ message: 'Error fetching events', error });
  }
};

// Server-side controller
exports.getEventsByUser = async (req, res) => {
  //receive user_id from req.params, search the event table for all events with that user_id, and return them
  try {
    const events = await Event.findAll({
      where: {
        user_id: req.params.user_id
      },
      order: [
        ['timestamp', 'DESC']
      ]
    });
    if (events.length === 0) {
      console.log("404 - events not found");
      return res.status(404).json({ message: 'Events not found' });
    }
    console.log("200 - events fetched successfully");
    res.status(200).json(events);
  } catch (error) {
    console.log("400 - error fetching events");
    res.status(400).json({ message: 'Error fetching events', error });
  }
};

exports.syncEvents = async (req, res) => {
  try {
    const incomingEvents = req.body.events; // Assuming events is an array of objects
    if (incomingEvents.length > 100) {
      console.log("400 - batch size too large");
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

    console.log("200 - events synced successfully");
    res.status(200).json({ message: 'Events synced successfully.' });
  } catch (error) {
    console.log("500 - error syncing events");
    res.status(500).json({ message: 'Error syncing events', error });
  }
};

exports.getEventsIds = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: ['id']
    });
    if (events.length === 0) {
      console.log("404 - events not found");
      return res.status(404).json({ message: 'Events not found' });
    }
    console.log("200 - events fetched successfully");
    res.status(200).json(events);
  } catch (error) {
    console.log("400 - error fetching events");
    res.status(400).json({ message: 'Error fetching events', error });
  }
};
