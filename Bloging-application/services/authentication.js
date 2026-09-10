const JWT = require("jsonwebtoken");
const secret = "$^9*%]{n%h";

function createTokenFromUser(user) {
  const payload = {
    _id: user._id,
    fullName:user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const paylord = JWT.verify(token, secret);
  return paylord;
}
module.exports = {
  createTokenFromUser,
  validateToken,
};
