import { useState } from "react";
import { aiVerifyJob } from "../utils/aiVerify";

export default function VerifyJob() {
  const [text, setText] = useState("");
  const [res, setRes] = useState(null);

  return (
    <div>
      <h2>Verify Outside Job</h2>
      <textarea onChange={e => setText(e.target.value)} />
      <button onClick={() => setRes(aiVerifyJob(text))}>Check</button>

      {res && (
        <>
          <p>{res.status}</p>
          <p>Score: {res.score}</p>
          <ul>{res.reasons.map((r,i) => <li key={i}>{r}</li>)}</ul>
        </>
      )}
    </div>
  );
}
