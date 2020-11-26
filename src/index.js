import { savedData } from "./SavedData.js"


class ToDo_List {
  constructor() {
    this.isShowPopup = false;
    this.inputField = document.querySelector(".taskListInput");
  }


  setTask(data) {
    const allTasks = savedData.getTasks();
    const newTask = this.getTaskFormat(data);
    const tasks = [...allTasks, newTask];
    savedData.setTasks(tasks);
  }

  getTaskFormat(data) {
    const task = {
      id: data.id || Date.now(),
      settled: false,
      title: data.title,
      createDate: data.createAt,
      expireDate: data.expireAt
    };

    return task;
  }

  getDate(createAtDate, expireAtDate = false) {
    const date = new Date(createAtDate);
    let day = expireAtDate ? date.getDate() + 1 : date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (year < 10) {
      year = "0" + year;
    }
    return `${day}-${month}-${year}`;
  }
}

export default ToDo_List;
