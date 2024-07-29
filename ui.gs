function formatReport() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let selectedRange = sheet.getActiveRange();

  if (selectedRange) { // When range of cells are selected
    let firstRow = selectedRange.getRow();
    let firstColumn = selectedRange.getColumn();
    let numberOfColumns = selectedRange.getNumColumns();

    // Format all selected cells to be beige
    selectedRange.setFontWeight("bold");
    selectedRange.setFontFamily("Comic Sans MS");
    selectedRange.setBackground("#f4e8cf");
    selectedRange.setFontColor("black");

    // Format the first row of the selected range to be red
    let firstRowRange = sheet.getRange(firstRow, firstColumn, 1, numberOfColumns);
    firstRowRange.setBackground("#992D48");
    firstRowRange.setFontColor("white");
//    firstRowRange.createFilter(); // Creates filter function on the cell
  } else {
    SpreadsheetApp.getUi().alert("Please select something.");
  }
}

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu("Custom Formatting").addItem("Format Report", "formatReport").addToUi();
}

function onEdit(e) {
  let range = e.range;
    range.setFontWeight("bold");
    range.setFontFamily("Comic Sans MS");
    range.setBackground("#f4e8cf");
    range.setFontColor("black");
}
