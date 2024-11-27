import  React , { useState } from 'react';

export default function NewTask() {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pending');
    const [taskDeadline, setTaskDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar la nueva tarea
        console.log({ taskTitle, taskDescription, taskStatus, taskDeadline });
    };

    return (
        <div class="container">
            <h1>New Task</h1>
            <form>
                <div class="mb-3">
                    <label for="task-title" class="form-label">Title:</label>
                    <input type="text" class="form-control" id="task-title" placeholder="Enter task title" required></input>
                </div>

                <div class="mb-3">
                    <label for="task-description" class="form-label">Description:</label>
                    <textarea class="form-control" id="task-description" rows="3" placeholder="Enter task description"></textarea>
                </div>

                <div class="mb-3">
                    <label for="task-status" class="form-label">Status:</label>
                    <select id="task-status" class="form-select" required>
                        <option value="Pending" selected>Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="task-deadline" class="form-label">Deadline:</label>
                    <input type="date" class="form-control" id="task-deadline" value=""></input>
                </div>

                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-danger">Discard</button>
            </form>
        </div>
    );
}
