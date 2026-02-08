import { useEffect, useState } from "react";
import API from "../api";

export default function MyApplications({ user, refresh }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    API.get(`/applications?userEmail=${user.email}`)
      .then(res => setApps(res.data));
  }, [user, refresh]);

  return (
    <div>
      <h3>My Applications</h3>

      {apps.length === 0 && <p>No applications yet</p>}

      {apps.map(app => (
        <div className="card" key={app.id}>
          <p><b>Job:</b> {app.jobTitle}</p>
          <p><b>Email:</b> {app.email}</p>
          <p>
            <b>Resume:</b>{" "}
            <span style={{ color: "#2563eb" }}>{app.resume}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
