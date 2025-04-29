import React, { createContext, useState } from "react";
import run from "../gemini.js";
export const dataContext = createContext();
function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-GB";
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
    let text = await run(prompt);
    let newText = text.split("**")&&text.split("*")&&text.replace("google","Darpan")&&text.replace("Google","Darpan");
    setPrompt(newText);
   speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 7000)
    }
  
  // Initialize with null first
  let recognition = null;
  
  // Check if speech recognition is supported
  if (typeof window !== 'undefined') {
    try {
      let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (speechRecognition) {
        recognition = new speechRecognition();
        recognition.onresult = (e) => {
          let transcript = e.results[0][0].transcript;
          setPrompt(transcript);
      takeCommand(transcript.toLowerCase());
        };
        // Add error handler
        recognition.onerror = (e) => {
          console.log("Speech recognition error:", e.error);
        };
      }
    } catch (error) {
      console.log("Speech recognition not supported");
    }
  }
  
  // Helper function to safely start recognition
  const startSpeechRecognition = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.log("Could not start recognition:", error);
        // Try to restart if already started
        try {
          recognition.stop();
          setTimeout(() => recognition.start(), 100);
        } catch (e) {
          console.log("Failed to restart recognition");
        }
      }
    } else {
      alert("Speech recognition is not supported in your browser");
    }
  }
  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      try {
        const newWindow = window.open("https://www.youtube.com/", "_blank");
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Popup was blocked
          setPrompt("YouTube couldn't be opened. Please allow popups for this site.");
          speak("YouTube couldn't be opened. Please allow popups for this site.");
        } else {
          setPrompt("Opening Youtube");
          speak("Opening Youtube..");
        }
      } catch (error) {
        console.error("Error opening YouTube:", error);
        setPrompt("There was an error opening YouTube");
        speak("There was an error opening YouTube");
      }
      setTimeout(()=>{
        setSpeaking(false);
      },5000)
    } else{
    aiResponse(command);  
    }
}
  let value = {
    recognition,
    startSpeechRecognition,
    speaking,
    setSpeaking,
    setPrompt,
    prompt,
    response,
    setResponse,
  };
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
