import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        setMessage("")
        setErrorMessage("")

        try {

            await API.post(
                "/auth/register",
                {
                    username,
                    email,
                    password
                }
            )

            setMessage(
                "Registration successful"
            )

            setTimeout(() => {

                navigate("/login")

            }, 1000)

        } catch (error) {

            console.log(error)

            setErrorMessage(
                error.response?.data?.detail ||
                "Registration failed"
            )
        }
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f172a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#1e293b",
                    padding: "40px",
                    borderRadius: "10px",
                    width: "350px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    Register
                </h1>

                {
                    message && (

                        <p
                            style={{
                                color: "lightgreen",
                                textAlign: "center"
                            }}
                        >
                            {message}
                        </p>
                    )
                }

                {
                    errorMessage && (

                        <p
                            style={{
                                color: "red",
                                textAlign: "center"
                            }}
                        >
                            {errorMessage}
                        </p>
                    )
                }

                {/* USERNAME */}

                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    style={{
                        padding: "10px"
                    }}
                />

                {/* EMAIL */}

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={{
                        padding: "10px"
                    }}
                />

                {/* PASSWORD */}

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        padding: "10px"
                    }}
                />

                {/* BUTTON */}

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    Register
                </button>

                {/* LOGIN LINK */}

                <p
                    style={{
                        textAlign: "center"
                    }}
                >
                    Already have an account?

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                        style={{
                            color: "#60a5fa",
                            cursor: "pointer",
                            marginLeft: "5px"
                        }}
                    >
                        Login
                    </span>

                </p>

            </form>

        </div>
    )
}

export default Register