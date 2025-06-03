import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";   
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    // Logic for user signup
    const { fullname, email, password } = req.body;
    // Validate input data
try {
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }   

   if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({

        fullname,
        email,
        password: hashedPassword,
        
    });

    if(newUser) {
        // generate a token or session for the user
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            
        });

    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }

} catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
}
};

export const login = (req, res) => {
    // Logic for user login
    res.send("login route");
};

export const logout = (req, res) => {
    // Logic for user logout
    res.send("logout route");
};