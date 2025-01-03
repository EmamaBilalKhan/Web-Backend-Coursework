const User = require('../Models/UsersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const checkUserSession = (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({loggedIn: true });
    } else {
        res.status(200).json({ loggedIn: false });
    }
};

const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
        try {
            const result = await bcrypt.compare(password, user.password);  
            console.log(result);
            if (result === true) {
                return user;
            } else {
                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    } else {
        return null;
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await authenticateUser(username, password);
        
        if (user) {
            req.session.user = { username: user.username, id: user._id };
            res.status(200).json({ message: "Login successful", user: req.session.user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({message:"Error logging out" });
        }
        res.status(200).json({message:"Logged out successfully" });
    });
};

const createUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const userCred = new User({
            username: req.body.username,
            password: hash,
        });
        const newUser = await userCred.save();
        res.status(201).json({ message: "User created", newUser });
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

module.exports = { getUsers,createUser, updateUser,deleteUser, checkUserSession, loginUser, logoutUser};