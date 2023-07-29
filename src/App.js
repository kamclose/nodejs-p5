import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
function App() {

  return(
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </div>

  )
  }
  

export default App;