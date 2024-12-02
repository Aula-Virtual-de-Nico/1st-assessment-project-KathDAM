import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function AppNewTask() {
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

  //----------------------Para modificar------------------------------------------------

  const [item, setTask] = useState({})
  const [originalTask, setOriginalTask] = useState({})

  const { taskId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    window.api.getTask(taskId).then((taskFetched) => {
      setTask({ ...taskFetched })
      setOriginalTask({ ...taskFetched })
    })
  }, [])

  function handleSubmitChanges(event) {
    event.preventDefault()
    const name = event.target.taskName.value
    if (!name) return
    const newTask = { ...task, name: name }
    window.api.updateTask(newTask)
    event.target.reset()
    event.target.taskName.focus()
    navigate('/')
  }

  async function handleDelete(task) {
    const confirm = await window.api.deleteTask(task)
    if (confirm) navigate('/')
  }

  async function handleDiscard() {
    const confirm = await window.api.confirmTask(task)
    switch (confirm) {
      case 'discard':
      case 'save':
        navigate('/')
        break
      case 'cancel':
        break
    }
  }

  function setName(name) {
    setTask({ ...task, name: name })
  }

  function setQuantity(quantity) {
    setTask({ ...task, quantity: quantity })
  }

  return (
    <div className="container">
      <h1>New Task</h1>
      <form onSubmit={handleSave}>
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
  )
}