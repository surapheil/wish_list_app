import { useState } from "react";
import "./App.css";
import IdeasList from "./components/IdeaList";

function App() {
const [name, setName] = useState("");
const [department, setDepartment] = useState("");
const [wishlist, setWishlist] = useState("");
const [priority, setPriority] = useState("Medium");
const [hoursSaved, setHoursSaved] = useState("");
const [message, setMessage] = useState("");
const [showIdeas, setShowIdeas] = useState(false);

const submitForm = async (e) => {
e.preventDefault();

try {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec",
    {
      method: "POST",
      body: JSON.stringify({
        name,
        department,
        wishlist,
        priority,
        hoursSaved,
        points: 5,
      }),
    }
  );

  const result = await response.json();

  if (result.success) {
    setMessage("✅ Idea submitted successfully!");

    setName("");
    setDepartment("");
    setWishlist("");
    setPriority("Medium");
    setHoursSaved("");
  }
} catch (error) {
  setMessage("❌ Failed to submit idea.");
  console.error(error);
}

};

return ( 
<div className="container"> 
  <div className="card"> 
    <div className="hero">
        <h1>💡 Wishlist</h1>
        <p>
          Share repetitive tasks, pain points, and improvement ideas that
          could be solved using technology.
        </p>
    </div>

    <button
        type="button"
        className="submit-btn"
        onClick={() => setShowIdeas(!showIdeas)}
      >
        {showIdeas
          ? "Hide Submitted Ideas"
          : "View Submitted Ideas"}
    </button>

    <form onSubmit={submitForm}>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          type="text"
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
          <option>Supply Chain</option>
          <option>Finance</option>
          <option>Procurement</option>
          <option>HR</option>
          <option>Manufacturing</option>
          <option>IT</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Wish List / Pain Point</label>
        <textarea
          className="form-control"
          value={wishlist}
          onChange={(e) => setWishlist(e.target.value)}
          required
          rows="5"
          placeholder="Describe the repetitive task or process that should be improved..."
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Critical">
            Critical - Stops Work
          </option>
          <option value="High">
            High - Significant Time Waste
          </option>
          <option value="Medium">
            Medium - Productivity Improvement
          </option>
          <option value="Low">
            Low - Nice To Have
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Estimated Time Saved</label>
        <select
          className="form-control"
          value={hoursSaved}
          onChange={(e) => setHoursSaved(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="<1 hour/week">
            Less than 1 hour/week
          </option>
          <option value="1-3 hours/week">
            1-3 hours/week
          </option>
          <option value="3-5 hours/week">
            3-5 hours/week
          </option>
          <option value="5-10 hours/week">
            5-10 hours/week
          </option>
          <option value="10+ hours/week">
            More than 10 hours/week
          </option>
        </select>
      </div>

      <button className="submit-btn" type="submit">
        Submit Idea (+5 Points)
      </button>
    </form>

    {message && (
      <div className="message">
        {message}
      </div>
    )}
    {showIdeas && <IdeasList />}
  </div>
</div>

);
}

export default App;
