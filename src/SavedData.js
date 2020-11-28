class SavedData {
  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

export const savedData = new SavedData();
