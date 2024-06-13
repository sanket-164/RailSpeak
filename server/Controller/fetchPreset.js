import createHttpError from "http-errors";
import Presets from "../Model/Presets.js"

export const fetchPreset = async (req, res, next) => {

    try {
        console.log(req.user.stationID)
        
        const presets = await Presets.find({ station_id: req.user.stationID }).populate('languages');

        if (!presets) throw createHttpError(400, "Preset not found");

        res.status(200).json({ presets: presets });
    } catch (error) {
        next(error);
    }
}