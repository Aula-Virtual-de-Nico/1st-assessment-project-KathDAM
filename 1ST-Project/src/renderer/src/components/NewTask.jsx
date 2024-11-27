import  React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewTask() {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("Pending");
    const [taskDeadline, setTaskDeadline] = useState(
        new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .slice(0, 10)
    );
        
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
          id: Date.now(),
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          timeLeft: taskDeadline,
        };

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.href = "/";
    };

    const handleDiscard = () => {
        if (window.confirm("Are you sure you want to discard changes?")) {
          window.location.href = "/";
        }
      };

    return (
        <div className="container">
            <h1>New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="task-title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label for="task-description" className="form-label">Description:</label>
                    <textarea className="form-control" id="task-description" rows="3"  value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Enter task description (optional)"></textarea>
                </div>

                <div className="mb-3">
                    <label for="task-status" className="form-label">Status:</label>
                    <select id="task-status" className="form-select" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
                        <option value="Pending" selected>Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label for="task-deadline" className="form-label">Deadline:</label>
                    <input type="date" className="form-control" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}></input>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-danger" onClick={handleDiscard}>Discard</button>
            </form>
        </div>
    );
}
