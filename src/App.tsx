import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import SubscriptionManagement from "./components/SubscriptionManagement"

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/subscription" element={<SubscriptionManagement />} />
    </Routes>
    
    </>
  )
}

export default App
