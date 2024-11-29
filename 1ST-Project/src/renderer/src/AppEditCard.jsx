import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function AppEditItem() {
  // item es el estado que contiene el elemento a editar
  const [item, setItem] = useState({})

  // originalItem estado original del elemento
  // usado para comparar si hubo cambios
  const [originalItem, setOriginalItem] = useState({})

  // Obtiene el id del item de la URL
  const { itemId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    window.api.getItem(itemId).then((itemFetched) => {
      setItem({ ...itemFetched })
      setOriginalItem({ ...itemFetched })
    })
  }, [])

  function handleSubmitChanges(event) {
    event.preventDefault()
    const name = event.target.itemName.value
    if (!name) return
    const newItem = { ...item, name: name }
    window.api.updateItem(newItem)
    event.target.reset()
    event.target.itemName.focus()
    navigate('/')
  }

  async function handleDelete(item) {
    const confirm = await window.api.deleteItem(item)
    if (confirm) navigate('/')
  }

  async function handleDiscard() {
    const confirm = await window.api.confirmItem(item)
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
    setItem({ ...item, name: name })
  }

  function setQuantity(quantity) {
    setItem({ ...item, quantity: quantity })
  }

  return (
    <div
      id="app-item-edit"
      className="container vh-100 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <h1 className="text-primary">
        <i className="bi bi-pencil-square"></i> Editar producto
      </h1>
      <form action="#" id="itemForm" onSubmit={handleSubmitChanges} className="container">
        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="input-group">
            <span className="input-group-text text-primary col-2">
              <i className="bi bi-pencil-square"> Producto:</i>
            </span>
            <input
              type="text"
              id="itemName"
              name="itemName"
              required
              autoComplete="off"
              className="form-control"
              placeholder="producto..."
              onChange={() => setName(event.target.value)}
              value={item.name ?? ''}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text text-primary col-2">
              <i className="bi bi-hash"> Cantidad:</i>
            </span>
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              autoComplete="off"
              min="1"
              className="form-control"
              placeholder="cantidad..."
              onChange={() => setQuantity(event.target.value)}
              value={item.quantity ?? ''}
            />
          </div>
          <div className="d-flex gap-2">
            <button
              id="btnDelete"
              title="Borrar"
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(item)}
            >
              <i className="bi bi-trash"> Borrar</i>
            </button>
            <button id="btnSave" title="Guardar" className="btn btn-primary">
              <i className="bi bi-save"> Guardar cambios</i>
            </button>
            <button
              id="btnDiscard"
              type="button"
              className="btn btn-secondary"
              onClick={() => handleDiscard()}
            >
              <i className="bi bi-arrow-left"> Volver</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}