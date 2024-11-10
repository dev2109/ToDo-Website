import React from 'react';
import axios from 'axios';

function TaskList({ tasks, fetchTasks, onEdit, searchTerm }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks(); // Re-fetch tasks after deletion
  };

  const handleCompleteToggle = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed, // Toggle the completed status
    };
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
    fetchTasks(); // Re-fetch tasks after updating completion status
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const filteredTasks = tasks.filter((task) => {
    const hasValidStartDate = task.startDate && task.startDate.slice(0, 10) >= currentDate;
    const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm && hasValidStartDate;
  });

  // Sort tasks by due date (endDate)
  const sortByDueDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate)); // Sort in ascending order (earliest first)
  };

  const activeTasks = sortByDueDate(filteredTasks.filter((task) => !task.completed));
  const completedTasks = sortByDueDate(filteredTasks.filter((task) => task.completed));

  // Internal CSS styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    taskList: {
      listStyleType: 'none',
      padding: 0,
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontWeight: 'bold',
    },
    button: {
      marginLeft: '10px',
      padding: '5px 10px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    sectionHeading: {
      color: 'white', // Change text color to white for both Active and Completed Tasks
      fontSize: '1.5em',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionHeading}>Active Tasks</h2>
      <ul style={styles.taskList}>
        {activeTasks.map((task) => (
          <li key={task._id} style={styles.taskItem}>
            <span style={styles.title}>
              {task.title} (Start: {task.startDate.slice(0, 10)}, End: {task.endDate.slice(0, 10)})
            </span>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteToggle(task)} // Toggle completed status
              />
              <button style={{ ...styles.button, ...styles.editButton }} onClick={() => onEdit(task)}>Edit</button>
              <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2 style={styles.sectionHeading}>Completed Tasks</h2>
      <ul style={styles.taskList}>
        {completedTasks.map((task) => (
          <li key={task._id} style={styles.taskItem}>
            <span style={styles.title}>
              {task.title} (Start: {task.startDate.slice(0, 10)}, End: {task.endDate.slice(0, 10)})
            </span>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteToggle(task)} // Toggle completed status
              />
              <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
