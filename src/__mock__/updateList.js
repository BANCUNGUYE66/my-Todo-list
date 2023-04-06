/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
import display from './display.js';

const update = (index) => {
  let taskList = [];

  taskList = JSON.parse(localStorage.getItem('localItem')) || [];

  const updateTask = taskList.filter((item) => {
    item.index === index &&
      (item.description = "I will complete my today's task");

    return item;
  });
  localStorage.setItem('localItem', JSON.stringify(updateTask));

  display();
};

export default update;