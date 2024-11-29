import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function NewTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [deadline, setDeadline] = useState(() => {const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().substring(0, 10);
    });

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
            deadline: deadline ? new Date(deadline) : null 
        };

        navigate('/', { state: { newTask } });
    };

    const handleDiscard = () => {
        setShowDiscardModal(true); 
    };

    const cancelDiscard = () => {
        setShowDiscardModal(false); 
    };

    const confirmDiscard = () => {
        setShowDiscardModal(false); 
        navigate("/"); 
    };

    return (
        <div className="container">
            <h1>New Task</h1>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description (optional)"/>
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
                    <input type="date" className="form-control" id="task-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary" disabled={!title.trim()}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={handleDiscard}>Discard</button>
                </div>
            </form>

            {showDiscardModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="discardModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="discardModalLabel">Confirm Discard</h4>
                                <button type="button" className="btn-close" onClick={cancelDiscard} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to discard changes?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" onClick={cancelDiscard}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDiscard}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}