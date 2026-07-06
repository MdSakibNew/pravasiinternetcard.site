window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(function () {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 700);
  }
});

const header = document.getElementById("siteHeader");

window.addEventListener("scroll", function () {
  if (header) {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";
    } else {
      header.style.boxShadow = "none";
    }
  }
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
}
