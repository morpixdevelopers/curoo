import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainWebsite from "./components/MainWebsite";
import Admin from "./components/Admin";
import AllDoctors from "./components/AllDoctors";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Main website route */}
          <Route path="/" element={<MainWebsite />} />

          {/* All Doctors route */}
          <Route path="/all-doctors" element={<AllDoctors />} />

          {/* Admin route */}
          <Route path="/admin" element={<Admin />} />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
