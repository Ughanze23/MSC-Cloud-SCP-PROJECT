import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Crypto from "./components/Crypto";
import News from "./components/News";
import Stock from "./components/Stock";
import Tax from "./components/Tax";
import NotFound from "./components/NotFound"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Navigate } from 'react-router-dom';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

// Layout component to wrap protected routes with Navbar
function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Protected Routes with Navbar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/crypto"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Crypto />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <News />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Stock />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Tax />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;