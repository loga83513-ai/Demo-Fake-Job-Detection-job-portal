import { useEffect, useState } from "react";
import { API } from "../api/api";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map(j => (
        <div key={j.id}>
          <h4>{j.title}</h4>
          <p>{j.company}</p>
          <p>Trust Score: {j.trustScore}%</p>
          <Link to={`/apply/${j.id}`}>Apply</Link>
        </div>
      ))}
    </div>
  );
}
