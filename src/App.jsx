import { useState } from "react";
import "./App.css";
import IdeasList from "./components/IdeaList";
import SubmitForm from "./components/SubmitForm";

function App() {
  const [page, setPage] = useState("submit");

  return (
    <div className="container">
      <div className="card">

        {/* NAV BAR */}
        <div className="nav">
          <button
            className={page === "submit" ? "nav-active" : ""}
            onClick={() => setPage("submit")}
          >
            📝 Submit Idea
          </button>

          <button
            className={page === "ideas" ? "nav-active" : ""}
            onClick={() => setPage("ideas")}
          >
            📊 View Ideas
          </button>
        </div>

        {/* PAGE CONTENT */}
        {page === "submit" ? (
          <SubmitForm />
        ) : (
          <IdeasList />
        )}

      </div>
    </div>
  );
}

export default App;