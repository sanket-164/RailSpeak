// import { ElevenLabsClient } from "elevenlabs";
// import fs from "fs";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const parentDir = path.resolve(__dirname, '..');

// const elevenlabs = new ElevenLabsClient({
//     apiKey: process.env.TEXT_TO_SPEECH_KEY // Defaults to process.env.ELEVENLABS_API_KEY
// });

// async function saveAudioToFile(audioStream, filePath) {
//     return new Promise((resolve, reject) => {
//         const writableStream = fs.createWriteStream(filePath);
//         audioStream.pipe(writableStream);

//         writableStream.on("finish", () => {
//             resolve();
//         });

//         writableStream.on("error", (error) => {
//             reject(error);
//         });
//     });
// }

// export const textToSpeech = async (req, res, next, text) => {
//     try {

//         const audioStream = await elevenlabs.generate({
//             voice: "Rachel",
//             text: text,
//             model_id: "eleven_multilingual_v2"
//         });

//         // const filePath = `/uploads/${Date.now()}.mp3`;

//         const folderPath = path.join(parentDir, 'uploads');
//         const filePath = path.join(folderPath, `${Date.now()}.mp3`);

//         // Write the audio content to a file
//         await saveAudioToFile(audioStream, filePath);

//         console.log("Audio saved successfully.");

//         return filePath;
//     } catch (error) {
//         next(error);
//     }
// }

// const body = {
//     "model_id": "eleven_multilingual_v2",
//     "text": "Hello how are you?",
//     "voice_settings": {
//         "similarity_boost": 0.5,
//         "stability": 0.5,
//         "style": 0.5,
//         "use_speaker_boost": true
//     }
// }

// const options = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body)
// };

// fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

const options = {
    method: 'POST',
    headers: { 'xi-api-key': 'a870307a428a48643acd4e3461985140', 'Content-Type': 'application/json' },
    body: '{"voice_settings":{"similarity_boost":0.5,"stability":0.5,"style":1},"text":"Hello How are you"}'
};

fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));