import { useEffect, useState } from 'react'

// Componentes de la aplicación
import ThemeSwitcher from './components/ThemeSwitcher'
import ItemInputForm from './components/ItemInputForm'
import ItemList from './components/ItemList'
import ItemListFilters from './components/ItemListFilters'

export default function App() {
  // itemList es el estado que contiene la lista de elementos
  const [itemList, setItemList] = useState([])

  // filters es el estado que contiene los filtros de la lista
  const [filters, setFilters] = useState({ name: '', checked: false })

  // useEffect se utiliza para sincronizar con un sistema externo
  // En este caso, se utiliza para obtener la lista de desde el proceso principal
  useEffect(() => {
    window.api.getList()
  }, [])

  // Se activa el listener para recibir la lista de elementos
  // cada vez que haya cambios actualizará la lista
  useEffect(() => {
    window.electron.ipcRenderer.on('list-updated', handleUpdateList)
    return () => {
      window.electron.ipcRenderer.removeListener('list-updated', handleUpdateList)
    }
  })

  function handleUpdateList(event, list) {
    const newList = getFilteredList(list)
    setItemList([...newList])
  }

  // Actualiza los filtros y vuelve a pedir la lista
  async function handleFilters(name, checked) {
    const newFilters = {
      name: name,
      checked: checked
    }
    setFilters(newFilters)
    await window.api.getList()
  }

  // Devuelve la lista filtrada con los parámetros del estado filters
  function getFilteredList(list) {
    let filteredList = [...list]
    if (filters.name.length > 0 || filters.checked) {
      filteredList = list.filter((item) => {
        let result = item.name.toUpperCase().includes(filters.name.toUpperCase())
        if (filters.checked) result = result && !item.checked
        return result
      })
    }

    return filteredList
  }

  function handleChecked(item) {
    item.checked = !item.checked
    window.api.updateItem(item)
  }

  async function handleDelete(item) {
    await window.api.deleteItem(item)
  }

  return (
    <div id="app">
      <div id="app-header" className="container d-flex justify-content-between align-items-center">
        <div className="display-5 text-primary">
          <em>
            <i className="bi bi-bag-check-fill"></i> Lista de la compra
          </em>
        </div>

        {/* Componente encargado de cambiar el tema de la aplicación (light/dark) */}
        <ThemeSwitcher />
      </div>

      {/* Componente encargado de añadir nuevos elementos a la lista */}
      <ItemInputForm />

      {/* Componente encargado de mostrar los elementos de la lista */}
      <ItemList
        itemList={itemList}
        filters={filters}
        deleteCallback={handleDelete}
        checkCallback={handleChecked}
      />

      {/* Componente encargado aplicar filtros la lista */}
      <ItemListFilters filterCallback={handleFilters} />
    </div>
  )
}
