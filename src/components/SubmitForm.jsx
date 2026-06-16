import { useState } from "react";

function SubmitForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [wishKnew, setWishKnew] = useState("");
  const [wishHad, setWishHad] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    setMessage("⏳ Submitting your idea...");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            department,
            wishlist: wishKnew,
            priority: wishHad,
            hoursSaved: "",
            points: 5,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setMessage("✅ Idea submitted — 5 points added!");

      setName("");
      setDepartment("");
      setWishKnew("");
      setWishHad("");

      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      setMessage("❌ Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="top_title">Submit a new idea</h2>
      <p className="subtext">
        Share what's slowing you down — every idea earns 5 points.
      </p>

      <form onSubmit={submitForm} className="form">
        <div className="grid">
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>I wish I had...</label>
          <textarea
            className="form-control textarea"
            value={wishHad}
            onChange={(e) => setWishHad(e.target.value)}
            rows="3"
            disabled={isSubmitting}
          />
        </div>

        <button
          className="submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit idea (+5 points)"}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </>
  );
}

export default SubmitForm;