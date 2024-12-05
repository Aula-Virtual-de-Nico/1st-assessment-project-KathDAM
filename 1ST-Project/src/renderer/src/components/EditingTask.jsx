import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';

export default function EditingTask() {
    const navigate = useNavigate();
    const { id } = useParams();

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const originalTask = tasks[id] || {};

    const [taskTitle, setTaskTitle] = useState(originalTask.title || '');
    const [taskDescription, setTaskDescription] = useState(originalTask.description || '');
    const [taskStatus, setTaskStatus] = useState(originalTask.status || 'Pending');
    const [taskDeadline, setTaskDeadline] = useState(originalTask.deadline || '');
    const [isModified, setIsModified] = useState(false);
    const [showModal, setShowModal] = useState(false);  
    const [modalType, setModalType] = useState('');  

    useEffect(() => {
        if (
            taskTitle !== originalTask.title ||
            taskDescription !== originalTask.description ||
            taskStatus !== originalTask.status ||
            taskDeadline !== originalTask.deadline
        ) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }
    }, [taskTitle, taskDescription, taskStatus, taskDeadline, originalTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        tasks[id] = { title: taskTitle, description: taskDescription, status: taskStatus, deadline: taskDeadline };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        navigate('/');
    };

    const handleBack = () => {
        if (isModified) {
            setModalType('save');
            setShowModal(true);
        } else {
            navigate('/');
        }
    };

    const handleDelete = () => {
        setModalType('delete');
        setShowModal(true);
    };

    const handleConfirmSave = () => {
        handleSubmit();
        setShowModal(false);
    };

    const handleConfirmDiscard = () => {
        navigate('/');
        setShowModal(false);
    };

    const handleConfirmDelete = () => {
        const updatedTasks = tasks.filter((_, index) => index !== parseInt(id, 10));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        navigate('/');
        setShowModal(false);
    };

    const handleCancelModal = () => {
        setShowModal(false);
    };

   return (
        <div className="container">
            <h1>Editing Task: {originalTask.title || 'Untitled'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" rows="3" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
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
                    <input type="date" className="form-control" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    <button type="submit" className="btn btn-primary" disabled={!isModified}>Save</button>
                </div>
            </form>

            {/* Modal */}
            <Modal 
                showModal={showModal} 
                title={
                    modalType === 'save' ? 'Save Changes?' :
                    modalType === 'delete' ? 'Delete Task?' :
                    ''
                }
                message={
                    modalType === 'save' ? 'Do you want to save the changes you made to this task?' :
                    modalType === 'delete' ? 'Are you sure you want to delete this task?' :
                    ''
                }
                onCancel={handleCancelModal} 
                onConfirm={modalType === 'save' ? handleConfirmSave : modalType === 'delete' ? handleConfirmDelete : handleConfirmDiscard} 
            />
        </div>
    );
}