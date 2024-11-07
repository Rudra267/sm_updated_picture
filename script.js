"use strict";

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = null;

// Initially hide the menu border
menuBorder.style.display = "none";

function clickItem(item, index) {
  menu.style.removeProperty("--timeOut");

  // If the clicked item is already active, remove the active class and hide the border
  if (activeItem === item) {
    item.classList.remove("active");
    activeItem = null;
    hideMenuBorder(); // Hide the menu border
    return;
  }

  // Otherwise, transfer active class to the clicked item and show border
  if (activeItem) {
    activeItem.classList.remove("active");
  }

  item.classList.add("active");
  activeItem = item;
  showMenuBorder(); // Show the menu border
  offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
  const offsetActiveItem = element.getBoundingClientRect();
  const left =
    Math.floor(
      offsetActiveItem.left -
        menu.offsetLeft -
        (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + "px";
  menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

// Show the menu border
function showMenuBorder() {
  menuBorder.style.display = "block";
}

// Hide the menu border
function hideMenuBorder() {
  menuBorder.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  // Remove the 'active' class from all menu items on page load
  menuItems.forEach((item) => item.classList.remove("active"));

  // Set up click event listeners for each menu item
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => clickItem(item, index));
  });
});

window.addEventListener("resize", () => {
  if (activeItem) {
    offsetMenuBorder(activeItem, menuBorder);
  } else {
    hideMenuBorder(); // Hide border if no item is active
  }
  menu.style.setProperty("--timeOut", "none");
});
