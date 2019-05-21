import React, { Component } from 'react'
import Confrim from '../ResearcherActivity/Confrim_Data_Research_Resuit/Confrim_Data'
import Add from '../ResearcherActivity/Add_Research_Result/Add_Result'
import Data from '../ResearcherActivity/Data_Research_Result/Data_Result'
import History from '../ResearcherActivity/History_Research_Result/History_Result'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';


class ResearcherActivity extends Component {
    constructor() {
        super()
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        }
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
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <div style={{cursor : "pointer"}} > ยืนยันการพัฒนาผลิตภัณฑ์</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            <div style={{cursor : "pointer"}} >  ข้อมูลผลิตภัณฑ์</div>
             
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
            <div style={{cursor : "pointer"}} >  ตรวจสอบรายละเอียด</div>
             
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
            <div style={{cursor : "pointer"}} >  ประวัติการพัฒนาสูตรผลิตภัณฑ์</div>
             
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Confrim />
          </TabPane>
          <TabPane tabId="2">
          <Add/>
          </TabPane>

          <TabPane tabId="3">
          <Data/>
          </TabPane>
          <TabPane tabId="4">
          <History/>
          </TabPane>
        </TabContent>
          </div>
        )
    }
}
export default ResearcherActivity