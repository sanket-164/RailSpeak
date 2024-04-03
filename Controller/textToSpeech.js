import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";

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
      model_id: "eleven_multilingual_v2",
      speed: 0.5
    });

    const filePath = `/uploads/${Date.now()}.mp3`;

    // Write the audio content to a file
    await saveAudioToFile(audioStream,"." + filePath);

    console.log("Audio saved successfully.");

    return filePath;
  } catch (error) {
    next(error);
  }
}