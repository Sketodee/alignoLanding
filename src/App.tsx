import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import SubscriptionManagement from "./components/SubscriptionManagement"
import Affiliate from "./pages/Affiliate"
import ManageAffiliates from "./components/affiliates/ManageAffiliates"
import Footer from "./components/Footer"

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
      <Route path="/affiliate" element={<Affiliate />} />
        <Route path="/affiliate/manage" element={<ManageAffiliates />} />
    </Routes>
    <Footer />
    
    </>
  )
}

export default App
