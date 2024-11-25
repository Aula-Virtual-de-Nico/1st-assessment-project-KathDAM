import { React } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    {
      title: "Comprar",
      timeLeft: "7 días",
      description: "Tomate, Lechuga, Queso, Leche",
      status: "Pending",
    },
    {
      title: "Viajes",
      timeLeft: "5 días",
      description: "Alemania, Turquía, Lisboa, Qatar, Reino Unido",
      status: "Completed",
    },
    {
      title: "Renovar papeles",
      timeLeft: "2 días",
      description: "Pedir cita, pagar renovación",
      status: "Pending",
    },
  ]);

  function handleDelete(index) {
    const newList = tasks.filter((task, i) => i !== index);
    setTasks(newList);
  }

  return (
    <div className="bg-light mt-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Task List</h1>
          <button className="btn btn-primary" id="new-task-btn">New Task</button>
        </div>
        <div className="row" id="task-cards-container">
          {tasks.map((task, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Task Image" />
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <i className="bi bi-calendar-date">Tiempo faltante: {task.timeLeft}</i>
                  <p className="card-text">{task.description}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary btn-sm">{task.status}</button>
                    <div>
                      <button className="btn btn-primary btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}> Delete </button>
                    </div>
                  </div>
                </div>
                <button className="btn btn-violet btn-sm">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
