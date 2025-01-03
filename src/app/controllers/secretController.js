const secretService = require('../services/secretService');

const createSecret = async (req, res) => {
  try {
    const { key, value, app } = req.body;
    const result = await secretService.createSecret(key, value, app);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSecret = async (req, res) => {
  try {
    const { app } = req.params;
    const { key } = req.body;
    const result = await secretService.getSecret(key, app);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getSecret, createSecret };
