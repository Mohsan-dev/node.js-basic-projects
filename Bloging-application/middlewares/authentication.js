const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCokieValue = req.cookies[cookieName];

    if (!tokenCokieValue) {
      return next();
    }
    try {
      const userPaylord = validateToken(tokenCokieValue);
      req.user = userPaylord;
      console.log("Decoded user:", req.user);
    } catch (error) {}
    return next();
  };
}
module.exports = {
  checkForAuthenticationCookie,
};
