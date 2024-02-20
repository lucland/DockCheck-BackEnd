const User = require('../models/User');
const Pic = require('../models/Picture')
const Authorization = require('../models/Authorization');
const crypto = require('crypto');
const sequelize = require('../config/database'); // Make sure to import sequelize
const { Op } = require('sequelize');
const CompanyAdmin = require('../models/CompanyAdmin');
const Company = require('../models/Company');
const ThirdCompanyAdmin = require('../models/ThirdCompanyAdmin');
const ThirdCompany = require('../models/ThirdCompany');

// Helper function to set password and salt
const setPassword = (user, password) => {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

exports.createUser = async (req, res) => {
  try {
      const userData = req.body;

      // Check if username is already taken
      const existingUser = await User.findOne({ where: { username: userData.username } });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
      }

      //update CompanyAdmin if user.company_id is a Company or update ThirdCompanyAdmin if user.company_id is a ThirdCompany
        if (userData.company_id) {
            const company = await Company.findByPk(userData.company_id);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            const companyAdmin = await CompanyAdmin.findOne({ where: { user_id: userData.id } });
            if (companyAdmin) {
                await companyAdmin.update({ company_id: userData.company_id });
            } else {
                await CompanyAdmin.create({ user_id: userData.id, company_id: userData.company_id });
            }
        }

      // Set password for users with a password field
      if (userData.password) {
          setPassword(userData, userData.password);
      }

      const newUser = await User.create(userData);
      res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
  }
};

exports.getUser = async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({ message: 'Error fetching user', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update password if provided
      if (req.body.password) {
          setPassword(user, req.body.password);
      }

      const updatedUser = await user.update(req.body);
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (error) {
      res.status(400).json({ message: 'Error fetching users', error });
  }
};

exports.searchUsers = async (req, res) => {
  try {
      const { searchTerm } = req.query;
      const users = await User.findAll({
          where: {
              [Op.or]: [
                  { name: { [Op.iLike]: `%${searchTerm}%` } },
                  { id: searchTerm }
              ]
          }
      });
      res.status(200).json(users);
  } catch (error) {
      res.status(400).json({ message: 'Error searching for users', error });
  }
};

exports.blockUser = async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      await user.update({ status: 'blocked' });
      res.status(200).json({ message: 'User blocked successfully', user });
  } catch (error) {
      res.status(400).json({ message: 'Error blocking user', error });
  }
};

exports.unblockUser = async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      await user.update({ status: 'active' });
      res.status(200).json({ message: 'User unblocked successfully', user });
  } catch (error) {
      res.status(400).json({ message: 'Error unblocking user', error });
  }
};