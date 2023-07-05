document.addEventListener("DOMContentLoaded", function () {
  const buttonModalOpen = document.querySelectorAll(".buttonModalOpen");
  const buttonModalClose = document.getElementById("buttonModalClose");
  const modal = document.getElementById("modalWrapper");

  if (buttonModalOpen && buttonModalClose && modal) {
    buttonModalOpen.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.add("active");
      });
    });

    buttonModalClose.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.classList.remove("active");
    });
  }
});
