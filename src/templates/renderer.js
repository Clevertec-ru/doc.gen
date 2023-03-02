const { ipcRenderer } = require("electron");

const button = document.getElementById("select-file-button");
const resultBlock = document.getElementById("result");

const getTitle = (text = "") => {
  const title = document.createElement("p");

  title.className = "result-title";
  title.innerText = text;

  return title;
};

const getOpenResultButton = () => {
  const resultButton = document.createElement("button");

  resultButton.className = "result-block result-button";
  resultButton.innerText = "Открыть файл";

  return resultButton;
};

const getResultList = () => {
  const list = document.createElement("ul");

  list.className = "result-block result-list";

  return list;
};

button.addEventListener("click", () => {
  const title = getTitle("Выбор файла...");

  button.disabled = true;

  resultBlock.append(title);
  ipcRenderer.send("click-button");
});

ipcRenderer.on("generate-success", (event, messages) => {
  const list = getResultList();
  const resultButton = getOpenResultButton();

  resultBlock.innerHTML = null;
  resultBlock.append(list);
  resultBlock.append(resultButton);

  messages.fileNames.forEach((filename) => {
    const fileButton = document.createElement("li");

    list.className = "result-block result-list";
    fileButton.innerText = filename;

    fileButton.addEventListener("click", () => {
      ipcRenderer.send("open-result", messages.filePath);
    });

    list.append(fileButton);
  });

  resultButton.addEventListener("click", () => {
    ipcRenderer.send("open-result", messages.filePath);
  });

  button.disabled = false;
});

ipcRenderer.on("file-cancelled", () => {
  resultBlock.innerHTML = null;
  button.disabled = false;
});
