import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreManager from '../../../main/StoreManager'; // Assuming StoreManager is exported here

// Create an instance of StoreManager
const storeManager = new StoreManager();

export default function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ showCompleted: true, showCanceled: true });
  const [sortKey, setSortKey] = useState("title");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch tasks from the store when the component mounts
  useEffect(() => {
    const tasksFromStore = storeManager.getList(); // Get tasks from Store
    setTasks(tasksFromStore);
  }, []);

  const handleDelete = (index) => {
    setTaskToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      const taskToDeleteObj = tasks[taskToDelete];
      storeManager.deleteItem(taskToDeleteObj); // Delete task from Store
      const newList = tasks.filter((_, i) => i !== taskToDelete);
      setTasks(newList);
      setShowModal(false);  
    }
  };

  const cancelDelete = () => {
    setShowModal(false); 
  };

  const handleStatusChange = (index) => {
    const newList = [...tasks];
    const currentStatus = newList[index].status;
    const statuses = ["Pending", "In Progress", "Completed", "Canceled"];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    newList[index].status = nextStatus;
    storeManager.updateItem(newList[index]); // Update task status in Store
    setTasks(newList);
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sortedTasks = [...tasks].sort((a, b) => {
      const sortByFunctions = {
        deadline: () => {
          return a.deadline - b.deadline; // Ordenación ascendente por fecha
        },
        title: () => a.title.localeCompare(b.title), // Ordenación alfabética por título
        status: () => a.status.localeCompare(b.status), // Ordenación alfabética por estado
      };
  
      return sortByFunctions[key] ? sortByFunctions[key]() : 0;
    });
  
    setTasks(sortedTasks);
  };

  const handleToggleDetails = (index) => {
    const newTasks = [...tasks];
    newTasks[index].showDetails = !newTasks[index].showDetails;
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (!filter.showCompleted && task.status === "Completed") return false;
    if (!filter.showCanceled && task.status === "Canceled") return false;
    return true;
  });

  // Navegar a "New Task"
  const navigateToNewTask = () => {
    navigate('/new-task');
  };

  // Navegar a "Edit Task" pasando el id
  const navigateToEditTask = (index) => {
    navigate(`/edit-task/${index}`);
  };

  return (
    <div className="mt-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Task List</h1>
          <button className="btn btn-primary" id="new-task-btn" onClick={navigateToNewTask}>New Task</button>
        </div>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between">
            <div>
              <label htmlFor="sort-options" className="form-label me-2">Sort by:</label>
              <select id="sort-options" className="form-select w-auto" onChange={(e) => handleSort(e.target.value)} value={sortKey}>
                <option value="title">Title</option>
                <option value="status">Status</option>
                <option value="deadline">Date</option>
              </select>
            </div>

            <div>
              <label className="form-check-label me-1">Show/Hide:</label>
              <input type="checkbox" className="form-check-input me-1" id="show-completed" checked={filter.showCompleted} onChange={(e) => setFilter({ ...filter, showCompleted: e.target.checked })} />
              <label htmlFor="show-completed" className="form-check-label me-3">Completed</label>

              <input type="checkbox" className="form-check-input me-1" id="show-canceled" checked={filter.showCanceled} onChange={(e) => setFilter({ ...filter, showCanceled: e.target.checked })} />
              <label htmlFor="show-canceled" className="form-check-label">Canceled</label>
            </div>
          </div>
        </div>

        <div className="row" id="task-cards-container">
          {filteredTasks.map((task, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <i className="bi bi-calendar-date">Deadline: {task.deadline.toLocaleDateString()}</i>
                  {task.showDetails && <p className="card-text">{task.description}</p>}
                  <div className="btn-group">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange(index)}> {task.status} </button>
                    <div>
                      <button className="btn btn-primary btn-sm" onClick={() => navigateToEditTask(index)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  </div>
                </div>
                <button className="btn btn-violet btn-sm" onClick={() => handleToggleDetails(index)}>
                  {task.showDetails ? 'Hide Details' : 'Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Confirm Delete</h4>
                  <button type="button" className="btn-close" onClick={cancelDelete} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this task?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={cancelDelete}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
