
// Generate Candidate ID on form submission
function onCandidateFormSubmit(e) {
  try {
    var sheet = e.range.getSheet(); // Get the sheet where the form response was added
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // Get header row
    var idColumn = headers.indexOf('CandidateID') + 1; // Find the 'CandidateID' column index, adding 1 to match spreadsheet index

    // If 'CandidateID' column doesn't exist, add it as the last column
    if (idColumn === 0) { // This should be -1 to check if the column doesn't exist
      idColumn = sheet.getLastColumn() + 1;
      sheet.getRange(1, idColumn).setValue('CandidateID');
    }

    var row = e.range.getRow(); // Get the row of the new data
    var idPrefix = "C";

    // Generate the ID based on the current row number minus header
    var idNumber = (row - 1).toString().padStart(4, '0');
    var uniqueID = idPrefix + idNumber;

    // Set the generated ID in the 'CandidateID' column of the current row
    sheet.getRange(row, idColumn).setValue(uniqueID);
  } catch (error) {
    Logger.log('Error: ' + error.message); // Log any errors for debugging
  }
}


// Function to create a trigger for form submission
function onCandidateFormSubmitTrigger() {
  ScriptApp.newTrigger('onCandidateFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}


// Function to send confirmation email
function myFunction(e) {
  let formResponse = e.response;
  let itemResponses = formResponse.getItemResponses();

  itemResponses.forEach(function(itemResponse) {
    let item = itemResponse.getItem();
    let title = item.getTitle();
    let response = itemResponse.getResponse();

    if (title === "Name") {
      name = response;
    } else if (title === "Email") {
      email = response;
    }
  });

  let confirmLetter = DocumentApp.openById("1Ty2Z7OZqw916tbgyl7HbX3nC9Vu43tFMH7953FneEmQ");
  let content = confirmLetter.getBody().getText();
  let greeting = "Hi " + name + ",\n\n" + content;

  GmailApp.sendEmail(email, "Confirmation of receipt of your application", greeting);
}



function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Open Form Sidebar', 'showFormSidebar')
    .addToUi();
}

function showFormSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Google Form')
      .setWidth(400)
      .setHeight(600);
  SpreadsheetApp.getUi().showSidebar(html);
}
