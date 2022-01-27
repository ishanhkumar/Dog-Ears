// execute foreground script
chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log("calling foreground script"));

// declare variables to store data from currently active tab
var current_tab_url;
var current_tab_title;

// get tab information each time a tab is selected
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {

    // set variables as data
    current_tab_url = current_tab_info.url;
    current_tab_title = current_tab_info.title;

  });
});

// function that checks if currently active tab is valid url for saving
function tab_checker() {
  // if either tab or url is unobtainable, tab cannot be accessed
  if (!current_tab_url || !current_tab_title) {
    return false;
  }
  else {
    return true;
  }
}

// remove all data
function clear_all_data() {
  chrome.storage.local.clear();
  var error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }

  console.log("Removed all saved websites.");
}

// function that stores title and url of currently active tab when called
function save_data() {
  // check if currently active tab is valid for saving
  if (!current_tab_url || !current_tab_title) {
    console.log("invalid webpage");
    return;
  }
  // set data with url as key and title as value
  chrome.storage.local.set({[current_tab_url]: current_tab_title});
}