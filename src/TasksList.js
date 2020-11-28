import ToDo_List from "./index.js";
import { events } from "./Events.js";
import { savedData } from "./SavedData.js";

class TasksList extends ToDo_List {
  constructor(item, label, content, title, createDate, expireDate, checkbox, deleteButton) {
    super();
    this.deleteButton = deleteButton;
    this.checkbox = checkbox;
    this.expireDate = expireDate;
    this.createDate = createDate;
    this.title = title;
    this.content = content;
    this.label = label;
    this.item = item;
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
    this.list = document.querySelector(".taskList");
  }

  taskListSubscribers() {
    events.subscribe("showTasks", tasks => this.showTasks(tasks));
    events.subscribe("deleteTask", id => this.deleteTask(id));
  }

  handleItemClick(target) {
    if (target.classList.contains("itemDelete")) {
      this.deleteTask(target);
    } else if (target.classList.contains("itemCheckbox")) {
      this.markTask(target);
    }
  }

  addNewItem(title) {
    const createAt = this.getDate(Date.now());
    const expireAt = this.getDate(Date.now(), true);

    const task = {
      title,
      createAt,
      expireAt
    };

    this.setTask(task);
    this.inputField.value = "";
    events.broadcast("showTasks");
  }

  markTask({ id, checked }) {
    const tasks = savedData.getTasks();
    const newTasks = tasks.map(task => (task.id === Number(id) ? { ...task, settled: checked } : task));

    savedData.setTasks(newTasks);
    events.broadcast("showTasks");
  }

  deleteTask(target) {
    const id = target.parentElement.firstChild.id;
    const tasks = savedData.getTasks();
    const newTasks = tasks.filter(item => item.id !== Number(id));

    savedData.setTasks(newTasks);
    events.broadcast("showTasks");
  }

  showTasks(tasks = savedData.getTasks()) {
    if (tasks) {
      this.list.innerHTML = "";

      tasks.forEach(task => {
        this.createNodes();
        this.setClassNames(task);
        this.setAttributes(task);
        this.setValues(task);

        this.content.appendChild(this.title);

        this.content.append(this.createDate, this.expireDate);
        this.item.append(this.checkbox, this.label, this.content, this.deleteButton);
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
  }

  setClassNames(task) {
    this.item.classList.add("taskListItem", "item");
    this.checkbox.classList.add("itemCheckbox");
    this.content.classList.add("itemContent");
    this.title.classList.add("itemTitle");
    this.deleteButton.classList.add("itemDelete");

    if (task.settled) {
      this.item.classList.add("itemSettled");
      this.content.classList.add("itemContentSettled");
    }
  }

  setAttributes(task) {
    this.label.setAttribute("for", task.id);
    this.checkbox.type = "checkbox";
    this.checkbox.id = task.id;
    this.checkbox.checked = task.settled;
  }

  setValues(task) {
    this.title.innerHTML = task.title;
    this.createDate.innerHTML = `${task.createDate} / `;
    this.expireDate.innerHTML = task.expireDate;
  }
}

export default TasksList;
