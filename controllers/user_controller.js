import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No Users Found!" });
        }

        return res.status(200).json({ users });
    } catch (err) {
        console.error("Error while fetching users:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists! Login Instead" });
        }

        // Create a new user instance
        const hashedPassword = bcrypt.hashSync(password)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: [],
        });

        // Save the user to the database
        await user.save();

        return res.status(201).json({ user });
    } catch (err) {
        console.error("Error while signing up:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "Email & Password is NOT FOUND!" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect Password!"})
        }
        return res.status(200).json({message: "Login Successfully! 🙌"})
    } catch (err) {
        console.error("Error while login:", err);
        return res.status(500).json({ message: "Server Error" });
    }
}
