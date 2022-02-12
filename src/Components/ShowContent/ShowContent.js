import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../remote";
import { useDispatch, useSelector } from "react-redux";
import { favorite, unFavorite } from "../../actions";

const ShowContent = () => {
  const { searchTerm } = useParams();
  const myData = useSelector((state) => state.favoriteUnfavorite)
  const dispatch = useDispatch()

  const [data, setData] = useState({})
  const [btn, setBtn] = useState(myData.includes(searchTerm) ? 'un' : '')

  const fetchSummary = useCallback(async () => {
    const resp = await http.get(`api/rest_v1/page/summary/${searchTerm}?redirect=true`)
    // console.log(resp2.data)
    // console.log(resp.data === null ? {} : resp.data)
    setData(resp.data === null ? {} : resp.data)
  }, [setData])

  useState(() => {
    fetchSummary()
  }, [fetchSummary])

  const handleClick = () => {
    if (!myData.includes(searchTerm)) {
      dispatch(favorite(searchTerm))
      setBtn('un')
    } else {
      setBtn('')
      dispatch(unFavorite(searchTerm))
    }
  }

  return <>
    <div className='show-container'>
      <h1>
        {data.title}
      </h1>
      <h4>
        {data.description}
      </h4>
      <div>
        {data.extract}
      </div>
      <button onClick={handleClick} >
        {`${btn}favourite`}
      </button>
    </div>
  </>;
};

export default ShowContent;
