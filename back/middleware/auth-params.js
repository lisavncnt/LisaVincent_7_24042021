const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
    console.log(req.params);
    next();
  } catch (error) {
    console.log(error);
    res.status(418).json({ error: 'Requête non authentifiée !'});
  }
};