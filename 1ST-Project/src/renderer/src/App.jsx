import "../../../styles/style.css"
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import EditingTask from "./components/EditingTask";

export default function App() {
  return (
    <HashRouter>
     <Routes>
        <Route path="/new-task" element={<NewTask />} /> 
        <Route path="/edit-task/:id" element={<EditingTask />} /> 
        <Route path="/" element={<TaskList />} /> 
      </Routes>
  </HashRouter>
  );
}
