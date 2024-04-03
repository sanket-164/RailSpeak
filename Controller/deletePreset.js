import createHttpError from "http-errors";
import Language from "../Model/Language.js";
import Presets from "../Model/Presets.js"

export const deletePreset = async (req, res, next) => {

    try{
        const id = req.body.id;

        if(!id) throw createHttpError(400, "Please provide a valid preset id");

        const presetToDelete = await Presets.findById(id);
        
        console.log(presetToDelete)
        if(!presetToDelete) throw createHttpError(400, "Preset not found");

        await Language.deleteMany({ _id: { $in: presetToDelete.languages } });
        
        await presetToDelete.deleteOne();

        res.status(200).json({ message: "Preset deleted successfully" });
    } catch (error) {
        next(error);
    }
}