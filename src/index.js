/* eslint-disable */
import _ from 'lodash';
import './style.css';


const newtodo = document.querySelector("#list_items");
const newtodoListform = document.querySelector("#form_list");
const newListInput = document.querySelector("#list_input");

const localStorageItems = "task.lists";

let lists = JSON.parse(localStorage.getItem(localStorageItems)) || [];

newtodoListform.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(activity) {
  return { id: Date.now().toString(), activity: activity, tasks: false };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(localStorageItems, JSON.stringify(lists));
}

function render() {
  clearElement(newtodo);
  lists.forEach((list) => {
    const newListElement = document.createElement("li");
    newListElement.dataset.listId = list.id;
    newListElement.classList.add = "list-name";
    // newListElement.className.padEnd = 'list-name'

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    newListElement.appendChild(checkBox);

    const paragraph = document.createElement('p');
    paragraph.innerHTML = list.activity;
    newListElement.appendChild(paragraph);

    newtodo.appendChild(newListElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();