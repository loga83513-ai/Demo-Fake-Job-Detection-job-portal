import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs?approved=false").then(res => setJobs(res.data));
  }, []);

  const approve = async (job) => {
    await API.patch(`/jobs/${job.id}`, { approved: true });
    setJobs(jobs.filter(j => j.id !== job.id));
  };

  return (
    <div className="center-page fade-in">
      <div className="dashboard">
        <h2>Admin Dashboard</h2>

        {jobs.map(job => (
          <div className="card hover-card" key={job.id}>
            <h4>{job.title}</h4>
            <p>{job.company}</p>
            <button className="btn" onClick={() => approve(job)}>
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
