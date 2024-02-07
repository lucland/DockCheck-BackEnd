const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
    try {
        const document = await Document.create(req.body);
        console.log("201 - document created successfully");
        res.status(201).json(document);
    } catch (error) {
        console.log("400 - error creating document");
        res.status(400).json({ message: 'Error creating document', error });
    }
};

exports.getDocument = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (!document) {
            console.log("404 - document not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("200 - document fetched successfully");
        res.status(200).json(document);
    } catch (error) {
        console.log("400 - error fetching document");
        res.status(400).json({ message: 'Error fetching document', error });
    }
};

//get all documents ids of the documents of a specific employee id given in the body
exports.getDocumentsByEmployeeId = async (req, res) => {
    try {
        const documents = await Document.findAll({
            where: {
                employee_id: req.body.employee_id
            },
            attributes: ['id']
        });
        console.log("200 - documents fetched successfully");
        res.status(200).json(documents);
    } catch (error) {
        console.log("400 - error fetching documents");
        res.status(400).json({ message: 'Error fetching documents', error });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        console.log("200 - documents fetched successfully");
        res.status(200).json(documents);
    } catch (error) {
        console.log("400 - error fetching documents");
        res.status(400).json({ message: 'Error fetching documents', error });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (!document) {
            console.log("404 - document not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        const {type, expiration_date, path, employee_id, status } = req.body;
        await document.update({
            type,
            expiration_date,
            path,
            employee_id,
            status,
        });
        console.log("200 - document updated successfully");
        res.status(200).json(document);
    } catch (error) {
        console.log("400 - error updating document");
        res.status(400).json({ message: 'Error updating document', error });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (!document) {
            console.log("404 - document not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        await document.destroy();
        console.log("204 - document deleted successfully");
        res.status(204).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting document");
        res.status(400).json({ message: 'Error deleting document', error });
    }
};

exports.getDocumentsByEmployeeId = async (req, res) => {
    try {
        const documents = await Document.findAll({
            where: {
                employee_id: req.params.employee_id
            }
        });
        console.log("200 - documents fetched successfully");
        res.status(200).json(documents);
    } catch (error) {
        console.log("400 - error fetching documents");
        res.status(400).json({ message: 'Error fetching documents', error });
    }
};
