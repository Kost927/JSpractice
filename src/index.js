class ToDo_List {
  constructor() {
    this.tasks = [];
    this.isValid = true;
    this.isModalOpen = false;
    this.inputField = document.querySelector(".taskListInput");
  }

  // getAllTasks() {
  //   return this.tasks;
  // }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  setTask(data) {
    // console.log('data', data)
    const allTasks = this.getTasks();
    const newTask = this.getTaskFormat(data);
    const tasks = [...allTasks, newTask];
    // console.log('tasks', tasks)
    this.setTasks(tasks);
  }


  getTaskFormat(data) {
    let date = new Date();
    const task = {
      id: data.id || Date.now(),
      title: data.title,
      createDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
      expireDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() + 1}`
    };

    return task;
  }

  cleanInputField() {
    this.isValid = true;
  }

  getDate(inputDate, isDeadline = false) {
    const date = new Date(inputDate);
    let dd = isDeadline ? date.getDate() + 1 : date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (yy < 10) yy = '0' + yy;
    return `${dd}.${mm}.${yy}`;
  }


}

export default ToDo_List;;
