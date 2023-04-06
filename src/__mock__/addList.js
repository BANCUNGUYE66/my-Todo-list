/* eslint-disable comma-dangle */
import display from './display.js';

const addList = () => {
  const taskList = [];

  taskList.push(
    {
      description: 'Complete my activities on time',
      completed: false,
      index: 0,
    },
    {
      description: 'Completed my project',
      completed: true,
      index: 1,
    }
  );
  localStorage.setItem('localItem', JSON.stringify(taskList));

  display();
};

export default addList;