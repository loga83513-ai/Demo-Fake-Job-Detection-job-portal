import { useState, useEffect } from "react";
import API from "../api";

export default function RecruiterDashboard({ user }) {
  const [job, setJob] = useState({});
  const [apps, setApps] = useState([]);

  const postJob = async () => {
    await API.post("/jobs", {
      ...job,
      recruiterEmail: user.email,
      approved: false
    });

    alert("Job sent for admin approval");
  };

  useEffect(() => {
  if (!user?.email) return;

  API.get(`/applications?recruiterEmail=${user.email}`)
    .then(res => setApps(res.data));
}, [user]);

  return (
    <div className="page">
      <h2 className="page-title">Recruiter Dashboard</h2>

      <div className="card dashboard-card">
        <input
          placeholder="Job Title"
          onChange={e => setJob({ ...job, title: e.target.value })}
        />
        <input
          placeholder="Company"
          onChange={e => setJob({ ...job, company: e.target.value })}
        />
        <input
          placeholder="Salary"
          onChange={e => setJob({ ...job, salary: e.target.value })}
        />
        <input placeholder="Company Website"
  onChange={e=>setJob({...job, website: e.target.value})} />

<input placeholder="Official Email (hr@company.com)"
  onChange={e=>setJob({...job, email: e.target.value})} />

<input placeholder="LinkedIn Company URL"
  onChange={e=>setJob({...job, linkedin: e.target.value})} />

<input placeholder="Company Age (years)"
  type="number"
  onChange={e=>setJob({...job, companyAge: Number(e.target.value)})} />

        <textarea
          placeholder="Job Description"
          onChange={e => setJob({ ...job, description: e.target.value })}
        />
        <button onClick={postJob}>Post Job</button>
      </div>

      <h3 className="section-title">Applications Received</h3>

      {apps.length === 0 && (
        <p className="empty">No applications yet</p>
      )}

      <div className="grid">
        {apps.map(a => (
          <div className="card" key={a.id}>
            <p><b>Name:</b> {a.name}</p>
            <p><b>Email:</b> {a.email}</p>
            <p><b>Job:</b> {a.jobTitle}</p>
            <p><b>Resume:</b> {a.resume}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
