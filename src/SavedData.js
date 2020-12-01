import { FILTERED_ITEM__ALL, FILTERED_ITEM__COMPLETED, FILTERED_ITEM__ACTIVE } from "./constants.js"

class SavedData {
  constructor() {
    this.tasks = [];
    this.filteredItem = FILTERED_ITEM__ALL;
  }

  getTasks() {
    return this.tasks;
  }

  getFilteredTasks(filteredItem) {
    this.filteredItem = filteredItem;

    if (this.filteredItem === FILTERED_ITEM__ALL) {
      return this.tasks;
    } else if (this.filteredItem === FILTERED_ITEM__ACTIVE) {
      return this.tasks.filter(task => !task.settled);
    } else if (this.filteredItem === FILTERED_ITEM__COMPLETED) {
      return this.tasks.filter(task => task.settled);
    } else {
      return this.tasks;
    }
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

export const savedData = new SavedData();
