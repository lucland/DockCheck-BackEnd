const Authorization = require('../models/Authorization');

exports.createAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.create(req.body);
    console.log("201 - authorization created successfully");
    res.status(201).json(authorization);
  } catch (error) {
    console.log("400 - error creating authorization");
    res.status(400).json({ message: 'Error creating authorization', error });
  }
};

exports.getAuthorizations = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const authorizations = await Authorization.findAll({
        where: { user_id: userId }
      });
      console.log("200 - authorizations fetched successfully");
      res.status(200).json(authorizations);
    } catch (error) {
      console.log("400 - error fetching authorizations");
      res.status(400).json({ message: 'Error fetching authorizations', error });
    }
  };

exports.getAuthorizationById = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      console.log("404 - authorization not found");
      return res.status(404).json({ message: 'Authorization not found' });
    }
    console.log("200 - authorization fetched successfully");
    res.status(200).json(authorization);
  } catch (error) {
    console.log("400 - error fetching authorization");
    res.status(400).json({ message: 'Error fetching authorization', error });
  }
};

exports.updateAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      console.log("404 - authorization not found");
      return res.status(404).json({ message: 'Authorization not found' });
    }
    const updatedAuthorization = await authorization.update(req.body);
    console.log("200 - authorization updated successfully");
    res.status(200).json(updatedAuthorization);
  } catch (error) {
    console.log("400 - error updating authorization");
    res.status(400).json({ message: 'Error updating authorization', error });
  }
};

exports.deleteAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    await authorization.destroy();
    console.log("204 - authorization deleted successfully");
    res.status(204).json({});
  } catch (error) {
    console.log("400 - error deleting authorization");
    res.status(400).json({ message: 'Error deleting authorization', error });
  }
};

exports.getAllAuthorizations = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll();
    console.log("200 - authorizations fetched successfully");
    res.status(200).json(authorizations);
  } catch (error) {
    console.log("400 - error fetching authorizations");
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};

//get all ids of authorizations
exports.getAllAuthorizationIds = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll({
      attributes: ['id']
    });
    console.log("200 - authorizations fetched successfully");
    res.status(200).json(authorizations);
  } catch (error) {
    console.log("400 - error fetching authorizations");
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};
