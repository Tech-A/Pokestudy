import { useState, useRef, useEffect } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import titleImage from "./title.png";
import lightModeIcon from "./light-mode-icon.png"; // Path to the light mode icon
import darkModeIcon from "./dark-mode-icon.png"; // Path to the dark mode icon


function App() {
  const [currentPage, setCurrentPage] = useState("TaskManager"); // Default page is TaskManager
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark/light mode
  const [sentences, setSentences] = useState([]); // Initialize an empty list
  const [input, setInput] = useState(""); // State for the input field
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Ref to access the audio element

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Update the body class based on dark mode state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleAudio = () => {
    console.log("audioRef.current:", audioRef.current);
    console.log("isPlaying:", isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
      audioRef.current.play(); // Play the audio
      setIsPlaying(true); // Ensure the state reflects that the audio is playing
    }
  };


  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // List of affirmations
  const affirmations = [
    "You’re leveling up every day.",
    "You don’t need to be perfect, just persistent.",
    "You’ve faced hard battles before and won.",
    "Rest is part of the strategy not a weakness.",
    "You focus like a champion in the final round.",
    "You’re on your way to becoming something legendary.",
    "You’re evolving and that’s real power."
  ];

  // Randomly select an affirmation
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <>
      <img src={titleImage} alt="Title" className="titleImage" />
      <h2>{formattedDate}</h2> {/* Display the dynamic date */}
      {/* Display daily affirmation */}
      <p className="affirmation">{randomAffirmation}</p>
      <button onClick={toggleDarkMode} className="mode-toggle-button">
        <img src={isDarkMode ? darkModeIcon : lightModeIcon} alt="Toggle Dark Mode" />
      </button>
      {/* Custom Play Button */}
      <div className="audiobutton">
        <button onClick={toggleAudio} style={{ padding: "10px 20px", fontSize: "16px" }}>
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
        <button onClick={restartAudio} style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}>
          Restart Music
        </button>
      </div>
      {/* Task Manager Section */}
      {/* Add the audio player */}
      <audio ref={audioRef} loop>
        <source src="/assets/Pokemon Sun & Moon OST Hau'oli City (Day) Music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>


      {currentPage === "TaskManager" && <TaskManager />}

    </>
  );


}


export default App;