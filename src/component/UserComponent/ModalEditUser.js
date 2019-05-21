import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Button,
  CustomInput
} from "reactstrap";
import { post, get } from "../../service/service";
import swal from "sweetalert";
import banner from "../../asset/image/No_Image_Available.jpg";
import { user_token_decoded, user_token } from "../../../src/static/Constance";

class Edit_user extends Component {
  constructor() {
    super();
    this.state = {
      product_name: null,
      nutrient: null,
      nutrient_array: [],
      nutrient_array_add: [],
      getfarmerid: [],
      material: null,
      material_array: [],
      material_array_add: [],
      FileReader: null,
      user_id: null,
      username: null,
      password: null,
      name: null,
      last_name: null,
      address: null,
      aptitude:null,
      type_user:null
    };
  }

  _oninput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  _inputaptitude = event => {
    console.log(event.target.value);
    this.setState({ aptitude: event.target.value,
    });
  };

  Onsubmit = async () => {
    const { user_id, username, name, last_name, address,aptitude,type_user } = this.state;
    const object = {
      user_id: user_id,
      username: username,
      // password: password,
      name: name,
      last_name: last_name,
      address: address,
      aptitude: aptitude ? aptitude:"-",
      type_user:type_user,
    };

    console.log("object", object);
    if ((user_id, username && name && last_name && address&&aptitude && type_user)) {
      try {
        await post(object, "user/user_update", user_token).then(res => {
          console.log(res);
          if (res.success) {
            // alert("ส่งข้อมูลสำเร็จ")
            swal("แก้ไขสมาชิกสำเร็จ");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน");
            console.log(res.error_message);
          }
        });
      } catch (err) {
        console.log(object);
      }
    } else {
      swal("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  OnResetPassword = async () => {
    const { user_id, password } = this.state;
    const object = {
      user_id: user_id,
      password: password
    };

    console.log("object", object);
    if ((user_id, password)) {
      try {
        await post(object, "user/user_update_password", user_token).then(
          res => {
            console.log(res);
            if (res.success) {
              // alert("ส่งข้อมูลสำเร็จ")
              swal("ตั้งรหัสผ่านใหม่สำเร็จ");
              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
            } else {
              swal("กรุณากรอกข้อมูลให้ครบถ้วน");
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

  componentWillMount() {
    this.setState({
      user_id: this.props.user_id,
      username: this.props.username,
      name: this.props.name,
      last_name: this.props.last_name,
      address: this.props.address,
      aptitude:this.props.aptitude,
      type_user:this.props.type_user
    });
  }

  render() {
    return (
      <div>
         
        
         <div>
          <div style={{ textAlign: "center", fontSize: 30, marginBottom: 15,width:600 }}>
            แก้ไขข้อมูลผู้ใช้
          </div>

      
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <Form>
                  {/* {this.state.type_user} */}
                  <FormGroup>
                    <Label for="username">ชื่อผู้ใช้งาน</Label>
                    <Input
                      style={{ fontSize: 20 }}
                      type="text"
                      name="username"
                      id="username"
                      value={this.state.username}
                      placeholder=""
                      onChange={event => this._oninput(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">รหัสผ่านใหม่</Label>
                    <Input
                      style={{ fontSize: 20 }}
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      placeholder=""
                      onChange={event => this._oninput(event)}
                    />
                  </FormGroup>

                  <FormGroup style={{ textAlign: "center" }}>
                    <Col sm="12">
                      <Button
                        name="click_delete"
                        style={{
                          width: 120,
                          marginTop: 5,
                          marginBottom: 5,
                          fontSize: 18
                        }}
                        onClick={() => this.OnResetPassword()}
                        outline
                        color="primary"
                      >
                        รีเซ็ตรหัสผ่าน
                      </Button>
                    </Col>
                  </FormGroup>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">ชื่อ</Label>
                        <Input
                          style={{ fontSize: 20 }}
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                          value={this.state.name}
                          onChange={event => {
                            this._oninput(event);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="last_name">นาสกุล</Label>
                        <Input
                          style={{ fontSize: 20 }}
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder=""
                          value={this.state.last_name}
                          onChange={event => {
                            this._oninput(event);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                <Col>
                  {/* <FormGroup>
                    <Label inline for="type_user">
                      ประเภทผู้ใช้งาน
                    </Label>
                    <div
                      onChange={event => {
                        this._oninput(event);
                      }}
                    >
                      <CustomInput
                        type="radio"
                        name="type_user"
                        id="01112"
                        label="SE ย่อย"
                        value="3"
                      />
                      <CustomInput
                        type="radio"
                        name="type_user"
                        id="01113"
                        label="ผู้ประกอบการ"
                        value="2"
                      />
                      <CustomInput
                        type="radio"
                        name="type_user"
                        id="01114"
                        label="นักวิจัย"
                        value="1"
                      />
                    </div>
                  </FormGroup> */}
                  {this.state.type_user ==="1" ?
                    <FormGroup>
                      <Label for="aptitude" style={{ color: 'red' }}>**กรุณากรอกความถนัดของนักวิจัย**</Label>
                      <Input type="text" name="aptitude" id="aptitude" placeholder="ตัวอย่างเช่น มีความสามารถในการแปรรูปข้าว"
                        value={this.state.aptitude}
                        onChange={(event) => {
                          this._inputaptitude(event);
                        }} />
                    </FormGroup>
                    : null}

                </Col>
              </Row>
                  <FormGroup>
                    <Label for="address">ที่อยู่</Label>
                    <Input
                      style={{ fontSize: 20 }}
                      type="textarea"
                      name="address"
                      id="address"
                      placeholder=""
                      value={this.state.address}
                      onChange={event => {
                        this._oninput(event);
                      }}
                    />
                  </FormGroup>
                  <div
                    style={{
                      marginTop: 30,

                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
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
                </Form>
              </Col>
            </Row>
      
        </div> 

      
      </div>
    );
  }
}
export default Edit_user;
