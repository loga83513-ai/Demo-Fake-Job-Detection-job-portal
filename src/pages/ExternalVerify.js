import { useState } from "react";
import { aiVerifyJob } from "../utils/aiVerify";

export default function ExternalVerify() {
  const [job, setJob] = useState({});
  const [result, setResult] = useState(null);

  const verify = () => {
    setResult(aiVerifyJob(job));
  };

  return (
    <div className="card">
      <h3>Verify External Job Offer</h3>

      <input placeholder="Company Name"
        onChange={e=>setJob({...job, company: e.target.value})} />

      <input placeholder="Official Website"
        onChange={e=>setJob({...job, website: e.target.value})} />

      <input placeholder="Official Email"
        onChange={e=>setJob({...job, email: e.target.value})} />

      <input placeholder="LinkedIn Company URL"
        onChange={e=>setJob({...job, linkedin: e.target.value})} />

      <input placeholder="Company Age (years)"
        type="number"
        onChange={e=>setJob({...job, companyAge: Number(e.target.value)})} />

      <input placeholder="Salary"
        onChange={e=>setJob({...job, salary: e.target.value})} />

      <textarea placeholder="Job Description"
        onChange={e=>setJob({...job, description: e.target.value})} />

      <button onClick={verify}>Verify Job</button>

      {result && (
        <>
          <h4>{result.status}</h4>
          <p>Trust Score: {result.score}/100</p>

          <b>Why it looks REAL:</b>
          <ul>{result.real.map((r,i)=><li key={i}>{r}</li>)}</ul>

          <b>Why it looks RISKY:</b>
          <ul>{result.fake.map((f,i)=><li key={i}>{f}</li>)}</ul>
        </>
      )}
    </div>
  );
}
