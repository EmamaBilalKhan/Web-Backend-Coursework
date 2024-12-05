const User = require('../Models/UsersModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    const userCred = new User({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const newUser = await userCred.save();
        res.status(201).json({message: "User created", newUser});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.body.username !== undefined) {
            user.username = req.body.username;
        }
        if (req.body.password !== undefined) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({message: "User Updated" , updatedUser});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getUsers, createUser, updateUser, deleteUser };