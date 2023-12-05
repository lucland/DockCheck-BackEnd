const Company = require('../models/Company');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new company
exports.createCompany = async (req, res) => {
  const { name, logo, id, supervisors, vessels, updated_at, expiration_date } = req.body;
  
  try {
    // Save to PostgreSQL
    const newCompany = await Company.create({
      name,
      logo,
      id,
      supervisors,
      vessels,
      updated_at,
      expiration_date
    });

    // Save to Firebase
    const companyRef = db.collection('companies').doc(); // Create a new doc with auto-generated ID
    await companyRef.set({
      id: companyRef.id, // Use auto-generated ID from Firebase
      name,
      logo,
      supervisors,
      vessels,
      updated_at,
      expiration_date
    });

    res.status(201).json({
      message: 'Company created successfully',
      company: newCompany,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating company',
      error
    });
  }
};

// Get a company by ID
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching company', error });
  }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Update in PostgreSQL
      const updatedCompany = await company.update(req.body);
  
      // Update in Firebase
      const companyRef = db.collection('companies').doc(req.params.id);
      await companyRef.update(req.body);
  
      res.status(200).json(updatedCompany);
    } catch (error) {
      res.status(400).json({ message: 'Error updating company', error });
    }
  };
  
  // Delete a company by ID
  exports.deleteCompany = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Delete from PostgreSQL
      await company.destroy();
  
      // Delete from Firebase
      const companyRef = db.collection('companies').doc(req.params.id);
      await companyRef.delete();
  
      res.status(204).json({ message: 'Company deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting company', error });
    }
  };

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching companies', error });
  }
};

//get all ids of companies
exports.getAllCompaniesIds = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['id']
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching companies', error });
  }
};
