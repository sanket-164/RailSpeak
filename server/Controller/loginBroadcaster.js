import crypto from "node:crypto";
import "dotenv/config";
import Broadcaster from "../Model/Broadcaster.js";
import Station from "../Model/Station.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const loginBroadcaster = async (req, res, next) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) throw createHttpError(400, "Please provide username and password");

        function createHashUtil(str) {
            return crypto
                .createHmac("sha256", process.env.HASHING_SECRET ?? "")
                .update(str)
                .digest("hex");
        }

        const hasValue = createHashUtil(password);

        const existBroadcaster = await Broadcaster.findOne({ username: username }).populate('stationID');

        if (!existBroadcaster || existBroadcaster.password != hasValue) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        
        const token = jwt.sign({ id: existBroadcaster._id, stationID: existBroadcaster.stationID._id }, process.env.JWT_SECRET);

        res.status(200).json({ token: token });
    } catch (error) {
        next(error);
    }
}