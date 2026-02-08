import API from "../api";
import { useState } from "react";

export default function ApplyJob({ job, user, onApplied }) {
  const [data, setData] = useState({});

  const submit = async () => {
    if (!data.name || !data.email || !data.resume) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/applications", {
      name: data.name,
      email: data.email,
      resume: data.resume,

      jobId: job.id,
      jobTitle: job.title,

      recruiterEmail: job.recruiterEmail,
      userEmail: user.email
    });

    alert("✅ Successfully applied");

    setData({});
    onApplied();     // 🔥 THIS TRIGGERS REFRESH
  };

  return (
    <div className="card">
      <h3>Apply for {job.title}</h3>

      <input
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="file"
        accept=".pdf"
        onChange={e =>
          setData({ ...data, resume: e.target.files[0].name })
        }
      />

      <button onClick={submit}>Submit Application</button>
    </div>
  );
}
