import mongoose from "mongoose";

const LanguageSchema = mongoose.Schema({
    language:{
        type: String,
        required: true
    },
    translated:{
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Language', LanguageSchema, 'Language')