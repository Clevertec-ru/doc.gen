const { ipcRenderer } = require("electron");

const testElement = document.getElementById("test-element");
const button = document.getElementById("select-file-button");
const resultBlock = document.getElementById("result");

const getTitle = (text = "") => {
  const title = document.createElement("p");

  title.className = "result-title";
  title.innerText = text;

  return title;
};

const getResultList = () => {
  const list = document.createElement("div");

  list.className = "result-block result-list";

  return list;
};

const getOpenResultButton = () => {
  const resultButton = document.createElement("button");

  resultButton.className = "result-block result-button";
  resultButton.innerText = "Открыть файл";

  return resultButton;
};

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
  const title = getTitle("Выбор файла...");
  resultBlock.append(title);

  button.disabled = true;
  ipcRenderer.send("click-button");
});

ipcRenderer.on("generate-success", (_, messages) => {
  const list = getResultList();
  const resultButton = getOpenResultButton();

  resultBlock.innerHTML = null;

  resultBlock.append(list);
  resultBlock.append(resultButton);

  messages.forEach((message) => {
    const fileButton = document.createElement("button");

    fileButton.innerText = message;

    list.append(fileButton);
  });

  resultButton.addEventListener("click", () => {
    ipcRenderer.send("open-result");
  });

  button.disabled = false;
});

ipcRenderer.on("file-cancelled", () => {
  resultBlock.innerHTML = null;
  button.disabled = false;
});
