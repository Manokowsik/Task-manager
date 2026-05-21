import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Home from "./pages/Home"
import Register from "./pages/register"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import ForgotPassword from "./pages/forgotPassword"

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App