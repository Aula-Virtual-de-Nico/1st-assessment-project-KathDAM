import { React } from 'react';

export default function EditingTask() {
    return (
        <div class="container">
            <h1>Editing Task: Comprar</h1>
            <form id="edit-task-form">
                <div class="mb-3">
                    <label for="task-title" class="form-label">Title:</label>
                    <input type="text" class="form-control" id="task-title" value="Comprar" required></input>
                </div>
                <div class="mb-3">
                    <label for="task-description" class="form-label">Description:</label>
                    <textarea class="form-control" id="task-description" rows="3" required>Tomate, Lechuga, Papel, Queso, Leche...</textarea>
                    
                </div>
                <div class="mb-3">
                    <label for="task-status" class="form-label">Status:</label>
                    <select id="task-status" class="form-select">
                        <option value="Pending" selected>Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="task-deadline" class="form-label">Deadline:</label>
                    <input type="date" class="form-control" id="task-deadline" value="2023-11-28"></input>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn btn-danger">Delete</button>
                    <button type="submit" class="btn btn-primary" id="save" disabled>Save</button>
                    <button type="button" class="btn btn-secondary">Back</button>
                </div>
            </form>
        </div>
    );
}
