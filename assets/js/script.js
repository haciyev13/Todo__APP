let todosForm = document.querySelector(".input__section__form");
let todoInput = document.querySelector(".input__section__form-input");
let ul = document.querySelector(".todos__section__list");

let lastItem = document.querySelector(".todos__section__list__item");

let span = document.querySelector(".todos__section__list__item--count");

let allTodos = JSON.parse(localStorage.getItem("todos"))|| [];

// console.log(allTodos);

allTodos.forEach((element) => {
  let listItem = createTodo(element.todoContent, element.id);
  ul.insertAdjacentHTML("afterbegin", listItem);
  // console.log(listItem);
});

let yaradilanburayigilacaq = [];
let count = 0;

todosForm.addEventListener("submit", function (e) {
  e.preventDefault();
  count++;
  if (todoInput.value.trim() === "") {
    alert("Boş daxil edilə bilməz!");
  } else {
    let listItem = createTodo(todoInput.value, count);
    ul.insertAdjacentHTML("afterbegin", listItem);
    //! Local storage
    yaradilanburayigilacaq.push({
      todoContent: todoInput.value,
      id: count,
      isComplited: false,
    });

    localStorage.setItem("todos", JSON.stringify(yaradilanburayigilacaq));
    console.log(yaradilanburayigilacaq);
    span.textContent = count;
  }
  if (yaradilanburayigilacaq.length > 0) {
    lastItem.classList.remove("hidden");
  } else {
    lastItem.classList.add("hidden");
  }

  todoInput.value = "";
});

function getElement(element) {
  if (!element.firstElementChild.classList.contains("checked")) {
    element.firstElementChild.classList.add("checked");

    let img = document.createElement("img");
    img.src = "./assets/images/checked.svg";
    img.alt = "checked";

    element.firstElementChild.appendChild(img);

    element.lastElementChild.style.textDecoration = "line-through";
    element.lastElementChild.style.color = "#ccc";
  } else {
    element.firstElementChild.classList.remove("checked");
    element.firstElementChild.firstElementChild.remove();
    element.lastElementChild.style.textDecoration = "none";
    element.lastElementChild.style.color = "#000";
  }
}

function createTodo(todoText, todoId) {
  return `
  <li onclick= "getElement(this)" class="todos__section__list__item" id=${todoId}>
          <div class="todos__section__list__item-checkbox">

          </div>
          <p class="todos__section__list__item-text">
            ${todoText}
          </p>
        </li>
  `;
}
