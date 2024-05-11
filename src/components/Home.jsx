import React, { useContext } from 'react'
import todoListContext from '../context/todoListContext'
import Navbar from './Navbar'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';

function Home() {

    const { todo, setTodo, todolist, setTodolist, completedList, setCompletedList } = useContext(todoListContext)

    const handleAddTodo = () => {
        if (todo.title === "") {
            toast.error("Todo cannot be an empty text")
        }
        else {
            setTodolist([...todolist, todo])
            setTodo({
                title: "",
                editable: false,
                completed: false,
                cancel: false,
                dateAndTime: new Date().toLocaleString()
            })
            toast.success("Todo added successfully")
        }
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("todolist", JSON.stringify(todolist))
        localStorage.setItem("completedlist", JSON.stringify(completedList))
        console.log(localStorage.getItem("todolist"));
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto w-3/4 mt-5 border border-black px-5 pb-3 h-[88vh] shadow-2xl overflow-x-hidden overflow-y-scroll relative">
                <div className='flex gap-2 justify-evenly sticky top-0 bg-white pt-3'>
                    <input type="text" name="todo" id="1" placeholder='Enter the todo...' value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} className='w-1/2 py-2 px-3 rounded-xl shadow-2xl border border-gray-500' />
                    <button onClick={() => {
                        handleAddTodo()
                        saveToLocalStorage()
                    }} className='w-1/6 shadow-2xl hover:bg-violet-400 bg-violet-500 hover:font-semibold text-white rounded-xl py-2 px-3'>Add</button>
                </div>
                <div className="todoContainer mt-5 border-t-2">
                    {
                        todolist.map((item, index) => {
                            return (
                                <div className={`todo flex w-[90%] mx-auto pl-5 items-center border-t border-black py-2 ${(item.cancel) ? "bg-slate-100" : ""}`} key={index}>
                                    {
                                        (item.editable == false) ?
                                            <FormGroup>
                                                {
                                                    (item.cancel) ?
                                                        <FormControlLabel control={<Checkbox defaultChecked />} onChange={() => {
                                                            setTodolist(todolist.map((todo) => (todo === item) ? { ...todo, cancel: !todo.cancel } : todo))
                                                            saveToLocalStorage()
                                                        }} label="" />
                                                        :
                                                        <FormControlLabel control={<Checkbox />} onChange={() => {
                                                            setTodolist(todolist.map((todo) => (todo === item) ? { ...todo, cancel: !todo.cancel } : todo))
                                                            saveToLocalStorage()
                                                        }} label="" />
                                                }
                                            </FormGroup>
                                            :
                                            null
                                    }
                                    {
                                        (item.editable) ?
                                            <div className='w-4/5 py-3'>
                                                <div className='font-bold'>Edit Todo</div>
                                                <input type="text" name="todo" placeholder='Enter the todo...' value={item.title} onChange={(e) => setTodolist(todolist.map((todo) => (todo === item) ? { ...todo, title: e.target.value } : todo))} className='w-full py-2 px-3 rounded-xl' />
                                            </div>
                                            :
                                            <div className={`w-4/5 ${(item.cancel) ? "line-through" : ""}`}>{item.title}</div>
                                    }
                                    <div className='button flex gap-3'>
                                        {
                                            (item.editable) ?
                                                <button className='' onClick={() => {
                                                    if (item.title === "") {
                                                        toast.error("Todo cannot be an empty text")
                                                    }
                                                    else {
                                                        setTodolist(todolist.map((todo) => (todo === item) ? { ...todo, editable: false, completed: true } : todo))
                                                        toast.success("Todo updated successfully")
                                                        saveToLocalStorage()
                                                    }
                                                }}>Save Changes</button>
                                                :
                                                (item.cancel) ?
                                                    null
                                                    :
                                                    <button className='' onClick={() => setTodolist(todolist.map((todo) => (todo === item) ? { ...todo, editable: true } : todo))}><EditIcon fontSize='large' /></button>
                                        }
                                        {
                                            (item.editable) ?
                                                null
                                                :
                                                <button className='' onClick={() => {
                                                    setTodolist(todolist.filter((todo) => todo !== item))
                                                    saveToLocalStorage()
                                                    toast.success("Todo deleted successfully")
                                                }}><DeleteIcon fontSize='large' className='text-red-500' /></button>
                                        }
                                        <button onClick={() => {
                                            setCompletedList([...completedList, item])
                                            setTodolist(todolist.filter((todo) => todo !== item))
                                            saveToLocalStorage()
                                            toast.success("Todo moved to completed successfully")
                                        }}><DoneIcon fontSize='large' className='text-green-500' /></button>
                                    </div>
                                    {
                                        (item.editable == true) ?
                                            null
                                            :
                                            <div className='text-gray-500 text-xs'>
                                                {item.dateAndTime}
                                            </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home