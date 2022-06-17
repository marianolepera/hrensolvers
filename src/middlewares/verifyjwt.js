import User from "../models/users";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "El email ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export { checkDuplicateUsernameOrEmail};