import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Source from './pages/Source';
import Table from './pages/Table';
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/source" element={<Source />} />
          <Route path="/table" element={<Table />} />
          <Route path="/table/:id" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
