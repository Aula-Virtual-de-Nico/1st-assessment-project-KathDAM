import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from './TaskList/TaskCard';
import SortAndFilter from './TaskList/SortAndFilter';
import Modal from './TaskList/Modal';

export default function TaskList({ tasks, deleteTask }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ showCompleted: true, showCanceled: true });
  const [sortKey, setSortKey] = useState('title');
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskList, setTaskList] = useState(tasks); // Copiar la lista de tareas para que se pueda manipular

  const handleEditClick = (task) => {
    navigate(`/edit-task/${task.id}`, { state: { task } });
  };

  const handleToggleDetails = (index) => {
    const newTaskList = [...taskList];
    newTaskList[index].showDetails = !newTaskList[index].showDetails; // Alternar la visibilidad de los detalles
    setTaskList(newTaskList);
  };

  const filteredTasks = taskList.filter((task) => {
    if (!filter.showCompleted && task.status === "Completed") return false;
    if (!filter.showCanceled && task.status === "Canceled") return false;
    return true;
  });

  const handleDelete = (index) => {
    setTaskToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      deleteTask(taskToDelete);
      setShowModal(false);
    }
  };

  const cancelDelete = () => setShowModal(false);

  const handleSort = (key) => {
    setSortKey(key);
    const sortedTasks = [...taskList].sort((a, b) => {
      const sortByFunctions = {
        title: a.title.localeCompare(b.title),
        status: a.status.localeCompare(b.status),
        deadline: a.deadline - b.deadline,
      };
      return sortByFunctions[key] || 0;
    });
    setTaskList(sortedTasks);
  };
  return (
    <div className="mt-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Task List</h1>
          <button className="btn btn-primary" onClick={() => navigate('/new-task')}>New Task</button>
        </div>
        <SortAndFilter filter={filter} setFilter={setFilter} sortKey={sortKey} setSortKey={setSortKey} handleSort={handleSort} />
        <div className="row">
          {filteredTasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onToggleDetails={() => handleToggleDetails(index)} // Llamada a la función que alterna la visibilidad
              onEdit={() => handleEditClick(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
        {showModal && (
          <Modal
            title="Confirm Delete"
            message="Are you sure you want to delete this task?"
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
}
