import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ContactsPage from "./Pages/ContactsPage";
import ChartsAndMapsPage from "./Pages/ChartsAndMapsPage";
import HomePage from "./Pages/Home";
import ContactDetailPage from "./Components/ContactDetailPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
