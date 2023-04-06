/* eslint-disable no-unused-expressions */

const completedList = (index) => {
  let taskList = [];

  taskList = JSON.parse(localStorage.getItem('localItem')) || [];

  taskList.filter((edit) => {
    edit.index === index && (edit.completed = true);

    return edit;
  });
  localStorage.setItem('localItem', JSON.stringify(taskList));
};

export default completedList;