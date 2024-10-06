// import { useState, useEffect } from 'react'
// import Navbar from './components/navbar'
// import { v4 as uuidv4 } from 'uuid'  // Updated import
// import './App.css'

// /*
//     #6D9773 - Light Green
//     #0C3B2E - Dark Green
//     #B46617 - Orange Brown
//     #FFBA00 - Yellow
// */
// function App() {
//   const [count, setCount] = useState(0)
//   const [todo, setTodo] = useState("")
//   const [myTodos, setmyTodos] = useState([]);
  
//   useEffect(() => {
//     let myTodosStr = localStorage.getItem("myTodos");
//     if(myTodosStr) {
//       let t = JSON.parse(localStorage.getItem("myTodos"))
//       setmyTodos(t);
//       console.log(myTodosStr + "Fetched");
//     }
//   }, [])

//   // To save our Todos we'll leverage the local storage
//   const saveToLS = () => { 
//     localStorage.setItem("myTodos", JSON.stringify(myTodos));
//     console.log(JSON.stringify(myTodos) + "Saved");
//   }
  
//   const addTodo = () => {
//     if(todo.length > 0) 
//     {
//       const newTodo = { id: uuidv4(), todo, isCompleted: false };
//       setmyTodos((prevTodos) => {
//         const updatedTodos = [...prevTodos, newTodo];
//         saveToLS(); // Save to local storage after updating state
//         return updatedTodos;
//       });
//       setTodo("");
//     }
//     else{
//       alert("Please enter the task description before clicking on Add Task button");
//     }
//   }

//   const editTodo = (e, id) => { 
//     if(todo === "")
//     {
//       let toBeUpdatedTodo = myTodos.filter(item => item.id === id);
//       setTodo(toBeUpdatedTodo[0].todo); // t[0] cause filter returns an array.
      
//       // Creating a camouflage by using deleteTodo, so that when we click on Save Task the task gets saved with a new id and older task is deleted to maintain the logic of editing the todo.
//       let newMyTodos = myTodos.filter((item) => ( item.id !== id ));
//       setmyTodos(newMyTodos);
//     }
//     else 
//     {
//       alert("A task is already being edited, kindly save it first.");
//     }
    
    
//     saveToLS();
//   }
//   const deleteTodo = (e, id) => { 
//     // let index = myTodos.findIndex((item) => item.id === id);
//     // let newMyTodos = [...myTodos];  // Create a new array to avoid mutating state directly, here a new reference is created, if we don't do like this then new reference won't get created.
//     // newMyTodos.splice(index, 1);
//     // setmyTodos(newMyTodos);

//     // Alternative way to do this --------------------------------
//     // Have added a confirmation window here to make sure that we don't accidentally remove the tasks.
//     if(confirm("Are you sure you want to remove this task from your queue?"))
//     {
//       let newMyTodos = myTodos.filter((item) => ( item.id !== id ));
//       setmyTodos(newMyTodos);
//     }

//     saveToLS();
//   }

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   }

//   const handleCheckbox = (e) => {
//     let ID = e.target.id;
//     let index = myTodos.findIndex((item) => item.id === ID);
//     let newMyTodos = [...myTodos];  // Create a new array to avoid mutating state directly, here a new reference is created, if we don't do like this then new reference won't get created.
//     newMyTodos[index].isCompleted = !newMyTodos[index].isCompleted;
//     setmyTodos(newMyTodos);

//     saveToLS();
//   }
  
//   function handleKeyDown(event) {
//     if (event.keyCode === 13) {
//       addTodo();
//     }
//   }

//   return (
//     <>
//       <div className="bg-[#6D9773] w-screen h-screen">
//         <Navbar />
//         <div className="container w-auto h-[calc(100vh-4rem-5rem)] my-10 mx-20 p-5 bg-[#0C3B2E] rounded overflow-auto">
//           <p className='font-semibold text-xl text-white mb-3'>Add a Todo Task</p>
//           <div className="createToDo flex gap-5">
//             <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} type="text" className='rounded py-1 px-2 w-[calc(100%-9rem)] focus:outline-none focus:border-[#6D9773] focus:ring-2 focus:ring-[#6D9773]' placeholder='Enter the description of the task' />
//             <button onClick={addTodo} className='bg-[#6D9773] text-white px-5 py-1 font-bold rounded border-[#6D9773] border-2 hover:bg-[#5c8061]'>Save Task</button>
//           </div>
//           <p className='font-semibold text-xl text-white my-5'>Your Todo Tasks</p>
//           {myTodos.length === 0 && <span className='text-white italic hover:not-italic'>Hooray, no tasks pending!</span>}
//           {myTodos.map((obj) => (
//             <div key={obj.id} className="myTodos flex justify-between items-start my-3">
//               <div className='flex items-start gap-3'>
//                 <input className='mt-[7px]' type="checkbox" onChange={handleCheckbox} checked={obj.isCompleted} id={obj.id} />
//                 <p className={obj.isCompleted ? 'line-through text-white' : 'text-white'}>{obj.todo}</p>
//               </div>
//               <div className="editMyTodo flex gap-3">
//                 <button onClick={(e)=>{editTodo(e, obj.id)}} className='bg-[#6D9773] text-white px-2 py-1 font-bold text-sm rounded border-[#6D9773] border-2 hover:bg-[#5c8061]'>Edit</button>
//                 <button onClick={(e) => {deleteTodo(e, obj.id)}} className='bg-[#6D9773] text-white px-2 py-1 font-bold text-sm rounded border-[#6D9773] border-2 hover:bg-[#5c8061]'>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default App