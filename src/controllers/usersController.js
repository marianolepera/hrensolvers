import User from "../models/users"


export const getUsers = async (req, res) => {
    try {
        
        const users = await User.find({});
        console.log(users)
        res.json(users);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if(!user) {
        res.json({mensaje : 'Ese usuario no existe'});
        return next();
    }

    // Mostrar el producto
    res.json(user);
}