import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import GoogleLogin from './components/Auth/GoogleLogin'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import Dashboard from './features/dashboard/Dashboard'
// import AuthStateListener from './components/Auth/AuthStateListener'
import './App.css'

function App() {
    // Access user's state from the redux store (whether they are authenticated or not)
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div>
            {!user ? (
                <div>
                    <h1>Authentication</h1>
                    <GoogleLogin />
                    <SignUp />
                    <SignIn />
                </div>
            ) : (
                <Dashboard />
            )}
            
        </div>
    )
}

export default App
