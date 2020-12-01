import { events } from "./Events.js";
import { SHOW_TASKS, DISPLAY_NONE } from "./constants.js";
import { savedData } from "./SavedData.js";

class SortBlock {
  setupListeners() {
    const sortButton = document.querySelector(".sortButton");
    const sortByDateBtn = document.querySelector(".sortBtnByDate");
    const sortByTextBtn = document.querySelector(".sortBtnByText");
    const searchTask = document.querySelector(".sortSearchInput");

    sortButton.addEventListener("click", () => this.showSortBlock());
    sortByDateBtn.addEventListener("click", () => this.sortByDate());
    sortByTextBtn.addEventListener("click", () => this.sortByText());
    searchTask.addEventListener("keyup", () => this.searchCurrentText(searchTask.value));
  }

  showSortBlock() {
    const sortBlockList = document.querySelector(".sortButtonsList");

    sortBlockList.classList.toggle(DISPLAY_NONE);
    events.broadcast(SHOW_TASKS, this.tasks);
  }

  sortByDate() {
    const tasks = savedData.getTasks();
    const sortedTasks = tasks.sort(function(a, b) {
      const dateA = new Date(a.createDate),
        dateB = new Date(b.createDate);
      return dateA - dateB;
    });
    events.broadcast(SHOW_TASKS, sortedTasks);
  }

  sortByText() {
    const tasks = savedData.getTasks();

    const sortedTasks = tasks.sort(function(a, b) {
      const titleA = a.title.toLowerCase(),
        titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    events.broadcast(SHOW_TASKS, sortedTasks);
  }

  searchCurrentText(value) {
    const tasks = savedData.getTasks();
    const sortedTasks = tasks.filter(task => task.title.includes(value));

    events.broadcast(SHOW_TASKS, sortedTasks);
  }
}

export const sortBlock = new SortBlock();
