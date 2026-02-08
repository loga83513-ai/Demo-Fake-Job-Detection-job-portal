import { useState } from "react";
import API from "../api";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const login = async () => {
    // ADMIN LOGIN (SECRET)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ role: "admin" });
      return;
    }

    const res = await API.get(
      `/users?email=${email}&password=${password}&role=${role}`
    );

    if (res.data.length === 1) {
      setUser(res.data[0]);
    } else {
      alert("Invalid credentials");
    }
  };

  const register = async () => {
    await API.post("/users", { email, password, role });
    alert("Registered successfully");
  };

  return (
    <div className="center">
      <div className="card fade-in">
        <h2 className="title">Job Portal Login</h2>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <select onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className="btn" onClick={login}>Login</button>
        <button className="btn-outline" onClick={register}>Register</button>
      </div>
    </div>
  );
}
