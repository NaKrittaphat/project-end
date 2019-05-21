import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";
class Modalinformation extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card style={{textAlign:'center'}}>
          <CardHeader style={{ fontSize: 25 }}>รายละอียด</CardHeader>
          <CardBody  style={{ fontSize: 20 }}>
            <CardText>ชื่อผลิตภัณฑ์ : {this.props.nameproduct}</CardText>
            <CardText>สารอาหารที่ต้องการ : {this.props.nutrient}</CardText>
            <CardText>จำนวนผลิตภัณฑ์ : {this.props.nutrient_value}  {this.props.nutrient_volume_type}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Modalinformation;
