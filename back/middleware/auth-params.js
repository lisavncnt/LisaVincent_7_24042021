const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
    console.log(req.body)

    if (req.params.id && req.params.id !== userId) {
      throw 'User ID non valable !';//Renvoie une erreur si l'id décodé de la requête ne correspond pas l'id de l'utilisateur
    } else {
      next();//Sinon, l'authentification est réussie et la suite du code peut s'exécuter
    }
  } catch (error) {
    console.log(error);
    res.status(418).json({ error: 'Requête non authentifiée !'});
  }
};

//authentification pour l'utilisateur