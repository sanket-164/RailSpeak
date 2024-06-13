import mongoose from "mongoose";

const BroadcasterSchema = mongoose.Schema({
    stationID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Broadcaster', BroadcasterSchema, 'BroadCaster')