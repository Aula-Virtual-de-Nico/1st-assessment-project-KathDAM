import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditingTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const taskFromState = location.state?.task;

  const [taskTitle, setTaskTitle] = useState(taskFromState?.title || '');
  const [taskDescription, setTaskDescription] = useState(taskFromState?.description || '');
  const [taskStatus, setTaskStatus] = useState(taskFromState?.status || '');
  //Cambia Objeto a String para que muestre la fecha
  const [taskDeadline, setTaskDeadline] = useState(taskFromState?.deadline instanceof Date ? taskFromState.deadline.toISOString().split('T')[0]: taskFromState?.deadline || 'yyyy-mm-dd');
  const [isDirty, setIsDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const initialTask = taskFromState;
    if (
      taskTitle !== initialTask?.title ||
      taskDescription !== initialTask?.description ||
      taskStatus !== initialTask?.status ||
      taskDeadline !== initialTask?.deadline
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [taskTitle, taskDescription, taskStatus, taskDeadline, taskFromState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      deadline: taskDeadline,
    };
    navigate('/', { state: { updatedTask } });
  };

  const handleBack = () => {
    if (isDirty) {
      setShowModal(true);
    } else {
      navigate('/');
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log();
    setShowDeleteModal(false);
    navigate('/');
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const confirmDiscard = () => {
    setShowModal(false);
    navigate('/');
  };

  const confirmSave = () => {
    setShowModal(false);
    handleSubmit(new Event('submit'));
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Editing {taskTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="task-title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="task-description" className="form-label">Description:</label>
          <textarea className="form-control" id="task-description"rows="3" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}required/>
        </div>
        <div className="mb-3">
          <label htmlFor="task-status" className="form-label">Status:</label>
          <select id="task-status" className="form-select" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="task-deadline" className="form-label">Deadline:</label>
          <input type="date" className="form-control" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-danger" onClick={handleDelete}> Delete </button>
          <button type="submit" className="btn btn-primary" disabled={!isDirty}> Save </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}> Back </button>
        </div>
      </form>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Unsaved Changes</h4>
                <button type="button" className="btn-close" onClick={cancelAction} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>You have unsaved changes. What would you like to do?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={confirmDiscard}>Discard</button>
                <button type="button" className="btn btn-primary" onClick={confirmSave}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={cancelAction}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
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
  );
}
