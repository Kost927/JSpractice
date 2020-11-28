import TaskList from "./TasksList.js";
import Popup from "./Popup.js";


window.addEventListener("load", () => {
  new TaskList().showTasks();
  new TaskList().setupListeners();
  new Popup().setupListeners();
});
