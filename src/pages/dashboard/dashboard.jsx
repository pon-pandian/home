// import React, { useEffect, useState } from "react";
// import { IoMdMale, IoMdFemale } from "react-icons/io";
// import { Row, Col, Card, notification, Modal, Segmented } from "antd";
// import { LuTable2 } from "react-icons/lu";
// import { FaUserCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { SlSocialLinkedin } from "react-icons/sl";
// import { GoStack } from "react-icons/go";
// import { LuDollarSign, LuServer } from "react-icons/lu";
// import { FiEdit, FiUser, FiUsers } from "react-icons/fi";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { AppstoreOutlined, LayoutOutlined } from "@ant-design/icons";
// import { Layout, Space, Table, Tag, Badge } from "antd";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Column from "antd/es/table/Column";
// import BaseImage from "../../Assets/Images/BaseImage.jpg"

// const Dashboard = () => {

//   const [Box, setBox] = useState("cards"); 
//   const { Header, Content } = Layout;
//   const editNavigate = useNavigate();
//   const deleteNavigate = useNavigate();
//   const Token = useSelector((item) => item.token.token.token);
//   const [AllUsersData, setAllUsersData] = useState([]);
//   const [ totalCards, setTotalCards ] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [GenderModel, setGenderModel] = useState("No data");
//   const [NameModel, setNameModel] = useState("No data");
//   const [RoleModel, setRoleModel] = useState("No data");

//   const displayData = [
//     {
//       title: "Total",
//       icon: <FiUsers className="cards_logo" />,
//       count: AllUsersData.length,
//     },
//     {
//       title: "Male",
//       icon:  <FiUser className="cards_logo" />,
//       count: totalCards.Male,
//     },
//     {
//       title: "Female",
//       icon: <FiUser className="cards_logo" />,
//       count: totalCards.Female,
//     },
//     {
//       title: "Front End",
//       icon: <LayoutOutlined className="cards_logo" />,
//       count: totalCards.FrontEnd,
//     },
//     {
//       title: "Back End",
//       icon: <LuServer className="cards_logo" />,
//       count: totalCards.BackEnd,
//     },
//     {
//       title: "HR",
//       icon: <SlSocialLinkedin className="cards_logo" />,
//       count: totalCards.HR,
//     },
//     {
//       title: "BDE",
//       icon:  <LuDollarSign className="cards_logo" />,
//       count: totalCards.BDE,
//     },
//     {
//       title: "Full Stack",
//       icon: <GoStack className="cards_logo" />,
//       count: totalCards.FullStack,
//     },
//   ]

//   const showModal = (values) => {
//     console.log("values",values)
//     setNameModel(values.name);
//     setGenderModel(values.gender);
//     setRoleModel(values.job);
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const fetchForm = () => {
//     axios
//       .get("http://node.mitrahsoft.co.in/users", {
//         headers: {
//           Authorization: `Bearer ${Token}`,
//         },
//       })
//       .then((success) => {
//         setAllUsersData(success.data.recordset);
//         console.log("AlluserDAta",success)

//           const totalCardsReduce = success.data.recordset.reduce((acc, curr) => {
//             acc[curr.gender] = (acc[curr.gender] || 0) + 1;
//             acc[curr.job] = (acc[curr.job] || 0) + 1;
//             return acc;
//           }, {});
//           setTotalCards(totalCardsReduce);
//       })
//       .catch((error) => console.log(error));
//   };

//   const editTableValues = (id) => {
//     editForm(id);
//   };

//   const deleteTableValues = (id) => {
//     deleteForm(id);
//   };

//   const deleteForm = (id) => {
//     axios
//       .delete(`http://node.mitrahsoft.co.in/user/${id}`, {
//         headers: {
//           Authorization: `Bearer ${Token}`,
//         },
//       })
//       .then((success) => {
//         deleteNavigate("/dashboard");
//         if (success) {
//           notification.success({
//             message: "Success",
//             description: "User deleted successfully",
//           });
//           fetchForm();
//         }
//       })
//       .catch((error) => console.log("error -->", error));
//     handleCancel();
//   };

//   useEffect(() => {
//     fetchForm();
//   }, []);

//   const editForm = (id) => {
//     editNavigate(`/edit/${id}`);
//   };

//   return (
//     <>
//       <Header
//         style={{
//           marginLeft: -40,
//           paddingRight: 40,
//           background: "rgb(42,42,42)",
//         }}
//       >
//         <Row className="p-3">
//           <h4 className="fw-bold grey_color_text">DASHBOARD</h4>
//         </Row>
//       </Header>
//       <Content
//         className="bg-black dash_content"
//         style={{
//           margin: "24px 8px",
//           paddingLeft: 20,
//           height: "200px",
//           overflowY: "scroll",
//           overflowX: "hidden",
//         }}
//       >
    
//           <>
//           <Row gutter={16} className="mb-2 ms-2 card_body">
//           {displayData.map((items) => {
//             return (<>
            
//             <Col span={6}>
//               <Card className="card" bordered={false}>
//                 <Row className="ps-3">
//                   <Col span={16}>
//                     {items.icon}  
//                     <Row className="cards_name">{items.title}</Row>
//                   </Col>
//                   <Col className="cards_count" span={8}>
//                   {items.count ? items.count : '0'}
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>      
//             </>)
//           })}
//     </Row>
//         </>
//         <hr className="ms-3 line" />

//         <Header
//           className="bg-black"
//           style={{
//             marginLeft: -40,
//             paddingRight: 60,
//           }}
//         >
//           <Row className="p-4 ps-2 pe-0">
//             <Col span={21}>
//               <h4 className="fw-bold grey_color_text">USERS</h4>
//             </Col>
//             <Row className="bg-grey card_to_table p-2">

//             <Segmented className='toggle-btn'
//              id="cards_segment"
//             onChange={(value) => {setBox(value) }}
//              selected={'cards'}
//             options={[
//               {
//                 value: 'cards',
//                 icon: <AppstoreOutlined />,
               
//               },
//               {
//                 value: 'table',
//                 icon: <LuTable2 />,
//               },
//             ]}
//           />
//             </Row>
//           </Row>
//         </Header>
//         {Box === "cards" ? (
//           <>
//             <Row gutter={16} className="mt-4 mb-4 ms-2">
//               {AllUsersData.map((dashboardValues) => {
//                 {console.log("dashboardValues",dashboardValues)}
//                 return (
//                   <>
//                     <Col span={6}>
//                       <Card
//                         className="add-user-dashboard card "
//                         bordered={false}
//                         key={dashboardValues.id}
//                       >
//                         <img
//                           src={BaseImage}
//                           alt={dashboardValues.name}
//                           width="80px"
//                           height="80px"
//                           className="add-user-dashboard-image"
//                           onClick={() => showModal(dashboardValues)}
//                         />

//                         <Modal
//                           title={
//                             <>
//                               {NameModel}{" "}
//                               <span className="text-light role_box">
//                                 <FaUserCheck />
//                                 <span className="ms-2 role_box_roles">
//                                   {RoleModel}
//                                 </span>
//                               </span>
//                             </>
//                           }
//                           open={isModalOpen}
//                           onOk={handleOk}
//                           onCancel={handleCancel}
//                           cancelButtonProps={{ style: { display: "none" } }}
//                           okButtonProps={{ style: { display: "none" } }}
//                         >
//                           <Badge.Ribbon
//                             text={
//                               RoleModel === "Male" ? (
//                                 <IoMdMale />
//                               ) : (
//                                 <IoMdFemale />
//                               )
//                             }
//                             className={
//                               GenderModel === "Male"
//                                 ? "male_color_ribbon"
//                                 : "female_color_ribbon"
//                             }
//                           ></Badge.Ribbon>
//                           <Row>
//                             <img
//                               src={BaseImage}
//                               alt={NameModel}
//                               className="image_model_box model_dashboard_image"
//                               width="130px"
//                               height="130"
//                             />
//                           </Row>
//                           <span className="bg-grey grey_box_model"></span>

//                           <p className="ms-5 h6">
//                             <span className="fw-bold">Email: ponpandian@gmail.com</span>
//                           </p>
//                           <p className="ms-5 h6">
//                             <span className="fw-bold">Address: 11/4 Gandhipuram, Coimbatore</span>

//                           </p>
//                           <p className="ms-5 h6">
//                             <span className="fw-bold">Created at: 25/11/2024</span>
//                           </p>
//                           <Row className="ms-5">
//                             <button
//                               size="large"
//                               className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 border-0 bg-green text-light edit_model"
//                               onClick={() => {
//                                 editForm(dashboardValues.id);
//                               }}
//                             >
//                               <FiEdit className="mb-1" /> Edit
//                             </button>
//                             <button
//                               onClick={() => {
//                                 deleteForm(dashboardValues.id);
//                               }}
//                               className="rounded mt-4 btn-margin-delete pt-2 pb-2 border-0 bg-red text-light delete_model"
//                             >
//                               <RiDeleteBinLine className="mb-1" /> Delete
//                             </button>
//                           </Row>
//                         </Modal>

//                         <Row className="d-flex justify-content-center text-pink fw-bold mt-2 ellipsis_for_words" title={dashboardValues.name}>
//                         {dashboardValues.name}
//                         </Row>
//                         <Row className="d-flex justify-content-center ellipsis_for_words">
//                           <a
//                             className="text-light-grey fw-bold aside_mail"
//                             href="mailto:pon@gmail.com"
//                             title="ponpandian@gmail.com"
//                           >
//                             ponpandian@gmail.com
//                           </a>
//                         </Row>
//                         <Row>
//                           <button
//                             size="large"
//                             className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
//                             onClick={() => {
//                               editForm(dashboardValues.id);
//                             }}
//                           >
//                             <FiEdit />
//                           </button>
//                           <button
//                             onClick={() => {
//                               deleteForm(dashboardValues.id);
//                             }}
//                             className="rounded mt-4 btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
//                           >
//                             <RiDeleteBinLine />
//                           </button>
//                         </Row>
//                         <Row className="add-user-dashboard-card mb-3"></Row>
//                       </Card>
//                     </Col>
//                   </>
//                 );
//               })}
//             </Row>
//           </>
//         ) : (
//           <>
//             <Table
//               className="table_properties bg-black fw-bold mt-4 ms-3 me-5"
//               dataSource={AllUsersData}
//             >
//               <Column
//                 className="bg-grey"
//                 title="Name"
//                 dataIndex={"name"}
//                 key="name"
//               />
//               <Column
//                 className="bg-grey"
//                 title="Email"
//                 render={() => "ponpandian@gmail.com"}
//                 key="email"
//               />
//               <Column
//                 className="bg-grey"
//                 title="Address"
//                 render={() => "11/4 Gandhipuram, Coimbatore"}
//                 key="address"
//               />
//               <Column
//                 className="bg-grey"
//                 title="Gender"
//                 dataIndex="gender"
//                 key="gender"
//                 render={(tags) => (
//                   <>
//                     {[tags].map((tag) => {
//                       let color =
//                         tag.length > 5 ? "female_color" : "male_color";
//                       return (
//                         <Tag className={color} key={tag}>
//                           {tag.toUpperCase()}
//                         </Tag>
//                       );
//                     })}
//                   </>
//                 )}
//               />
//               <Column
//                 className="bg-grey"
//                 title="Role"
//                 dataIndex="job"
//                 key="job"
//               />

//               <Column
//                 className="bg-grey"
//                 title="Action"
//                 key="id"
//                 render={(_, record) => (
//                   <Space size="middle">
//                     <Row>
//                       <button
//                         size="large"
//                         className="rounded pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
//                         onClick={() => editTableValues(record.id)}
//                       >
//                         <FiEdit />
//                       </button>
//                       <button
//                         size="large"
//                         onClick={() => deleteTableValues(record.id)}
//                         className="rounded btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
//                       >
//                         <RiDeleteBinLine />
//                       </button>
//                     </Row>
//                   </Space>
//                 )}
//               />
//             </Table>
//           </>
//         )}
//       </Content>
//     </>
//   );
// };
// export default Dashboard;

import React, { Component } from "react";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { Row, Col, Card, notification, Modal, Segmented } from "antd";
import { LuTable2 } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { GoStack } from "react-icons/go";
import { LuDollarSign, LuServer } from "react-icons/lu";
import { FiEdit, FiUser, FiUsers } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AppstoreOutlined, LayoutOutlined } from "@ant-design/icons";
import { Layout, Space, Table, Tag, Badge } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import Column from "antd/es/table/Column";
import BaseImage from "../../Assets/Images/BaseImage.jpg";
import withRouter from "./withRoute";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Box: "cards",
      AllUsersData: [],
      totalCards: 0,
      isModalOpen: false,
      GenderModel: "No data",
      NameModel: "No data",
      RoleModel: "No data",
    };
  }

  componentDidMount() {
    this.fetchForm();
  }

  fetchForm = () => {
    const { token } = this.props.token.token;
    axios.get("http://node.mitrahsoft.co.in/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((success) => {
        console.log("success",success);
        this.setState({ AllUsersData: success.data.recordset });
        
        const totalCardsReduce = success.data.recordset.reduce((acc, curr) => {
          acc[curr.gender] = (acc[curr.gender] || 0) + 1;
          acc[curr.job] = (acc[curr.job] || 0) + 1;
          return acc;
        }, {});
        this.setState({ totalCards: totalCardsReduce });
      })
      .catch((error) => console.log(error));
  };

  showModal = (values) => {
    this.setState({
      NameModel: values.name,
      GenderModel: values.gender,
      RoleModel: values.job,
      isModalOpen: true,
    });
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  deleteForm = (id) => {
    const { token } = this.props.token.token;
    axios
      .delete(`http://node.mitrahsoft.co.in/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((success) => {
        const { navigate } = this.props;
        navigate(`/dashboard`);
        if (success) {
          notification.success({
            message: "Success",
            description: "User deleted successfully",
          });
          this.fetchForm();
        }
      })
      .catch((error) => console.log("error -->", error));
    this.handleCancel();
  };

  editForm = (id) => {
    const { navigate } = this.props;
    navigate(`/edit/${id}`);
  };

  render() {
    const {
      Box,
      AllUsersData,
      totalCards,
      isModalOpen,
      GenderModel,
      NameModel,
      RoleModel,
    } = this.state;

    const displayData = [
      {
        title: "Total",
        icon: <FiUsers className="cards_logo" />,
        count: AllUsersData.length,
      },
      {
        title: "Male",
        icon: <FiUser className="cards_logo" />,
        count: totalCards.Male,
      },
      {
        title: "Female",
        icon: <FiUser className="cards_logo" />,
        count: totalCards.Female,
      },
      {
        title: "Front End",
        icon: <LayoutOutlined className="cards_logo" />,
        count: totalCards.FrontEnd,
      },
      {
        title: "Back End",
        icon: <LuServer className="cards_logo" />,
        count: totalCards.BackEnd,
      },
      {
        title: "HR",
        icon: <SlSocialLinkedin className="cards_logo" />,
        count: totalCards.HR,
      },
      {
        title: "BDE",
        icon: <LuDollarSign className="cards_logo" />,
        count: totalCards.BDE,
      },
      {
        title: "Full Stack",
        icon: <GoStack className="cards_logo" />,
        count: totalCards.FullStack,
      },
    ];
    console.log("this.props",this.props)

    return (
      <>
        <Layout.Header
          style={{
            marginLeft: -40,
            paddingRight: 40,
            background: "rgb(42,42,42)",
          }}
        >
          <Row className="p-3">
            <h4 className="fw-bold grey_color_text">DASHBOARD</h4>
          </Row>
        </Layout.Header>
        <Layout.Content
          className="bg-black dash_content"
          style={{
            margin: "24px 8px",
            paddingLeft: 20,
            height: "200px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Row gutter={16} className="mb-2 ms-2 card_body">
            {displayData.map((items, index) => (
              <Col span={6} key={index}>
                <Card className="card" bordered={false}>
                  <Row className="ps-3">
                    <Col span={16}>
                      {items.icon}
                      <Row className="cards_name">{items.title}</Row>
                    </Col>
                    <Col className="cards_count" span={8}>
                      {items.count ? items.count : "0"}
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <hr className="ms-3 line" />
          <Layout.Header
            className="bg-black"
            style={{
              marginLeft: -40,
              paddingRight: 60,
            }}
          >
            <Row className="p-4 ps-2 pe-0">
              <Col span={21}>
                <h4 className="fw-bold grey_color_text">USERS</h4>
              </Col>
              <Row className="bg-grey card_to_table p-2">
                <Segmented
                  className="toggle-btn"
                  id="cards_segment"
                  onChange={(value) => this.setState({ Box: value })}
                  options={[
                    {
                      value: "cards",
                      icon: <AppstoreOutlined />,
                    },
                    {
                      value: "table",
                      icon: <LuTable2 />,
                    },
                  ]}
                />
              </Row>
            </Row>
          </Layout.Header>
          {Box === "cards" ? (
            <Row gutter={16} className="mt-4 mb-4 ms-2">
              {AllUsersData.map((dashboardValues) => (
                <Col span={6} key={dashboardValues.id}>
                  <Card className="add-user-dashboard card" bordered={false}>
                    <img
                      src={BaseImage}
                      alt={dashboardValues.name}
                      width="80px"
                      height="80px"
                      className="add-user-dashboard-image"
                      onClick={() => this.showModal(dashboardValues)}
                    />
                    <Modal
                      title={
                        <>
                          {NameModel}{" "}
                          <span className="text-light role_box">
                            <FaUserCheck />
                            <span className="ms-2 role_box_roles">
                              {RoleModel}
                            </span>
                          </span>
                        </>
                      }
                      open={isModalOpen}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      cancelButtonProps={{ style: { display: "none" } }}
                      okButtonProps={{ style: { display: "none" } }}
                    >
                      <Badge.Ribbon
                        text={
                          RoleModel === "Male" ? (
                            <IoMdMale />
                          ) : (
                            <IoMdFemale />
                          )
                        }
                        className={
                          GenderModel === "Male"
                            ? "male_color_ribbon"
                            : "female_color_ribbon"
                        }
                      ></Badge.Ribbon>
                      <Row>
                        <img
                          src={BaseImage}
                          alt={NameModel}
                          className="image_model_box model_dashboard_image"
                          width="130px"
                          height="130"
                        />
                      </Row>
                      <span className="bg-grey grey_box_model"></span>
                      <p className="ms-5 h6">
                        <span className="fw-bold">
                          Email: ponpandian@gmail.com
                        </span>
                      </p>
                      <p className="ms-5 h6">
                        <span className="fw-bold">
                          Address: 11/4 Gandhipuram, Coimbatore
                        </span>
                      </p>
                      <p className="ms-5 h6">
                        <span className="fw-bold">Created at: 25/11/2024</span>
                      </p>
                      <Row className="ms-5">
                        <button
                          size="large"
                          className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 border-0 bg-green text-light edit_model"
                          onClick={() => this.editForm(dashboardValues.id)}
                        >
                           <FiEdit className="mb-1" /> Edit
                        </button>
                        <button
                          onClick={() => this.deleteForm(dashboardValues.id)}
                          className="rounded mt-4 btn-margin-delete pt-2 pb-2 border-0 bg-red text-light delete_model"
                        >
                          <RiDeleteBinLine className="mb-1" /> Delete
                        </button>
                      </Row>
                    </Modal>

                    <Row className="d-flex justify-content-center text-pink fw-bold mt-2 ellipsis_for_words" title={dashboardValues.name}>
                           {dashboardValues.name}
                           </Row>
                            <Row className="d-flex justify-content-center ellipsis_for_words">
                             <a
                            className="text-light-grey fw-bold aside_mail"
                            href="mailto:pon@gmail.com"
                            title="ponpandian@gmail.com"
                          >
                            ponpandian@gmail.com
                          </a>
                        </Row>
                        <Row>
                       <button
                          size="large"
                           className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
                          onClick={() => this.editForm(dashboardValues.id)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => this.deleteForm(dashboardValues.id)}
                        className="rounded mt-4 btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
                        >
                           <RiDeleteBinLine />
                        </button>
                        </Row>
                        <Row className="add-user-dashboard-card mb-3"></Row>

                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Table
              className="table_properties bg-black fw-bold mt-4 ms-3 me-5"
              dataSource={AllUsersData}
            >
              <Column
                className="bg-grey"
                title="Name"
                dataIndex={"name"}
                key="name"
              />
              <Column
                className="bg-grey"
                title="Email"
                render={() => "ponpandian@gmail.com"}
                key="email"
              />
              <Column
                className="bg-grey"
                title="Address"
                render={() => "11/4 Gandhipuram, Coimbatore"}
                key="address"
              />
              <Column
                className="bg-grey"
                title="Gender"
                dataIndex="gender"
                key="gender"
                render={(tags) => (
                  <>
                    {[tags].map((tag) => {
                      let color = tag.length > 5 ? "female_color" : "male_color";
                      return (
                        <Tag className={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}
                  </>
                )}
              />
              <Column
                className="bg-grey"
                title="Role"
                dataIndex="job"
                key="job"
              />
              <Column
                className="bg-grey"
                title="Action"
                key="id"
                render={(_, record) => (
                  <Space size="middle">
                    <Row>
                      <button
                        size="large"
                        className="rounded pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
                        onClick={() => this.editForm(record.id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        size="large"
                        onClick={() => this.deleteForm(record.id)}
                        className="rounded btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </Row>
                  </Space>
                )}
              />
            </Table>
          )}
        </Layout.Content>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default withRouter(connect(mapStateToProps)(Dashboard));



