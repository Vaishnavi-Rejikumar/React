import { useState } from "react";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="container">
      <h2>Search Users</h2>
      <input type="text" placeholder="Search by ID, Name, Email, Department" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
