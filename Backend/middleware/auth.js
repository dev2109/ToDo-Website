const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'a4bc7803662b73284ecd42a4c48de6704dbf5ea2930ec52467022aef3f02a407215c259ca92d111d30a7c0e521688f8286d65dd22ef62b9a1bcba39db1c668ba');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
