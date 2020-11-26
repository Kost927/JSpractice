import ToDo_List from "./index.js";
import { events } from "./Events.js";

class Popup extends ToDo_List {
  constructor() {
    super();

    this.titleInput = document.querySelector(".modalTitleInput");
    this.createAtInput = document.querySelector(".modalCreateInput");
    this.expireAtInput = document.querySelector(".modalExpireInput");

  }

  setupSubscriber() {
    const cancelBtn = document.querySelector(".cancelBtn");
    const saveBtn = document.querySelector(".saveBtn");
    const showModalBtn = document.querySelector(".showModalBtn");

    showModalBtn.addEventListener("click", () => this.showPopupToAdd());
    cancelBtn.addEventListener("click", () => this.closePopup());
    saveBtn.addEventListener("click", () => this.saveTask());
    this.titleInput.addEventListener("change", () => this.titleInput);
    this.expireAtInput.addEventListener("change", () => this.expireAtInput);
  }

  showPopupToAdd() {
    if (this.inputField.value) {
      this.titleInput.value = this.inputField.value;
    }


    this.togglePopup();
    let currentDate = new Date();
    this.titleInput.focus();
    (this.createAtInput.value = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`),
      (this.expireAtInput.value = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`);
  }

  closePopup() {
    this.togglePopup();
    this.clearFields();

  }

  togglePopup() {
    const modalPopup = document.querySelector(".modalPopup");
    const popupOverlay = document.querySelector(".popupOverlay");

    document.body.classList.toggle("overflow-hidden");
    popupOverlay.classList.toggle("display-none");
    modalPopup.classList.toggle("display-none");
    this.isShowPopup = !this.isShowPopup;
  }

  clearFields() {
    this.titleInput.value = "";
    this.inputField.value = "";

  }

  saveTask() {
    const title = this.titleInput.value;
    const createAt = this.getDate(this.createAtInput.value);
    const expireAt = this.getDate(this.expireAtInput.value);

    const id = Date.now();

    const task = {
      id,
      title: title,
      createAt: createAt,
      expireAt: expireAt
    };

    this.setTask(task);
    this.closePopup();
    events.broadcast("showTasks");
  }
}

export default Popup;
