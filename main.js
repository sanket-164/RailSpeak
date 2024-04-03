import { ElevenLabsClient } from "elevenlabs";
import { promisify } from "util";
import fs from "fs";

const elevenlabs = new ElevenLabsClient({
  apiKey: "481f2622885539e2d08a1a368d8dc5e6" // Defaults to process.env.ELEVENLABS_API_KEY
});

// Promisify fs.writeFile for async/await syntax
const writeFileAsync = promisify(fs.writeFile);

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

(async () => {
  try {
    const audioStream = await elevenlabs.generate({
      voice: "Rachel",
    //   text: "HellHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello oHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello! 你好! Hola! नमस्ते! Bonjour! こんにちは! مرحبا! 안녕하세요! Ciao! Cześć! Привіт! வணக்கம்!",
    text:"એક વાર ખુલે એવો ફોટો નો મોકલો",  
    model_id: "eleven_multilingual_v2"
    });

    // Write the audio content to a file
    await saveAudioToFile(audioStream, "output.mp3");

    console.log("Audio saved to output.mp3 successfully.");
    await play(audio);
  } catch (error) {
    console.error("Error:", error);
  }
})();
