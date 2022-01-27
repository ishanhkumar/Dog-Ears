/* Script for popup page */

// get document object model
var page = chrome.extension.getBackgroundPage();

// get elements
save_button = document.getElementById("save_button");
view_list = document.getElementById("view_list");

if (page.tab_checker()) {
  // add event listener to save button
  // call function that saves url and title of currently viewed page
  save_button.addEventListener("click", function () {
    page.save_data();
  });
}
// if tab isn't valid, don't add event listener and change value of element to reflect state
else {
  save_button.innerHTML = "This page cannot be saved.";
}


