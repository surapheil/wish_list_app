import { useState } from "react";

function MyPoints() {
  const [nameInput, setNameInput] = useState("");
  const [result, setResult] = useState(null); // null | "found" | "empty"
  const [points, setPoints] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const lookupPoints = async () => {
    if (!nameInput.trim()) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec");
    const data = await res.json();

    const matches = data.filter(r => r.name?.toLowerCase() === nameInput.trim().toLowerCase());
    setLoading(false);

    if (!matches.length) { setResult("empty"); return; }

    setDisplayName(matches[0].name);
    setDepartment(matches[matches.length - 1].department || "");
    setSubmissionCount(matches.length);
    setPoints(matches.length * 5);
    setResult("found");
  };

  const initials = displayName.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <h2 className="top_title">My points</h2>
      <p className="subtext">Enter your name to see your accumulated contribution points.</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
        <input
          className="form-control"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookupPoints()}
          placeholder="Enter your name..."
          style={{ flex: 1 }}
        />
        <button className="submit-btn" style={{ width: "auto", padding: "0 20px" }} onClick={lookupPoints}>
          {loading ? "Searching..." : "Check points"}
        </button>
      </div>

      {result === "empty" && (
        <p style={{ textAlign: "center", color: "var(--muted)", padding: "2rem 0" }}>
          No submissions found for that name. Check the spelling or submit your first idea!
        </p>
      )}

      {result === "found" && (
        <div style={{ textAlign: "center", padding: "1.5rem", background: "var(--card-bg)", borderRadius: "12px" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 500, color: "#1a56db", margin: "0 auto 12px" }}>
            {initials}
          </div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>{displayName}</p>
          {department && <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>{department}</p>}
          <div style={{ display: "inline-block", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 32px", margin: "8px 0" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{points}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>points earned</div>
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
            {submissionCount} idea{submissionCount !== 1 ? "s" : ""} submitted · 5 pts each
          </p>
        </div>
      )}
    </>
  );
}

export default MyPoints;