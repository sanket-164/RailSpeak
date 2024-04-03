import mongoose from "mongoose";

const PresetsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    }],
    original_text: {
        type: String,
        required: true
    },
    audio_url: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Presets', PresetsSchema, "Presets")