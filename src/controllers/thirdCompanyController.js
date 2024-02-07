const ThirdCompany = require('../models/ThirdCompany');

exports.createThirdCompany = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.create(req.body);
        console.log("201 - thirdCompany created successfully");
        res.status(201).json(thirdCompany);
    } catch (error) {
        console.log("400 - error creating thirdCompany");
        res.status(400).json({ message: 'Error creating thirdCompany', error });
    }
};

exports.getThirdCompany = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.findByPk(req.params.id);
        if (!thirdCompany) {
            console.log("404 - thirdCompany not found");
            return res.status(404).json({ message: 'ThirdCompany not found' });
        }
        console.log("200 - thirdCompany fetched successfully");
        res.status(200).json(thirdCompany);
    } catch (error) {
        console.log("400 - error fetching thirdCompany");
        res.status(400).json({ message: 'Error fetching thirdCompany', error });
    }
};

exports.getAllThirdCompanies = async (req, res) => {
    try {
        const thirdCompanies = await ThirdCompany.findAll();
        console.log("200 - thirdCompanies fetched successfully");
        res.status(200).json(thirdCompanies);
    } catch (error) {
        console.log("400 - error fetching thirdCompanies");
        res.status(400).json({ message: 'Error fetching thirdCompanies', error });
    }
};

exports.updateThirdCompany = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.findByPk(req.params.id);
        if (!thirdCompany) {
            console.log("404 - thirdCompany not found");
            return res.status(404).json({ message: 'ThirdCompany not found' });
        }
        const { name, logo, razao_social, cnpj, admis_id, address, is_vessel_company, telephone, email, status } = req.body;
        await thirdCompany.update({
            name,
            logo,
            razao_social,
            cnpj,
            admis_id,
            address,
            is_vessel_company,
            telephone,
            email,
            status,
        });
        console.log("200 - thirdCompany updated successfully");
        res.status(200).json(thirdCompany);
    } catch (error) {
        console.log("400 - error updating thirdCompany");
        res.status(400).json({ message: 'Error updating thirdCompany', error });
    }
};

exports.deleteThirdCompany = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.findByPk(req.params.id);
        if (!thirdCompany) {
            console.log("404 - thirdCompany not found");
            return res.status(404).json({ message: 'ThirdCompany not found' });
        }
        await thirdCompany.destroy();
        console.log("200 - thirdCompany deleted successfully");
        res.status(200).json({ message: 'ThirdCompany deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting thirdCompany");
        res.status(400).json({ message: 'Error deleting thirdCompany', error });
    }
};

//add new admin to the third company
exports.addAdmin = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.findByPk(req.params.id);
        if (!thirdCompany) {
            console.log("404 - thirdCompany not found");
            return res.status(404).json({ message: 'ThirdCompany not found' });
        }
        const { admin_id } = req.body;
        await thirdCompany.addAdmin(admin_id);
        console.log("200 - admin added successfully");
        res.status(200).json({ message: 'Admin added successfully' });
    } catch (error) {
        console.log("400 - error adding admin");
        res.status(400).json({ message: 'Error adding admin', error });
    }
};

//remove admin from the third company
exports.removeAdmin = async (req, res) => {
    try {
        const thirdCompany = await ThirdCompany.findByPk(req.params.id);
        if (!thirdCompany) {
            console.log("404 - thirdCompany not found");
            return res.status(404).json({ message: 'ThirdCompany not found' });
        }
        const { admin_id } = req.body;
        await thirdCompany.removeAdmin(admin_id);
        console.log("200 - admin removed successfully");
        res.status(200).json({ message: 'Admin removed successfully' });
    } catch (error) {
        console.log("400 - error removing admin");
        res.status(400).json({ message: 'Error removing admin', error });
    }
};