import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './TaskList/Modal';

export default function TaskList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ showCompleted: true, showCanceled: true });
    const [sortKey, setSortKey] = useState('title');
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const defaultTasks = [
        {
            id: 1,
            title: 'Buy Groceries',
            description: 'Milk, Eggs, Bread, Cheese',
            status: 'Pending',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 2,
            title: 'Doctor Appointment',
            description: 'Yearly check-up at 3 PM',
            status: 'In Progress',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        {
            id: 3,
            title: 'Finish Project',
            description: 'Complete the React project for the client',
            status: 'Completed',
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        },
    ];

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (!savedTasks || savedTasks.length === 0) {
            localStorage.setItem('tasks', JSON.stringify(defaultTasks));
            setTasks(defaultTasks);
        } else {
            setTasks(savedTasks);
        }
    }, []);

    const handleDelete = (index) => {
        setTaskToDelete(index);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (taskToDelete !== null) {
            const newList = tasks.filter((_, i) => i !== taskToDelete);
            setTasks(newList);
            localStorage.setItem('tasks', JSON.stringify(newList));
            setShowModal(false);
        }
    };

    const cancelDelete = () => setShowModal(false);

    const handleSort = (key) => {
        setSortKey(key);
        const sortedTasks = [...tasks].sort((a, b) => {
            if (key === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
            return a[key].localeCompare(b[key]);
        });
        setTasks(sortedTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (!filter.showCompleted && task.status === 'Completed') return false;
        if (!filter.showCanceled && task.status === 'Canceled') return false;
        return true;
    });

    const navigateToNewTask = () => {
        navigate('/new-task');
    };

    const navigateToEditTask = (index) => {
        navigate(`/edit-task/${index}`);
    };

    const handleToggleDetails = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, showDetails: !task.showDetails } : task
        );
        setTasks(updatedTasks);
    };

    const handleStatusChange = (index) => {
        const statuses = ['Pending', 'In Progress', 'Completed', 'Canceled'];
        const updatedTasks = [...tasks];
        const currentStatusIndex = statuses.indexOf(updatedTasks[index].status);
        const nextStatus = statuses[(currentStatusIndex + 1) % statuses.length]; // Cicla entre los estados
        updatedTasks[index].status = nextStatus;
        setTasks(updatedTasks);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'badge bg-warning text-white';
            case 'In Progress':
                return 'badge bg-info text-white';
            case 'Completed':
                return 'badge bg-success text-white';
            case 'Canceled':
                return 'badge bg-danger text-white';
            default:
                return '';
        }
    };

    return (
        <div className="mt-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Task List</h1>
                    <button className="btn btn-primary" onClick={navigateToNewTask}>New Task</button>
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
                        <div className="col-md-4" key={task.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <i className="bi bi-calendar-date"> Deadline: {new Date(task.deadline).toLocaleDateString()}</i>
                                    <div className="mt-2">
                                      <span className={getStatusClass(task.status)} onClick={() => handleStatusChange(index)} style={{ cursor: 'pointer' }}>{task.status}</span>
                                    </div>
                                    {task.showDetails && <p className="card-text">{task.description}</p>}
                                    <div className="btn-group mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleToggleDetails(index)}>{task.showDetails ? 'Hide Details' : 'Details'} </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => navigateToEditTask(index)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal
                    showModal={showModal}
                    title="Confirm Delete"
                    message="Are you sure you want to delete this task?"
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
}