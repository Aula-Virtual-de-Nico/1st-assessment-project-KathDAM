import Store from 'electron-store'

export class StoreManager extends Store {
  constructor(options) {
    super(options)
    this.list = this.get('grocery-list') || []
  }

  saveList() {
    this.set('grocery-list', this.list)
    return this.list
  }

  getList() {
    this.list = this.get('grocery-list') || []
    return this.list
  }

  getItem(itemId) {
    this.getList()
    return this.list.find((item) => item.id == itemId)
  }

  addItem(item) {
    this.list = [...this.list, item]
    return this.saveList()
  }

  deleteItem(item) {
    this.list = this.list.filter((i) => i.id !== item.id)
    return this.saveList()
  }

  updateItem(item) {
    this.list = this.list.map((i) => (i.id === item.id ? item : i))
    return this.saveList()
  }
}
