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

  // 5. Put the checkbox and text into the list item
  li.appendChild(checkbox);
  li.appendChild(span);

  // 6. Add the list item to the <ul>
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
