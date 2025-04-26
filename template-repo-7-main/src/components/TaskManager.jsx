import React, { useState, useEffect } from "react";
import Task from "./Task"; // Adjust the path if necessary

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [drawnPokemon, setDrawnPokemon] = useState([]); // List of drawn Pokémon
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds
    const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running
    const [inputMinutes, setInputMinutes] = useState(""); // Stores the user input for minutes

    const addTask = () => {
        if (taskInput.trim() !== "") {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput("");
        }
    };

    const toggleTaskCompletion = async (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        // If the task is being marked as completed, fetch a Pokémon
        if (!tasks[index].completed) {
            await fetchPokemon();
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 151) + 1; // Generate random number between 1 and 151
    };

    const fetchPokemon = async () => {
        setLoading(true);
        const randomId = generateRandomNumber();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            setDrawnPokemon((prev) => [...prev, data]); // Add the new Pokémon to the list
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        } finally {
            setLoading(false);
        }
    };

    const clearPokemon = () => {
        setDrawnPokemon([]); // Clear the drawn Pokémon list
    }; // Properly close the clearPokemon function

    // Timer logic
    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false); // Stop the timer when it reaches 0
        }
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        const seconds = parseInt(inputMinutes) * 60; // Convert minutes to seconds
        if (!isNaN(seconds) && seconds > 0) {
            setTimeLeft(seconds);
            setIsRunning(true);
        }
    };

    const resetTimer = () => {
        setTimeLeft(60); // Reset the timer to 0
        setIsRunning(false); // Stop the timer
        setInputMinutes(""); // Clear the input field
    };

    const pauseTimer = () => {
        setIsRunning((prev) => !prev); // Toggle the isRunning state
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="taskManagerContainer">
            {/* Task Manager Section */}
            <div className="taskManager">
                <div className="taskManagerTitle">
                    <h2>To Do List</h2>
                </div>
                <div className="taskManagerContent">
                    <div>
                        <input
                            type="text"
                            placeholder="Add a new task"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <button onClick={addTask}>Add Task</button>
                    </div>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <Task
                                    task={task}
                                    onComplete={() => toggleTaskCompletion(index)}
                                    onDelete={() => deleteTask(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Pokémon Section */}
            <div className="pokemonSection">
                <div className="pokemonTitle">
                    <h2>Pokémon Garden</h2>
                </div>
                <div className="pokemonContent">
                    {loading && <p>Loading...</p>}
                    <div className="pokemonList">
                        {drawnPokemon.map((pokemon, index) => (
                            <div key={index} className="pokemonCard">
                                <h3>{pokemon.name}</h3>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pokemonActions">
                    <style>{`button { margin: 5px; }`}</style>
                    <button onClick={clearPokemon}>Clear Pokémon</button>
                </div>
            </div>

            {/* Timer Section */}
            <div className="timerSection">
                <div className="timerTitle">
                    <h2>Countdown</h2><h2>Timer</h2>
                </div>
                <div className="timerContent">
                    {/* Preset Timer Buttons */}
                    <div style={{ marginBottom: "10px" }}>
                        <button onClick={() => { setTimeLeft(300); setIsRunning(true); }}>5 Minutes</button>
                        <button onClick={() => { setTimeLeft(600); setIsRunning(true); }}>10 Minutes</button>
                        <button onClick={() => { setTimeLeft(1200); setIsRunning(true); }}>20 Minutes</button>
                    </div>
                    {!isRunning && timeLeft > 0 && (
                        <div className="timerInput">
                            <input
                                type="number"
                                placeholder="Enter minutes"
                                value={inputMinutes}
                                onChange={(e) => setInputMinutes(e.target.value)}
                            />
                            <button onClick={startTimer}>Start</button>
                        </div>
                    )}
                    {timeLeft > 0 && <h3>Time Left: {formatTime(timeLeft)}</h3>}
                    {timeLeft > 0 && (
                        <button onClick={pauseTimer}>
                            {isRunning ? "Pause" : "Resume"}
                        </button>
                    )}
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>

        </div>
    );
}
export default TaskManager;