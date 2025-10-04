import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainWebsite from "./components/MainWebsite";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main website route */}
        <Route path="/" element={<MainWebsite />} />

        {/* Admin route */}
        <Route path="/admin" element={<Admin />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
