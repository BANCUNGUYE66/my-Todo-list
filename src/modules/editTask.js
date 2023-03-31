const form = document.querySelector('form');
const input = document.querySelector('.input');
const todoListWrapper = document.querySelector('.todoList_wrapper');

let todos = [];
let todo;

const storeData = () => {
  const allTodos = JSON.stringify(todos);
  localStorage.setItem('todos', allTodos);
};

const getStoredTodos = () => {
  todos = JSON.parse(localStorage.getItem('todos'));
};

const store = () => {
  todo = {
    Description: input.value,
    id: todos.length + 1,
    completed: false,
  };
  todos.push(todo);
  storeData();
};

const clear = () => {
  input.value = '';
};

const completeTask = (stats, index) => {
  todos[index - 1].completed = stats;
  storeData();
};

const removeTask = (id) => {
  todos = todos.filter((task) => task.id !== id);
  todos.forEach((todo, id) => {
    todo.id = id + 1;
  });
  storeData();
};

const addtodoTask = (todo) => {
  const ul = document.createElement('div');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checkBox');

  const newInp = document.createElement('input');
  newInp.type = 'text';
  newInp.classList.add('newInput');
  newInp.value = todo.Description;

  checkBox.onclick = (e) => {
    completeTask(e.target.checked, todo.id);

    if (todo.completed === true) {
      newInp.classList.add('completed');
    } else {
      newInp.classList.remove('completed');
    }
  };

  if (todo.completed === true) {
    checkBox.checked = 'checked';
    newInp.classList.add('completed');
  }

  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add('fa-trash');
  icon.classList.add('dots');
  const hr = document.createElement('hr');
  ul.append(checkBox, newInp, icon, hr);
  todoListWrapper.append(ul);
  icon.addEventListener('click', () => {
    icon.parentElement.remove();
    removeTask(todo.id);
  });
};
todos.forEach(addtodoTask);

const editTodoList = () => {
  const editInput = document.querySelectorAll('.newInput');
  editInput.forEach((edits, indexy) => {
    edits.addEventListener('change', () => {
      todos.forEach((todo, index) => {
        if (indexy === index) {
          todo.Description = edits.value;
          storeData();
        }
      });
    });
  });
};
editTodoList();

function formSubmission() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
      store();
      addtodoTask(todo);
      clear();
    }
  });
}

const populateTasks = () => {
  if (localStorage.getItem('todos')) {
    getStoredTodos();
    todos.map((task) => {
      addtodoTask(task);
      return task;
    });
  } else {
    todos.map((task) => {
      addtodoTask(task);
      return task;
    });
  }
};

const clearCompleted = () => {
  todos = todos.filter((task) => task.completed !== true);
  todos.forEach((todo, id) => {
    todo.id = id + 1;
  });
  storeData();
  window.location.reload();
};

export {
  formSubmission, editTodoList, populateTasks, clearCompleted,
};