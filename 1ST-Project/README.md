# React + Vite

Overview:
This project is a desktop application designed to enable basic management of a simple task list, built using Electron and React. The app includes functionalities for creating, editing, deleting, and managing tasks, as well as organizing the tasks by different criteria (title, status, date) and filtering tasks based on their status (Completed, Canceled).

Steps Taken to Develop the Application:

1. Initial Setup:
    - We started by downloading and installing the React dependencies.
    - Organized the default CSS and JSX files in the 'src' folder, then created new folders and files for the project.

2. Working on the Program:
    1. Modified the Main View:
        - Created a custom CSS with different colors and layout that we will use across the various views.
        - The main view is visually distinguished by a different background color compared to the "Create New Task" and "Edit Task" views.
    
    2. Moved Previous Functions from HTML to JSX:
        - We transferred the functions previously in the HTML files into the corresponding JSX components and tested their functionality in the JSX environment.
    
    3. Set up React Router for View Navigation:
        - We installed React Router to enable navigation between views (Task List, New Task, Edit Task) and ensure smooth transitions between them.
    
    4. First Task List Screen:
        - The first Task List screen renders correctly, and the views are now connected, although they did not have full functionality yet.
    
    5. Correct Functionality of All Buttons in the Main View:
        - A modal was created for confirming the deletion of a task, improving the user experience and maintaining consistent styling throughout the app.
        - The task card layout was reorganized to align the Edit and Delete buttons properly.
    
    6. Status Change Implementation:
        - Added the ability to click on a task's status to cycle between "Pending", "In Progress", "Completed", and "Canceled".
    
    7. Task List Filtering and Sorting:
        - Implemented sorting tasks by title, status, or deadline.
        - Introduced options to filter tasks by their status (Completed, Canceled), allowing users to show/hide completed or canceled tasks.
    
    8. Switching to Local JSON Store Manager:
        - Initially, the StoreManager was implemented but caused issues. After multiple failed attempts, we decided to switch to a localStorage JSON store, which works perfectly now and stores task data across sessions.

3. Final Touches:

    1. Styling Adjustments:
        - We adjusted the layout and styling, ensuring that all buttons, including the status, edit, and delete buttons, stay within the task card without overflowing.
        - The modal confirmation dialog was refined to match the overall app's aesthetic.
    
    2. Functionality Tweaks:
        - The Save and Delete buttons now function as expected in the Edit Task view. The Back Button was implemented with a confirmation dialog for unsaved changes, allowing the user to Save, Discard, or Cancel the action.

4. Features Implemented:
    - Task Management: Users can create, edit, delete, and change task statuses.
    - Sorting and Filtering: Sort tasks by title, status, or deadline, and filter tasks based on their status.
    - Persistence: All task data is stored in localStorage, ensuring data persistence between sessions.
    - Modal Confirmation: Users must confirm deletion through a modal before tasks are permanently removed.
    - Responsive Layout: The app is fully responsive, ensuring it works well across different screen sizes.

5. Conclusion:
This project was built using Electron and React to create a task list management app. The use of localStorage for task data persistence and Electron for packaging the app as a desktop application ensures a user-friendly experience. The app is fully functional, with the ability to manage tasks, change their status, and filter them by various criteria.