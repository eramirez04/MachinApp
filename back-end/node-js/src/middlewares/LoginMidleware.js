import Jwt from "jsonwebtoken";

const secret = "my_key_secret"

export const verificar = (req, res, next) => {
  const heade = req.header("Authorization") || ""
  const token = heade.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Tu conexión ha expirado. Vuelve a hacer login." });
  }
  try {
    const paylod = Jwt.verify(token, secret)
    req.user = paylod.user
    next()

  } catch (error) {
    return res.status(403).json({ message: "Token no valido" });
  }
}