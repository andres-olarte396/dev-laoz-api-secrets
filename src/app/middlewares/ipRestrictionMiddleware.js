const allowedIps = process.env.ALLOWED_IPS.split(',');

module.exports = (req, res, next) => {
  const clientIp = req.ip;
  if (!allowedIps.includes(clientIp)) {
    let message = 'Acceso no autorizado desde esta IP';
    return res.status(403).json({ message });
  }
  next();
};
