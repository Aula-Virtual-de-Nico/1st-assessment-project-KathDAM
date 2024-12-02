import Task from 'electron-store'

export class TaskManager extends Task {
  constructor(options) {
    super(options)
    this.list = this.get('grocery-list') || []
  }

  saveList() {
    this.set('grocery-list', this.list)
    return this.list
  }

  getList() {
    this.list = this.get('task-list') || []
    return this.list
  }

  getTask(task) {
    this.getList()
    return this.list.find((item) => task.id == taskId)
  }

  addTask(task) {
    this.list = [...this.list, task]
    return this.saveList()
  }

  deleteTask(task) {
    this.list = this.list.filter((i) => i.id !== task.id)
    return this.saveList()
  }

  updateTask(task) {
    this.list = this.list.map((i) => (i.id === task.id ? task : i))
    return this.saveList()
  }
}