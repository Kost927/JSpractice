import ToDo_List from "./index.js";
import { events } from "./Events.js";
import {
  MODAL_POPUP__CLASS,
  POPUP_OVERLAY__CLASS,
  DISPLAY_NONE,
  OVERFLOW_HIDDEN,
  MODAL_CREATE_INPUT__CLASS,
  MODAL_TITLE_INPUT__CLASS,
  CANCEL_BTN__CLASS,
  SAVE_BTN__CLASS,
  SHOW_MODAL_BTN__CLASS,
  MODAL_EXPIRE_INPUT__CLASS,
  SHOW_TASKS,
  DELETE_TASK
} from "./constants.js";

class Popup extends ToDo_List {
  taskForEdit = {}
  constructor() {
    super();
    this.popupSelectors();
    this.popupSubscribers();
  }

  setupListeners() {
    const cancelBtn = document.querySelector(CANCEL_BTN__CLASS);
    const saveBtn = document.querySelector(SAVE_BTN__CLASS);
    const showModalBtn = document.querySelector(SHOW_MODAL_BTN__CLASS);

    showModalBtn.addEventListener("click", () => this.showPopupToAdd());
    cancelBtn.addEventListener("click", () => this.closePopup());
    saveBtn.addEventListener("click", () => this.saveTask());
    this.titleInput.addEventListener("change", () => this.titleInput);
    this.createAtInput.addEventListener("change", () => this.createAtInput);
    this.expireAtInput.addEventListener("change", () => this.expireAtInput);
  }

  popupSelectors() {
    this.titleInput = document.querySelector(MODAL_TITLE_INPUT__CLASS);
    this.createAtInput = document.querySelector(MODAL_CREATE_INPUT__CLASS);
    this.expireAtInput = document.querySelector(MODAL_EXPIRE_INPUT__CLASS);
  }

  popupSubscribers() {
    events.subscribe('editTask', task => this.showPopupToEdit(this.taskForEdit = task));

  }

  getDateFormat(date) {
    return date
      .split("-")
      .reverse()
      .join("-");
  }

  showPopupToAdd() {
    const { value } = this.inputField;

    if (value) {
      this.titleInput.value = value;
    }

    this.togglePopup();
    this.titleInput.focus();
    this.createAtInput.value = this.getDateFormat(this.getDate(Date.now()));
    this.expireAtInput.value = this.getDateFormat(this.getDate(Date.now(), true));
  }

  showPopupToEdit(task) {
    this.togglePopup();
    this.setTaskToEdit(task);
  }

  setTaskToEdit({ title, createDate, expireDate }) {
    this.titleInput.value = title;
    this.createAtInput.value = this.getDateFormat(createDate);
    this.expireAtInput.value = this.getDateFormat(expireDate);
  }

  closePopup() {
    this.togglePopup();
    this.clearFields();
  }

  togglePopupArray(array) {
    array.map(object => object.element.classList.toggle(object.className));
  }

  togglePopup() {
    const modalPopup = document.querySelector(MODAL_POPUP__CLASS);
    const popupOverlay = document.querySelector(POPUP_OVERLAY__CLASS);

    this.togglePopupArray([
      { element: modalPopup, className: DISPLAY_NONE },
      { element: popupOverlay, className: DISPLAY_NONE },
      { element: document.body, className: OVERFLOW_HIDDEN }
    ]);

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
    const id = this.taskForEdit.id;
    const task = {
      id: Date.now(),
      title,
      createAt,
      expireAt
    };

    id && events.broadcast(DELETE_TASK, id);

    this.setTask(task);
    this.closePopup();
    events.broadcast(SHOW_TASKS);
  }
}

export default Popup;
