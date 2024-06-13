import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyUser = (req, res, next) => {
    try {

        console.log(req.header('authToken'));

        const user = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);

        if (!user.id || !user.stationID) {
            // if (!mongoose.Types.ObjectId.isValid(user.id))
            return res.status(404).json({ success: false, message: "Authentication failed" });
        }

        req.user = user;

        console.log(user)

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "AuthError: " + error.message });
    }
}

export default verifyUser;