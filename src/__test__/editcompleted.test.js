import addList from '../__mock__/addList.js';
import update from '../__mock__/updateList.js';
import completedList from '../__mock__/completedList.js';
import clear from '../__mock__/clearCompleted.js';

describe('Test for updating task lists', () => {
  it('Check if list is updated', () => {
    localStorage.removeItem('localItem');
    addList('Code');
    update(0);
    const after = JSON.parse(localStorage.getItem('localItem'));

    expect(after).toEqual([
      {
        description: "I will complete my week's tasks",
        completed: false,
        index: 0,
      },
    ]);
  });
  it('Check if completed list is true', () => {
    localStorage.removeItem('localItem');
    addList('task 3');
    completedList(0);
    const after = JSON.parse(localStorage.getItem('localItem'));
    expect(after).toEqual([
      {
        description: 'Complete my activities on time',
        completed: true,
        index: 0,
      },
    ]);
  });
});
describe('Test for completed list task', () => {
  it('Check completed list task is removed or not', () => {
    localStorage.removeItem('localItem');
    addList('task 1');
    completedList(0);
    const before = JSON.parse(localStorage.getItem('localItem'));
    clear();
    const after = JSON.parse(localStorage.getItem('localItem'));
    expect(after.length).toBe(before.length - 1);
  });
});