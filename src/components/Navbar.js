export default function Navbar({ role, onLogout }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 className="logo">Job Portal</h2>
        <span className="role-badge">{role.toUpperCase()}</span>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
