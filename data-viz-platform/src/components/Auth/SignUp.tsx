import React, { useState, useEffect } from "react";
import { emailSignUp } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";

interface SignUpProps {
    isVisible: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ isVisible }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await emailSignUp(email, password);
            const user = result.user;
            console.log("Signed up user:", user);
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            );
        } catch (error) {
            console.error('Error signing up user:', error);
            setError("Failed to sign up.");
        }
    };

    // Auto-clear error after 3 seconds
    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    return (
        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 ${
                isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
            <form
                onSubmit={handleSubmit}
                className="shadow-md rounded p-6 w-full flex flex-col space-y-4"
            >
                {error && (<div className="text-red-500 font-semibold my-4">{error}</div>)}
    
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
    
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
    
                <button
                    type="submit"
                    className="bg-green-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
