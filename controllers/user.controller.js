import User from "../models/user.model.js";

// Fetch all users (should be admin-only at route level)
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// Fetch a single user safely (IDOR-protected, error-free)
export const getUser = async (req, res, next) => {
    try {
        // Ensure user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Prevent IDOR: user can only access their own record
        if (req.user._id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
