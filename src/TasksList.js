import ToDo_List from "./index.js";
import { events } from "./Events.js";
import { savedData } from "./SavedData.js";

let item, label, content, title, createDate, expireDate, checkbox;

class TasksList extends ToDo_List {
  constructor() {
    super();
    this.list = document.querySelector(".taskList");
    events.subscribe("showTasks", tasks => this.showTasks(tasks));
  }

  setupSubscriber() {
    this.inputField.addEventListener("change", () => this.inputField);
    this.inputField.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this.addNewItem(e.target.value);
      }
    });
    this.list.addEventListener('click', ({ target }) => this.handleItemClick(target));

  }

  handleItemClick(target) {
    const events = {
      'input': this.markTask,
    }

    for (let key in events) {
      if (target.closest(key)) {
        events[key](target);
      }
    }
  }


  addNewItem(title) {
    const createAt = this.getDate(Date.now());
    const expireAt = this.getDate(Date.now(), true);

    const task = {
      title: title,
      createAt: createAt,
      expireAt: expireAt
    };

    this.setTask(task);
    this.inputField.value = "";
    events.broadcast("showTasks");
  }

  markTask({ id, checked }) {
    const tasks = savedData.getTasks();
    const newTasks = tasks.map(task => task.id === Number(id) ? { ...task, settled: checked } : task);

    savedData.setTasks(newTasks);
    events.broadcast('showTasks');
  }


  showTasks(tasks = savedData.getTasks()) {
    if (tasks) {
      this.list.innerHTML = "";

      tasks.forEach(task => {
        this.createNodes();
        this.setClassNames(task);
        this.setAttributes(task);
        this.setValues(task);

        content.appendChild(title);

        content.append(createDate, expireDate);
        item.append(checkbox, label, content);
        this.list.appendChild(item);
      });
    }
  }

  createNodes() {
    item = document.createElement("li");
    label = document.createElement("label");
    checkbox = document.createElement("input");
    content = document.createElement("div");
    title = document.createElement("p");
    createDate = document.createElement("span");
    expireDate = document.createElement("span");
  }

  setClassNames(task) {
    item.classList.add("taskListItem", "item");
    checkbox.classList.add("itemCheckbox");
    content.classList.add("itemContent");
    title.classList.add("itemTitle");

    if (task.settled) {
      item.classList.add("itemSettled");
      content.classList.add("itemContentSettled");
    }
  }

  setAttributes(task) {
    label.setAttribute("for", task.id);
    checkbox.type = "checkbox";
    checkbox.id = task.id;
    checkbox.checked = task.settled;
  }

  setValues(task) {
    title.innerHTML = task.title;
    createDate.innerHTML = `${task.createDate} / `;
    expireDate.innerHTML = task.expireDate;
  }
}

export default TasksList;
