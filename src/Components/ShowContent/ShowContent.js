import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../remote";
import { useDispatch, useSelector } from "react-redux";
import { favorite, unFavorite } from "../../actions";
import { Row, Col, PageHeader, Typography, Button, Spin } from "antd";
import { HeartOutlined } from '@ant-design/icons';
const { Text } = Typography;

const ShowContent = () => {
  const { searchTerm } = useParams();
  const myData = useSelector((state) => state.favoriteUnfavorite)
  const dispatch = useDispatch()

  const [data, setData] = useState({})
  const [btn, setBtn] = useState(myData.includes(searchTerm) ? 'un' : '')
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    const resp = await http.get(`api/rest_v1/page/summary/${searchTerm}?redirect=true`)

    setData(resp.data === null ? {} : resp.data)
    setIsLoading(false)
  }, [setData, setIsLoading, searchTerm])

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
    <Row type="flex" justify="center" gutter={[8, 24]}>
      {isLoading ? <Col style={{ margin: "200px 0 0 0" }} >
        <Spin tip="Loading..."></Spin>
      </Col> :
        <>
          <Col span={20} >
            <PageHeader title={data.title} />
          </Col>
          <Col span={19}>
            <Text strong>{data.description}</Text>
            <>
              <div dangerouslySetInnerHTML={{ __html: data.extract_html }} />
            </>
          </Col>
          <Col span={19}>
            <a href={`https://en.wikipedia.org/?curid=${data.pageid}`} rel="noopener noreferrer" target="_blank" >
              wikipedia link
            </a>
          </Col>
          <Col span={19}>
            <Button type="primary" danger onClick={handleClick} icon={<HeartOutlined />} >
              {btn}favorite
            </Button>
          </Col>
        </>
      }
    </Row>
  </>;
};

export default ShowContent;
