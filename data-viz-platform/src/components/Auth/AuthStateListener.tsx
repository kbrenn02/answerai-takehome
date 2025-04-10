import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { setUser, clearUser } from './authSlice';

const AuthStateListener = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user)) // update the user state based on the authentication state at the global level 
            } else {
                dispatch(clearUser())
            }
        });

        return () => unsubscribe()
    }, [dispatch]);

    return null
};

export default AuthStateListener