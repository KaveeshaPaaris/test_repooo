// -----------------------------------------------
// Grab references to the HTML elements we need
// -----------------------------------------------
const taskInput = document.getElementById('task-input');  // text box
const addBtn    = document.getElementById('add-btn');     // "Add Task" button
const taskList  = document.getElementById('task-list');   // <ul> that holds tasks
const errorMsg  = document.getElementById('error-msg');   // empty-input error text


// -----------------------------------------------
// addTask – called when the user clicks "Add Task"
// or presses Enter inside the text box
// -----------------------------------------------
function addTask() {
  // Read what the user typed and remove extra spaces from both ends
  const taskText = taskInput.value.trim();

  // --- Guard: do nothing if the input is empty ---
  if (taskText === '') {
    errorMsg.classList.remove('hidden');  // show the error message
    taskInput.focus();                    // put the cursor back in the box
    return;                               // stop here
  }

  // Hide the error message if it was previously shown
  errorMsg.classList.add('hidden');

  // --- Build the new list item ---

  // 1. Create the <li> element
  const li = document.createElement('li');

  // 2. Create the checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', 'Mark task as completed');

  // 3. When the checkbox is ticked/unticked, toggle the "completed" style
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      li.classList.add('completed');     // adds strike-through via CSS
    } else {
      li.classList.remove('completed'); // removes strike-through
    }
  });

  // 4. Create the text label that shows the task
  const span = document.createElement('span');
  span.textContent = taskText;

  // 5. Create the edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.setAttribute('aria-label', 'Edit task');

  // Switch between showing the task and editing it in a text box
  editBtn.addEventListener('click', function () {
    const editInput = li.querySelector('.edit-input');

    if (editInput) {
      const updatedText = editInput.value.trim();

      if (updatedText === '') {
        editInput.setCustomValidity('Please enter a task before saving.');
        editInput.reportValidity();
        editInput.focus();
        return;
      }

      span.textContent = updatedText;
      li.replaceChild(span, editInput);
      editBtn.textContent = 'Edit';
      editBtn.setAttribute('aria-label', 'Edit task');
      return;
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    input.classList.add('edit-input');
    input.setAttribute('aria-label', 'Edit task text');

    input.addEventListener('input', function () {
      input.setCustomValidity('');
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        editBtn.click();
      }
    });

    li.replaceChild(input, span);
    editBtn.textContent = 'Save';
    editBtn.setAttribute('aria-label', 'Save task');
    input.focus();
    input.select();
  });

  // 6. Create the delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('aria-label', 'Delete task');

  // When clicked, remove the whole list item from the page
  deleteBtn.addEventListener('click', function () {
    taskList.removeChild(li);
  });

  // 7. Put the checkbox, text and buttons into the list item
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // 8. Add the list item to the <ul>
  taskList.appendChild(li);

  // --- Clear the input box so it's ready for the next task ---
  taskInput.value = '';
  taskInput.focus();
}


// -----------------------------------------------
// Event listeners
// -----------------------------------------------

// Click the button → add the task
addBtn.addEventListener('click', addTask);

// Press Enter inside the text box → add the task
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
