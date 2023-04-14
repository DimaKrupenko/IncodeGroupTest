import React, { useState, useEffect } from 'react';
import styles from './taskColumns.module.css'



const TaskСolumns = ({ repoData, repoUrl }) => {
    const [toDo, setToDo] = useState(() => {
        return JSON.parse(localStorage.getItem("toDo")) || []
    }
    );
    const [inProgress, setInProgress] = useState(() => {
        return JSON.parse(localStorage.getItem("inProgress")) || []
    }
    );
    const [done, setDone] = useState(() => {
        return JSON.parse(localStorage.getItem("done")) || []
    }
    );

    useEffect(() => {
        if (repoData) {
            setToDo(repoData);
        }
    }, [repoData]);

    useEffect(() => {
        window.localStorage.setItem("toDo", JSON.stringify(toDo));
        window.localStorage.setItem("inProgress", JSON.stringify(inProgress));
        window.localStorage.setItem("done", JSON.stringify(done));
    }, [toDo, inProgress, done]);



    const handleDragStart = (event, task, source) => {
        event.dataTransfer.setData("task", task);
        event.dataTransfer.setData("source", source);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event, targetList) => {
        const taskId = event.dataTransfer.getData("task");
        const source = event.dataTransfer.getData("source");

        let task;
        if (source === "toDo") {
            task = toDo.find(item => item.id.toString() === taskId);
            setToDo(toDo.filter(item => item.id.toString() !== taskId));
        } else if (source === "inProgress") {
            task = inProgress.find(item => item.id.toString() === taskId);
            setInProgress(inProgress.filter(item => item.id.toString() !== taskId));
        } else {
            task = done.find(item => item.id.toString() === taskId);
            setDone(done.filter(item => item.id.toString() !== taskId));
        }


        if (targetList === "toDo") {
            setToDo(prevToDo => prevToDo.concat(task));
        } else if (targetList === "inProgress") {
            setInProgress(prevInProgress => prevInProgress.concat(task));
        } else {
            setDone(prevDone => prevDone.concat(task));
        }
    };
    return (
        <div className={styles.columnsConteiner}>
            {repoData && <div className={styles.linksConteiner}>
                <a href={`https://github.com/${repoUrl}`} target="_blank" rel="noopener noreferrer"> Repository url </a>
                <p>{repoUrl}</p>
            </div>}
            <div className={styles.columns}>
                <div className={styles.tasks}>
                    <h2 className={styles.tasksTitle}>ToDo</h2>
                    <ul
                        className={styles.tasksList}
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(event, "toDo")}
                    >
                        {toDo && toDo.map((task) => (
                            <li
                                key={task.id}
                                className={styles.tasksListContent}
                                draggable
                                onDragStart={(event) => handleDragStart(event, task.id, "toDo")}
                            >
                                <h3>{task.title}</h3>
                                <p> #{task.number} update: {task.updated_at}</p>
                                <p> admin | comments {task.comments} </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.tasks}>
                    <h2 className={styles.tasksTitle}>In Progress</h2>
                    <ul
                        className={styles.tasksList}
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(event, "inProgress")}
                    >
                        {inProgress && inProgress.map((task) => (
                            <li
                                key={task.id}
                                className={styles.tasksListContent}
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, task.id, "inProgress")
                                }
                            >
                                <h3>{task.title}</h3>
                                <p> #{task.number} update: {task.updated_at}</p>
                                <p> admin | comments {task.comments} </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.tasks}>
                    <h2 className={styles.tasksTitle}>Done</h2>
                    <ul className={styles.tasksList}
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(event, "done")}
                    >
                        {done && done.map((task) => (
                            <li
                                key={task.id}
                                className={styles.tasksListContent}
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, task.id, "done")
                                }
                            >
                                <h3>{task.title}</h3>
                                <p> #{task.number} update: {task.updated_at}</p>
                                <p> admin | comments {task.comments} </p>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>)
}

export default TaskСolumns
