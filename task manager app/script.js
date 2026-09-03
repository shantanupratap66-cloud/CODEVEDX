/* ========================================
   TASK MANAGER - JAVASCRIPT
   Handles all functionality: add, edit, delete, filter, theme
   ======================================== */

// ========================================
// 1. DATA & DOM ELEMENTS
// ========================================

// Get all DOM elements we'll use
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const themeToggle = document.getElementById('themeToggle');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Store all tasks in memory (will be synced with LocalStorage)
let tasks = [];

// Track which filter is currently active
let currentFilter = 'all';

// ========================================
// 2. LOCALSTORAGE FUNCTIONS
// ========================================

// Load tasks from LocalStorage when the page loads
function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('tasks');
    
    // If tasks exist in LocalStorage, parse and use them
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    // If no tasks in LocalStorage, start with empty array
    else {
        tasks = [];
    }
}

// Save tasks to LocalStorage (runs every time tasks change)
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load theme preference from LocalStorage
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
}

// Save theme preference to LocalStorage
function saveThemePreference(isDarkMode) {
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// ========================================
// 3. TASK MANAGEMENT FUNCTIONS
// ========================================

// Create a new task object
function createTask(text) {
    return {
        id: Date.now(), // Unique ID using current timestamp
        text: text,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };
}

// Add a new task
function addTask() {
    // Get input value and trim whitespace
    const taskText = taskInput.value.trim();
    
    // Validation: Don't add empty tasks
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Prevent very long tasks (optional but good practice)
    if (taskText.length > 200) {
        alert('Task is too long! Keep it under 200 characters.');
        return;
    }
    
    // Create new task and add to array
    const newTask = createTask(taskText);
    tasks.push(newTask);
    
    // Save to LocalStorage
    saveTasksToStorage();
    
    // Clear input and re-render
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
    updateStats();
}

// Delete a task by ID
function deleteTask(id) {
    // Confirm deletion with user
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove task with matching ID from array
        tasks = tasks.filter(task => task.id !== id);
        
        // Save and re-render
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// Toggle task completion status
function toggleTaskComplete(id) {
    // Find the task and flip its completed status
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// Edit a task (start editing)
function startEditTask(id) {
    // Find the task
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    // Get the task element from DOM
    const taskElement = document.querySelector(`li[data-id="${id}"]`);
    if (!taskElement) return;
    
    // Add edit-mode class
    taskElement.classList.add('edit-mode');
    
    // Create input field with current task text
    const editContainer = document.createElement('div');
    editContainer.style.display = 'flex';
    editContainer.style.gap = '8px';
    editContainer.style.alignItems = 'center';
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = task.text;
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'task-btn save-btn';
    saveBtn.textContent = 'Save';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'task-btn cancel-btn';
    cancelBtn.textContent = 'Cancel';
    
    // Save on click
    saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            return;
        }
        saveEditTask(id, newText);
    });
    
    // Cancel on click
    cancelBtn.addEventListener('click', () => {
        taskElement.classList.remove('edit-mode');
        renderTasks();
    });
    
    // Allow Save on Enter key
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });
    
    // Allow Cancel on Escape key
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelBtn.click();
        }
    });
    
    // Add elements to edit container
    editContainer.appendChild(editInput);
    editContainer.appendChild(saveBtn);
    editContainer.appendChild(cancelBtn);
    
    // Insert after checkbox and replace task-text and task-actions
    const checkbox = taskElement.querySelector('.checkbox');
    checkbox.insertAdjacentElement('afterend', editContainer);
    
    // Focus input immediately
    editInput.focus();
    editInput.select();
}

// Save edited task
function saveEditTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// ========================================
// 4. RENDERING FUNCTIONS
// ========================================

// Render all tasks to the DOM
function renderTasks() {
    // Clear task list
    taskList.innerHTML = '';
    
    // Filter tasks based on current filter
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });
    
    // If no tasks to display, show empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    // Hide empty state if we have tasks
    emptyState.classList.remove('show');
    
    // Create a list item for each task
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Create a task element (a single task item)
function createTaskElement(task) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    // Add 'completed' class if task is done
    if (task.completed) {
        li.classList.add('completed');
    }
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
    
    // Create task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'task-btn edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEditTask(task.id));
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-btn delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Create actions container
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    // Add all elements to list item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(actions);
    
    return li;
}

// ========================================
// 5. STATISTICS & UI UPDATE
// ========================================

// Update task count and completed count
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    // Update the statistics display
    taskCount.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
    completedCount.textContent = `${completedTasks} completed`;
}

// ========================================
// 6. FILTER FUNCTIONALITY
// ========================================

// Add click listeners to all filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update current filter
        currentFilter = btn.dataset.filter;
        
        // Re-render tasks with new filter
        renderTasks();
    });
});

// ========================================
// 7. DARK MODE TOGGLE
// ========================================

themeToggle.addEventListener('click', () => {
    // Toggle dark-mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update button emoji
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Save preference to LocalStorage
    saveThemePreference(isDarkMode);
});

// ========================================
// 8. KEYBOARD SHORTCUTS
// ========================================

// Allow adding task by pressing Enter in input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add task on button click
addBtn.addEventListener('click', addTask);

// ========================================
// 9. INITIALIZATION
// ========================================

// Function to initialize the app when page loads
function initializeApp() {
    // 1. Load saved tasks from LocalStorage
    loadTasksFromStorage();
    
    // 2. Load theme preference from LocalStorage
    loadThemePreference();
    
    // 3. Render all tasks
    renderTasks();
    
    // 4. Update statistics
    updateStats();
    
    // 5. Focus input for better UX
    taskInput.focus();
    
    console.log('✅ Task Manager app initialized!');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
