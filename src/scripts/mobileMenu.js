document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("openButton");
  const closeButton = document.getElementById("closeButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (openButton && closeButton && mobileMenu) {
    openButton.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.add("active");
    });

    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.remove("active");
    });
  }
});
