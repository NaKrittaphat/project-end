import React, { Component } from 'react'
import Trader_Show_Input from '../TraderActivity/Trader_Show/Trader_Show_Input'
import Trader_confrim from '../TraderActivity/Trader_Show/Trader_confrim'
import Trader_Success from '../TraderActivity/Trader_Show/Trader_Success'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';


class TraderActivity extends Component {
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
              <div style={{cursor : "pointer"}} > ตรวจสอบการพัฒนาผลิตภัณฑ์ </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            <div style={{cursor : "pointer"}} >  ข้อมูลรายละเอียดการพัฒนาผลิตภัณฑ์</div>
             
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              <div style={{cursor : "pointer"}} >  ผลิตภัณฑ์ที่เลือกทำการพัฒนา </div>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Trader_Show_Input />
          </TabPane>
          <TabPane tabId="2">
          <Trader_confrim/>
          </TabPane>
          <TabPane tabId="3">
          <Trader_Success/>
          </TabPane>
        </TabContent>
          </div>
        )
    }
}
export default TraderActivity