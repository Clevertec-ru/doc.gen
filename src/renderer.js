const { ipcRenderer } = require("electron");

const { WORD_DOCUMENT_TYPE } = require("../constants/excel-document-type");

const testElement = document.getElementById("test-element");
const button = document.getElementById("select-file-button");
const resultBlock = document.getElementById("result");

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

ipcRenderer.on("generate-success", (_, messages) => {
  const title = document.createElement("p");
  const list = document.createElement("div");

  title.className = "result-title";
  title.innerText = "Сгенерированные акты:";

  list.className = "result-block result-list";

  resultBlock.append(title);
  resultBlock.append(list);

  messages.forEach(({ resultName, fileName }) => {
    const fileButton = document.createElement("button");

    fileButton.innerText = resultName;

    fileButton.addEventListener("click", () => {
      ipcRenderer.send("file-selected", fileName);
    });

    list.append(fileButton);
  });
});
