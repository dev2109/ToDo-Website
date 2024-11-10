import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const clearEditTask = () => {
    setEditTask(null);
  };

  // Internal CSS styles
  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      backgroundImage: 'url(https://images.pexels.com/photos/10088308/pexels-photo-10088308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', // Replace with your image URL
      backgroundPosition: 'center', // Ensure it stays centered
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', // Allow for scrolling content
    },
    content: {
      position: 'relative',
      zIndex: 1,
      paddingBottom: '50px', // Adjust this to avoid cutting off content at the bottom
    },
    heading: {
      color: 'white',
      fontSize: '2em',
    },
    searchInput: {
      padding: '10px',
      width: '80%',
      maxWidth: '400px',
      marginBottom: '20px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>To-Do List</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <TaskForm fetchTasks={fetchTasks} editTask={editTask} clearEditTask={clearEditTask} />
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          onEdit={handleEdit}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default App;
