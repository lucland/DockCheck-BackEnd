const Company = require('../models/Company');
const admin = require('../firebase'); // Importing from src/firebase.js
const db = admin.firestore();

// Create a new company
exports.createCompany = async (req, res) => {
  const { id, name, logo, crew, projects, admins, razao_social, cnpj, address, email, telephone} = req.body;
  
  try {
    // Save to PostgreSQL
    const newCompany = await Company.create({
      id,
      name,
      logo,
      crew_id: crew,
      projects_id: projects,
      admins_id: admins,
      razao_social,
      cnpj,
      address,
      telephone,
      email,
      status: 'active',
    });

    // Save to Firebase
    const companyRef = db.collection('companies').doc(); // Create a new doc with auto-generated ID
    await companyRef.set({
      id: companyRef.id, // Use auto-generated ID from Firebase
      name,
      logo,
      crew_id: crew,
      projects_id: projects,
      admins_id: admins,
      razao_social,
      cnpj,
      address,
      telephone,
      email,
      status: 'active',
    });

    console.log("201 - company created successfully");
    res.status(201).json({
      message: 'Company created successfully',
      company: newCompany,
    });
  } catch (error) {
    console.log("400 - error creating company");
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
      console.log("404 - company not found");
      return res.status(404).json({ message: 'Company not found' });
    }
    console.log("200 - company fetched successfully");
    res.status(200).json(company);
  } catch (error) {
    console.log("400 - error fetching company");
    res.status(400).json({ message: 'Error fetching company', error });
  }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);
      if (!company) {
        console.log("404 - company not found");
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Update in PostgreSQL
      const updatedCompany = await company.update(req.body);
  
      // Update in Firebase
      const companyRef = db.collection('companies').doc(req.params.id);
      await companyRef.update(req.body);
  
      console.log("200 - company updated successfully");
      res.status(200).json(updatedCompany);
    } catch (error) {
      console.log("400 - error updating company");
      res.status(400).json({ message: 'Error updating company', error });
    }
  };

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    console.log("200 - companies fetched successfully");
    res.status(200).json(companies);
  } catch (error) {
    console.log("400 - error fetching companies");
    res.status(400).json({ message: 'Error fetching companies', error });
  }
};

//get all ids of companies
exports.getAllCompaniesIds = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['id']
    });
    console.log("200 - companies fetched successfully");
    res.status(200).json(companies);
  } catch (error) {
    console.log("400 - error fetching companies");
    res.status(400).json({ message: 'Error fetching companies', error });
  }
};
