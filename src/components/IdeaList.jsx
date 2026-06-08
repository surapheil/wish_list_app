import { useEffect, useState } from "react";

function IdeasList() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwt69AxYBHXjUVVIR_DDyPhuR2ywFyMrzHWWnrLmLXN5AiyXef4jDjqETHWPLwZ9KA/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading ideas...</p>;
  }

  return (
    <div>
      <h2>Submitted Ideas</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Idea</th>
            <th>Priority</th>
            <th>Hours Saved</th>
          </tr>
        </thead>

        <tbody>
          {ideas.map((idea, index) => (
            <tr key={index}>
              <td>{idea.name}</td>
              <td>{idea.department}</td>
              <td>{idea.wishlist}</td>
              <td>{idea.priority}</td>
              <td>{idea.hoursSaved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IdeasList;