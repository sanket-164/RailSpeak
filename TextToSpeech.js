import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.TEXT_TO_SPEECH_KEY // Defaults to process.env.ELEVENLABS_API_KEY
});

async function saveAudioToFile(audioStream, filePath) {
    return new Promise((resolve, reject) => {
        const writableStream = fs.createWriteStream(filePath);
        audioStream.pipe(writableStream);

        writableStream.on("finish", () => {
            resolve();
        });

        writableStream.on("error", (error) => {
            reject(error);
        });
    });
}

export const textToSpeech = async (req, res, next, text) => {
    try {

        const audioStream = await elevenlabs.generate({
            voice: "Rachel",
            text: text,
            model_id: "eleven_multilingual_v2"
        });

        // const filePath = `/uploads/${Date.now()}.mp3`;

        const folderPath = path.join(parentDir, 'uploads');
        const filePath = path.join(folderPath, `${Date.now()}.mp3`);

        // Write the audio content to a file
        await saveAudioToFile(audioStream, filePath);

        console.log("Audio saved successfully.");

        return filePath;
    } catch (error) {
        next(error);
    }
}