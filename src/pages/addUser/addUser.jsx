// import React, { useEffect, useState } from "react";					
// import {					
// Row,					
// Col,					
// notification,					
// Form,					
// Input,					
// Radio,					
// Select,					
// Image,					
// } from "antd";					
// import { useLocation, useNavigate, useParams } from "react-router-dom";					
// import { Button, Layout } from "antd";					
// import { useSelector } from "react-redux";					
// import axios from "axios";					
// import { Option } from "antd/es/mentions";					
// import TextArea from "antd/es/input/TextArea";					
// import { FaPaperPlane } from "react-icons/fa";					
// import Country from "../dropDownPage/country";					
// import State from "../dropDownPage/state";					
// import City from "../dropDownPage/city";				
// import BaseImage from "../../Assets/Images/BaseImage.jpg";

// const AddUser = () => {				

// const { id } = useParams();					
// const location = useLocation();					
// const Token = useSelector((item) => item.token.token.token);					
// const [AllUsersData, setAllUsersData] = useState([]);					
// const DashNavigate = useNavigate();															
// const { Header, Content } = Layout;					
// const [form] = Form.useForm();				

// const fetchForm = (id) => {		

//   console.log("id",id)		
//   console.log("Token_edit",Token)	
// axios.get("http://node.mitrahsoft.co.in/users", {					
// headers: {					
// Authorization: `Bearer ${Token}`,					
// },					
// })					
// .then((success) => {					
//   success.data.recordset.map((values) => {
//     if(Number(values.id) === Number(id)){
//       console.log("valuesout",values)
//        return setAllUsersData(values);	
//     }
//   }
//    )			
// })					
// .catch((error) => console.log("hi",error));					
// };					

// useEffect(() => {					
// fetchForm(id);					
// form.resetFields();					
// }, [!id]);					

// if (id && AllUsersData && AllUsersData.name) {					
//   const nameParts = AllUsersData.name.split(" ");
//   const first_name = nameParts.slice(0, nameParts.length - 1).join(" ");
//   const last_name = nameParts[nameParts.length - 1];

// form.setFieldsValue({					
// FirstName: first_name,					
// LastName: last_name,					
// Email: "ponpandian@gmail.com",					
// Role: AllUsersData.job,					
// Address: "11/4 Gandhipuram, Coimbatore",					
// City: "Coimbatore",					
// Country: "India",					
// State: "Tamilnadu",					
// Gender: AllUsersData.gender,					
// });					
// }					

// const show = (values) => {	

// id ? axios.put(`http://node.mitrahsoft.co.in/user/${id}`,					
// {					
// name: values.FirstName+" "+values.LastName,																		
// gender: values.Gender,					
// job: values.Role,									
// },					
// {					
//   headers: {					
//     Authorization: `Bearer ${Token}`,					
//   }
// }					
// )					
// .then((success) => {					
// DashNavigate("/dashboard");					
// notification.success({					
// message: "Success",					
// description: "User updated successfully",					
// });					
// })					
// .catch((error) => {					
// console.log(error);					
// })					
// :						
// (async () => { const rawResponse = await axios.post("http://node.mitrahsoft.co.in/user",					
// {					
//   name: values.FirstName+" "+values.LastName,																			
//   gender: values.Gender,					
//   job: values.Role,										
//   },					
//   {					
//     headers: {					
//       Authorization: `Bearer ${Token}`,					
//     }
//   }				
// );					

// const content = await rawResponse;
// console.log("add_user",content);
// if (content.status === 200) {					
// notification.success({					
// message: "Success",					
// description: "user added successfully",					
// });					
// DashNavigate("/dashboard");					
// } else {					
// notification.error({					
// message: "Error",					
// description: "User already exist!",					
// });					
// }					
// })()							
// };					

// return (					
// <>					
// {location.pathname === "/adduser" ? (					
// <>					
// <Header					
// style={{					
// marginLeft: -40,					
// paddingRight: 40,					
// background: "rgb(42,42,42)",					
// }}					
// >					
// <Row className="p-3">					
// <h4 className="fw-bold grey_color_text">ADD USER</h4>					
// </Row>					
// </Header>					
// <Content					
// className="bg-black"					
// style={{					
// margin: "24px 8px",					
// paddingLeft: 20,					
// }}					
// >					
// <Row className="bg-black flex_center me-3 mt-3">					
// <Col span={23} className="bg-grey register_box">					
// <Row className="d-flex justify-content-evenly">					
// <Col span={9} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// initialValues={{					
// FirstName: "",					
// Email: "",					
// Role: "",					
// }}					
// >					
// <Form.Item					
// name="FirstName"					
// label="First Name"					
// rules={[					
// {					
// required: true,					
// message: "First Name is Required",					
// },					
// {					
// pattern: /^[A-Za-z ]*$/,					
// message: "Enter alphabets only",					
// },					
// ]}					
// >					
// <Input className="border-0 fs-6" size="large" />					
// </Form.Item>					
// <Form.Item					
// name="Email"					
// label="Email"					
// rules={[					
// {					
// required: true,					
// message: "Enter a Email",					
// },					
// {					
// pattern: /\w+[@][\w]+\.com/,					
// message: "Enter a valid Email",					
// },					
// ]}					
// >					
// <Input className="border-0 fs-6" size="large" />					
// </Form.Item>					
// <Form.Item					
// name="Role"					
// label="Role"					
// rules={[					
// {					
// required: true,					
// message: "Please select a Role",					
// },					
// ]}					
// >					
// <Select size="large">					
// <Option value="FrontEnd">Front End</Option>					
// <Option value="BackEnd">Back End</Option>					
// <Option value="HR">HR</Option>					
// <Option value="BDE">BDE</Option>					
// <Option value="FullStack">Full Stack</Option>					
// </Select>					
// </Form.Item>					
// </Form>					
// </Col>					
// <Col span={9} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// initialValues={{					
// LastName: "",					
// Gender: "",					
// File: "",					
// }}					
// >					
// <Form.Item					
// name="LastName"					
// label="Last Name"					
// rules={[					
// {					
// required: true,					
// message: "Last Name is Required",					
// },					
// {					
// pattern: /^[A-Za-z ]*$/,					
// message: "Enter alphabets only",					
// },					
// ]}					
// >					
// <Input					
// className="border-0 fs-6 text-light bg-grey input_grey"					
// size="large"					
// />					
// </Form.Item>					

// <Form.Item					
// name="Gender"					
// label="Gender"					
// rules={[					
// {					
// required: true,					
// message: "Please pick a Gender",					
// },					
// ]}					
// >					
// <Radio.Group>					
// <Radio value={"Male"}>&nbsp; Male</Radio>					
// <Radio value={"Female"}>&nbsp; Female</Radio>					
// </Radio.Group>					
// </Form.Item>					

// <Row>					
// <Col span={12}>					
// <Form.Item name="file" label="Image" className="mt-1">					
// <Input									
// type="file"					
// size="large"					
// />					
// </Form.Item>					
// </Col>					
// <Col span={6} className="ms-4 mt-4">					
// <Image src={BaseImage} width={100} className="" />					
// </Col>					
// <Col span={4} className="ms-2 mt-2">					
// <Button					
// size="large"					
// className="mt-4 bg-black text-light fw-bold"									
// >					
// Upload					
// </Button>					
// </Col>					
// </Row>					
// </Form>					
// </Col>					
// <Col span={20} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// initialValues={{					
// Address: "",					
// Country: "",					
// State: "",					
// City: "",					
// }}					
// >					
// <Form.Item					
// name="Address"					
// label="Address"					
// rules={[					
// {					
// required: true,					
// message: "Please enter an address",					
// },					
// ]}					
// >					
// <TextArea					
// className="border-0"					
// showCount					
// maxLength={100}					
// style={{					
// height: 120,					
// resize: "none",					
// }}					
// />					
// </Form.Item>					

// <Row>					
// <Col span={8}>					
// <Country />					
// </Col>					
// <Col span={8}>					
// <State />					
// </Col>					
// <Col span={8}>					
// <City />					
// </Col>					
// </Row>					
// </Form>					
// </Col>					
// <Col span={20} className="bg-grey add-user-button">					
// <Row>&nbsp;</Row>					
// <Row>					
// <Col span={8}></Col>					
// <Col span={8}></Col>					
// <Col span={8}>					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// >					
// <Form.Item>					
// <Button					
// size="large"					
// className="bg-black text-light fw-bold"					
// htmlType="submit"					
// >					
// Submit <FaPaperPlane />					
// </Button>					
// </Form.Item>					
// </Form>					
// </Col>					
// </Row>					
// </Col>					
// </Row>					
// </Col>					
// </Row>					
// </Content>					
// </>					
// ) : (					
// <>					
// <Header					
// style={{					
// marginLeft: -40,					
// paddingRight: 40,					
// background: "rgb(42,42,42)",					
// }}					
// >					
// <Row className="p-3">					
// <h4 className="fw-bold grey_color_text">EDIT USER</h4>					
// </Row>					
// </Header>					
// <Content					
// className="bg-black"					
// style={{					
// margin: "24px 8px",					
// paddingLeft: 20,					
// }}					
// >					
// <Row className="bg-black flex_center me-3 mt-3">					
// <Col span={23} className="bg-grey register_box">					
// <Row className="d-flex justify-content-evenly">					
// <Col span={9} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// initialValues={{					
// FirstName: "",					
// Email: "",					
// Role: "",					
// }}					
// >					
// <Form.Item					
// name="FirstName"					
// label="First Name"					
// rules={[					
// {					
// required: true,					
// message: "First Name is Required",					
// },					
// {					
// pattern: /^[A-Za-z ]*$/,					
// message: "Enter alphabets only",					
// },					
// ]}					
// >					
// <Input className="border-0 fs-6" size="large" />					
// </Form.Item>					
// <Form.Item					
// name="Email"					
// label="Email"					
// rules={[					
// {					
// required: true,					
// message: "Enter a Email",					
// },					
// {					
// pattern: /\w+[@][\w]+\.com/,					
// message: "Enter a valid Email",					
// },					
// ]}					
// >					
// <Input className="border-0 fs-6" size="large" />					
// </Form.Item>					
// <Form.Item					
// name="Role"					
// label="Role"					
// rules={[					
// {					
// required: true,					
// message: "Please select a Role",					
// },					
// ]}					
// >					
// <Select size="large">					
// <Option value="FrontEnd">Front End</Option>					
// <Option value="BackEnd">Back End</Option>					
// <Option value="HR">HR</Option>					
// <Option value="BDE">BDE</Option>					
// <Option value="FullStack">Full Stack</Option>					
// </Select>					
// </Form.Item>					
// </Form>					
// </Col>					
// <Col span={9} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// initialValues={{					
// LastName: "",					
// Gender: "",					
// file: "",					
// }}					
// >					
// <Form.Item					
// name="LastName"					
// label="Last Name"					
// rules={[					
// {					
// required: true,					
// message: "Last Name is Required",					
// },					
// {					
// pattern: /^[A-Za-z ]*$/,					
// message: "Enter alphabets only",					
// },					
// ]}					
// >					
// <Input					
// className="border-0 fs-6 text-light bg-grey input_grey"					
// size="large"					
// />					
// </Form.Item>					

// <Form.Item					
// name="Gender"					
// label="Gender"					
// rules={[					
// {					
// required: true,					
// message: "Please pick a Gender",					
// },					
// ]}					
// >					
// <Radio.Group>					
// <Radio value={"Male"}>&nbsp; Male</Radio>					
// <Radio value={"Female"}>&nbsp; Female</Radio>					
// </Radio.Group>					
// </Form.Item>					

// <Row>					
// <Col span={12}>					
// <Form.Item name="file" label="Image" className="mt-1">					
// <Input								
// type="file"					
// size="large"					
// />					
// </Form.Item>					
// </Col>					
// <Col span={5} className="m-4 mt-4">				
// <Image src={BaseImage} width={100} className="" />											
// </Col>					

// <Col span={4} className="mt-2">					
// <Button					
// size="large"					
// className="mt-4 bg-black text-light fw-bold"								
// >					
// Upload					
// </Button>					
// </Col>					
// </Row>					
// </Form>					
// </Col>					
// <Col span={20} className="bg-grey">					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// >					
// <Form.Item					
// name="Address"					
// label="Address"					
// rules={[					
// {					
// required: true,					
// message: "Please enter an address",					
// },					
// ]}					
// >					
// <TextArea					
// className="border-0"					
// showCount					
// maxLength={100}					
// style={{					
// height: 120,					
// resize: "none",					
// }}					
// />					
// </Form.Item>					

// <Row>					
// <Col span={8}>					
// <Country />					
// </Col>					
// <Col span={8}>					
// <State />					
// </Col>					
// <Col span={8}>					
// <City />					
// </Col>					
// </Row>					
// </Form>					
// </Col>					
// <Col span={20} className="bg-grey add-user-button">					
// <Row>&nbsp;</Row>					
// <Row>					
// <Col span={8}></Col>					
// <Col span={8}></Col>					
// <Col span={8}>					
// <Form					
// form={form}					
// name="validateOnly"					
// layout="vertical"					
// autoComplete="off"					
// className="fw-bold add-user"					
// onFinish={(values) => show(values)}					
// >					
// <Form.Item>					
// <Button					
// size="large"					
// className="bg-black text-light fw-bold"					
// htmlType="submit"					
// >					
// Submit <FaPaperPlane />					
// </Button>					
// </Form.Item>					
// </Form>					
// </Col>					
// </Row>					
// </Col>					
// </Row>					
// </Col>					
// </Row>					
// </Content>					
// </>					
// )}					
// </>					
// );					
// };					

// export default AddUser;					

import React, { Component } from "react";
import { Row, Col, notification, Form, Input, Radio, Select, Image, Button, Layout } from "antd";
import { FaPaperPlane } from "react-icons/fa";
import withRouter from "../dashboard/withRoute";
import { connect } from "react-redux";
import axios from "axios";
import Country from "../dropDownPage/country";
import State from "../dropDownPage/state";
import City from "../dropDownPage/city";
import BaseImage from "../../Assets/Images/BaseImage.jpg";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      AllUsersData: [],
      Token: this.props.token,
    };
    this.formRef = React.createRef();
  }

  fetchForm = (id) => {

    console.log("id", id);
    console.log("Token_edit", this.state);
    axios
      .get("http://node.mitrahsoft.co.in/users", {
        headers: {
          Authorization: `Bearer ${this.state.Token}`,
        },
      })
      .then((success) => {
        success.data.recordset.map((values) => {
          if (Number(values.id) === Number(id)) {
            console.log("valuesout", values);
            return this.setState({ AllUsersData: values });
          }
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.fetchForm(id);
    this.formRef.current.resetFields();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.params;
    if (prevProps.params.id !== id) {
      this.fetchForm(id);
    }
  }

  show = (values) => {
    
    const { id } = this.props.params;
    console.log("form edit values",values);
    console.log("form edit id " ,id)
    if (id) {
      axios.put(`http://node.mitrahsoft.co.in/user/${id}`,
          {
            name: values.FirstName + " " + values.LastName,
            gender: values.Gender,
            job: values.Role,
          },
          {
            headers: {
              Authorization: `Bearer ${this.state.Token}`,
            },
          }
        )
        .then((success) => {
          this.props.navigate("/dashboard");
          notification.success({
            message: "Success",
            description: "User updated successfully",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    else {
      (async () => {
        const rawResponse = await axios.post("http://node.mitrahsoft.co.in/user",
          {
            name: values.FirstName + " " + values.LastName,
            gender: values.Gender,
            job: values.Role,
          },
          {
            headers: {
              Authorization: `Bearer ${this.state.Token}`,
            },
          }
        );
        const content = await rawResponse;
        console.log("add_user", content);
        if (content.status === 200) {
          notification.success({
            message: "Success",
            description: "user added successfully",
          });
          this.props.navigate("/dashboard");
        } else {
          notification.error({
            message: "Error",
            description: "User already exist!",
          });
        }
      })();
    }
  };

  render() {
    const { id } = this.props.params;
    const { AllUsersData } = this.state;
    const { Header, Content } = Layout;
    console.log("edit id ===> ",id);
    console.log("AlluserData id ===> ",AllUsersData);

    if (id && AllUsersData && AllUsersData.name) {
      const nameParts = AllUsersData.name.split(" ");
      const first_name = nameParts.slice(0, nameParts.length - 1).join(" ");
      const last_name = nameParts[nameParts.length - 1];
      
      this.formRef.current.setFieldsValue({
        FirstName: first_name,
        LastName: last_name,
        Email: "ponpandian@gmail.com",
        Role: AllUsersData.job,
        Address: "11/4 Gandhipuram, Coimbatore",
        City: "Coimbatore",
        Country: "India",
        State: "Tamilnadu",
        Gender: AllUsersData.gender,
      });
    }

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
                <>{this.props.location.pathname === "/adduser" ? 
                <h4 className="fw-bold grey_color_text">ADD USER</h4>
                : <h4 className="fw-bold grey_color_text">EDIT USER</h4>
                 }</>
                
              </Row>
            </Header>
            <Content
              className="bg-black"
              style={{
                margin: "24px 8px",
                paddingLeft: 20,
              }}
            >
              <Row className="bg-black flex_center me-3 mt-3">
                <Col span={23} className="bg-grey register_box">
                <Form 
                   ref={this.formRef}
                   name="validateOnly"
                   layout="vertical"
                   autoComplete="off"
                   className="fw-bold add-user"
                   onFinish={(values) => this.show(values)}
                   initialValues={{
                     FirstName: "",
                     Email: "",
                     Role: "",
                     LastName: "",
                          Gender: "",
                          File: "",
                          Address: "",
                          Country: "",
                          State: "",
                          City: "",
                   }}>
                  <Row className="d-flex justify-content-evenly">           
                    <Col span={9} className="bg-grey">
                      <div                      
                      >
                        <Form.Item
                          name="FirstName"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: "First Name is Required",
                            },
                            {
                              pattern: /^[A-Za-z ]*$/,
                              message: "Enter alphabets only",
                            },
                          ]}
                        >
                          <Input className="border-0 fs-6" size="large" />
                        </Form.Item>
                        <Form.Item
                          name="Email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Enter a Email",
                            },
                            {
                              pattern: /\w+[@][\w]+\.com/,
                              message: "Enter a valid Email",
                            },
                          ]}
                        >
                          <Input className="border-0 fs-6" size="large" />
                        </Form.Item>
                        <Form.Item
                          name="Role"
                          label="Role"
                          rules={[
                            {
                              required: true,
                              message: "Please select a Role",
                            },
                          ]}
                        >
                          <Select size="large">
                            <Option value="FrontEnd">Front End</Option>
                            <Option value="BackEnd">Back End</Option>
                            <Option value="HR">HR</Option>
                            <Option value="BDE">BDE</Option>
                            <Option value="FullStack">Full Stack</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={9} className="bg-grey">
                      <div
                       
                      >
                        <Form.Item
                          name="LastName"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: "Last Name is Required",
                            },
                            {
                              pattern: /^[A-Za-z ]*$/,
                              message: "Enter alphabets only",
                            },
                          ]}
                        >
                          <Input
                            className="border-0 fs-6 text-light bg-grey input_grey"
                            size="large"
                          />
                        </Form.Item>

                        <Form.Item
                          name="Gender"
                          label="Gender"
                          rules={[
                            {
                              required: true,
                              message: "Please pick a Gender",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={"Male"}>&nbsp; Male</Radio>
                            <Radio value={"Female"}>&nbsp; Female</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Row>
                          <Col span={12}>
                            <Form.Item name="file" label="Image" className="mt-1">
                              <Input
                                type="file"
                                size="large"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={6} className="ms-4 mt-4">
                            <Image src={BaseImage} width={100} className="" />
                          </Col>
                          <Col span={4} className="ms-2 mt-2">
                            <Button
                              size="large"
                              className="mt-4 bg-black text-light fw-bold"
                            >
                              Upload
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={20} className="bg-grey">
                      <div
                      >
                        <Form.Item
                          name="Address"
                          label="Address"
                          rules={[
                            {
                              required: true,
                              message: "Please enter an address",
                            },
                          ]}
                        >
                          <TextArea
                            className="border-0"
                            showCount
                            maxLength={100}
                            style={{
                              height: 120,
                              resize: "none",
                            }}
                          />
                        </Form.Item>
                        <Row>
                          <Col span={8}>
                            <Country />
                          </Col>
                          <Col span={8}>
                            <State />
                          </Col>
                          <Col span={8}>
                            <City />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={20} className="bg-grey add-user-button">
                      <Row>&nbsp;</Row>
                      <Row>
                        <Col span={8}></Col>
                        <Col span={8}></Col>
                        <Col span={8}>
                          <div
                          >
                            <Form.Item>
                              <Button
                                size="large"
                                className="bg-black text-light fw-bold"
                                htmlType="submit"
                                onClick={this.setFormValues}
                              >
                                Submit <FaPaperPlane />
                              </Button>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    
                  </Row>
                  </Form>
                </Col>
              </Row>
            </Content>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token.token,
});

export default connect(mapStateToProps)(withRouter(AddUser));

