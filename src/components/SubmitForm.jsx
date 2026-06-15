import { useState } from "react";

function SubmitForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [wishlist, setWishlist] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [hoursSaved, setHoursSaved] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await fetch("https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec", {
      method: "POST",
      body: JSON.stringify({
        name,
        department,
        wishlist,
        priority, // Kept to prevent backend errors
        hoursSaved, // Kept to prevent backend errors
        points: 5,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setMessage("✅ Idea submitted successfully!");

      setName("");
      setDepartment("");
      setWishlist("");
      setPriority("Medium");
      setHoursSaved("");
    }
  };

  return (
    <>
      <h2 className="top_title">Submit New Idea</h2>
      <p className="subtext">
        Describe repetitive work that can be automated or improved.
      </p>

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
              <option value="">Select Department</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>IT</option>
              <option value="HR">HR</option>
              <option value="Supply Chain">Supply Chain</option>
            </select>
          </div>
        </div>

        {/* Enhanced Wish List Section */}
        <div className="form-group wishlist-container">
          <label className="wishlist-label">Wish List / Pain Point</label>
          <p className="wishlist-hint">Be as specific as possible about the current manual process.</p>
          <textarea
            className="form-control textarea enhanced-textarea"
            value={wishlist}
            onChange={(e) => setWishlist(e.target.value)}
            required
            rows="5"
            placeholder="e.g., I spend 3 hours every Friday manually copying data from our field tracking spreadsheets into the master report..."
          />
        </div>

        <button className="submit-btn" type="submit">
          Submit Idea (+5 Points)
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </>
  );
}

export default SubmitForm;