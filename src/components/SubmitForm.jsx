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
        priority,
        hoursSaved,
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
                <option>Logistics</option>
                <option>Finance</option>
                <option>IT</option>
            </select>
            </div>
        </div>

        <div className="form-group">
            <label>Wish List / Pain Point</label>
            <textarea
            className="form-control textarea"
            value={wishlist}
            onChange={(e) => setWishlist(e.target.value)}
            required
            rows="4"
            />
        </div>

        <div className="grid">
            <div className="form-group">
            <label>Priority</label>
            <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            </div>

            <div className="form-group">
            <label>Time Saved</label>
            <select
                className="form-control"
                value={hoursSaved}
                onChange={(e) => setHoursSaved(e.target.value)}
                required
            >
                <option value="">Select</option>
                <option>1-3 hours/week</option>
                <option>3-5 hours/week</option>
                <option>5-10 hours/week</option>
                <option>10+ hours/week</option>
            </select>
            </div>
        </div>

        <button className="submit-btn" type="submit">
            Submit Idea (+5 Points)
        </button>

        {message && <div className="message">{message}</div>}
        </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default SubmitForm;