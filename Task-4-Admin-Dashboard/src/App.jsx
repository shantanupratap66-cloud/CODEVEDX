import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { analyticsData, revenueData, ordersData, usersData } from './data'

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard')

  // Analytics Cards
  function renderAnalyticsCards() {
    return (
      <div className="analytics-cards">
        {analyticsData.map(card => (
          <div key={card.id} className="analytics-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">{card.title}</h3>
              <div
                className="analytics-card-icon"
                style={{ backgroundColor: card.color + '20', color: card.color }}
              >
                {card.id === 1 && '👥'}
                {card.id === 2 && '💰'}
                {card.id === 3 && '📦'}
                {card.id === 4 && '📈'}
              </div>
            </div>
            <h2 className="analytics-card-value">{card.value}</h2>
            <p className="analytics-card-subtitle">{card.subtitle}</p>
          </div>
        ))}
      </div>
    )
  }

  // Line Chart - Revenue Growth
  function renderRevenueChart() {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Revenue & User Growth</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ fill: '#667eea', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#764ba2"
                strokeWidth={2}
                dot={{ fill: '#764ba2', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  // Bar Chart - Monthly Orders
  function renderOrdersChart() {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Monthly Orders & Sales</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#667eea" />
              <Bar dataKey="sales" fill="#764ba2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  // User Table
  function renderUserTable() {
    return (
      <div className="users-section">
        <h3 className="users-title">User Management</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`user-status ${
                        user.status === 'Active' ? 'status-active' : 'status-inactive'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Dashboard Section Content
  function renderDashboardContent() {
    if (activeNav === 'dashboard') {
      return (
        <>
          {renderAnalyticsCards()}
          <div className="charts-section">
            {renderRevenueChart()}
            {renderOrdersChart()}
          </div>
          {renderUserTable()}
        </>
      )
    }

    if (activeNav === 'users') {
      return (
        <>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>User Management</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Manage and monitor all users in the system. View user details, roles, and status.
            </p>
          </div>
          {renderUserTable()}
        </>
      )
    }

    if (activeNav === 'analytics') {
      return (
        <>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Analytics & Reports</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Track your business metrics and performance indicators through detailed charts and analytics.
            </p>
          </div>
          <div className="charts-section">
            {renderRevenueChart()}
            {renderOrdersChart()}
          </div>
        </>
      )
    }

    if (activeNav === 'settings') {
      return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Settings</h2>
          <div style={{ color: '#666' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Application Settings:</strong>
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Account preferences</li>
              <li>Notification settings</li>
              <li>Security options</li>
              <li>System configuration</li>
            </ul>
            <p>
              Configure your dashboard preferences, manage notifications, and adjust system settings to suit your needs.
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">📊 Admin</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a
              className={`sidebar-menu-link ${activeNav === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li className="sidebar-menu-item">
            <a
              className={`sidebar-menu-link ${activeNav === 'users' ? 'active' : ''}`}
              onClick={() => setActiveNav('users')}
            >
              Users
            </a>
          </li>
          <li className="sidebar-menu-item">
            <a
              className={`sidebar-menu-link ${activeNav === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveNav('analytics')}
            >
              Analytics
            </a>
          </li>
          <li className="sidebar-menu-item">
            <a
              className={`sidebar-menu-link ${activeNav === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveNav('settings')}
            >
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Here's your business overview.</p>
          </div>
          <div className="header-profile">
            <div className="profile-avatar">AD</div>
            <div className="profile-info">
              <p className="profile-name">Admin User</p>
              <p className="profile-role">Administrator</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  )
}
