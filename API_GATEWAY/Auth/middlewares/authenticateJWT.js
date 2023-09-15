import jwt  from "jsonwebtoken";
const secretKey = "vishv123";

const authenticateJWT = (req, res, next) => {
  const token = req.header("authorization"); 
  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed. No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Invalid token." });
    }

    req.user = decoded.user; // Attach the decoded user data to the request
    next();
  });
};

export default authenticateJWT;
