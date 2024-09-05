import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    // const addTask = (title: string) => {
    //     const newTask = {id: v1(), title: title, isDone: false}
    //     setTasks([...tasks, newTask])
    // }
    //
    // const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    //     setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newStatus} : el))
    // }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    return (
        <div className="App">
            {todolists.map(todo => {

                    let allTasks = tasks[todo.id]

                    // if (todo.filter === 'active') {
                    //     allTasks = tasks.filter(el => el.isDone === false)
                    // }
                    //
                    // if (todo.filter === 'completed') {
                    //     allTasks = tasks.filter(el => el.isDone === true)
                    // }


                    return (
                        <Todolist key={todo.id}
                                  todolistId={todo.id}
                                  title={todo.title}
                                  tasks={allTasks}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={() => {}}
                                  changeTaskStatus={() => {}}
                                  filter={todo.filter}
                        />)
                }
            )
            }
        </div>
    )
}

export default App;
