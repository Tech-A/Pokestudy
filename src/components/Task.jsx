import React from "react";
import "../App.css";

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <div className="task-container">
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <div className="task-actions">
        <button
          onClick={onComplete}
          disabled={task.completed}
          style={{
            backgroundColor: task.completed ? "#2e7d32" : "#4caf50", // Darker green when completed
            color: "white",
          }}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task; 
