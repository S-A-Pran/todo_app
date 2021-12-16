import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home/Home";
import Login from "./pages/Login/Login/Login";
import Role from "./pages/Role/Role";
import AuthProvider from "../src/context/AuthProvider/AuthProvider";
import Register from "./pages/Login/Register/Register";
import AddNotes from "./pages/Dashboard/AddNotes/AddNotes";
import AllNotes from "./pages/Dashboard/AllNotes/AllNotes";
import CreateSubscription from "./pages/Dashboard/CreateSubscription/CreateSubscription";
import Confirm from "./pages/Home/Confirm/Confirm";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";
import Subscription from "./pages/Home/Subscription/Subscription";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Role></Role>}></Route>
          <Route path="/role" element={<Role></Role>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/confirm/:id" element={<PrivateRoute><Confirm></Confirm></PrivateRoute>}></Route>
          <Route path="/addnote" element={<PrivateRoute><AddNotes></AddNotes></PrivateRoute>}></Route>
          <Route path="/mysubscription" element={<PrivateRoute><Subscription></Subscription></PrivateRoute>}></Route>
          <Route path="/createsubscription" element={<PrivateRoute><CreateSubscription></CreateSubscription></PrivateRoute>}></Route>
          <Route path="/allnotes" element={<PrivateRoute><AllNotes></AllNotes></PrivateRoute>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/home" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
