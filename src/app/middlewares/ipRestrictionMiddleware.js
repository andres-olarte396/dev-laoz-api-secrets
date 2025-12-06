const ipRangeCheck = require('ip-range-check');
const allowedIps = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];

module.exports = (req, res, next) => {
  // Manejo de IPs tras proxies (Docker/Nginx)
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // Normalizar IP (quitar ::ffff:)
  const ip = clientIp.replace(/^.*:/, '');

  console.log(`Verificando acceso IP: ${ip}`);

  if (ipRangeCheck(ip, allowedIps)) {
    return next();
  }

  // Backwards compatibility para localhost exacto si falla rango
  if (allowedIps.includes(ip) || ip === '127.0.0.1') {
    return next();
  }

  console.warn(`Acceso denegado a IP: ${ip}`);
  let message = 'Acceso no autorizado desde esta IP';
  return res.status(403).json({ message });
};

