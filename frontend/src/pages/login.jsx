import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const formData = new URLSearchParams()

            formData.append("username", email)
            formData.append("password", password)

            const response = await API.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            )

            localStorage.setItem(
                "token",
                response.data.access_token
            )

            navigate("/dashboard")

        } catch (error) {

            console.log(error)

            alert(error.response?.data?.detail || "Login failed")
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
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "300px"
                }}
            >

                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: "10px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "10px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px"
                    }}
                >
                    Login
                </button>

                <Link
                    to="/register"
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    Create Account
                </Link>

                <Link
                    to="/forgot-password"
                    style={{
                        color: "#60a5fa",
                        textAlign: "center",
                        fontSize: "14px"
                    }}
                >
                    Forgot Password?
                </Link>

            </form>

        </div>
    )
}

export default Login