import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/users";

export const verifyToken = async (req, res, next) => {
   
    try {
      let token = req.headers.authorization.split(" ")[1];
  
      if (!token) return res.status(403).json({ message: "No hay token provisto" });

     
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;
  
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  
      next();
    } catch (error) {
      
      return res.status(401).json({ message: "no tiene acceso!" });
    }
  };