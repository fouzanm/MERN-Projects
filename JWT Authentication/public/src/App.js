import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";
import "react-toastify/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/" element={<Secret/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
