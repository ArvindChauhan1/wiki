import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ShowContent from "./Components/ShowContent/ShowContent";
import { Layout } from "antd";
const { Header, Content } = Layout;

// import your route components too

const App = () => {
  return (
    <>
      <Layout>
        <Header>
            <h1 style={{ color: "#fff", display: "inline-block", padding: "0 10px" }} >Wiki</h1>
        </Header>
        <Content style={{ minHeight: "100vh" }} >
          <Router>
            <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/show-content/:searchTerm"} element={<ShowContent />} />
            </Routes>
          </Router>
        </Content>
      </Layout>
    </>
  );
};
export default App;
