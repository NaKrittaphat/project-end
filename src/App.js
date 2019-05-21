import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./sty.css";
import { Alert } from 'reactstrap';
import RouterChild from "./static/Router";
import Modal from "react-responsive-modal";
import Login from "./screen/Login/Login";
import logo from "./asset/image/web-analytics.png";
import { user_token, user_token_decoded } from "./static/Constance";
import { FaSignOutAlt, FaSignInAlt, FaQuestionCircle } from "react-icons/fa";
import { MdAccessTime, MdDrafts, MdEmail, MdNotificationsActive, MdNotifications, MdNotificationsNone } from "react-icons/md";
import { IoIosPie } from "react-icons/io";
import { GoGraph, GoSignOut, GoSignIn, GoClippy } from "react-icons/go";
import { get } from "../src/service/service"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      element: null,
      openmodal: false,
      isOpen: false,
      status_massage: null,
      help_pdf: null

    };
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      modal: !this.state.modal
    });
  }

  show_dialog = element => {
    this.setState({
      element: element
    });

    setTimeout(() => {
      this.OpenModal();
    }, 20);
  };


  OpenModal = () => {
    this.setState({ openmodal: true });
  };

  CloseModal = () => {
    this.setState({ openmodal: false });
  };

  _onlogout = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/";
  };

  help_button = async () => {
    window.open("http://127.0.0.1:3013/api/v1/send_analytics/manual/manual.pdf");
  }

  reading_status = async () => {
    try {
      await get("send_analytics/get_plan_status", user_token)
        .then(result => {


          if (result.success) {
            this.setState({
              status_massage: result.result
            })
          }
          else {
            alert(result.error_massage)
          }
        })


    } catch (error) {

    }
  }



  massage_input = () => {


    this.reading_status()
  }


  componentWillMount() {

    if (user_token) {
      this.massage_input()
    }
    // this.help_button()
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md" style={{ display: "flex", flexDirection: "row" }} >
            <NavbarBrand href="/"><img style={{ width: 45 }} src={logo} /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="d-md-down-none" navbar fixed>
                {(user_token && user_token_decoded.type == 5) ||
                  user_token_decoded.type == 4 ||
                  user_token_decoded.type == 3 ||
                  user_token_decoded.type == 2 ||
                  user_token_decoded.type == 1 ? (
                    <UncontrolledDropdown
                      nav
                      inNavbar
                      style={{ marginRight: 10 }}
                    >
                      {" "}
                      <DropdownToggle nav caret>
                        การวางแผนเพาะปลูก
                    </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem href="/DataSell/">
                          ข้อมูลการขาย
                      </DropdownItem>
                        <DropdownItem href="/ProductValue/">
                          กำลังการผลิต
                      </DropdownItem>
                        <DropdownItem href="/SaleSummary/">
                          สรุปข้อมูลการขาย
                      </DropdownItem>
                        <DropdownItem href="/Frequency/">
                          ระยะเวลาการเพาะปลูกและเก็บเกี่ยว
                      </DropdownItem>
                        <DropdownItem href="/MaterialChart/">
                          สรุปความถี่การส่งมอบ
                      </DropdownItem>
                        {(user_token && user_token_decoded.type == 4) || user_token_decoded.type == 5 ? <DropdownItem href="/Plannig/">
                          วางแผนการเพาะปลูก
                      </DropdownItem> : null}     {/* seกลาง */}
                        {/* {(user_token && user_token_decoded.type == "3") ? <DropdownItem href="/SeePlannig/">
                          วางแผนการเพาะปลูก   
                        </DropdownItem> : null} */}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : null}


                {(user_token && user_token_decoded.type == 5) ||
                  user_token_decoded.type == 4 ||
                  user_token_decoded.type == 3 ||
                  user_token_decoded.type == 2 ||
                  user_token_decoded.type == 1 ? (
                    <UncontrolledDropdown
                      nav
                      inNavbar
                      style={{ marginRight: 10 }}
                    >

                      <DropdownToggle nav caret>
                        ข้อมูลผลผลิต
                    </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem href="/YearRound/">
                          สรุปข้อมูลผลผลิต
                      </DropdownItem>
                        <DropdownItem href="/Graphse/">
                          สรุปข้อมูลผลผลิตตาม SE
                      </DropdownItem>
                        <DropdownItem href="/TableChart/">
                          สรุปข้อมูลผลผลิตตามชนิดพืช
                      </DropdownItem>

                        {/* <DropdownItem href="/">สรุปข้อมูลราคา</DropdownItem> */}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : null}

                {(user_token && user_token_decoded.type == 4) ||
                  (user_token && user_token_decoded.type == 5) || user_token_decoded.type == 2 ? (
                    <UncontrolledDropdown
                      nav
                      inNavbar
                      style={{ marginRight: 10 }}
                    >
                      <DropdownToggle nav caret>
                        การพัฒนาผลิตภัณท์
                    </DropdownToggle>
                      <DropdownMenu right>
                        {user_token && user_token_decoded.type == 2 ? (
                          <DropdownItem href="/Input">
                            ส่งความต้องการแปรรูปผลิตภัณฑ์
                        </DropdownItem>
                        ) : null}
                        {user_token && user_token_decoded.type == 2 ? (
                          <DropdownItem href="/Readshow">
                            ตรวจสอบผลการแปรรูปผลิตภัณฑ์
                        </DropdownItem>
                        ) : null}

                        {(user_token && user_token_decoded.type == 4) || (user_token && user_token_decoded.type == 5) ? (
                          <DropdownItem href="/Product">
                            เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
                        </DropdownItem>
                        ) : null}
                        {/* <DropdownItem href="/Input">ติดตามผลการแปรรูปผลิตภัณท์</DropdownItem> */}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : null}
                {(user_token && user_token_decoded.type == 1) ? (
                  <UncontrolledDropdown
                    nav
                    inNavbar
                    style={{ marginRight: 10 }}
                  >
                    <DropdownToggle nav caret>
                      การวิจัยผลิตภัณฑ์
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/Researcher">
                        ผลิตภัณฑ์ที่ต้องการพัฒนา
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : null}

                {user_token && user_token_decoded.type == 5 ? (
                  //   <NavItem>
                  //   <NavLink href="/UserRegister/">
                  //    ลงทะเบียนผู้ใช้งาน
                  //   </NavLink>
                  // </NavItem>
                  <UncontrolledDropdown
                    nav
                    inNavbar
                    style={{ marginRight: 25 }}
                  >
                    <DropdownToggle nav caret>
                      ข้อมูลผู้ใช้งาน
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/UserRegister/">
                        ลงทะเบียนผู้ใช้งาน
                      </DropdownItem>
                      <DropdownItem href="/EditUser/">
                        แก้ไขผู้ใช้งาน
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : null}
              </Nav>
              <Nav className="ml-auto" navbar>
                {user_token && user_token_decoded.type == 3 ?
                  <Link to="/SeePlannig/">
                    <NavLink style={{ marginRight: 20 }}>
                      <div onClick={() => this.setState({ status_massage: 0 })}>
                        {this.state.status_massage ?
                          <div style={{ width: 15, height: 15, borderRadius: 7.5, marginLeft: 18, top: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', color: '#fff', fontSize: 14, position: 'absolute' }}>
                            {this.state.status_massage}
                          </div>
                          : null}
                        <MdNotificationsNone style={{ fontSize: 27 }} />
                      </div>
                    </NavLink>
                  </Link>
                  : null}
                {user_token ?
                  //  <Link to="/help_for_program/">
                  <NavLink style={{ marginRight: 20 }}>
                    <FaQuestionCircle onClick={() => this.help_button()} style={{ cursor: "pointer" }} />
                  </NavLink>
                  // </Link>  
                  : null}

                <NavItem >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      user_token ? this._onlogout() : this.show_dialog();
                    }}
                  >
                    {user_token ? "Log Out" : "Log In"}{" "}
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div>
            <RouterChild />
          </div>
          <Modal
            open={this.state.openmodal}
            onClose={() => {
              this.CloseModal();
            }}
          >
            <div style={{ width: 500, height: 300 }}>
              <Login
                onClose={() => {
                  this.CloseModal();
                }}
              />
            </div>
          </Modal>
        </div>
      </Router>
    );
  }
}

export default App;
