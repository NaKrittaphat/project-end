import React, { Component } from "react";
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
  Card
} from "reactstrap";
import swal from "sweetalert";
import { post } from "../../service/service";
import { user_token_decoded, user_token } from "../../static/Constance";
import { Redirect } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { GoTrashcan } from "react-icons/go/";
class TraderActivity extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      product_name: null,
      nutrient: null,
      volume_type : null,
      product_volume:null,
      nutrient_array: [],
      nutrient_array_add: [],
      plant_array_delete: [],
      plant_type_box_arry: [],
      edit_plan_type: null,
      openmodal: false,
      edit_index_member: null
    };
  }


  _clear_data = () => {

    
    this.setState({
      product_name:"",
      nutrient: "",
      volume_type : "",
      product_volume:"",
      nutrient_array: []

    })
    // this.onClose();
  };
  
  onOpen = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };


  _oninput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  Onsubmit = async () => {
    const {
      product_name,
      product_volume,
      nutrient_array,
      volume_type
    } = this.state;
    const object = {
      product_name: product_name,
      nutrient: JSON.stringify(nutrient_array),
      volume: product_volume,
      volume_type: volume_type,
      researcher_name: JSON.stringify([]),
      all_user_id: JSON.stringify([])
    };
    console.log("object", object);
    if (product_name && product_volume && nutrient_array && volume_type) {
      try {
        await post(object, "product/trader_add_product", user_token).then(
          res => {
            console.log(res);
            if (res.success) {
              swal({
                title: "ส่งข้อมูลสำเร็จ!",
                icon: "success",
                button: "ตกลง!"
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

  _oninput_nutrient_array = (event, index) => {
    let nutrient_array = this.state.nutrient_array;
    nutrient_array[index][event.target.name] = event.target.value;
    this.setState({ nutrient_array: nutrient_array });
  };
  _onaddbox = event => {
    if (this.state.nutrient) {
      let index;
      let nutrient_array = [];
      let nutrient_array_add = [];

      nutrient_array = this.state.nutrient_array;
      nutrient_array_add = this.state.nutrient_array_add;
      index = nutrient_array.findIndex(
        element => element.plant == this.state.nutrient
      );

      if (index === -1) {
        nutrient_array.push({ nutrient: this.state.nutrient });
      }
    } else {
      swal("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    this.setState({
      nutrient: ""
    });
  };

  _alert_ondeletebox = () => {
    swal({
      title: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._ondeletebox();
      } else {
        // swal("ลบข้อมูลไม่สำเร็จ !");
      }
    });
  };

  _ondeletebox = index => {
    let nutrient_array = [];
    nutrient_array = this.state.nutrient_array;
    nutrient_array.splice(index, 1);
    this.setState({ nutrient_array: nutrient_array });
    swal("ลบข้อมูลสำเร็จ", {
      icon: "success"
    });
  };

  render() {
    if (user_token_decoded.id === null || user_token_decoded.type !== 2) {
      return <Redirect push to="/" />;
    }

    return (
      <div style={{ marginTop: 40 }}>
        <div style={{ textAlign: "center", fontSize: 30, marginBottom: 20 }}>
        ส่งความต้องการแปรรูปผลิตภัณฑ์
        </div>
        <br/>
      
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form>
                <FormGroup>
                  <Label for="product_name">ชื่อผลิตภัณฑ์ที่ต้องการ</Label>
                  <Input
                    style={{ fontSize: 20 }}
                    type="text"
                    name="product_name"
                    id="product_name"
                    value={this.state.product_name}
                    placeholder="ตัวอย่างเช่น ข้าวโพดอัดแท่ง"
                    onChange={event => this._oninput(event)}
                  />
                </FormGroup>
                <Row form>
                  <Col md={10}>
                    <FormGroup>
                      <Label for="nutrient">สารอาหารที่ต้องการ</Label>
                      <Input
                        style={{ fontSize: 20 }}
                        type="text"
                        name="nutrient"
                        id="nutrient"
                        placeholder="ตัวอย่างเช่น โปรตีน "
                        value={this.state.nutrient}
                        onChange={event => {
                          this._oninput(event);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Button
                        style={{
                          width: 80,
                          // fontSize: 16,
                          // marginRight: 50,
                          marginTop: 38
                        }}
                        onClick={() => this._onaddbox()}
                        color="primary"
                      >
                        เพิ่มข้อมูล
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Row>
                {this.state.nutrient_array.length > 0 ? (
                  <Col>
                    <Card body>
                      <Row>
                        <Col sm="9">
                          <Label for="nutrient">สารอาหารที่เลือก</Label>
                        </Col>
                        <Col sm="3">
                          <Label for="click_delete">ลบข้อมูล</Label>
                        </Col>
                      </Row>
                      {this.state.nutrient_array.map((element, index) => {
                        return (
                          <tr>
                            <Row>
                              <Col md="9">
                                <FormGroup>
                                  <Input
                                    value={element.nutrient}
                                    name={"nutrient"}
                                    type="text"
                                    onChange={event => {
                                      this._oninput_nutrient_array(
                                        event,
                                        index
                                      );
                                    }}
                                    label=""
                                    style={{ fontSize: 20 }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <Button
                                  name="click_delete"
                                  style={{
                                    width: 50,
                                    fontSize: 16
                                  }}
                                  onClick={() =>
                                    this._alert_ondeletebox(index)
                                  }
                                  color="danger"
                                >
                                  <GoTrashcan />
                                </Button>
                              </Col>
                            </Row>
                          </tr>
                        );
                      })}
                    </Card>
                  </Col>
                ) : null}
              </Row>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="product_volume">ปริมาณที่ต้องการ</Label>
                    <Input
                      style={{ fontSize: 20 }}
                      type="number"
                      name="product_volume"
                      id="product_volume"
                      value={this.state.product_volume}
                      placeholder=""
                      onChange={event => {
                        this._oninput(event);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="volume_type">หน่วย</Label>
                    <Input
                      style={{ fontSize: 20 }}
                      type="select"
                      name="volume_type"
                      id="volume_type"
                      value={this.state.volume_type}
                      placeholder=""
                      onChange={event => {
                        this._oninput(event);
                      }}
                    >
                     <option>---กรุณาเลือก---</option>
                      <option value="ชิ้น">ชิ้น</option>
                      <option value="กล่อง">กล่อง</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <div
                style={{
                  marginTop: 100,
                  marginBottom: 30,
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
                  onClick={() => this._clear_data()}
                  outline
                  color="danger"
                >
                  ยกเลิก
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default TraderActivity;
