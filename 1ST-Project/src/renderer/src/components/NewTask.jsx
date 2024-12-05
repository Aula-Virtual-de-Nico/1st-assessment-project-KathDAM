import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/TaskList/Modal';

export default function NewTask({ addTask }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substring(0, 10)
  );

  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    const newTask = {
      title,
      description,
      status,
      deadline: deadline ? new Date(deadline) : null,
    };
    addTask(newTask); // Save the new task
    navigate('/');
  };

  const handleDiscard = () => {
    setShowDiscardModal(true);
  };

  const cancelDiscard = () => {
    setShowDiscardModal(false);
  };

  const confirmDiscard = () => {
    setShowDiscardModal(false);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>New Task</h1>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="task-title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="task-description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="task-description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="task-status" className="form-label">Status:</label>
          <select
            id="task-status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="task-deadline" className="form-label">Deadline:</label>
          <input
            type="date"
            className="form-control"
            id="task-deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-danger" onClick={handleDiscard}>Discard</button>
      </form>
      {showDiscardModal && (
        <Modal
          title="Discard Changes"
          message="Are you sure you want to discard the changes?"
          onCancel={cancelDiscard}
          onConfirm={confirmDiscard}
        />
      )}
    </div>
  );
}
