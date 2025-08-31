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
import AIChatbot from "./pages/ChatBot"
import PluginPage from "./pages/PluginPage"
import PluginDetailPage from "./pages/PluginDetailPage"

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/subscription" element={<SubscriptionManagement />} />
      <Route path="/affiliate" element={<Affiliate />} />
      <Route path="/plugins" element={<PluginPage />} />
      <Route path="/plugins/:id" element={<PluginDetailPage />} />
        <Route path="/affiliate/manage" element={<ManageAffiliates />} />
    </Routes>
    <Footer />
    <AIChatbot />
    
    </>
  )
}

export default App
