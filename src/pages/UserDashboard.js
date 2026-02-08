import { useEffect, useState } from "react";
import API from "../api";
import { aiVerifyJob } from "../utils/aiVerify";
import ApplyJob from "./ApplyJob";
import ExternalVerify from "./ExternalVerify";
import MyApplications from "./MyApplications";

export default function UserDashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    API.get("/jobs?approved=true").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">User Dashboard</h2>

      <ExternalVerify />

      <h3 className="section-title">Verified Jobs</h3>

      <div className="grid">
        {jobs.map(job => {
          const v = aiVerifyJob(job);
          return (
            <div className="card" key={job.id}>
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>

              <span className={`badge ${v.status === "REAL JOB" ? "real" : "fake"}`}>
                {v.status}
              </span>

              <p>Trust Score: {v.score}</p>

              <button onClick={() => setSelected(job)}>
                Apply
              </button>
            </div>
          );
        })}
      </div>

      {selected && (
        <ApplyJob
          job={selected}
          user={user}
          onApplied={() => {
            setSelected(null);
            setRefresh(prev => prev + 1);   // 🔥 REFRESH
          }}
        />
      )}

      <MyApplications user={user} refresh={refresh} />
    </div>
  );
}
