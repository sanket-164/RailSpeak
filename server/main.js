import { ElevenLabsClient } from "elevenlabs";
import { promisify } from "util";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs";


const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API

const elevenlabs = new ElevenLabsClient({
  apiKey: "a870307a428a48643acd4e3461985140" // Defaults to process.env.ELEVENLABS_API_KEY
});

// Promisify fs.writeFile for async/await syntax
const writeFileAsync = promisify(fs.writeFile);

async function saveAudioToFile(audioStream, filePath) {
  return new Promise((resolve, reject) => {
    const writableStream = fs.createWriteStream(filePath);
    audioStream.pipe(writableStream);
    
    uploadBytes(storageRef, writableStream).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

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
      text: "એક વાર ખુલે એવો ફોટો નો મોકલો",
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
