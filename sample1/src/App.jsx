import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Search from "./search";
import ManageUsers from "./admin";
import { AuthProvider } from "./auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
