import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard"
import SendMoney from "./components/SendMoney"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import TestTailwind from "./components/TestTailwind";



  function App() {
    return (
      <>
      <TestTailwind />
         <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }


export default App
