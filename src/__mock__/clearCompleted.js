import display from './display.js';

const clear = () => {
  const set = JSON.parse(localStorage.getItem('localItem')) || [];
  const notDone = set.filter((taskList) => !taskList.completed);
  set.length = 0;
  let i = 1;
  notDone.forEach((element) => {
    element.index = i;
    i += 1;
  });
  set.push(...notDone);
  localStorage.setItem('localItem', JSON.stringify(set));
  display();
};

export default clear;