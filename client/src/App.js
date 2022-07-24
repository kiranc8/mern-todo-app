import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Todo from "./Todo/Todo";
import Profile from "./Profile/Profile";
import ChangePassword from "./ChangePassword/ChangePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/todo" element={<Todo />} />
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/changepassword' element={<ChangePassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
