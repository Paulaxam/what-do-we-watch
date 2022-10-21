const menuList = document.querySelector(".menu-list");
const mobileMenuIcon = document.querySelector(".mobile-menu");

mobileMenuIcon.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
  menuList.classList.toggle("toggle-menu");
}
