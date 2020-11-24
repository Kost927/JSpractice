import { ModalPopUp } from "./src/modal.js";
import { addTaskFromModal } from "./src/createTaskWithModal.js";

const todoObjectList = [];

console.log(todoObjectList);

class Todo_Class {
  constructor(item) {
    this.ulElement = item;
  }

  add() {
    const todoInput = document.querySelector(".myInput").value;
    if (todoInput !== "") {
      let date = new Date();
      const todoObject = {
        id: todoObjectList.length,
        todoText: todoInput,
        createAt: `Create at: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
        expireAt: `Expire at: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 1}`
      };

      todoObjectList.push(todoObject);
      this.renderList();
      document.querySelector(".myInput").value = "";
    }
  }

  renderList() {
    this.ulElement.innerHTML = "";

    todoObjectList.forEach(object_item => {
      const liElement = document.createElement("li");
      const pCreateElement = document.createElement("p");
      const pExpireElement = document.createElement("p");
      const pToDoElement = document.createElement("p");

      pToDoElement.innerText = object_item.todoText;
      pToDoElement.setAttribute("data-id", object_item.id);

      pCreateElement.innerText = object_item.createAt;
      pExpireElement.innerText = object_item.expireAt;

      this.ulElement.appendChild(liElement);
      liElement.appendChild(pToDoElement);
      liElement.appendChild(pCreateElement);
      liElement.appendChild(pExpireElement);
    });
  }
}

const listSection = document.querySelector(".myUL");

let myTodoList = new Todo_Class(listSection);

document.querySelector(".addBtn").addEventListener("click", function() {
  myTodoList.add();
});

document.querySelector(".myInput").addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    myTodoList.add();
  }
});

const addTaskBtn = e => {
  if (e.target) {
    new ModalPopUp(document.querySelector(".modal"), addTaskFromModal).render();
  }
};

const addTaskModalBtn = document.querySelector(".openModal");
addTaskModalBtn.addEventListener("click", addTaskBtn);
