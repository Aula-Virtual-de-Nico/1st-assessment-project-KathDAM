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
    const combinedTasks = [...defaultTasks, ...storedTasks];

    // Elimina duplicados (basado en id) si las tareas predeterminadas ya existen
    const uniqueTasks = Array.from(new Map(combinedTasks.map(task => [task.id, task])).values());

    setTasks(uniqueTasks);
  }, []);

  // Guardar las tareas en localStorage cada vez que cambie el estado
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
  };

  const handleStatusChange = (index) => {
    const newTasks = [...tasks];
    const currentStatus = newTasks[index].status;
    const statuses = ["Pending", "In Progress", "Completed", "Canceled"];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    newTasks[index].status = nextStatus;
    setTasks(newTasks);
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
