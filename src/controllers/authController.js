import User from "../models/users"
import config from "../config";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        // Getting the Request Body
        const {email, password } = req.body;
        // Creating a new User Object
        const newUser = new User({
          email,
          password: await User.encryptPassword(password),
        });
    
        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();
    
        // Create a token
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
        // Request body email can be an email or username
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
          expiresIn: 86400, // 24 hours
        });
    
        res.json({ token:token,payload:userFound });
      } catch (error) {
        console.log(error);
      }

}