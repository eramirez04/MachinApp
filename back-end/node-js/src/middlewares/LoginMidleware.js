import Jwt from "jsonwebtoken";



export const verificar = (req, res, next) => {
  const token = req.headers["token"]

  if (!token) {
    return res.status(401).json({ message: "Tu conexión ha expirado. Vuelve a hacer login." });
  }
  try {
    const paylod = Jwt.verify(token, process.env.AUTH_SECRET)
    req.user = paylod.user
    next()

  } catch (error) {
    return res.status(403).json({ message: "Token no valido" });
  }
}