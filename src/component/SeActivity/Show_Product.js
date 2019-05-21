import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Call from '../SeActivity/Call_Product/Call_Product'
import Send from '../SeActivity/Send_Product/Send_Prouct'
import Pursue from '../SeActivity/Pursue_Product/Pursue_Product'

class Show_Product extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <div style={{ cursor: "pointer" }}>
              เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <div style={{ cursor: "pointer" }}>
              ติดตามผลการแปรรูป
              </div>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1"><Send /></TabPane>
          <TabPane tabId="2"><Pursue/></TabPane>
        </TabContent>
      </div>
    );
  }
}
export default Show_Product;