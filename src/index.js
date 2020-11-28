import { savedData } from "./SavedData.js";

class ToDo_List {
  isShowPopup = false;
  constructor() {
    this.toDoListSelectors();
  }

  toDoListSelectors() {
    this.inputField = document.querySelector(".taskListInput");
  }

  setTask(data) {
    const allTasks = savedData.getTasks();
    const newTask = this.getTaskFormat(data);
    const tasks = [...allTasks, newTask];
    savedData.setTasks(tasks);
  }

  getTaskFormat({ id, title, createAt, expireAt } = data) {
    const task = {
      id: id || Date.now(),
      settled: false,
      title,
      createDate: createAt,
      expireDate: expireAt
    };

    return task;
  }

  getDate(createAtDate, expireAtDate = false) {
    let dateNumber = 10;
    let oneDay = 1;

    const date = new Date(createAtDate);
    let day = expireAtDate ? date.getDate() + oneDay : date.getDate();
    let month = date.getMonth() + oneDay;
    let year = date.getFullYear();

    if (day < dateNumber) {
      day = "0" + day;
    }
    if (month < dateNumber) {
      month = "0" + month;
    }
    if (year < dateNumber) {
      year = "0" + year;
    }
    return `${day}-${month}-${year}`;
  }
}

export default ToDo_List;
