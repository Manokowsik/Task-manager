import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

function ForgotPassword() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [step, setStep] = useState(1)

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRequestReset = async (e) => {

        e.preventDefault()

        setMessage("")
        setErrorMessage("")

        if (!email) {

            setErrorMessage("Please enter your email")
            return
        }

        try {

            await API.post(
                "/auth/forgot-password",
                {
                    email
                }
            )

            setMessage(
                "Password reset link sent to your email"
            )

            setTimeout(() => {

                setStep(2)

            }, 1500)

        } catch (error) {

            console.log(error)

            setErrorMessage(
                error.response?.data?.detail ||
                "Failed to process request"
            )
        }
    }

    const handleResetPassword = async (e) => {

        e.preventDefault()

        setMessage("")
        setErrorMessage("")

        if (!newPassword || !confirmPassword) {

            setErrorMessage("Please fill all fields")
            return
        }

        if (newPassword !== confirmPassword) {

            setErrorMessage("Passwords do not match")
            return
        }

        if (newPassword.length < 6) {

            setErrorMessage("Password must be at least 6 characters")
            return
        }

        try {

            await API.post(
                "/auth/reset-password",
                {
                    email,
                    new_password: newPassword
                }
            )

            setMessage(
                "Password reset successfully! Redirecting to login..."
            )

            setTimeout(() => {

                navigate("/login")

            }, 1500)

        } catch (error) {

            console.log(error)

            setErrorMessage(
                error.response?.data?.detail ||
                "Failed to reset password"
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

            <div
                style={{
                    backgroundColor: "#1e293b",
                    padding: "40px",
                    borderRadius: "10px",
                    width: "350px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Reset Password
                </h1>

                {
                    message && (

                        <p
                            style={{
                                color: "lightgreen",
                                textAlign: "center",
                                marginBottom: "20px"
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
                                textAlign: "center",
                                marginBottom: "20px"
                            }}
                        >
                            {errorMessage}
                        </p>
                    )
                }

                {
                    step === 1 ? (

                        <form
                            onSubmit={handleRequestReset}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #334155",
                                    backgroundColor: "#0f172a",
                                    color: "white"
                                }}
                            />

                            <button
                                type="submit"
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px"
                                }}
                            >
                                Send Reset Link
                            </button>

                        </form>

                    ) : (

                        <form
                            onSubmit={handleResetPassword}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >

                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #334155",
                                    backgroundColor: "#0f172a",
                                    color: "white"
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #334155",
                                    backgroundColor: "#0f172a",
                                    color: "white"
                                }}
                            />

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
                                Reset Password
                            </button>

                        </form>

                    )
                }

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px"
                    }}
                >

                    <Link
                        to="/login"
                        style={{
                            color: "#60a5fa",
                            textDecoration: "none",
                            fontSize: "14px"
                        }}
                    >
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ForgotPassword
