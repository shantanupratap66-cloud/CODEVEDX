# Task Manager (To-Do App)

A simple, clean, and modern task management application built with HTML, CSS, and Vanilla JavaScript. Perfect for beginners learning web development!

## 🌟 Features

✅ **Add Tasks** - Create new tasks with a simple input field  
✏️ **Edit Tasks** - Modify existing tasks  
🗑️ **Delete Tasks** - Remove tasks with confirmation  
✔️ **Mark Complete** - Check off completed tasks  
🔍 **Filter Tasks** - View All, Pending, or Completed tasks  
🌙 **Dark Mode** - Switch between light and dark themes  
💾 **LocalStorage** - Tasks persist after browser refresh  
📱 **Responsive Design** - Works on desktop and mobile devices  
✨ **Empty State** - Shows friendly message when no tasks exist  
📊 **Task Statistics** - See total and completed task counts  

## 🛠️ Tech Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with CSS variables and flexbox
- **Vanilla JavaScript (ES6)** - All functionality without frameworks
- **LocalStorage API** - Client-side data persistence

## 📋 Project Structure

```
task-manager-app/
├── index.html          # HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md          # Documentation
```

## 🚀 How to Run

### Option 1: Open in Browser (Easiest)
1. Navigate to the project folder
2. Double-click `index.html` to open in your browser
3. Start adding tasks!

### Option 2: Use a Local Server (Recommended)

**Using Python:**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

**Using Node.js (with http-server):**
```bash
npx http-server
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## 💡 How to Use

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Task appears in the list

### Editing a Task
1. Click the "Edit" button on a task
2. Modify the text in the input field
3. Click "Save" or press Enter
4. Press Escape to cancel

### Completing a Task
1. Click the checkbox next to a task
2. Task will be marked as complete (strikethrough)

### Deleting a Task
1. Click the "Delete" button
2. Confirm the deletion
3. Task is removed

### Filtering Tasks
1. Click filter buttons: "All", "Pending", or "Completed"
2. List shows only tasks matching the filter

### Dark Mode
1. Click the moon (🌙) or sun (☀️) button in the header
2. Theme switches and preference is saved

## 🎓 Code Explanation for Beginners

### LocalStorage Concept
Tasks are saved to browser's LocalStorage automatically:
```javascript
// Save tasks
localStorage.setItem('tasks', JSON.stringify(tasks));

// Load tasks
const savedTasks = localStorage.getItem('tasks');
```

This means your tasks survive a page refresh!

### Creating Task Elements Dynamically
Instead of writing HTML for each task, JavaScript creates them:
```javascript
const li = document.createElement('li');
li.className = 'task-item';
li.appendChild(checkbox);
li.appendChild(taskText);
```

### Event Listeners
The app listens for user actions and responds:
```javascript
button.addEventListener('click', () => {
    // Code runs when button is clicked
});
```

### Filtering Tasks
The filter works by checking each task:
```javascript
const filtered = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    return true;
});
```

## 📱 Responsive Design

- **Desktop (600px+)**: Full layout with side-by-side buttons
- **Tablet (480-600px)**: Slightly compressed spacing
- **Mobile (<480px)**: Stack elements vertically, full-width buttons

## ✅ Testing Checklist

### Core Features
- [ ] Add a task with valid text
- [ ] Try to add empty task (should show alert)
- [ ] Add multiple tasks
- [ ] Edit a task
- [ ] Delete a task and confirm dialog
- [ ] Mark task as complete (checkbox)
- [ ] Uncheck task to mark incomplete

### Filtering
- [ ] Click "All" filter - shows all tasks
- [ ] Click "Pending" filter - shows only uncompleted tasks
- [ ] Click "Completed" filter - shows only completed tasks
- [ ] Create mix of complete/pending, verify filters work

### Dark Mode
- [ ] Click theme toggle button
- [ ] UI switches to dark mode
- [ ] Click again to switch to light mode
- [ ] Refresh page - theme persists

### LocalStorage
- [ ] Add several tasks
- [ ] Refresh browser (Ctrl+R or Cmd+R)
- [ ] Tasks still appear (they were saved!)
- [ ] Edit a task, refresh - changes persist
- [ ] Delete a task, refresh - deletion persists

### Empty State
- [ ] Delete all tasks
- [ ] Empty state message appears
- [ ] Add a task back
- [ ] Empty state disappears

### Statistics
- [ ] Verify task count updates
- [ ] Verify completed count updates
- [ ] Filter doesn't change stats (stats show totals)

### Keyboard Shortcuts
- [ ] Type task and press Enter (should add)
- [ ] In edit mode, press Enter (should save)
- [ ] In edit mode, press Escape (should cancel)

### Mobile Responsiveness
- [ ] Open in mobile device or use browser mobile view
- [ ] All buttons are clickable
- [ ] Text is readable
- [ ] Layout stacks vertically

### Edge Cases
- [ ] Add task with very long text (200+ chars)
- [ ] Add task with special characters (!@#$)
- [ ] Try XSS injection: `<script>alert('xss')</script>`
- [ ] Add duplicate tasks (should work - same text allowed)

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #4f46e5;      /* Main button color */
    --secondary-color: #10b981;    /* Save button color */
    --danger-color: #ef4444;       /* Delete button color */
}
```

### Change Fonts
Modify the font-family in `style.css`:
```css
body {
    font-family: 'Your Font Here', sans-serif;
}
```

### Add More Features
See "Suggestions for Improvements" below!

## 🚀 Suggestions for Small Improvements (Beginner-Level)

These are good practice tasks to add features yourself:

### 1. **Add Task Due Dates** (Easy)
- Add a date input field next to task input
- Store `dueDate` in task object
- Display due date on task card
- Sort tasks by due date
- Show overdue tasks in red

**Learning**: Data storage, conditional styling, array sorting

### 2. **Add Task Categories/Tags** (Easy-Medium)
- Add a dropdown to select category (Work, Personal, Shopping, etc.)
- Store `category` in task object
- Add category filter buttons alongside All/Pending/Completed
- Style each category with different color
- Display category badge on task card

**Learning**: Multiple filters, conditional CSS classes, data relationships

### 3. **Add Task Priority Levels** (Easy)
- Add radio buttons or dropdown for priority (High, Medium, Low)
- Store `priority` in task object
- Show priority indicator (color dot or emoji) on task
- Add sort by priority button
- Highlight high priority tasks with border/background

**Learning**: Priority sorting, conditional styling, user preferences

### 4. **Add Task Search Feature** (Medium)
- Add a search input field
- Filter tasks as user types
- Search in task text
- Show "no results" message if nothing matches
- Combine search with existing filters

**Learning**: String matching, search algorithms, combining filters

### 5. **Add Keyboard Shortcuts Help** (Easy)
- Create a modal/popup showing keyboard shortcuts
- Add info icon in header
- List all shortcuts (Enter to add, Esc to cancel, etc.)
- Close modal when Escape is pressed

**Learning**: Modals, keyboard events, UI/UX patterns

### Pick One Challenge! 🎯

Start with **#1 (Due Dates)** or **#3 (Priority)** as they are simpler but teach important concepts.

## 📚 Learning Resources

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Tricks - Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JavaScript Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)

## 📝 Common Mistakes & How to Fix

### Tasks Not Saving After Refresh
**Problem**: Tasks disappear on refresh  
**Solution**: Make sure `saveTasksToStorage()` is called after every change

### Dark Mode Not Persisting
**Problem**: Theme resets on refresh  
**Solution**: Check `loadThemePreference()` runs on page load

### Edit Not Working
**Problem**: Can't edit tasks  
**Solution**: Check that `startEditTask()` is attached to Edit button

### Filters Not Working
**Problem**: All tasks show even with filter active  
**Solution**: Verify `renderTasks()` checks `currentFilter` variable

## 🤝 Contributing

This is a learning project! Feel free to:
- Add comments to explain complex code
- Simplify any confusing parts
- Add new features from the suggestions
- Share your version with others

## 📄 License

Free to use and modify for learning purposes.

---

**Made with ❤️ for beginner developers!**

Need help? Check the comments in the code or review the MDN learning resources above.

Happy coding! 🚀
