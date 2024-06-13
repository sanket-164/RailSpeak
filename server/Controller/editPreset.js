import createHttpError from "http-errors";
import Presets from "../Model/Presets.js"

export const editPreset = async (req, res, next) => {

    try {
        const {id, newtitle } = req.body;
    
        if (!newtitle || !id) {
            throw createHttpError(400, "Please provide both the current title and the id ");
        }
    
        const presetToUpdate = await Presets.findById(id);
    
        if (!presetToUpdate) {
            throw createHttpError(404, "Preset not found");
        }
    
        presetToUpdate.title = newtitle;
    
        await presetToUpdate.save();
    
        res.status(200).json({ message: "Preset title updated successfully" });
    } catch (error) {
        next(error);
    }
    
}