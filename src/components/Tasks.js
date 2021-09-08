import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        // Don't do tasks.push because state cannot directly change. Basically you re-create it and send it down
        // On way data ex: setTasks([...Tasks, {Add new object}])
        <>
         {tasks.map(task => (
             <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
         ))}
        </>
    )
}

export default Tasks
