import ToDo_List from "./index.js";
import { events } from "./Events.js";
import { savedData } from "./SavedData.js";
import {
  SHOW_TASKS,
  DELETE_TASK,
  EDIT_TASK,
  TASK_LIST_ITEM_CLASS,
  ITEM_CLASS,
  ITEM_CHECKBOX_CLASS,
  ITEM_CONTENT_CLASS,
  ITEM_TITLE_CLASS,
  ITEM_DELETE_CLASS,
  ITEM_SETTLED_CLASS,
  ITEM_CONTENT_SETTLED_CLASS,
  ITEM_EDIT_CLASS,
  TASK_LIST_CLASS
} from "./constants.js";

class TasksList extends ToDo_List {
  constructor(deleteButton, checkbox, expireDate, createDate, title, content, label, item, editItem) {
    super();
    Object.assign(this, { deleteButton, checkbox, expireDate, createDate, title, content, label, item, editItem });
    this.taskListSelectors();
    this.taskListSubscribers();
  }

  setupListeners() {
    this.inputField.addEventListener("change", () => this.inputField);
    this.inputField.addEventListener("keydown", ({ target, key }) => {
      if (key === "Enter") {
        this.addNewItem(target.value);
      }
    });
    this.list.addEventListener("click", ({ target }) => this.handleItemClick(target));
  }

  taskListSelectors() {
    this.list = document.querySelector(TASK_LIST_CLASS);
  }

  taskListSubscribers() {
    events.subscribe(SHOW_TASKS, tasks => this.showTasks(tasks));
    events.subscribe(DELETE_TASK, id => this.deleteTask(id));
  }

  handleItemClick(target) {
    if (target.classList.contains(ITEM_DELETE_CLASS)) {
      this.deleteTask(target);
    } else if (target.classList.contains(ITEM_CHECKBOX_CLASS)) {
      this.markTask(target);
    } else if (target.classList.contains(ITEM_EDIT_CLASS)) {
      this.editTask(target);
    }
  }

  addNewItem(title) {
    const task = {
      title,
      createAt: this.getDate(Date.now()),
      expireAt: this.getDate(Date.now(), true)
    };
    this.setTask(task);
    this.inputField.value = "";
    events.broadcast(SHOW_TASKS);
  }

  markTask({ id, checked }) {
    const tasks = savedData.getTasks();
    const newTasks = tasks.map(task => (task.id === +id ? { ...task, settled: checked } : task));

    savedData.setTasks(newTasks);
    events.broadcast(SHOW_TASKS);
  }

  deleteTask(target) {
    const deletedTaskId = typeof target === 'number' ? target : target.parentElement.firstChild.id;
    const filteredToDeleteTasks = savedData.getFilteredTasks().filter(task => task.id !== +deletedTaskId);

    savedData.setTasks(filteredToDeleteTasks);
    events.broadcast(SHOW_TASKS);
  }

  editTask({ parentElement: { firstChild: { id: editedTaskId } } }) {
    const filteredToEditTask = savedData.getFilteredTasks().find(task => task.id === +editedTaskId);

    events.broadcast(EDIT_TASK, filteredToEditTask);
  }

  showTasks(tasks = savedData.getFilteredTasks()) {
    if (tasks) {
      this.list.innerHTML = "";

      tasks.forEach(task => {
        this.createNodes();
        this.setClassNames(task);
        this.setAttributes(task);
        this.setValues(task);

        this.content.appendChild(this.title);

        this.content.append(this.createDate, this.expireDate);
        this.item.append(this.checkbox, this.label, this.content, this.editItem, this.deleteButton);
        this.list.appendChild(this.item);
      });
    }
  }

  createNodes() {
    this.item = document.createElement("li");
    this.label = document.createElement("label");
    this.checkbox = document.createElement("input");
    this.content = document.createElement("div");
    this.title = document.createElement("p");
    this.createDate = document.createElement("span");
    this.expireDate = document.createElement("span");
    this.deleteButton = document.createElement("span");
    this.editItem = document.createElement("span");
  }

  setClassNames(task) {
    this.item.classList.add(TASK_LIST_ITEM_CLASS, ITEM_CLASS);
    this.checkbox.classList.add(ITEM_CHECKBOX_CLASS);
    this.content.classList.add(ITEM_CONTENT_CLASS);
    this.title.classList.add(ITEM_TITLE_CLASS);
    this.deleteButton.classList.add(ITEM_DELETE_CLASS);
    this.editItem.classList.add(ITEM_EDIT_CLASS);

    if (task.settled) {
      this.item.classList.add(ITEM_SETTLED_CLASS);
      this.content.classList.add(ITEM_CONTENT_SETTLED_CLASS);
    }
  }

  setAttributes({ id, settled }) {
    this.label.setAttribute("for", id);
    this.checkbox.type = "checkbox";
    this.checkbox.id = id;
    this.checkbox.checked = settled;
  }

  setValues({ title, createDate, expireDate }) {
    this.title.innerHTML = title;
    this.createDate.innerHTML = `${createDate} / `;
    this.expireDate.innerHTML = expireDate;
  }
}

export default TasksList;
