import addList from '../__mock__/addList.js';
import remove from '../__mock__/removeList.js';

describe('Test for adding a task to the tasks array', () => {
  it('Check array of object is not null', () => {
    localStorage.removeItem('localItem');
    addList('task 1');
    const task = JSON.parse(localStorage.getItem('localItem'));
    const SIZE = task.length;
    expect(SIZE).not.toBeNull();
  });
  it('Task is added to the DOM', () => {
    localStorage.removeItem('localItem');
    addList('task 2');
    const task = JSON.parse(localStorage.getItem('localItem'));
    expect(task).toHaveLength(task.length);
  });
});

describe('Test for removing a task from the list', () => {
  it('Checks list if remove todo size reduces or not', () => {
    localStorage.removeItem('localItem');
    addList('task 4');
    const task = JSON.parse(localStorage.getItem('localItem'));
    const SIZE = task.length;
    remove('task 5');
    const newTasks = JSON.parse(localStorage.getItem('localItem'));
    const newSIZE = newTasks.length;
    expect(newSIZE).toBe(SIZE - 1);
  });
  it('Check is localStorage updated after a todo is removed', () => {
    localStorage.removeItem('localItem');
    addList('task 5');
    const before = JSON.parse(localStorage.getItem('localItem'));
    remove('task6');
    const after = JSON.parse(localStorage.getItem('localItem'));
    expect(after.length).toBe(before.length - 1);
  });
});