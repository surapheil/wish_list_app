import { useState } from "react";

function SubmitForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [wishKnew, setWishKnew] = useState("");
  const [wishHad, setWishHad] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    await fetch("https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec", {
      method: "POST",
      body: JSON.stringify({
        name,
        department,
        wishlist: wishKnew,   // → Column D (Wish List)
        priority: wishHad,    // → Column E (repurposed as "I wish I had")
        hoursSaved: "",       // → Column F (left blank)
        points: 5,            // → Column G
      }),
    });

    setMessage("✅ Idea submitted — 5 points added!");
    setName(""); setDepartment(""); setWishKnew(""); setWishHad("");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <>
      <h2 className="top_title">Submit a new idea</h2>
      <p className="subtext">Share what's slowing you down — every idea earns 5 points.</p>

      <form onSubmit={submitForm} className="form">
        <div className="grid">
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select department</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>IT</option>
              <option>HR</option>
              <option>Supply Chain</option>
              <option>Legal</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>I wish I knew...</label>
          <textarea
            className="form-control textarea"
            value={wishKnew}
            onChange={(e) => setWishKnew(e.target.value)}
            rows="3"
            placeholder="e.g., I wish I knew what competitors are selling in my outlets — I only find out weeks later when customers mention it."
          />
        </div>

        <div className="form-group">
          <label>I wish I had...</label>
          <textarea
            className="form-control textarea"
            value={wishHad}
            onChange={(e) => setWishHad(e.target.value)}
            rows="3"
            placeholder="e.g., I wish I had a weekly summary of my team's activity automatically sent to my inbox every Monday morning."
          />
        </div>

        <button className="submit-btn" type="submit">Submit idea (+5 points)</button>
        {message && <div className="message">{message}</div>}
      </form>
    </>
  );
}

export default SubmitForm;