import mongoose from "mongoose";

const StationSchema = mongoose.Schema({
    stationName:{
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Station', StationSchema, 'Station')