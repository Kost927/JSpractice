import ToDo_List from "./index.js";
import { events } from "./Events.js";

class Popup extends ToDo_List {
  constructor() {
    super();
    // this.taskForEdit = {};
    this.titleInput = document.querySelector(".modalTitleInput");
    this.createAtInput = document.querySelector(".modalCreateInput");
    this.expireAtInput = document.querySelector(".modalExpireInput");

    // events.subscribe("editTask", task => this.showModalToEdit((this.taskForEdit = task)));

  }

  setupListeners() {
    const cancelBtn = document.querySelector(".cancelBtn");
    const saveBtn = document.querySelector(".saveBtn");
    const showModalBtn = document.querySelector(".showModalBtn");

    showModalBtn.addEventListener("click", () => this.showModalToAdd());
    cancelBtn.addEventListener("click", () => this.closeModal());
    saveBtn.addEventListener("click", () => this.saveTask());
    this.titleInput.addEventListener("change", () => this.cleanInputField(this.titleInput));
    this.expireAtInput.addEventListener("change", () => this.cleanInputField(this.expireAtInput));
  }

  showModalToAdd() {
    if (this.inputField.value) {
      this.titleInput.value = this.inputField.value;
    }

    if (!this.isValid) {
      this.cleanInputField(this.inputField);
    }

    this.toggleModal();
    this.titleInput.focus();
    this.createAtInput.value = this.getDateFormat(this.getDate(Date.now()));
    this.expireAtInput.value = this.getDateFormat(this.getDate(Date.now(), true));
  }

//   setDataForEdit(task) {
//     this.titleInput.value = task.title;
//       this.createAtInput.value = this.getDateFormat(task.createTaskDate);
//       this.expireAtInput.value = this.getDateFormat(task.expireTaskDate);
//   }

  closeModal() {
    this.toggleModal();
    this.clearFields();

    if (!this.isValid) {
      this.cleanInput(this.inputField);
    }
  }

  toggleModal() {
    const modalPopup = document.querySelector(".modalPopup");
    const popupOverlay = document.querySelector(".popupOverlay");

    document.body.classList.toggle("overflow-hidden");
    popupOverlay.classList.toggle("display-none");
    modalPopup.classList.toggle("display-none");
    this.isModalOpen = !this.isModalOpen;
  }

  clearFields() {
    this.titleInput.value = "";
    this.inputField.value = "";

    this.cleanInputField(this.titleInput);
    this.cleanInputField(this.expireAtInput);
  }

  getDateFormat(date) {
    return date
      .split(".")
      .reverse()
      .join("-");
  }

  saveTask() {
      const title = this.titleInput.value;
      let date = new Date();
      const createTaskDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
      const expireTaskDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() + 1}`;
      
    //   console.log('createTaskDate', createTaskDate)
    //   console.log('expireTaskDate', expireTaskDate)
    //   console.log('title', title)
      
    // const id = this.taskForEdit.id;

    const task = {
    //   id,
      title: title,
      createTaskDate: createTaskDate,
      expireTaskDate: expireTaskDate
    };

    this.setTask(task);
    this.closeModal();
    events.publish('showTasks');
  }
}

export default Popup;
