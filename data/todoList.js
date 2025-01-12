import React, { useState } from "react";

const tasks = [
]

const TodoList = () => {
    const [texts, setTexts] = useState("")
    const [changeTexts, setchangeTexts] = useState("")
    const [allTasks, setAllTasks] = useState(tasks)
    const today = new Date();
    

    const handleSubmit = () => {
        console.log(texts)
        addData()
    }

    const addData = () => {
        setAllTasks([...allTasks, { write: texts, date: today + "" }]);
        setTexts("")
    }
    const deleteData =(date)=>{
        const deleted = allTasks.filter((tasked)=> tasked.date !== date)
        setAllTasks(deleted)
        console.log("S",deleted)
    }

    const editData=(date)=>{
        const edit = allTasks.map((task)=> (task.date === date ? {...task, write : changeTexts}: task))
        setAllTasks(edit)
        console.log(edit)
    }
    // const editData = (date) => {
    //     const edited = allTasks.map((task) =>
    //         task.date === date ? { ...task, write: changeTexts } : task
    //     );
    //     setAllTasks(edited);
    //     setchangeTexts(""); // Clear the input after editing
    // };

    console.log(allTasks)

    return (
        <>
            {allTasks.map((task, index) => (
                <div key={index}>
                    <div>{task.write}</div>
                    <div>{task.date}</div>
                    <button onClick={()=>deleteData(task.date)}>delete</button>
                    <input type="text" value={changeTexts} onChange={e=> setchangeTexts(e.target.value)}/>
                    <button onClick={()=>editData(task.date)}>edit</button>
                </div>
            ))}

            <input type="text" value={texts} onChange={(e) => setTexts(e.target.value)} />
            <button onClick={handleSubmit}>submit</button>
        </>
    )
}
export default TodoList;