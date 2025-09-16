import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Machine from "./page/machine"
import Landing from "./page/Landing"

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Start/:hh/:mm/:ss" element={<Machine />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
