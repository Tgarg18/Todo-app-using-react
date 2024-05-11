import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Completed from './components/Completed'
import todoListContext from './context/todoListContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todo, setTodo] = useState({
    title: "",
    editable: false,
    completed: false,
    cancel: false,
    dateAndTime: new Date().toLocaleString()
  })
  const [todolist, setTodolist] = useState([])
  const [completedList, setCompletedList] = useState([])
  return (
    <>
      <todoListContext.Provider value={{ todo, setTodo, todolist, setTodolist, completedList, setCompletedList }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/completed" element={<Completed />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </todoListContext.Provider>
    </>
  )
}

export default App
