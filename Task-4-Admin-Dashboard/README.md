# Admin Dashboard

A professional and modern admin dashboard built with React and Vite, featuring analytics charts, summary cards, and user management.

## Project Description

This is a frontend admin dashboard application designed to display business analytics, manage users, and monitor key performance indicators. It's built with React and Vite, featuring interactive charts powered by Recharts, responsive design, and a clean, professional user interface suitable for a frontend internship project.

## Features

- **Dashboard Overview** - Summary cards showing key metrics (Total Users, Revenue, Orders, Growth)
- **Analytics Charts** - Line and bar charts using Recharts for data visualization
  - Line Chart: Revenue and User Growth trends over months
  - Bar Chart: Monthly Orders and Sales comparison
- **Sidebar Navigation** - Easy navigation between Dashboard, Users, Analytics, and Settings sections
- **User Management** - Table displaying user information with status indicators
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI** - Modern gradient design with hover effects and smooth transitions
- **Mock Data** - Realistic sample data for demonstration purposes

## Technologies Used

- **React** - UI library for building components
- **Vite** - Fast build tool and development server
- **Recharts** - React charting library for data visualization
- **CSS** - Responsive styling and layout
- **JavaScript** - Application logic

## Folder Structure

```
Task-4-Admin-Dashboard/
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
├── README.md            # This file
│
└── src/
    ├── main.jsx         # React app entry point
    ├── App.jsx          # Main app component with all functionality
    ├── style.css        # Global styles and responsive design
    └── data.js          # Mock data (analytics, charts, users)
```

## How to Install

1. Navigate to the project folder in your terminal
2. Run the following command to install dependencies:

```bash
npm install
```

This will install React, Vite, Recharts, and other required dependencies.

## How to Run the Project

After installing dependencies, start the development server:

```bash
npm run dev
```

The dashboard will open at `http://localhost:5173/` (or another port if 5173 is in use).

The development server supports hot module replacement (HMR), so changes to your code will automatically refresh in the browser.

## How to Build the Project

To create an optimized production build:

```bash
npm run build
```

The build files will be created in the `dist/` folder. You can then deploy this folder to any web server.

## Project Structure Explanation

### src/App.jsx
- Main application component containing all functionality
- Sidebar navigation with 4 sections: Dashboard, Users, Analytics, Settings
- Header with welcome message and admin profile
- Dashboard content rendering based on active navigation
- Functions to render analytics cards, charts, and user table

### src/data.js
- Contains all mock data for the dashboard:
  - `analyticsData` - 4 summary cards (Total Users, Revenue, Orders, Growth)
  - `revenueData` - Monthly revenue and user growth data for line chart
  - `ordersData` - Monthly orders and sales data for bar chart
  - `usersData` - 8 sample users with details and status

### src/style.css
- All styles for the dashboard
- Sidebar and navigation styling
- Analytics cards styling with hover effects
- Chart container styling
- User table styling with status badges
- Responsive design with breakpoints for:
  - Desktop (full layout)
  - Tablet (1200px and below)
  - Mobile (768px and below)
  - Small mobile (480px and below)

## Features Explained

### Sidebar Navigation
- 4 navigation items: Dashboard, Users, Analytics, Settings
- Active state indicated by border highlight
- Clicking items changes the dashboard view
- Responsive: converts to horizontal layout on mobile

### Analytics Summary Cards
- 4 cards showing key business metrics
- Each card displays title, value, and supporting text
- Color-coded icons (blue, green, orange, purple)
- Hover effects for interactivity

### Revenue Growth Chart (Line Chart)
- Shows revenue and user growth over 8 months
- Dual-line chart with different colors
- Interactive tooltips and legend
- Responsive sizing based on container

### Orders Chart (Bar Chart)
- Displays monthly orders and sales data
- Grouped bar chart for easy comparison
- Interactive tooltips
- Responsive sizing

### User Management Table
- Displays 8 sample users
- Columns: ID, Name, Email, Role, Status
- Status badges: Green for Active, Red for Inactive
- Responsive scrolling on mobile devices

### Responsive Design
- Desktop: Full sidebar + main content layout
- Tablet (1200px): 2-column analytics cards, single column charts
- Tablet (768px): Horizontal sidebar navigation, 2-column cards
- Mobile (480px): Single column layout, optimized spacing

## Mock Data

All data is stored in `src/data.js`:

- **Analytics Cards**: 4 cards with titles, values, and subtitles
- **Revenue Data**: 8 months of revenue and user growth data
- **Orders Data**: 8 months of orders and sales data
- **Users**: 8 sample users with names, emails, roles, and status

No external API or backend is used - all data is predefined and displayed directly.

## Browser Compatibility

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend-only application with no backend
- All data is mock data for demonstration purposes
- Sidebar navigation changes what section is displayed
- Charts use Recharts for professional data visualization
- Fully responsive design works on all screen sizes
- No authentication required - open admin dashboard immediately

## Customization

To customize the dashboard:

1. **Change Mock Data**: Edit `src/data.js` to modify analytics values, chart data, or users
2. **Modify Styling**: Edit `src/style.css` to change colors, layout, or responsive breakpoints
3. **Add More Sections**: Add new navigation items in the sidebar menu within `src/App.jsx`
4. **Update Charts**: Modify chart configurations in the Recharts component props
