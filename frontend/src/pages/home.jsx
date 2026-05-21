import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f172a",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px"
            }}
        >

            <h1
                style={{
                    fontSize: "60px"
                }}
            >
                Task Manager
            </h1>

            <p
                style={{
                    fontSize: "20px",
                    color: "#cbd5e1"
                }}
            >
                Manage your daily tasks easily
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "20px"
                }}
            >

                <button
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "12px 30px",
                        border: "none",
                        backgroundColor: "#2563eb",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "8px",
                        fontSize: "16px"
                    }}
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    style={{
                        padding: "12px 30px",
                        border: "none",
                        backgroundColor: "#16a34a",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "8px",
                        fontSize: "16px"
                    }}
                >
                    Register
                </button>

            </div>

        </div>
    )
}

export default Home
