/************************************************************ IMPORTS ************************************************************/

import { auth } from '../utils/Firebase';
import { useContext, createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

/************************************************************ IMPORTS ************************************************************/


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    localStorage.clear();
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ googleSignIn, githubSignIn, logOut, user }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
