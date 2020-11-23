const markup = document.querySelector(".root");

function markupList() {
  return `
  <div class="todoWrapper">
  <h2 class="todoTitle">To Do List</h2>
    <ul class="todoList">
    <li class="todoListItem">Task 1</li>
    <li class="todoListItem">Task 2</li>
    <li class="todoListItem">Task 3</li>
    <li class="todoListItem">Task 4</li>
    <li class="todoListItem">Task 5</li>
    </ul>
    </div>
    `;
}

markup.innerHTML = markupList();
