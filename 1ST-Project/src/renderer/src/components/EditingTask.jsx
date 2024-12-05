import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditingTask({ tasks, updateTask }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find(task => task.id === parseInt(id));

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'Pending');
    const [deadline, setDeadline] = useState(task?.deadline ? new Date(task.deadline).toISOString().substring(0, 10) : '');

    const handleSave = () => {
        if (!title.trim()) {
            alert('Title is required.');
            return;
        }
        updateTask(task.id, { title, description, status, deadline: deadline ? new Date(deadline) : null });
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Edit Task</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description (optional)" />
                </div>

                <div className="mb-3">
                    <label htmlFor="task-status" className="form-label">Status:</label>
                    <select id="task-status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="task-deadline" className="form-label">Deadline:</label>
                    <input type="date" className="form-control" id="task-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
