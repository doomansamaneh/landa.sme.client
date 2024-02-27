window.addEventListener("load", function () {
  const clouds = document.querySelector(".clouds");

  clouds.classList.add("fade-out");

  setTimeout(() => {
    clouds.style.display = "none";
  }, 600);
});
