import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid'; // Updated import
import './App.css';

/*
    #6D9773 - Light Green
    #0C3B2E - Dark Green
    #B46617 - Orange Brown
    #FFBA00 - Yellow
*/

function App() {
  const [todo, setTodo] = useState('');
  const [myTodos, setMyTodos] = useState([]);
  const [showCompleted, setshowCompleted] = useState();

  useEffect(() => {
    let myTodosStr = localStorage.getItem('myTodos');
    if (myTodosStr) {
      let t = JSON.parse(myTodosStr);
      setMyTodos(t);
      console.log(myTodosStr + ' Fetched');
    }
  }, []);

  // To save our Todos we'll leverage the local storage
  const saveToLS = (todos) => {
    localStorage.setItem('myTodos', JSON.stringify(todos));
    console.log(JSON.stringify(todos) + ' Saved');
  };

  const addTodo = () => {
    // if (todo.length > 0) {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };
      setMyTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        saveToLS(updatedTodos); // Save to local storage after updating state
        return updatedTodos;
      });
      setTodo('');
    // } else {
    //   alert('Please enter the task description before clicking on Add Task button');
    // }
    // We'll handle this using disable funcitonality present in the button itself.
  };

  const editTodo = (e, id) => {
    if (todo === '') {
      let toBeUpdatedTodo = myTodos.find((item) => item.id === id);
      setTodo(toBeUpdatedTodo.todo); // Get the current todo description

      // Create a new array without the todo that is being edited
      setMyTodos((prevTodos) => {
        const newMyTodos = prevTodos.filter((item) => item.id !== id);
        saveToLS(newMyTodos); // Update local storage
        return newMyTodos;
      });
    } else {
      alert('A task is already being edited, kindly save it first.');
    }
  };

  const deleteTodo = (e, id) => {
    // Have added a confirmation window here to make sure that we don't accidentally remove the tasks.
    if (confirm('Are you sure you want to remove this task from your queue?')) {
      setMyTodos((prevTodos) => {
        const newMyTodos = prevTodos.filter((item) => item.id !== id);
        saveToLS(newMyTodos); // Update local storage
        return newMyTodos;
      });
    }
  };

  const deleteAllTodos = () => {
    if (confirm('Are you sure you want to delete all the tasks in your queue?')) {
    let newMyTodos = [];
    setMyTodos(newMyTodos);
    saveToLS(newMyTodos); // Update local storage
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let ID = e.target.id;
    setMyTodos((prevTodos) => {
      const newMyTodos = prevTodos.map((item) =>
        item.id === ID ? { ...item, isCompleted: !item.isCompleted } : item
      );
      saveToLS(newMyTodos); // Update local storage
      return newMyTodos;
    });
  };
  const handleShowCompletedCheckbox = () => {
    setshowCompleted(!showCompleted)
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      addTodo();
    }
  }

  return (
    <>
      <div className="bg-[#6D9773] w-screen h-screen">
        <Navbar />
        <div className="container w-auto h-[calc(100vh-4rem-3rem)] my-5 mx-5 p-5 bg-[#0C3B2E] rounded overflow-auto md:mx-20 md:my-10 md:h-[calc(100vh-4rem-5rem)]">
          <p className="font-semibold text-xl text-white mb-5">Add a Todo Task</p>
          <div className="createToDo flex flex-col gap-3 md:gap-5 md:flex-row">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={todo}
              type="text"
              className="rounded py-1 px-2 focus:outline-none focus:border-[#6D9773] focus:ring-2 focus:ring-[#6D9773] md:w-[calc(100%-9rem)]"
              placeholder="Enter the description of the task"
            />
            <button
              disabled={todo.length === 0}
              onClick={addTodo}
              className="bg-[#6D9773] disabled:bg-[#677469] disabled:border-[#677469] text-white px-5 py-1 font-bold rounded border-[#6D9773] border-2 hover:bg-[#5c8061]"
            >
              Save Task
            </button>
          </div>
          <div className='justify-between items-center font-semibold md:flex'>
            <p className="text-xl text-white my-5">Your Todo Tasks</p>
            <div className='flex items-center gap-5 my-5'>
              <button 
              onClick={deleteAllTodos} 
              disabled={myTodos.length===0}
              className="bg-none h-full text-left text-red-600 disabled:text-red-700 md:text-lg"
              >
                Delete all tasks
              </button>
              <div className='flex items-center gap-2'>
                <input disabled={myTodos.length===0} type="checkbox" onChange={handleShowCompletedCheckbox} checked={showCompleted}/>
                <p className='text-white md:text-base'>Show Completed Tasks</p>
              </div>
            </div>
          </div>
          {myTodos.length === 0 && (
            <span className="text-white italic hover:not-italic">Hooray, no tasks pending!</span>
          )}
          {myTodos.map((obj) => {
            // Basically ya to jab showCompleted true ho tab dikhen toh saare dikhenge yaa phir jab !obj.isCompleted dikhen to jo sirf completed nahi hai wo dikhenge
            return (showCompleted || !obj.isCompleted) && <div key={obj.id} className="myTodos flex justify-between items-start my-3">
              <div className="flex items-start gap-3">
                <input
                  className="mt-[7px]"
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={obj.isCompleted}
                  id={obj.id}
                />
                <p className={obj.isCompleted ? 'line-through text-white' : 'text-white'}>{obj.todo}</p>
              </div>
              <div className="editMyTodo flex gap-3">
                <button
                  onClick={(e) => {
                    editTodo(e, obj.id);
                  }}
                  className="bg-[#6D9773] text-white px-2 py-1 font-bold text-sm rounded border-[#6D9773] border-2 hover:bg-[#5c8061]"
                  title='Edit Task'
                >
                  <MdEditSquare />
                </button>
                <button
                  onClick={(e) => {
                    deleteTodo(e, obj.id);
                  }}
                  className="bg-[#6D9773] text-white px-2 py-1 font-bold text-sm rounded border-[#6D9773] border-2 hover:bg-[#5c8061]"
                  title='Delete Task'
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
