import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Task from './Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks?.length<0) return "";
    else{
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    setTasks(tasks)
  },[])

  const onAdd = (name) => {
    setTasks(prev => {
      return [...prev, { name: name, done: false }]
    })
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const totalTask = tasks?.length ?? 0
  const handleTaskDone = (taskindex, newdone) => {
    setTasks(prev => {
      const newTaskStatus = [...prev];
      newTaskStatus[taskindex].done = newdone;
      return newTaskStatus
    })
  }

  function getMessage() {
    const percentage = numberComplete / totalTask * 100;
    if (percentage === 0) {
      return "atleast do one task";
    }
    if (percentage === 100) {
      return "Nice job for Today!!!!!";
    }
    return "keep it going"
  }

  const removeTrash = (indexToRemove) => {
    console.log(indexToRemove,"indexremove")
    setTasks(prev => {
      return prev.filter((taskObject, index) => {
        return index !== indexToRemove
      })
    })
  }

  const renameTask = (index, newName) => {
    setTasks(
      prev => {
        const newTasks = [...prev];
        newTasks[index].name = newName
        return newTasks;
      }
    )
  }

  return (
    <main>
      <h1>{numberComplete}/{totalTask} Complete</h1>
      <h2>{getMessage()}</h2>
      <TodoForm onAdd={onAdd} />
      {tasks?.map((task, index) => {
        return <Task {...task}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTrash(index)}
          onToggle={(done) => handleTaskDone(index, done)} />
      })
      }
    </main>
  );
}

export default App;
