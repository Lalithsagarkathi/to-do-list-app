const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const taskBody = document.getElementById('taskBody');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  taskBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    const taskCell = document.createElement('td');
    taskCell.textContent = task.name;
    if (task.completed) taskCell.classList.add('completed');

    const dateCell = document.createElement('td');
    dateCell.textContent = task.dueDate || '-';

    const priorityCell = document.createElement('td');
    priorityCell.textContent = task.priority;
    priorityCell.style.color = task.priority === 'High' ? 'red' :
                               task.priority === 'Medium' ? 'orange' : 'lightgreen';

    const statusCell = document.createElement('td');
    statusCell.textContent = task.completed ? 'Done' : 'Pending';

    const actionCell = document.createElement('td');

    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    doneBtn.className = 'action-btn done-btn';
    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRender();
    };

    actionCell.appendChild(doneBtn);
    actionCell.appendChild(deleteBtn);

    row.appendChild(taskCell);
    row.appendChild(dateCell);
    row.appendChild(priorityCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    taskBody.appendChild(row);
  });
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (taskText === '') return;

  tasks.push({ name: taskText, dueDate, priority, completed: false });
  saveAndRender();

  taskInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = 'Low';
});

renderTasks();
