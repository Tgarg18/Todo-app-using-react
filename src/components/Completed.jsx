import React, { useContext } from 'react'
import Navbar from './Navbar'
import todoListContext from '../context/todoListContext'
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import { toast } from 'react-toastify';

const Completed = () => {

    const { todo, setTodo, todolist, setTodolist, completedList, setCompletedList } = useContext(todoListContext)

    return (
        <div className=''>
            <Navbar />
            <div className="container mx-auto w-3/4 mt-5 border border-black px-5 py-3 h-[88vh] shadow-2xl">
                <h1 className='text-3xl font-bold text-center'>Completed List</h1>
                <div className='completedContainer mt-5'>
                    {
                        (completedList.length > 0) ?
                            completedList.map((item, index) => {
                                return (
                                    <div className="todo flex w-[90%] mx-auto items-center justify-between px-2 border-t border-black py-2" key={index}>
                                        <div className='w-3/4'>{item.title}</div>
                                        <button className='' onClick={() => {
                                            setCompletedList(completedList.filter((todo) => todo !== item))
                                            toast.success("Todo removed successfully")
                                        }}><DeleteIcon fontSize='large' className='text-red-500' /> </button>
                                    </div>
                                )
                            })
                            :
                            <div className='py-40 flex flex-col gap-2 items-center justify-center'>
                                <PlaylistRemoveOutlinedIcon fontSize='large' className='text-gray-400' />
                                <h1 className='text-xl font-semibold text-gray-400 text-center'>No Completed Todo!</h1>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Completed