import React, { Component } from "react";
import { post, get } from "../../service/service";
import swal from "sweetalert";
import {
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Container,
  CustomInput,
  Card,
  CardHeader,
  CardBody,
  CardText
} from "reactstrap";

import { user_token_decoded, user_token } from "../../../src/static/Constance";

class ModalSend extends Component {
  constructor() {
    super();
    this.state = {
      product_name: null,
      Researcher: null,
      Researcher_array: [],
      Researcher_array_add: [],
      dataresearcher: [],
      user_array: [],
      user_id: []
    };
  }
  _oninput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  Onsubmit = async () => {
    let user_array = this.state.user_array;
    let user_id = this.state.user_id;
    const object = {
      product_id: this.props.idproduct,
      researcher_name: JSON.stringify(this.state.user_array),
      all_user_id: JSON.stringify(this.state.user_id)
    };

    console.log("object", object);

    if (user_array && user_id) {
      try {
        post(object, "product/update_researcher_product", user_token).then(
          res => {
            if (res.success) {
              swal("ข้อมูลถูกส่งสำเร็จ!", {
                icon: "success"
              });
              setTimeout(window.location.reload(true), 5000);
            } else {
              console.log(res.error_message);
            }
          }
        );
      } catch (err) {
        console.log(object);
      }
    } else {
      swal("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  get_result = async () => {
    try {
      await get("researcher/get_researcher", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ dataresearcher: result.result });
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => { });
    } catch (error) {
      console.log(error);
    }
  };

  addbox = (name, id) => {
    
    let user_array = this.state.user_array;
    let user_id = this.state.user_id;
    let index = user_array.findIndex(el => el === name);
    if (index < 0) {
      user_array.push(name);
      user_id.push(id);
    } else {
      user_array.splice(index, 1);
      user_id.splice(index, 1);
    }
    this.setState({ user_array: user_array, user_id: user_id });
  };

  componentDidMount() {
    this.get_result();
    this.setState({user_array:this.props.element_nameresearch,
      user_id:this.props.all_user_id
    })
  }

  checked_status (value){
    let index = -1
    let status_ =false 
    index = this.state.user_array.indexOf(value)
    if(index>=0){
      status_ = true
    }else{
      status_ = false
    }
    return status_

  }


  render() {
    const { user_array, user_id } = this.state;
    return (
      <div>
        <Col>

          <div style={{ textAlign: "center", fontSize: 30 }}>
            พัฒนาผลิตภัณฑ์
        </div>
          <div style={{ textAlign: "center", fontSize: 25 }}>
            ชื่อผลิตภัณฑ์ : {this.props.nameproduct}
          </div>

          <CardBody style={{ fontSize: 24 }}>
            <div style={{ textAlign: "center" }}>
              <CardText>กรุณาเลือกนักวิจัยเพื่อทำการวิจัยผลิตภัณฑ์</CardText>
            </div>

            <Table  >
              <thead>
                <tr>
                  <th style={{ fontSize: 24 }}>รายชื่อ</th>
                  <th style={{ fontSize: 24,   textAlign: "center"  }}>ความสามรถ</th>
                  <th style={{ fontSize: 24 , textAlign: "center"  }}>กำลังพัฒนาผลิตภัณฑ์</th>
                </tr>
              </thead>
              

                   {this.state.dataresearcher.map((element, index) => {
                    return (
                      <tbody>

                <tr>
                      <td>
                      
                       
                          <Input
                            name={element.name}
                            type="checkbox"
                            value={element.name}
                            label={element.name}
                            checked={this.checked_status(element.name)}
                            onClick={() =>
                              this.addbox(element.name, element.user_id)
                            }
                          /> 
                          {element.name} 
                       </td>
                        <td> 
                        <a style={{ fontSize: 18, color: 'green' }}> *{element.aptitude} </a>
                       </td>
                   
 
                       <td style={{ fontSize: 18, textAlign: "center"  }}><a   >  {element.order} ชิ้น </a></td>
    </tr>
              </tbody>
                  
                    );
                  })} 


                  

            

            </Table >

          </CardBody>
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row"
          }}>
            <Button
              style={{ width: 100, fontSize: 20, marginRight: 15 }}
              onClick={() => this.Onsubmit()}
              outline
              color="success"
            >
              ตกลง
          </Button>
            <Button
              style={{ width: 100, fontSize: 20, marginLeft: 15 }}
              onClick={() => this.props.onClose()}
              outline
              color="danger"
            >
              ยกเลิก
          </Button>
          </div>



        </Col>
      </div>
    );
  }
}

export default ModalSend;
