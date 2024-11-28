import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditingTask() {
    const [taskTitle, setTaskTitle] = useState('Comprar');
    const [taskDescription, setTaskDescription] = useState('Tomate, Lechuga, Papel, Queso, Leche...');
    const [taskStatus, setTaskStatus] = useState('Pending');
    const [taskDeadline, setTaskDeadline] = useState('2023-11-28');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar los cambios en la tarea
        console.log({ taskTitle, taskDescription, taskStatus, taskDeadline });
    };

    return (
        <div className="container">
            <h1>Editing Task: {taskTitle}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" rows="3" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="task-status" className="form-label">Status:</label>
                    <select id="task-status" className="form-select" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="task-deadline" className="form-label">Deadline:</label>
                    <input type="date"  className="form-control" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-danger">Delete</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Back</button>
                </div>
            </form>
        </div>
    );
}
