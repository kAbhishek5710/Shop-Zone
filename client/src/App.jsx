import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteVendor from "./components/PrivateRouteVendor";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRouteVendor />}>
          <Route path="/vendorDashboard" element={<VendorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
