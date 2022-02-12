import React, { useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../remote";
import { useSelector } from "react-redux";
import { Layout, Row, Col, Input, List, Card, Typography, message, Divider } from "antd";

const { Search } = Input;
const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const myData = useSelector((state) => state.favoriteUnfavorite);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    if (query === '') {
      message.warn('search something')
      setData([])
      setIsLoading(false)
      return
    }
    const resp = await http.get(`/w/api.php?origin=*&action=query&list=search&srsearch=${query}&format=json`);
    setData(resp.data === null ? [] : resp.data.query.search);
    setIsLoading(false)
  };

  return (
    <>
          <Row type="flex" justify="center" style={{ margin: '0 0 50px 0' }} >
            <Col span={14} style={{ margin: '120px 0 50px 0' }}>
              <Search onChange={(e) => setQuery(e.target.value)} onSearch={() => handleSearch()} placeholder="input search text" enterButton="Search" size="large" loading={isLoading} />
            </Col>
            <Col span={14}>
              {data.length === 0 ? '' :
                <List
                  dataSource={data}
                  renderItem={(item) => (
                    <Link to={`show-content/${item.title}`} >
                      <Card
                        title={item.title}
                        hoverable={true}
                        bodyStyle={{ padding: 0 }}
                      />
                    </Link>
                  )}
                />
              }
            </Col>
          </Row>
          <Divider>favorite queries</Divider>
          <Row type="flex" justify="center" style={{ margin: "0 0 50px 0" }} >
            <Col span={18}>
              {data === 0 ? '' :
                <List
                  dataSource={myData}
                  renderItem={(item) => (
                    <Link to={`show-content/${item}`} >
                      <Card
                        title={item}
                        hoverable={true}
                        bodyStyle={{ padding: 0 }}
                      />
                    </Link>
                  )}
                />
              }
            </Col>
          </Row>
    </>
  );
};

export default HomePage;
