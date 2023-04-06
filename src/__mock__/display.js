const display = () => {
  let taskList = [];

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
  });
};

export default display;