//@ts-nocheck

"use client";

import { useRef } from "react";

const Testing = () => {
  const recognition = useRef<SpeechRecognition | null>(null);
  const textOutputRef = useRef<HTMLParagraphElement>(null);

  const startSpeechRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      recognition.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.current.continue = true;
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (textOutputRef.current) {
          textOutputRef.current.textContent = transcript;
        }
      };
      recognition.current.start();
    } else {
      console.error("Speech recognition not supported in this browser");
    }
  };
  return (
    <div>
      <div>
        <h1>Speech to Text Example</h1>
        <button onClick={startSpeechRecognition}>
          Start Speech Recognition
        </button>
        <p>
          Recognized Text: <span ref={textOutputRef}></span>
        </p>
      </div>
    </div>
  );
};

export default Testing;
