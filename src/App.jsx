import React, { useContext } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  let { recognition, startSpeechRecognition, speaking,setSpeaking,prompt,setPrompt,response,setResponse} =
    useContext(dataContext);
  return (
    <div className="main">
      <img src={va} alt="logo" id="Shifra" />
      <span>I'm Jarvis Your Advanced Virtual Assistant</span>
      {!speaking ? 
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
    : 
        <div className="response">
         {!response? 
         <img src={speakimg} alt="" id="speak" /> 
           :
        <img src={aigif} alt="" id="aigif" />
         }
          <p>{prompt}</p>
        </div>
      }
    </div>
  )
}
export default App;
