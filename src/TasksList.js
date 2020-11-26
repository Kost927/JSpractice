import ToDo_List from "./index.js";
import { events } from "./Events.js";

let item, label, content, title, createDate, expireDate;

class TasksList extends ToDo_List {
  constructor() {
    super();
    this.list = document.querySelector(".taskList");
    events.subscribe("showTasks", tasks => this.showTasks(tasks));
  }

  setupListeners() {
    this.inputField.addEventListener("change", () => this.cleanInputField(this.inputField));
    this.inputField.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this.addNewItem(e.target.value);
      }
    });
  }

  addNewItem(title) {
    let date = new Date();
    const createAt = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    const expireAt = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() + 1}`;

    const task = {
      title: title,
      createAt: createAt,
      expireAt: expireAt
    };

    this.setTask(task);
    this.cleanInputField(this.inputField);
    this.inputField.value = "";
    events.publish("showTasks");
  }

  showTasks(tasks = this.getTasks()) {
    if (tasks) {
      this.list.innerHTML = "";

      tasks.forEach(task => {
        this.creatNodes();
        this.setClassNames(task);
        this.setAttributes(task);
        this.setValues(task);

        content.appendChild(title);

          content.append(createDate, expireDate);
        item.append(label, content);
        this.list.appendChild(item);
      });
    }
  }

  creatNodes() {
    item = document.createElement("li");
    label = document.createElement("label");
    content = document.createElement("div");
    title = document.createElement("p");
    createDate = document.createElement("span");
    expireDate = document.createElement("span");
  }

  setClassNames() {
    item.classList.add("taskListItem", "item");
    content.classList.add("itemContent");
    title.classList.add("itemTitle");
  }

  setAttributes(task) {
    label.setAttribute("for", task.id);
  }

  setValues(task) {
    title.innerHTML = task.title;
    createDate.innerHTML = `${task.createDate} - `;
    expireDate.innerHTML = task.expireDate;
  }
}

export default TasksList;
