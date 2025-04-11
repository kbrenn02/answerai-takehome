import React, { useState } from 'react';
import GoogleLogin from '../../components/Auth/GoogleLogin';
import SignUp from '../../components/Auth/SignUp';
import SignIn from '../../components/Auth/SignIn';

const Login = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignInClick = () => {
        setShowSignIn(true);
        setShowSignUp(false);
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
        setShowSignIn(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-3xl font-semibold mb-8">Login to the Dashboard</h1>

            <div className="flex justify-center gap-4 w-full max-w-md mb-6">
                <GoogleLogin />
                <button 
                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 transition" 
                    onClick={handleSignInClick}
                >
                    Sign In
                </button>
                <button 
                    className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-600 transition" 
                    onClick={handleSignUpClick}
                >
                    Sign Up
                </button>
            </div>

            {/* Show SignIn form */}
            {showSignIn && <SignIn isVisible={showSignIn} />}
                
            {/* Show SignUp form */}
            {showSignUp && <SignUp isVisible={showSignUp} />}
        </div>
    );
};

export default Login;
