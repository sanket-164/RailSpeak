import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";

const elevenlabs = new ElevenLabsClient({
  apiKey: "481f2622885539e2d08a1a368d8dc5e6" // Defaults to process.env.ELEVENLABS_API_KEY
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
      voice: "man medium",
      text: text,
      model_id: "eleven_multilingual_v2",
      speed: 0.5
    });

    const filePath = `/Audio/${Date.now()}.mp3`;

    // Write the audio content to a file
    await saveAudioToFile(audioStream,"." + filePath);

    console.log("Audio saved successfully.");

    return filePath;
  } catch (error) {
    next(error);
  }
}