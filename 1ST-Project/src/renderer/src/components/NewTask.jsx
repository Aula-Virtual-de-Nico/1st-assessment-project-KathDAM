import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; 

export default function NewTask() {
    const navigate = useNavigate();

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("Pending");
    const [taskDeadline, setTaskDeadline] = useState(
        new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]
    );

    const [isModified, setIsModified] = useState(false);  
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');  

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            deadline: taskDeadline,
        };

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.href = "/";
    };

    const handleDiscard = () => {
        if (isModified) {
            setModalType('discard');
            setShowModal(true);
        } else {
            window.location.href = "/";
        }
    };

    const handleCancelModal = () => {
        setShowModal(false);
    };

    const handleConfirmSave = () => {
        handleSubmit(); 
        setShowModal(false);
    };

    const handleConfirmDiscard = () => {
        window.location.href = "/"; 
        setShowModal(false);
    };

    const handleConfirmCancel = () => {
        setShowModal(false); 
    };

    // Detectar si hay cambios no guardados
    const handleChange = (e) => {
        if (!isModified) setIsModified(true);
        if (e.target.name === 'task-title') setTaskTitle(e.target.value);
        if (e.target.name === 'task-description') setTaskDescription(e.target.value);
        if (e.target.name === 'task-status') setTaskStatus(e.target.value);
        if (e.target.name === 'task-deadline') setTaskDeadline(e.target.value);
    };

    return (
        <div className="container">
            <h1>New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" name="task-title" value={taskTitle} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" name="task-description" rows="3" value={taskDescription} onChange={handleChange} placeholder="Enter task description (optional)"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="task-status" className="form-label">Status:</label>
                    <select id="task-status" name="task-status" className="form-select" value={taskStatus} onChange={handleChange} required>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="task-deadline" className="form-label">Deadline:</label>
                    <input type="date" className="form-control" id="task-deadline" name="task-deadline" value={taskDeadline} onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-danger" onClick={handleDiscard}>Discard</button>
            </form>

            <Modal 
                showModal={showModal} 
                title={
                    modalType === 'discard' ? 'Discard Changes?' : 
                    modalType === 'save' ? 'Save Changes?' : ''
                }
                message={
                    modalType === 'discard' ? 'Are you sure you want to discard the changes?' :
                    modalType === 'save' ? 'Do you want to save the changes you made to this task?' : ''
                }
                onCancel={handleCancelModal}
                onConfirm={modalType === 'discard' ? handleConfirmDiscard : modalType === 'save' ? handleConfirmSave : handleConfirmCancel}
            />
        </div>
    );
}
