import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ShowContent from "./Components/ShowContent/ShowContent";
// import your route components too

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/show-content/:searchTerm'} element={<ShowContent />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
