import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ fetchTasks, editTask, clearEditTask }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setStartDate(editTask.startDate.slice(0, 10));
      setEndDate(editTask.endDate.slice(0, 10));
      setCompleted(editTask.completed);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTask) {
      await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, {
        title,
        startDate,
        endDate,
        completed,
      });
      clearEditTask();
    } else {
      await axios.post('http://localhost:5000/api/tasks', {
        title,
        startDate,
        endDate,
      });
    }

    fetchTasks();
    setTitle('');
    setStartDate('');
    setEndDate('');
    setCompleted(false);
  };

  // Internal CSS styles
  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      maxWidth: '400px',
      margin: '0 auto 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      padding: '10px',
      margin: '5px 0',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
    },
    button: {
      padding: '10px 20px',
      marginTop: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        style={styles.input}
      />
      {editTask && (
        <div style={styles.checkboxContainer}>
          <label>
            Completed
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>
      )}
      <button
        type="submit"
        style={{
          ...styles.button,
          ':hover': styles.buttonHover,
        }}
      >
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
