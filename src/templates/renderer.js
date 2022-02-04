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

  resultBlock.innerHTML = null;

  resultBlock.append(list);

  messages.forEach(({ resultName, fileName }) => {
    const fileButton = document.createElement("button");

    fileButton.innerText = resultName;

    fileButton.addEventListener("click", () => {
      ipcRenderer.send("file-selected", fileName);
    });

    list.append(fileButton);
  });

  button.disabled = false;
});

ipcRenderer.on("file-cancelled", () => {
  resultBlock.innerHTML = null;
  button.disabled = false;
});
