export default class Task {
    constructor(name, id = null) {
      this.id = id || Date.now()
      this.name = name
      this.quantity = 1
      this.checked = false
    }
  
    toString() {
      return `${this.name}`
    }
  }
  