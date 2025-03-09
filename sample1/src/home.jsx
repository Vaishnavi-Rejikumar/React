import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
