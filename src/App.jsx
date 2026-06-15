import { useState } from "react";
import "./App.css";
import MyPoints from "./components/MyPoints";   // ← changed
import SubmitForm from "./components/SubmitForm";

function App() {
  const [page, setPage] = useState("submit");

  return (
    <div className="container">
      <div className="card">
        <div className="nav">
          <button className={page === "submit" ? "nav-active" : ""} onClick={() => setPage("submit")}>
            💡 Submit idea
          </button>
          <button className={page === "points" ? "nav-active" : ""} onClick={() => setPage("points")}>
            ⭐ My points
          </button>
        </div>

        {page === "submit" ? <SubmitForm /> : <MyPoints />}
      </div>
    </div>
  );
}

export default App;