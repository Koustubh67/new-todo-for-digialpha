import React, { useState } from "react";
import "./App.css"; // Optional: For styling

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  // Regex for input validation (no special characters)
  const validateInput = (text) => /^[a-zA-Z0-9\s]*$/.test(text);

  const handleAddOrUpdate = () => {
    if (!validateInput(input)) {
      setError("Special Characters are not allowed");
      return;
    }
    setError(""); // Clear error if validation passes

    if (isEditing) {
      // Update task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput(""); // Clear input field
  };

  const handleDelete = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <h1>TODO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>{isEditing ? "Update" : "Add"}</button>
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={task.completed ? "completed" : ""}>
              <td>{task.text}</td>
              <td>
                <button onClick={() => handleComplete(index)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
