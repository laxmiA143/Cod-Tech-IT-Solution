let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getItemsFromLocalStorage() {
    let stringifyedTodoList = localStorage.getItem("todoList");
    let parserTodoList = JSON.parse(stringifyedTodoList);
    if (parserTodoList === null) {
        return [];
    } else {
        return parserTodoList;
    }
}

let todoList = getItemsFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusChange(labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("selected");

    let objectIndex = todoList.findIndex(function(eachTodo) {
        let indexId = "todo" + eachTodo.uniqueNo;
        if (indexId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[objectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let indexOfDeleteTodo = todoList.findIndex(function(eachTodo) {
        let idOfTodo = "todo" + eachTodo.uniqueNo;
        if (idOfTodo === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(indexOfDeleteTodo, 1);
}

function createAndAppendTodo(todoList) {
    let inputId = "checkbox" + todoList.uniqueNo;
    let labelId = "label" + todoList.uniqueNo;
    let todoId = "todo" + todoList.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = inputId;
    inputElement.checked = todoList.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todoList.task;
    if (todoList.isChecked === true) {
        labelElement.classList.add("selected");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}
for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}

function onAddTodo() {
    let todoUserInput = document.getElementById("todoUserInput");
    let todoUserInputValue = todoUserInput.value;
    if (todoUserInputValue === "") {
        alert("Please enter a task you want to do");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        task: todoUserInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}