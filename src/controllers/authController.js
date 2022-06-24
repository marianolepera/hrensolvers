import User from "../models/users"
import config from "../config";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const {email, password } = req.body;
        const newUser = new User({
          email,
          password: await User.encryptPassword(password),
        });
    
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
          expiresIn: 86400, // 24 hours
        });
    
        return res.status(200).json({ token:token,payload:newUser });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}

export const signIn = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email })
    
        if (!userFound) return res.status(400).json({ message: "Usuario No encontrado" });
    
        const matchPassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );
    
        if (!matchPassword)
          return res.status(401).json({
            token: null,
            message: "Contraseña invalida",
          });
    
        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
          expiresIn: 86400, // 24 horas
        });
    
        res.json({ token:token,payload:userFound });
      } catch (error) {
        console.log(error);
      }

}