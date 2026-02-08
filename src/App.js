import { useState } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <>
      <Navbar role={user.role} onLogout={logout} />

      {user.role === "admin" && <AdminDashboard />}
      {user.role === "recruiter" && <RecruiterDashboard user={user} />}
      {user.role === "user" && <UserDashboard user={user} />}
    </>
  );
}
