const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
    
    if (req.params.id && req.params.id !== userId) {
      throw 'User ID non valable !';//Renvoie une erreur si l'id décodé de la requête ne correspond pas l'id de l'utilisateur
    } else {
      next();//Sinon, l'authentification est réussie et la suite du code peut s'exécuter
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !'});
  }
};





// const jwt = require('jsonwebtoken');

// exports.verify = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     console.log(token);
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     console.log(decodedToken);
//     const userId = decodedToken.userId;
//     console.log(userId);
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
// };

// exports.verify = function(req, res, next){
//     let accessToken= req.cookies.jwt;

//     if(!accessToken) {
//         res.status(403).send();
//     };

//     let payload
//     try {
//         payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//         next();
//     } catch(e) {
//         return res.status(401).json({e});
//     }
// };