import Home from "./pages/Home"
import Login from "./pages/Login"
import SigUp from "./pages/SignUp"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SigUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App