
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

const register = async(req, res) => {
    try {
        const { username, email, password} = req.body;

         if(!username || !email || !password){
            return res.status(400).json({message: "Username, email, and password are required"});
        }


        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({username,email,password:hashedPassword});      
        await newUser.save();
        res.status(201).json({ message: `User ${username} has been registered successfully` });
    } catch (error) {
        console.error("Error registering user:", error);

       // 11000 is an error code for duplicated keys in the database, indicating that the username or email already exists.
        if (error.code === 11000) {
            return res.status(409).json({ message: "Username or email already exists" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async(req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "Username and password are required"});
        }

        const user = await User.findOne({username:username}).select("+password");
        if(!user){
            return res.status(401).json({message: `Invalid username or password`});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid username or password"});
        }
        const token = jwt.sign(
            {id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "1h"}
        );
        res.status(200).json({message: `User ${username} logged in successfully`, token});

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login };