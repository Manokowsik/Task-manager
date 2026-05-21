import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [editingTaskId, setEditingTaskId] = useState(null)

    const [filter, setFilter] = useState("all")

    // FETCH TASKS
    const fetchTasks = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/tasks/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            setTasks(response.data)

        } catch (error) {

            console.log(error)

            alert("Failed to fetch tasks")

            navigate("/login")
        }
    }

    // CREATE TASK
    const createTask = async () => {

        try {

            await axios.post(
                "http://127.0.0.1:8000/tasks/create-task",
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            setTitle("")
            setDescription("")

            fetchTasks()

        } catch (error) {

            console.log(error)

            alert("Failed to create task")
        }
    }

    // UPDATE TASK
    const updateTask = async () => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/tasks/update-task/${editingTaskId}`,
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            setEditingTaskId(null)

            setTitle("")
            setDescription("")

            fetchTasks()

        } catch (error) {

            console.log(error)

            alert("Failed to update task")
        }
    }

    // COMPLETE TASK
    const completeTask = async (taskId) => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/tasks/complete-task/${taskId}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            fetchTasks()

        } catch (error) {

            console.log(error)

            alert("Failed to complete task")
        }
    }

    // DELETE TASK
    const deleteTask = async (taskId) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/tasks/delete-task/${taskId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            fetchTasks()

        } catch (error) {

            console.log(error)

            alert("Failed to delete task")
        }
    }

    // EDIT TASK
    const editTask = (task) => {

        setEditingTaskId(task.id)

        setTitle(task.title)

        setDescription(task.description)
    }

    // LOGOUT
    const logout = () => {

        localStorage.removeItem("token")

        navigate("/login")
    }

    // FILTER TASKS
    const filteredTasks = tasks.filter((task) => {

        if (filter === "completed") {

            return task.completed === true
        }

        if (filter === "pending") {

            return task.completed === false
        }

        return true
    })

    useEffect(() => {

        const token =
            localStorage.getItem("token")

        if (!token) {

            navigate("/login")

        } else {

            fetchTasks()
        }

    }, [])

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f172a",
                color: "white",
                padding: "40px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <h1>Task Dashboard</h1>

                <button
                    onClick={logout}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    Logout
                </button>

            </div>

            {/* CREATE TASK */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "30px",
                    flexWrap: "wrap"
                }}
            >

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "250px"
                    }}
                />

                <input
                    type="text"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "250px"
                    }}
                />

                {
                    editingTaskId ? (

                        <button
                            onClick={updateTask}
                            style={{
                                backgroundColor: "orange",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                cursor: "pointer"
                            }}
                        >
                            Update Task
                        </button>

                    ) : (

                        <button
                            onClick={createTask}
                            style={{
                                padding: "10px 20px",
                                cursor: "pointer"
                            }}
                        >
                            Add Task
                        </button>

                    )
                }

            </div>

            {/* FILTER */}

            <div
                style={{
                    marginTop: "20px"
                }}
            >

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "200px"
                    }}
                >

                    <option value="all">
                        All Tasks
                    </option>

                    <option value="completed">
                        Completed Tasks
                    </option>

                    <option value="pending">
                        Pending Tasks
                    </option>

                </select>

            </div>

            {/* TASK LIST */}

            <div
                style={{
                    marginTop: "30px"
                }}
            >

                {
                    filteredTasks.length === 0 ? (

                        <h2>No Tasks Found</h2>

                    ) : (

                        filteredTasks.map((task) => (

                            <div
                                key={task.id}
                                style={{
                                    backgroundColor: "#1e293b",
                                    padding: "20px",
                                    marginBottom: "20px",
                                    borderRadius: "10px"
                                }}
                            >

                                <h2>{task.title}</h2>

                                <p>{task.description}</p>

                                <p>
                                    {
                                        task.completed
                                            ? "✅ Completed"
                                            : "❌ Pending"
                                    }
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        flexWrap: "wrap"
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            completeTask(task.id)
                                        }
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            border: "none",
                                            padding: "10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Complete
                                    </button>

                                    <button
                                        onClick={() =>
                                            editTask(task)
                                        }
                                        style={{
                                            backgroundColor: "orange",
                                            color: "white",
                                            border: "none",
                                            padding: "10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteTask(task.id)
                                        }
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "none",
                                            padding: "10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    )
                }

            </div>

        </div>
    )
}

export default Dashboard