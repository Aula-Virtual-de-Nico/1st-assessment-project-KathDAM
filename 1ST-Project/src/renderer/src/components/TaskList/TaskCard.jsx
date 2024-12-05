import React from 'react';

export default function TaskCard({ task, onStatusChange, onEdit, onDelete, onToggleDetails }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <i className="bi bi-calendar-date">Deadline: {new Date(task.deadline).toLocaleDateString()}</i>
        {task.showDetails && <p className="card-text">{task.description}</p>}
        <div className="btn-group">
          <button className="btn btn-secondary btn-sm" onClick={onStatusChange}>{task.status}</button>
          <button className="btn btn-primary btn-sm" onClick={onEdit}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
        <button className="btn btn-violet btn-sm" onClick={onToggleDetails}>
          {task.showDetails ? 'Hide Details' : 'Details'}
        </button>
      </div>
    </div>
  );
}
