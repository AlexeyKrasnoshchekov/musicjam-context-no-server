import { useContext, useState } from "react";
import "./header.css";
import { context } from "../../context/context";
import { useHistory } from "react-router-dom";
import { AutoComplete, Row, Col, Typography, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function MyHeader() {
  const { Title } = Typography;

  const history = useHistory();
  const [options, setOptions] = useState([]);

  const {
    user,
    search,
    logout,
    // searchResult
  } = useContext(context);

  // const types = ["artist", "album", "track"];

  const handleLogout = async () => {
    logout();
    history.push("/");
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data) => {
    search(data);
    history.push("/search");
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col span={12}>
              <AutoComplete
                allowClear={true}
                options={options}
                style={{
                  width: 200,
                }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="input here"
              />
            </Col>
            <Col span={12}>
              {/* <div>App</div> */}
              <Row align="middle" justify="end">
                <Space size="middle">
                  <Title
                    style={{
                      color: "white",
                      marginTop: "0.5em",
                    }}
                    level={5}
                  >{`Logged in as ${user}`}</Title>
                  <LogoutOutlined
                    style={{
                      color: "white",
                    }}
                    onClick={handleLogout}
                  />
                </Space>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default MyHeader;
