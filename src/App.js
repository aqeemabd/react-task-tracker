import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  // Using async await
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data)
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // Using Fetch method
  // useEffect(() => {
  //   fetch('http://localhost:5000/tasks')
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         console.log(result)
  //       }
  //     )
  // }, [])

  // If you are not using json-server
  // const [tasks, setTasks] = useState(
  //   [
  //       {
  //           id: 1,
  //           text: 'Doctors Appointment',
  //           day: 'Feb 5th at 2:30pm',
  //           reminder: true
  //       },
  //       {
  //           id: 2,
  //           text: 'Meeting at School',
  //           day: 'Feb 6th at 1:30pm',
  //           reminder: true
  //       },
  //       {
  //           id: 3,
  //           text: 'Food Shopping',
  //           day: 'Feb 5th at 2:30pm',
  //           reminder: false
  //       }
  //   ]
  // )

  // Add task
  const addTask = async task => {
    // const id = Math.floor(Math.random()* 1000) + 1
    // const param = {
    //   id,
    //   ...task
    // }
    // setTasks([
    //   ...tasks, param
    // ])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {/* {showAddTask && <AddTask onAdd={addTask}/>}
        {
          tasks.length > 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
          : 'Please add new task'
        } */}
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {
              tasks.length > 0 ? 
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
              : 'Please add new task'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// If you are using a class
// import React from "react";
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }


export default App;
