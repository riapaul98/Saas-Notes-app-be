import jwt from "jsonwebtoken";

export const middlewareAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token found" });
  }
  const jwtToken = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(verified);
    req.userId = verified.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
