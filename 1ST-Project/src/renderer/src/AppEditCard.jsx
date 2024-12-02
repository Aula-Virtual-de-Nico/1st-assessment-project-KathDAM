import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function AppEditTask() {
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
      <h1>Editing {taskTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="task-title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="task-description" className="form-label">Description:</label>
          <textarea className="form-control" id="task-description"rows="3" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}required/>
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
          <input type="date" className="form-control" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-danger" onClick={handleDelete}> Delete </button>
          <button type="submit" className="btn btn-primary" disabled={!isDirty}> Save </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}> Back </button>
        </div>
      </form>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Unsaved Changes</h4>
                <button type="button" className="btn-close" onClick={cancelAction} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>You have unsaved changes. What would you like to do?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={confirmDiscard}>Discard</button>
                <button type="button" className="btn btn-primary" onClick={confirmSave}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={cancelAction}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirm Delete</h4>
                <button type="button" className="btn-close" onClick={cancelDelete} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}