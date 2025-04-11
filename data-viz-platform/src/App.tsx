import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import Login from './features/login/Login'
import Dashboard from './features/dashboard/Dashboard'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
    // Access user's state from the redux store (whether they are authenticated or not)
    const user = useSelector((state: RootState) => state.auth.user)
    const isAuthenticated = !!user.uid;

    return (
        <Routes>
            {/* If the user is authenticated, send them to the Dashboard, if not, send them to login */}
            <Route
                path="/"
                element={
                    isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                }
            />
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/" replace /> : <Login />
                }
            />
        </Routes>
    )
}

export default App
