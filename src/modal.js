class ModalPopUp {
  constructor(container, component) {
    this.container = container;
    this.component = component;
  }

  closeModalComponent() {
    this.container.innerHTML = "";
    document.body.style.overflow = "auto";
  }

  closeModalWindow(e) {
    if (e.target.classList.contains("modalOverlay") || e.target.dataset.action === "btn__closeModal" || e.key === "Escape") {
      this.container.innerHTML = "";
      document.body.style.overflow = "auto";
    }
  }
  render() {
    const markup = `
    <div class="modalOverlay">
    <div class="modalComponent"></div>
  </div>
    `;

    this.container.innerHTML = markup;

    const modalComponent = document.querySelector(".modalComponent");
    modalComponent.innerHTML = this.component();
    const modalOverlay = document.querySelector(".modalOverlay");
    modalOverlay.addEventListener("click", this.closeModalWindow.bind(this));
    window.addEventListener("keydown", this.closeModalWindow.bind(this));
  }
}

const container = document.querySelector(".modal");

const modalModule = component => {
  const closeModalComponent = () => {
    container.innerHTML = "";
    document.body.style.overflow = "auto";
  };

  const closeModalWindow = e => {
    if (e.target.classList.contains("modalOverlay") || e.target.dataset.action === "btn__closeModal" || e.key === "Escape") {
      container.innerHTML = "";
      document.body.style.overflow = "auto";
    }
  };

  const markup = `
    <div class="modalOverlay">
    <div class="modalComponent"></div>
  </div>
    `;

  container.innerHTML = markup;

  const modalComponent = document.querySelector(".modalComponent");
  modalComponent.innerHTML = component();
  const modalOverlay = document.querySelector(".modalOverlay");
  modalOverlay.addEventListener("click", closeModalWindow);
  window.addEventListener("keydown", closeModalWindow);
};

export { ModalPopUp };
