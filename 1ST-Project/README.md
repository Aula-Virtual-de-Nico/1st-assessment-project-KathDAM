# 📦 React + Vite – Task Management App

This project is a **task management application** built using **React** and **Vite**. Below is a breakdown of the development process and implemented improvements.

---

## 🚀 Project Initialization

1. **Setting up the environment:**
   - Installed necessary dependencies with React and Vite.
   - Organized the initial project structure in the `src` folder, separating default CSS and JSX files.

2. **Project structure:**
   - Created new folders and custom files to better suit the project’s needs.

---

## 🛠️ Project Development

### 1. Main View Modifications
- Created a CSS file with a color palette and layout to be used across different views.
- Visually differentiated the following views:
  - Main Task List
  - Create New Task
  - Edit Task

### 2. Migrating Logic to JSX
- Previously written HTML functions were moved to their corresponding `.jsx` components.
- Functionality tested and adapted to React’s environment.

### 3. React Router Integration
- Installed and configured **React Router** for navigation between views.
- Navigation between views established successfully.

### 4. Initial Functionality
- The main task list displays correctly.
- Views are now interconnected, although not fully functional yet.

### 5. UI and UX Improvements
- Implemented a **confirmation modal** for deleting tasks to enhance style consistency.
- Reorganized the task card component:
  - Edit and delete buttons redesigned and repositioned.

### 6. Task Creation and Editing
- Both task creation and editing views are functioning correctly.

### 7. Code Modularization
- Codebase split into multiple `.jsx` components for better organization.
- Encountered some issues causing certain task functionalities to break temporarily.

### 8. Platform Compatibility
- Issues detected when running on **Linux** (React window not displaying).
- Fully functional on **Windows**.

---

## 🧹 Final Touches

1. **Main View Adjustments:**
   - Introduced a **predefined task list** in `App.jsx` for consistent display.
   - Some task buttons still have minor functionality issues.

2. **Code Fixes:**
   - Resolved issues in the main view after code restructuring.

3. **Component Refinement:**
   - Currently refining the `EditingTask` and `NewTask` components.

---

## 📌 Final Notes

This project is still a work in progress. Upcoming tasks include:
- Bug fixes and stability improvements.
- Further code optimization.
- Enhanced user experience across all platforms.


