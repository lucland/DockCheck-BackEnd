const Pic = require('../models/Pic');
const User = require('../models/User');

const pictureController = {
    async createPicture(req, res) {
        try {
            const { id, user_id, picture } = req.body;
            const newPicture = await Pic.create({ id, user_id, picture });
           
            //add id in User.picture string field in User of id = userId from User table
            const user = await User.findByPk(user_id);
            if (user) {// Create a new array with the new event ID
                user.set('picture', newPicture.id); // Explicitly set the updated events array
                await user.save();
                console.log("User pictures updated with new picture ID:", updatedPictures);
            }
            console.log("201 - picture created successfully");
            return res.status(201).json(newPicture);
        } catch (error) {
            console.log("400 - error creating picture");
            return res.status(500).json({ error: error.message });
        }
    },

    async getPicture(req, res) {
        try {
            const { id } = req.params;
            //id is user_id in Picture table
            const pic = await Pic.findOne({ where: { user_id: id } });
            if (!pic) {
                return res.status(404).json({ error: 'Picture not found' });
            }
            return res.json(pic);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async updatePicture(req, res) {
        try {
            const { id } = req.params;
            const { pic } = req.body;
            const updatedPicture = await Pic.update({ picture }, { where: { id } });
            if (!updatedPicture) {
                return res.status(404).json({ error: 'Picture not found' });
            }
            return res.json({ message: 'Picture updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async deletePicture(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await Pic.destroy({ where: { id } });
            if (!deleteResult) {
                return res.status(404).json({ error: 'Picture not found' });
            }
            return res.json({ message: 'Picture deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pictureController;
