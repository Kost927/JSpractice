import {
  FILTER_BTN_ITEM_CLASS,
  SHOW_TASKS,
  FILTER_BTN_ACTIVE_CLASS,
  FILTERED_ITEM__ALL,
  FILTERED_ITEM__COMPLETED,
  FILTERED_ITEM__ACTIVE
} from "./constants.js";
import { events } from "./Events.js";
import { savedData } from "./SavedData.js";

class FilterTasks {
  constructor() {
    this.filterTasksSelectors();
  }

  setupListeners() {
    const filterAllBtn = document.querySelector(".filterAll");
    const filterActiveBtn = document.querySelector(".filterActive");
    const filterCompletedBtn = document.querySelector(".filterCompleted");
    const clearCompletedBtn = document.querySelector(".clearCompleted");

    filterAllBtn.addEventListener("click", () => this.filterAllTasks());
    filterActiveBtn.addEventListener("click", () => this.filterActiveTasks());
    filterCompletedBtn.addEventListener("click", () => this.filterCompletedTasks());
    clearCompletedBtn.addEventListener("click", () => this.clearCompleted());

    [...this.filterButtons].forEach(btn => btn.addEventListener("click", () => this.addActiveBtn(btn)));
  }

  filterTasksSelectors() {
    this.filterButtons = document.querySelectorAll(FILTER_BTN_ITEM_CLASS);
  }

  filterAllTasks() {
    const tasks = savedData.getFilteredTasks(FILTERED_ITEM__ALL);

    events.broadcast(SHOW_TASKS, tasks);
  }

  filterActiveTasks() {
    const tasks = savedData.getFilteredTasks(FILTERED_ITEM__ACTIVE);

    events.broadcast(SHOW_TASKS, tasks);
  }

  filterCompletedTasks() {
    const tasks = savedData.getFilteredTasks(FILTERED_ITEM__COMPLETED);

    events.broadcast(SHOW_TASKS, tasks);
  }

  clearCompleted() {
    const tasks = savedData.getFilteredTasks().filter(task => !task.settled);

    savedData.setTasks(tasks);
    events.broadcast(SHOW_TASKS, savedData.getFilteredTasks());
  }

  addActiveBtn(btn) {
    [...this.filterButtons].forEach(btn => btn.classList.remove(FILTER_BTN_ACTIVE_CLASS));
    btn.classList.add(FILTER_BTN_ACTIVE_CLASS);
  }
}

export const filterTasks = new FilterTasks();
