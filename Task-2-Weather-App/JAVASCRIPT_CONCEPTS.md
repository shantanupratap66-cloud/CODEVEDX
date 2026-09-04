# 📝 JavaScript Concepts Quick Reference

## Async/Await - Non-Blocking Code

```javascript
// ❌ Blocks entire app
function getWeather(city) {
    const data = fetch(url);  // App freezes here!
    console.log(data);
}

// ✅ Non-blocking, app stays responsive
async function getWeather(city) {
    const data = await fetch(url);  // Waits but app keeps running
    console.log(data);
}
```

**Key Points:**
- `async` = This function waits for something
- `await` = Wait here, but don't freeze the app
- Perfect for API calls, file reading, etc.

---

## Fetch API - Getting Data from Internet

```javascript
// Basic fetch
const response = await fetch(url);
const data = await response.json();

// With error checking
const response = await fetch(url);
if (!response.ok) {
    throw new Error('Request failed');
}
const data = await response.json();
```

**What Fetch Returns:**
1. `fetch()` → Returns Promise (will eventually give data)
2. `await` → Waits for Promise to resolve
3. `.json()` → Converts text to usable format

---

## Error Handling - Try/Catch

```javascript
// Don't let errors crash your app
try {
    const data = await fetch(url);
    const json = await data.json();
    console.log(json);
    
} catch (error) {
    // Something went wrong, handle it gracefully
    console.log('Error:', error.message);
    showError('Oops! Something went wrong.');
}
```

**When to Use:**
- API calls that might fail
- File operations
- JSON parsing
- Any code that might throw an error

---

## DOM Manipulation - Changing HTML

```javascript
// Select elements
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// Change content
element.textContent = 'New text';  // Safe for user input
element.innerHTML = '<strong>Bold text</strong>';  // Only for trusted content

// Change attributes
element.src = 'image.png';
element.href = 'https://example.com';
element.style.color = 'red';

// Change classes
element.classList.add('highlight');
element.classList.remove('highlight');
element.classList.toggle('hidden');
```

**Key Methods:**
- `.getElementById()` - Get by ID
- `.querySelector()` - Get by CSS selector
- `.querySelectorAll()` - Get multiple
- `.textContent` - Change text safely
- `.innerHTML` - Change HTML (use carefully!)
- `.classList.add/remove/toggle()` - Manage CSS classes

---

## Event Listeners - Respond to User

```javascript
// Listen for click
button.addEventListener('click', (event) => {
    console.log('Button clicked!');
});

// Listen for form submit
form.addEventListener('submit', (event) => {
    event.preventDefault();  // Don't reload page
    console.log('Form submitted!');
});

// Listen for input
input.addEventListener('input', (event) => {
    console.log('User typed:', event.target.value);
});

// Listen for page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, safe to manipulate DOM');
});
```

**Common Events:**
- `click` - User clicked
- `submit` - Form submitted
- `input` - User typed
- `change` - Value changed
- `keydown` - Key pressed
- `scroll` - User scrolled
- `load` - Page/image loaded

---

## LocalStorage - Save Data in Browser

```javascript
// Save string
localStorage.setItem('theme', 'dark');

// Get string
const theme = localStorage.getItem('theme');  // Returns 'dark'

// Save object (convert to JSON)
const user = { name: 'John', age: 25 };
localStorage.setItem('user', JSON.stringify(user));

// Get object (convert back from JSON)
const saved = localStorage.getItem('user');
const user = JSON.parse(saved);  // { name: 'John', age: 25 }

// Remove item
localStorage.removeItem('theme');

// Check if exists
if (localStorage.getItem('theme') !== null) {
    console.log('Theme exists!');
}
```

**Use Cases:**
- User preferences (dark mode, language)
- Search history
- Saved data (form inputs)
- Session information

---

## Arrow Functions - Modern JavaScript

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function (more modern)
const add = (a, b) => {
    return a + b;
};

// Arrow function (short form)
const add = (a, b) => a + b;

// Arrow function with event listener
button.addEventListener('click', () => {
    console.log('Clicked!');
});
```

**Key Difference:**
- Arrow functions are shorter
- They have implicit `this` binding
- Use when you need a quick function

---

## Template Literals - Easy String Building

```javascript
// Traditional string concatenation
const greeting = 'Hello ' + name + ', you are ' + age + ' years old';

// Template literals (use backticks)
const greeting = `Hello ${name}, you are ${age} years old`;

// Multi-line strings
const html = `
    <div class="card">
        <p>${message}</p>
        <button>Click me</button>
    </div>
`;
```

**Benefits:**
- Easier to read
- Can embed variables with `${}`
- Can span multiple lines

---

## Array Methods - Working with Lists

```javascript
// Map - transform each item
const temps = [15, 20, 25];
const fahrenheit = temps.map(c => (c * 9/5) + 32);

// Filter - keep only some items
const hot = temps.filter(t => t > 20);  // [25]

// forEach - do something for each item
temps.forEach(temp => {
    console.log(`Temperature: ${temp}°C`);
});

// Find - get first matching item
const first20 = temps.find(t => t === 20);

// Every - check if all match
const allHot = temps.every(t => t > 10);  // true

// Some - check if any match
const hasHot = temps.some(t => t > 25);  // true
```

**Common Array Methods:**
- `.map()` - Transform data
- `.filter()` - Keep matching items
- `.forEach()` - Do something for each
- `.find()` - Get first match
- `.includes()` - Check if contains
- `.slice()` - Get portion
- `.push()` - Add to end
- `.pop()` - Remove from end

---

## Destructuring - Unpack Data

```javascript
// From array
const [first, second, third] = [1, 2, 3];
console.log(first);  // 1

// From object
const { name, age } = { name: 'John', age: 25, city: 'NYC' };
console.log(name);  // 'John'

// In function parameters
const displayUser = ({ name, age }) => {
    console.log(`${name} is ${age} years old`);
};

// Skip items
const [first, , third] = [1, 2, 3];
console.log(third);  // 3
```

---

## Promises - Handle Async Operations

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    if (success) {
        resolve(data);  // Success!
    } else {
        reject(error);  // Failed
    }
});

// Using a Promise
myPromise
    .then(data => console.log(data))      // If success
    .catch(error => console.log(error))   // If failed
    .finally(() => console.log('Done'));  // Always runs

// With async/await (cleaner)
async function getData() {
    try {
        const data = await myPromise;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
```

**Promise States:**
- `pending` - Still waiting
- `resolved` - Success, have data
- `rejected` - Failed, have error

---

## This - Context Reference

```javascript
// In global scope
console.log(this);  // window (in browser)

// In object method
const obj = {
    name: 'John',
    greet() {
        console.log(this.name);  // John
    }
};

// In arrow function - inherits parent's this
const obj = {
    name: 'John',
    greet: () => {
        console.log(this);  // Parent's this (often wrong)
    }
};

// In regular function - creates its own this
const obj = {
    name: 'John',
    greet() {
        console.log(this);  // obj
    }
};
```

---

## Spread Operator - Expand Arrays/Objects

```javascript
// Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1];  // [1, 2, 3]

// Combine arrays
const combined = [...arr1, ...[4, 5, 6]];  // [1, 2, 3, 4, 5, 6]

// Copy object
const obj1 = { name: 'John' };
const obj2 = { ...obj1 };  // { name: 'John' }

// Merge objects
const merged = { ...obj1, age: 25 };  // { name: 'John', age: 25 }

// Pass as arguments
const sum = (a, b, c) => a + b + c;
const nums = [1, 2, 3];
sum(...nums);  // sum(1, 2, 3)
```

---

## Closures - Function Remembers Variables

```javascript
// Create counter with closure
function createCounter() {
    let count = 0;  // Captured by inner function
    
    return function increment() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// Each call remembers the 'count' variable
```

---

## Quick Decision Guide

**Use `const` by default:**
```javascript
const x = 5;     // Don't change
let x = 5;       // Will change
var x = 5;       // Avoid (old way)
```

**Use arrow functions for:**
- Callbacks
- Array methods
- Event listeners

**Use regular functions for:**
- Constructors (with `new`)
- Methods (need `this`)
- Named functions

**Use `async/await` for:**
- API calls
- File operations
- Any Promise-based code

**Use try/catch for:**
- API calls
- JSON parsing
- File operations
- Any code that might error

---

## Common Patterns in Our App

### 1. Fetch Data
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Request failed');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Pass to caller
    }
}
```

### 2. Update DOM
```javascript
function updateElement(id, data) {
    const element = document.getElementById(id);
    element.textContent = data;
    element.classList.add('loaded');
}
```

### 3. Handle Form Submit
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = formInput.value.trim();
    if (!input) return showError('Empty input!');
    handleSubmit(input);
});
```

### 4. Show/Hide Elements
```javascript
function showElement(element) {
    element.classList.add('show');
}

function hideElement(element) {
    element.classList.remove('show');
}
```

---

## Debugging Tips

```javascript
// 1. Use console.log to see values
console.log('City:', city);
console.log('Data:', weatherData);

// 2. Use console.error for errors
console.error('Something went wrong:', error);

// 3. Use debugger to pause execution
debugger;  // Execution stops here in DevTools

// 4. Check types
console.log(typeof variable);  // 'string', 'number', 'object'

// 5. Check if value exists
console.log(value !== undefined);  // Is it defined?
```

---

## Keep Learning!

Master these concepts:
1. ✅ Async/Await - Non-blocking code
2. ✅ Fetch API - Getting data
3. ✅ Error Handling - Graceful failures
4. ✅ DOM Manipulation - Changing HTML
5. ✅ Event Listeners - User interaction
6. ✅ LocalStorage - Saving data
7. ✅ Arrow Functions - Modern syntax
8. ✅ Template Literals - String building
9. ✅ Array Methods - Working with lists
10. ✅ Promises - Async operations

**Next Steps:**
- Try modifying the weather app code
- Practice with small examples
- Build similar projects
- Learn a framework (React, Vue)
- Read MDN documentation
