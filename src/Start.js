import TaskList from "./TasksList.js";
import Popup from "./Popup.js";

const taskList = new TaskList();
const popup = new Popup();

window.addEventListener("load", () => {
  taskList.showTasks();
  taskList.setupListeners();
  popup.setupListeners();
});
