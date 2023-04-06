import { clearing, clear } from './clear.js';

const taskListDisplay = document.querySelector('#data');
const inputValue = document.querySelector('.new-task');
const addButton = document.querySelector('.add-to-list');
const deleteBtn = document.querySelector('.delete');

let taskList = [];

const display = () => {
  taskListDisplay.innerHTML = '';
  taskList = JSON.parse(localStorage.getItem('localItem')) || [];
  taskList.forEach((element) => {
    const task = document.createElement('div');
    const comp = element.completed ? 'checked' : '';
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.innerHTML = `
    <input type="checkbox" class="check" ${comp} id="check" data-set="${element.index}">
    <input class="edit" type="text" value="${element.description}">
    <div class="can">
    <i id="${element.index}" class="fa-solid fa-trash-can"></i>
    </div>
    `;
    taskListDisplay.appendChild(task);

    task.addEventListener('dragstart', (e) => {
      const index = Array.from(taskListDisplay.children).indexOf(e.target);
      e.dataTransfer.setData('text/plain', index);
    });

    const taskList2 = task.children[1];
    taskList2.addEventListener('change', () => {
      const listingData = document.querySelector('#data');
      const arrayList = Array.from(listingData.children);
      const index = arrayList.indexOf(task);
      const taskLocal = JSON.parse(localStorage.getItem('localItem'));
      taskLocal[index].description = taskList2.value;
      localStorage.setItem('localItem', JSON.stringify(taskLocal));
    });
  });
};

display();

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputValue.value === '') return;
  taskList = JSON.parse(localStorage.getItem('localItem')) || [];

  const object = {
    description: inputValue.value,
    index: taskList.length + 1,
    completed: false,
  };
  taskList.push(object);
  localStorage.setItem('localItem', JSON.stringify(taskList));

  inputValue.value = '';
  display();
});

const remove = (index) => {
  const removeList = taskList.filter((element) => element.index !== index);
  taskList.length = 0;
  let i = 1;
  removeList.forEach((element) => {
    element.index = i;
    i += 1;
  });
  taskList.push(...removeList);
  localStorage.setItem('localItem', JSON.stringify(taskList));
  display();
};

taskListDisplay.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-solid')) {
    const index = parseInt(e.target.getAttribute('id'), 10);
    remove(index);
  }
});

taskListDisplay.addEventListener('click', clearing);
deleteBtn.addEventListener('click', () => {
  clear();
  display();
});

taskListDisplay.addEventListener('dragover', (e) => {
  e.preventDefault();
  taskListDisplay.classList.add('dragover');
});

taskListDisplay.addEventListener('dragleave', (e) => {
  e.preventDefault();
  taskListDisplay.classList.remove('dragover');
});

taskListDisplay.addEventListener('drop', (e) => {
  e.preventDefault();
  taskListDisplay.classList.remove('dragover');
  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
  const toIndex = Array.from(taskListDisplay.children).indexOf(e.target);
  if (fromIndex !== toIndex) {
    const task = taskList.splice(fromIndex, 1)[0];
    taskList.splice(toIndex, 0, task);
    localStorage.setItem('localItem', JSON.stringify(taskList));
    display();
  }
});