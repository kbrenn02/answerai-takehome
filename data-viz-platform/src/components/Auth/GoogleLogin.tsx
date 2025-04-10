import { useDispatch } from "react-redux";
import { googleSignIn } from "../../utils/firebase";
import { setUser } from "./authSlice";

const GoogleLogin = () => {
    const dispatch = useDispatch()

    const handleGoogleLogin = async() => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            console.log('User signed in with Google:', user);
            // Determine what to do with user info
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }))
        } catch (error) {
            console.error('Google login error:', error);
            // can probably have this displayed on the actual login page
        }
    };

    return (
        <button onClick={handleGoogleLogin}>
            Sign in with Google
        </button>
    );
};


export default GoogleLogin;