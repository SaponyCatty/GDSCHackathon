function fetchData() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheets()[0];
  let data = sheet.getDataRange().getValues();
  
  // Log the data (for debugging purposes)
  Logger.log(data);

  //JSON object to send to AppSheet
  var jsonData = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    jsonData.push({
      'Column1': row[0],
      'Column2': row[1],
      'Column3': row[2],
      'Column4': row[3],
      'Column5': row[4],
      'Column6': row[5],
      'Column7': row[6],
      'Column8': row[7],
      'Column9': row[8],
      'Column10': row[9],
    });
  }
  
  //for api purposes
  Logger.log(JSON.stringify(jsonData));
  
}

function onOpen() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    Logger.log("No active spreadsheet found.");
    return;
  }

  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Upload')
    .addItem('Upload to Database', 'fetchData')
    .addToUi();
}


// Generate Employee ID on form submission
function onEmployeeFormSubmit(e) {
  try {
    var sheet = e.source.getActiveSheet(); // Get the active sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // Get header row
    var idColumn = headers.indexOf('EmployeeID') + 1; // Find the 'EmployeeID' column index, adding 1 to match spreadsheet index

    // If 'EmployeeID' column doesn't exist, add it as the last column
    if (idColumn === 0) {
      idColumn = sheet.getLastColumn() + 1;
      sheet.getRange(1, idColumn).setValue('EmployeeID');
    }

    var row = e.range.getRow(); // Get the row of the new data
    var idPrefix = "E";

    // Generate the ID based on the current row number minus header
    var idNumber = (row - 1).toString().padStart(4, '0');
    var uniqueID = idPrefix + idNumber;

    // Set the generated ID in the 'EmployeeID' column of the current row
    sheet.getRange(row, idColumn).setValue(uniqueID);
  } catch (error) {
    Logger.log('Error: ' + error.message); // Log any errors for debugging
  }
}


// Function to create a trigger for form submission
function onEmployeeFormSubmitTrigger() {
  ScriptApp.newTrigger('onEmployeeFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

