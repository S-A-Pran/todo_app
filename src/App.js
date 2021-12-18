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
import AllUsers from "./pages/Dashboard/AllUsers/AllUsers";
import PayPal from "./pages/Home/PayPal/PayPal";
import Profile from "./pages/Home/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* //all routes defined here */}
          <Route path="/" element={<Role></Role>}></Route>
          <Route path="/role" element={<Role></Role>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/confirm/:id" element={<PrivateRoute><Confirm></Confirm></PrivateRoute>}></Route>
          <Route path="/addnote" element={<PrivateRoute><AddNotes></AddNotes></PrivateRoute>}></Route>
          <Route path="/mysubscription" element={<PrivateRoute><Subscription></Subscription></PrivateRoute>}></Route>
          <Route path="/paypal" element={<PrivateRoute><PayPal></PayPal></PrivateRoute>}></Route>
          <Route path="/profile" element={<PrivateRoute><Profile></Profile></PrivateRoute>}></Route>
          <Route path="/createsubscription" element={<PrivateRoute><CreateSubscription></CreateSubscription></PrivateRoute>}></Route>
          <Route path="/allnotes" element={<PrivateRoute><AllNotes></AllNotes></PrivateRoute>}></Route>
          <Route path="/allusers" element={<PrivateRoute><AllUsers></AllUsers></PrivateRoute>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/home" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
          <Route path="/*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
