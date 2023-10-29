import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from "uuid"

function Home() {

    const [todos,setTodos] = useState(()=>{
        const Value = JSON.parse(localStorage.getItem("TODO"))
        return Value ? Value : [];
    })
    const [add,setAdd] = useState("")
    const [edit,setEdit] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    const handleAdd =()=>{
        if(edit){
          const newTodo = todos.map((item)=>
          item.id === edit? {...item, text:add }:item);
          setTodos(newTodo)
          setEdit(null)
        }else{
            setTodos([...todos,{id:uuidv4() , text:add , completed:false}])
            setAdd("")
        }
        setAdd("")
    }

    const handleDelete = (id) =>{
        let newList= todos.filter((item)=> item.id !== id )
        setTodos(newList);
    }

    const handleEdit = (item)=>{
        setAdd(item.text);
        setEdit(item.id);
    }

    useEffect(() =>{
     localStorage.setItem("TODO",JSON.stringify(todos));
    },[todos])
  return (
    <>
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 min-h-[100vh] flex flex-col justify-start items-center pt-[100px] '>
        <h1 className='text-3xl text-red-600 bg-white px-[20px] py-[5px] rounded-full shadow-xl font-semibold '>TODO LIST</h1>

     <form onSubmit={handleSubmit} className='w-[800px] bg-white px-[10px] py-[10px] rounded-full my-[20px]'>
        <input value={add} onChange={(e)=>setAdd(e.target.value)} type="text" className='border-0 w-[740px] outline-none font-semibold' />
        <button onClick={handleAdd} className='btn bg-red-600 rounded-full p-[5px]'><i class="fa-regular fa-plus fa-xl" style={{color:'white'}}></i></button>
     </form>
      
    
    
        <div>
            <h3  className='text-2xl w-[120px] bg-white px-[20px] py-[5px] rounded-full shadow-xl font-semibold'>Tasks :</h3>
        </div>
        {
        todos.length>0?
        todos.map((item)=>(
        <div key={item.id} className='w-[800px] bg-white px-[5px] py-[5px] rounded-lg my-[10px]'>
        <input type="text" className='border-0 w-[720px] outline-none font-semibold text-xl' value={item.text}/>
        <button onClick={()=>handleEdit(item)} className='btn rounded-full p-[10px]' style={{color:'green'}}><i class="fa-solid fa-pen"></i></button>
        <button onClick={()=> handleDelete(item.id)} className='btn rounded-full p-[10px]' style={{color:'red'}}><i class="fa-solid fa-trash"></i></button>
        </div>
          )):<h1 className='text-2xl'> No Tasks has been Added!!!</h1>
        }    
    
      
    </div>   
    </>
  )
}

export default Home 