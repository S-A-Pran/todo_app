import initializeFirebase from "../pages/Login/Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

initializeFirebase();

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isRoleUser, setRoleUser] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShipped, setIsShipped] = useState(false);

  const emailPasswordRegister = (name, email, password, navigate) => {
    setLoading(true);
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUser(name, user.email, "POST");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            navigate("/login");
            alert("Registered Successfully. Please Login...");
          })
          .catch((error) => {
            setError(error.message);
          });

        setError("");
        logOut();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const emailPasswordSignin = (email, password, navigate) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate("/home");
        alert(`Logged in successfully`);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  const signinWithGoogle = (history, destination) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email, "PUT");
        setUser(user);

        history.replace(destination);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [user.email]);

  const saveUser = (name, email, method) => {
    const userInfo = { name, email };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return {
    user,
    loading,
    error,
    isAdmin,
    isDeleted,
    isShipped,
    isRoleUser,
    emailPasswordRegister,
    emailPasswordSignin,
    signinWithGoogle,
    setIsShipped,
    setRoleUser,
    setIsDeleted,
    logOut,
  };
};

export default useFirebase;