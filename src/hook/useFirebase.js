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
  deleteUser,
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
  const [idToken, setIdToken] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShipped, setIsShipped] = useState(false);

  //email password based sign up
  const emailPasswordRegister = (name, email, password, navigate) => {
    setLoading(true);
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

  //email password based sign in
  const emailPasswordSignin = (email, password, navigate) => {
    setLoading(true);

    userAuth(email);

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

  //google based sign in
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

  //storing users state
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

  //remove user function
  const removeUser = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        alert("Deleted Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //logout function
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //user authentiv=catiin token genration on login
  const userAuth = (email) => {
    const user = { email: email };
    fetch("https://blooming-beach-91976.herokuapp.com/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => setIdToken(data.accessToken));
  };

  //setting admin
  useEffect(() => {
    fetch(`https://blooming-beach-91976.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.admin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [user?.email]);

  console.log(isAdmin);

  //saving user info to database
  const saveUser = (name, email, method) => {
    const userInfo = { name, email };
    fetch("https://blooming-beach-91976.herokuapp.com/users", {
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
    idToken,
    emailPasswordRegister,
    emailPasswordSignin,
    signinWithGoogle,
    setIsShipped,
    setRoleUser,
    setIsDeleted,
    removeUser,
    logOut,
  };
};

export default useFirebase;
