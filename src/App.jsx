import React, { useContext, useEffect } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  let {
    recognition,
    startSpeechRecognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useContext(dataContext);

  // One-time user interaction enabler
  useEffect(() => {
    const allowVoice = () => {
      const test = new SpeechSynthesisUtterance("Voice enabled");
      window.speechSynthesis.speak(test);
      document.removeEventListener("click", allowVoice);
    };
    document.addEventListener("click", allowVoice);
  }, []);

  // Function to trigger voice output
  const speak = (text) => {
    if (!text || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Speak whenever response is shown
  useEffect(() => {
    if (response && prompt) {
      speak(prompt);
    }
  }, [response, prompt]);

  return (
    <div className="main">
      <img src={va} alt="logo" id="Shifra" />
      <span>I'm Jarvis Your Advanced Virtual Assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("Listening...");
            setSpeaking(true);
            setResponse(false);

            if (recognition) {
              startSpeechRecognition();
            } else {
              alert("Speech recognition is not supported in your browser");
            }
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakimg} alt="" id="speak" />
          ) : (
            <img src={aigif} alt="" id="aigif" />
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
