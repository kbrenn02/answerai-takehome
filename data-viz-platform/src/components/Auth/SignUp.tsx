import React, { useState } from "react";
import { emailSignUp } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";

const SignUp = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await emailSignUp(email, password);
            const user = result.user;
            console.log("Signed up user:", user)
            // Determine what to do with user info
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }))
        } catch (error) {
            console.error('Error signing up user:', error);
            // can probably have this displayed on the actual login page
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp