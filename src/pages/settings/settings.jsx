import React from "react";
import { Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";

class Settings extends React.Component {

  render() {

    return (
      <>
        <Header
          style={{
            marginLeft: -40,
            paddingRight: 40,
            background: "rgb(42,42,42)",
          }}
        >
          <Row className="p-3">
            <h4 className="fw-bold grey_color_text">SETTINGS</h4>
          </Row>
        </Header>
        <Content
          className="bg-black"
          style={{
            margin: "24px 8px",
            paddingLeft: 20,
          }}
        ></Content>
      </>
    );
    
  }
}

export default Settings;