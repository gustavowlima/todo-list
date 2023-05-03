const tasksData =
  JSON.parse(localStorage.getItem("tasksList")) === null
    ? []
    : JSON.parse(localStorage.getItem("tasksList"));

const submitButton = document.getElementById("submitButton");
const tasksWrapper = document.getElementById("tasksWrapper");
const newTaskInput = document.getElementById("taskInput");

const createElement = () => {
  tasksWrapper.innerHTML = "";

  tasksData.map((item, index) => {
    const div = document.createElement("div");
    div.setAttribute("id", "taskItemWrapper");
    item.concluded && div.classList.add("taskChecked");

    const checkedElement = document.createElement("img");
    checkedElement.setAttribute(
      "src",
      `${item.concluded ? "./assets/check.svg" : "./assets/Frame.svg"}`
    );
    checkedElement.setAttribute("class", "taskChecker");
    checkedElement.setAttribute("onclick", `checkedTask(${index})`);
    div.appendChild(checkedElement);

    const textElement = document.createElement("span");
    textElement.setAttribute("class", "taskText");
    item.concluded && textElement.classList.add("taskTextChecked");
    textElement.innerHTML = item.text;
    div.appendChild(textElement);

    const closeElement = document.createElement("img");
    closeElement.setAttribute("src", "./assets/remove.svg");
    closeElement.setAttribute("onClick", `removeElement(${index})`);
    div.appendChild(closeElement);

    tasksWrapper.appendChild(div);
  });
};

createElement();

const refreshTasks = () => {
  localStorage.setItem("tasksList", JSON.stringify(tasksData));
  createElement();
};

const checkedTask = (index) => {
  tasksData[index].concluded = !tasksData[index].concluded;
  refreshTasks();
};

const removeElement = (index) => {
  tasksData.splice(index, 1);
  refreshTasks();
};

submitButton.addEventListener("click", () => {
  tasksData.unshift({
    id: Date.now().toString(36),
    text: newTaskInput.value,
    concluded: false,
  });

  refreshTasks();
  newTaskInput.value = "";
});
