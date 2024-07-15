//to do
//req.body
import User from "../model/user.js";

export function adminMiddleware(req, res, next) {
    const token = req.headers.cookie.split('token=')[1].split(';')[0];
    const { id, email } = token;

    if (!id || !email) {
        return res.json({
            success: false,
            message: "Missing id or email in cookie",
        });
    }

    const user = User.findOne({ _id: id, email });

    if (!user) {
        return res.json({
            success: false,
            message: "User not found",
        });
    }

    if (user.role !== "admin") {
        return res.json({
            success: false,
            message: "User is not admin",
        });
    }

    next();
}