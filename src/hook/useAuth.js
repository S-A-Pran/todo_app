import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider/AuthProvider"

const useAuth = () =>{
    // auth context set up
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuth;