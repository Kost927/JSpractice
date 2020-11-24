function addTaskFromModal() {
  return `
  <form class="add-task__modal-form">
    <span>create at: </span>
    <input class="create-at-modal" type="date" placeholder="Please input create at date">
    <span>expire at: </span>
    <input class="expire-at-modal" type="date" placeholder="Please input expire at date">
    <span>add your task </span>
    <input class="add-task-modal" type="text" placeholder="Please input here your task">
    <button type="button" class="save-btn">Save</button>
    <button type="button" class="cancel-btn">Cancel</button>
    </form>
    `;
}

export { addTaskFromModal };
