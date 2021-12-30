const { ipcRenderer } = require("electron");

const { WORD_DOCUMENT_TYPE } = require("../constants/excel-document-type");

const testElement = document.getElementById("test-element");
const button = document.getElementById("select-file-button");

document.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();

  for (const file of event.dataTransfer.files) {
    // Using the path attribute to get absolute file path
    console.log("File Path of dragged files: ", file.type);
  }
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener("dragenter", (event) => {
  testElement.innerText = "work!";
  console.log("File is in the Drop Space");
});

document.addEventListener("dragleave", (event) => {
  console.log("File has left the Drop Space");
});

button.addEventListener("click", () => {
  ipcRenderer.send("click-button");
});
