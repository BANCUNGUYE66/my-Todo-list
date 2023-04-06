import display from './display.js';

const remove = (index) => {
  let taskList = [];
  const removeList = localStorage.getItem('localItem');
  taskList = JSON.parse(removeList);
  taskList.splice(index, 1);

  localStorage.setItem('localItem', JSON.stringify(taskList));

  display();
};

export default remove;