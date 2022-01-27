/* Script for options page */
var page = chrome.extension.getBackgroundPage();

clear_all_data_button = document.getElementById('clear_all_data_button');

// add clear_all_data function to 'clear all' button
clear_all_data_button.addEventListener("click", function () {
    clear_all_data();
    location.reload();      // reload page to refresh table 
});

// function to fill table with all saved data
function display_all() {

    // initialize variable to hold all stored keys
    var all_keys;

    // find table element
    var table = document.getElementById('mainTable');

    var row;            // row in table
    var cell_number;    // cell that holds index of row
    var cell_title;     // cell that holds title of saved page
    var cell_url;       // cell that holds url of saved page
    var cell_option     // cell that holds a button to delete row
    var link;           // to hold anchor tag for 'remove' (❌) button
    var counter = 0;    // create counter variable to enumerate rows

    // get all keys
    chrome.storage.local.get(null, function (items) {
        all_keys = Object.keys(items);
        console.log("Type: " + typeof all_keys);
        console.log(all_keys);
        console.log("Length is: " + all_keys.length);

        // get all values associated with each key
        all_keys.forEach(element => {
            chrome.storage.local.get(element, function (value) {
                console.log(element);
                console.log(value[element]);

                // insert empty row and cells into table
                row = table.insertRow(counter);
                cell_remove = row.insertCell(0);    // cell to hold remove button
                cell_number = row.insertCell(1);    // cell to hold index
                cell_title = row.insertCell(2);     // cell to hold page title
                cell_url = row.insertCell(3);       // cell to hold page url

                // create and fill anchor tags to be added inside table cells
                link_number = document.createElement('a');          // index cell
                link_number.setAttribute('href', element);
                link_number.setAttribute('target', "_blank");              // set attributes for more secure redirect
                link_number.setAttribute('rel', 'noopener noreferrer');

                link_title = document.createElement('a');           // title cell
                link_title.setAttribute('href', element);
                link_title.setAttribute('target', "_blank");              // set attributes for more secure redirect
                link_title.setAttribute('rel', 'noopener noreferrer');

                link_url = document.createElement('a');             // url cell
                link_url.setAttribute('href', element);
                link_url.setAttribute('target', "_blank");              // set attributes for more secure redirect
                link_url.setAttribute('rel', 'noopener noreferrer');

                counter++;

                // give row id 
                row.setAttribute('id', counter);

                // fill empty cells with values
                cell_number.appendChild(link_number);
                cell_title.appendChild(link_title);
                cell_url.appendChild(link_url);

                link_number.innerHTML = counter;
                link_title.innerHTML = value[element];
                link_url.innerHTML = element;

                // add remove function to remove button
                link = document.createElement("a");                 // create anchor element
                link.addEventListener('click', function() {         // add event listener
                    remove_page(element);                           // call remove_page function
                });

                link.setAttribute('target', "_blank");              // set attributes for more secure redirect
                link.setAttribute('rel', 'noopener noreferrer');

                link.id = 'a' + counter;                            // create and add id
                link.innerHTML = "❌";                              
                link.classList.add('remove_link');                  // add class

                cell_remove.classList.add('removeButtonHolder');
                cell_remove.appendChild(link);                      // add element to cell
            });
        });
    });
}

// remove all data
function clear_all_data() {
    chrome.storage.local.clear();
}

// call function to display all data
display_all();

// function to remove specific page
function remove_page(given_key) {
    console.log("remove page function called" + given_key);
    chrome.storage.local.remove([given_key]);
    location.reload();
}

// function to reload table
function reload_table() {
    var table = document.getElementById('mainTable');
    var value = table.innerHTML;

    table.innerHTML = value;
    console.log("reloaded table");
    return table;
}