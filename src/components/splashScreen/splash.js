window.addEventListener("load", function () {
  const splash = document.querySelector(".splash");

  splash.classList.add("fade-out");

  setTimeout(() => {
    splash.style.display = "none";
  }, 1000);
});
