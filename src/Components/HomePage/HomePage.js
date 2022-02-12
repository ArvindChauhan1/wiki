import React, { useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../remote";
import styles from "./HomePage.module.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const myData = useSelector((state) => state.favoriteUnfavorite)
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])

  const handleSearch = async () => {
    const resp = await http.get(`/w/api.php?origin=*&action=query&list=search&srsearch=${query}&format=json`)
    console.log(resp.data === null ? [] : resp.data.query.search)
    setData(resp.data === null ? [] : resp.data.query.search)
  }

  return (
    <>
      <div className='homepage-container'>
        <div className="search-box" >
          <input type={"text"} value={query} onChange={(e) => {
            setQuery(e.target.value)
            console.log(e.target.value)
            
          }} />
          <button onClick={handleSearch} >Search</button>
        </div>
        <div className="search-list" >
          {data.map((item) => {
            return <>
              <div key={item.title} className='card'  >
                <h4>
                  <Link to={`show-content/${item.title}`} >
                    {item.title}
                  </Link>
                </h4>
              </div>
            </>;
          })}
        </div>
        <div className="favorite" >
          <h1>favorite queries</h1>
          {myData.map((item) => {
            return <>
              <div className="card">
                <h4>
                  <Link key={item} to={`show-content/${item}`} >
                    {item}
                  </Link>
                </h4>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
