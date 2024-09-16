import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteVendor from "./components/PrivateRouteVendor";
import VendorDashboard from "./pages/VendorDashboard";
import Edit from "./pages/Edit";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import Product from "./pages/products/Product";
import ProductsPage from "./pages/products/ProductsPage";

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
          <Route path="/profile/edit" element={<Edit />} />
        </Route>
        <Route element={<PrivateRouteVendor />}>
          <Route path="/vendorDashboard" element={<VendorDashboard />} />
          <Route path="/vendorDashboard/vendor/edit" element={<Edit />} />
          <Route path="/vendorDashboard/add" element={<CreateProduct />} />
          <Route
            path="/vendorDashboard/updateProduct/:productId"
            element={<EditProduct />}
          />
        </Route>
        <Route path="/shop/:category" element={<ProductsPage />} />
        <Route path="/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
