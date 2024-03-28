const Invite = require('../models/Invite');


// Controller method to create an Invite
exports.createInvite = async (req, res) => {
    try {
        // Extract the invite data from the request body
        const { id, email, accepted, sent, thirdCompanyName, dateSent, viewed } = req.body;

        // Create the invite in the database
        const invite = await Invite.create({
            id,
            email,
            accepted,
            sent,
            thirdCompanyName,
            dateSent,
            viewed,
        });

        // Send the created invite as the response
        res.status(201).json(invite);
    } catch (error) {
        // Handle any errors that occur during the creation process
        res.status(500).json({ error: 'Failed to create invite' });
    }
};

// Controller method to get a single Invite by ID
exports.getInviteById = async (req, res) => {
    try {
        // Extract the invite ID from the request parameters
        const { inviteId } = req.params;

        // Find the invite in the database by ID
        const invite = await Invite.findByPk(inviteId);

        // If the invite is found, send it as the response
        if (invite) {
            res.json(invite);
        } else {
            // If the invite is not found, send a 404 response
            res.status(404).json({ error: 'Invite not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({ error: 'Failed to get invite' });
    }
};

// Controller method to get all Invites
exports.getAllInvites = async (req, res) => {
    try {
        // Find all invites in the database
        const invites = await Invite.findAll();

        // Send the invites as the response
        res.json(invites);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({ error: 'Failed to get invites' });
    }
};

// Controller method to update an Invite
exports.updateInvite = async (req, res) => {
    try {
        // Extract the invite ID from the request parameters
        const { inviteId } = req.params;

        // Find the invite in the database by ID
        const invite = await Invite.findByPk(inviteId);

        // If the invite is found, update its properties based on the request body
        if (invite) {
            const { email, accepted, sent, thirdCompanyName, dateSent, viewed } = req.body;
            invite.email = email;
            invite.accepted = accepted;
            invite.sent = sent;
            invite.thirdCompanyName = thirdCompanyName;
            invite.dateSent = dateSent;
            invite.viewed = viewed;

            // Save the updated invite in the database
            await invite.save();

            // Send the updated invite as the response
            res.json(invite);
        } else {
            // If the invite is not found, send a 404 response
            res.status(404).json({ error: 'Invite not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({ error: 'Failed to update invite' });
    }
};

//get all invites by project_id where invite.project_id = project_id
exports.getAllInvitesByProjectId = async (req, res) => {
    try {
        // Find all invites in the database by project ID
        const invites = await Invite.findAll({ where: { project_id: req.params.projectId } });

        // Send the invites as the response
        res.json(invites);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({ error: 'Failed to get invites' });
    }
};

//cancel invite
exports.cancelInvite = async (req, res) => {
    try {
        // Extract the invite ID from the request parameters
        const { inviteId } = req.params;

        // Find the invite in the database by ID
        const invite = await Invite.findByPk(inviteId);

        // If the invite is found, update its properties based on the request body
        if (invite) {
            invite.sent = false;

            // Save the updated invite in the database
            await invite.save();
            //send the response with a status == success
            res.status(200).json({ message: 'Invite cancelled successfully' });
        } else {
            // If the invite is not found, send a 404 response
            res.status(404).json({ error: 'Invite not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({ error: 'Failed to cancel invite' });
    }
};