const formlayout = document.querySelector('form');
const input = document.querySelector('#listAdd');
const todoItems = document.querySelector('.todoItems');

let todoTask;
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const store = () => {
  todoTask = {
    Description: input.value,
    id: todos.length + 1,
    completed: false,
  };
  todos.push(todoTask);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const clear = () => {
  input.value = '';
};

const removeTask = (id) => {
  todos = todos.filter((books) => books.id !== id);
  todos.forEach((todoTask, id) => {
    todoTask.id = id + 1;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
};

const addTask = (todoTask) => {
  const ul = document.createElement('div');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checkBox');
  const newInp = document.createElement('input');
  newInp.type = 'text';
  newInp.classList.add('newInput');
  newInp.value = todoTask.Description;
  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add('fa-trash');
  icon.classList.add('dots');
  const hr = document.createElement('hr');
  ul.append(checkBox, newInp, icon, hr);
  todoItems.append(ul);
  icon.addEventListener('click', () => {
    icon.parentElement.remove();
    removeTask(todoTask.id);
  });
};
todos.forEach(addTask);

const editTodoList = () => {
  const editInput = document.querySelectorAll('.newInput');
  editInput.forEach((edits, indexy) => {
    edits.addEventListener('change', () => {
      todos.forEach((todoTask, index) => {
        if (indexy === index) {
          todoTask.Description = edits.value;
          localStorage.setItem('todos', JSON.stringify(todos));
        }
      });
    });
  });
};
editTodoList();

function populate() {
  formlayout.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
      store();
      addTask(todoTask);
      clear();
    }
  });
}

export { populate, editTodoList };