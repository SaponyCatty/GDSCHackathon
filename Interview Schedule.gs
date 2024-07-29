// Generate Interview Schedule ID on form submission
function onInterviewFormSubmit(e) {
  try {
    var sheet = e.source.getActiveSheet(); // Get the active sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // Get header row
    var idColumn = headers.indexOf('ISID') + 1; // Find the 'ISID' column index, adding 1 to match spreadsheet index

    // If 'ISID' column doesn't exist, add it as the last column
    if (idColumn === 0) {
      idColumn = sheet.getLastColumn() + 1;
      sheet.getRange(1, idColumn).setValue('ISID');
    }

    var row = e.range.getRow(); // Get the row of the new data
    var idPrefix = "IS";

    // Generate the ID based on the current row number minus header
    var idNumber = (row - 1).toString().padStart(4, '0');
    var uniqueID = idPrefix + idNumber;

    // Set the generated ID in the 'ISID' column of the current row
    sheet.getRange(row, idColumn).setValue(uniqueID);
  } catch (error) {
    Logger.log('Error: ' + error.message); // Log any errors for debugging
  }
}

// Function to create a trigger for form submission
function onInterviewFormSubmitTrigger() {
  ScriptApp.newTrigger('onInterviewFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}



