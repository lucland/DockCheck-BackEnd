const Authorization = require('../models/Authorization');

exports.createAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.create(req.body);
    res.status(201).json(authorization);
  } catch (error) {
    res.status(400).json({ message: 'Error creating authorization', error });
  }
};

exports.getAuthorizations = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const authorizations = await Authorization.findAll({
        where: { user_id: userId }
      });
      res.status(200).json(authorizations);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching authorizations', error });
    }
  };

exports.getAuthorizationById = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    res.status(200).json(authorization);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching authorization', error });
  }
};

exports.updateAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    const updatedAuthorization = await authorization.update(req.body);
    res.status(200).json(updatedAuthorization);
  } catch (error) {
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
    res.status(204).json({});
  } catch (error) {
    res.status(400).json({ message: 'Error deleting authorization', error });
  }
};

exports.getAllAuthorizations = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll();
    res.status(200).json(authorizations);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};

//get all ids of authorizations
exports.getAllAuthorizationIds = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll({
      attributes: ['id']
    });
    res.status(200).json(authorizations);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};
