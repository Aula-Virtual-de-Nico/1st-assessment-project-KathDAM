import React, { useState, useEffect } from 'react';
import "../../../styles/style.css";
import { HashRouter, Route, Routes } from 'react-router-dom';

import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import EditingTask from "./components/EditingTask";

export default function App() {
  const defaultTasks = [
    { id: 1, title: "Comprar", deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), description: "Tomate, Lechuga, Queso, Leche", status: "Pending", showDetails: false },
    { id: 2, title: "Viajes", deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), description: "Francia,Marruecos,Italia", status: "Completed", showDetails: false },
    { id: 3, title: "Renovar papeles", deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), description: "Dni, pasaporte, europass", status: "Pending", showDetails: false },
  ];

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ showCompleted: true, showCanceled: true });
  const [sortKey, setSortKey] = useState('title');
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Cargar las tareas desde localStorage al montar el componente
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Combina las tareas predeterminadas con las tareas de localStorage, asegurando que no haya duplicados
    const combinedTasks = [...storedTasks, ...defaultTasks].filter((value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
    );

    setTasks(combinedTasks);
  }, []);

  // Guardar las tareas en localStorage cada vez que cambie el estado
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task }; 
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Guardar tareas en localStorage
  };
  
  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Guardar tareas actualizadas
};


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify(tasks.filter(task => task.id !== id))); // Guardar tareas actualizadas en localStorage
  };

  const handleSort = (key) => setSortKey(key);
  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };
  const cancelDelete = () => setShowModal(false);
  const confirmDelete = () => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(newTasks);
    setShowModal(false);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Guardar tareas actualizadas en localStorage
  };

  const handleStatusChange = (index) => {
    const newTasks = [...tasks];
    const currentStatus = newTasks[index].status;
    const statuses = ["Pending", "In Progress", "Completed", "Canceled"];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    newTasks[index].status = nextStatus;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Guardar tareas actualizadas en localStorage
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <TaskList 
            tasks={tasks} 
            deleteTask={deleteTask} 
            filter={filter} 
            setFilter={setFilter} 
            sortKey={sortKey} 
            handleSort={handleSort} 
            handleDelete={handleDelete} 
            handleStatusChange={handleStatusChange} 
            showModal={showModal} 
            cancelDelete={cancelDelete} 
            confirmDelete={confirmDelete}
          />
        } />
        <Route path="/new-task" element={<NewTask addTask={addTask} />} />
        <Route path="/edit-task/:id" element={<EditingTask tasks={tasks} updateTask={updateTask} />} />
      </Routes>
    </HashRouter>
  );
}
