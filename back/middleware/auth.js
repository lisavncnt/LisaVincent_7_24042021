const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

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