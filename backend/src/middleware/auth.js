import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ");
    // console.log(authHeader);
    // console.log(token)
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default auth;
