import React, { Component } from "react";
import { post, get, ip } from "../../service/service";
import swal from "sweetalert";
import { GoTrashcan } from "react-icons/go/";
import banner from "../../asset/image/No_Image_Available.jpg";
import { user_token_decoded, user_token } from "../../../src/static/Constance";
import {
    Input,
    Row,
    Col,
    Button,
    Container,
    Table,
    Form,
    FormGroup,
    Label,
    CustomInput,
    Card,
    CardBody,
    CardHeader
} from "reactstrap";

class Modal_Edit_Order extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            product_name: null,
            getfarmerid: [],
            FileReader: null,
            product_topic: null,
            plant: [],
 
            nutrient: null,
            nutrient_array: [],
            nutrient_array_add: [],
            material: null,
            material_array: [],
            material_array_add: []
        };
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    _oninput = event => {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    _onaddImage = event => {
        let reader = new FileReader();
        let file = event.target.files[0];

        if (!file) {
            this.setState({
                imagePreviweUrl: null
            });
        } else {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({
                    imagePreviweUrl: reader.result
                });
            };
        }
    };

    _onaddbox = event => {
        if (this.state.nutrient && this.state.percent) {
            let index;
            let nutrient_array = [];
            let nutrient_array_add = [];

            nutrient_array = this.state.nutrient_array;
            nutrient_array_add = this.state.nutrient_array_add;
            index = nutrient_array.findIndex(
                element => element.plant == this.state.nutrient
            );

            if (index === -1) {
                nutrient_array.push({
                    nutrient: this.state.nutrient,
                    percent: this.state.percent
                });
            }
        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        this.setState({
            nutrient: "",
            percent: ""
        });
    };

    Onsubmit = async () => {
        const { material_array, nutrient_array, imagePreviweUrl } = this.state;
        const object = {

            plan_id: this.props.product_id,
            product_topic: this.state.product_topic,
            nutrient: JSON.stringify(nutrient_array),
            plant: JSON.stringify(material_array),
            image: this.state.imagePreviweUrl
        };
        console.log("object", object);
        if (object.plan_id) {
            try {
                await post(object, "plan/update_plan", user_token).then(
                    res => {
                        console.log(res);
                        if (res.success) {
                            // alert("ส่งข้อมูลสำเร็จ")
                            swal("แก้ไขสำเร็จ");

                        } else {
                            swal("แก้ไขไม่สำเร็จ");
                            console.log(res.error_message);
                        }
                    }
                );
            } catch (err) {
                console.log(object);
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    };

    edit_product_topic = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    };


    edit_oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    };

    _oninput_nutrient_array = (event, index) => {
        let nutrient_array = this.state.nutrient_array;
        nutrient_array[index][event.target.name] = event.target.value;
        this.setState({ nutrient_array: nutrient_array });
    };

    _oninput_material = (event, index) => {
        let material_array = this.state.material_array;
        material_array[index][event.target.name] = event.target.value;
        this.setState({ material_array: material_array });
    };



    _alert_ondelete_nutrient_array = () => {
        swal({
            title: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                this._ondelete_nutrient_array();
            } else {
                // swal("ลบข้อมูลไม่สำเร็จ !");
            }
        });
    };

    _ondelete_nutrient_array = index => {
        let nutrient_array = [];
        nutrient_array = this.state.nutrient_array;
        nutrient_array.splice(index, 1);
        this.setState({ nutrient_array: nutrient_array });
        swal("ลบข้อมูลสำเร็จ", {
            icon: "success"
        });
    };

    _alert_ondelete_material_array = () => {
        swal({
            title: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                this._ondelete_material_array();
            } else {
                // swal("ลบข้อมูลไม่สำเร็จ !");
            }
        });
    };

    _onaddmaterial = event => {
        if (this.state.material && this.state.volume) {
          let index;
          let material_array = [];
          let material_array_add = [];
         
          material_array = this.state.material_array;
          material_array_add = this.state.material_array_add;
          index = material_array.findIndex(
            element => element.plant == this.state.material
          );
    
          if (index === -1) {
            material_array.push({
              plant_name: this.state.material,
              volume: this.state.volume,
              volume_type: this.state.volume_type
            });
          }
        } else {
          swal("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    
        this.setState({
          material: "",
          volume: ""
        });
      };

    _ondelete_material_array = index => {
        let material_array = [];
        material_array = this.state.material_array;
        material_array.splice(index, 1);
        this.setState({ material_array: material_array });
        swal("ลบข้อมูลสำเร็จ", {
            icon: "success"
        });
    };

    dataset = () => {

        this.setState({
            product_topic: this.props.product_topic,
            nutrient_array: this.props.edit_nutrient,
            material_array : this.props.edit_plant,
            imagePreviweUrl: ip + this.props.image
        })
        this.setState({
            nutrient: "",
            percent: ""
        });
        this.setState({
            material: "",
            volume: ""
          });

    }

    componentWillMount() {
        this.dataset()

    }

    render() {
        return (
            <div>
                <div style={{ fontSize: 30, textAlign: "center" }}>พัฒนาผลิตภัณฑ์</div>
                <div style={{ fontSize: 25, textAlign: "center" }}>
                    ชื่อผลิตภัณฑ์ : {this.props.nameproduct}

                </div>
                <br />
                <Container>
                    <Row>
                        <Col md={{ size: 10, offset: 1 }}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="nutrient">ชื่อสูตร:</Label>
                                        <Input
                                            value={this.state.product_topic}
                                            name={"product_topic"}
                                            type="text"

                                            onChange={event => {
                                                this.edit_product_topic(
                                                    event

                                                );
                                            }}
                                            label=""
                                            style={{ fontSize: 20 }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="nutrient">ข้อมูลสารอาหาร</Label>
                                        <Input
                                            style={{ fontSize: 20 }}
                                            name="nutrient"
                                            value={this.state.nutrient}
                                            type="text"
                                            id="nutrient"
                                            placeholder=""
                                            onChange={event => this._oninput(event)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="percent">ปริมาณสารอาหาร %</Label>
                                        <Input
                                            style={{ fontSize: 20 }}
                                            id="nutrient"
                                            placeholder=""
                                            name="percent"
                                            value={this.state.percent}
                                            type="number"
                                            onChange={event => this._oninput(event)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Button
                                            style={{

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

                            <Row>

                                <Col>
                                    <Card body>
                                        <Row >
                                            <Col sm="6" style={{ textAlign: 'center' }}>
                                                <Label for="nutrient">ข้อมูลสารอาหาร</Label>
                                            </Col>
                                            <Col sm="4">
                                                <Label for="percent">ปริมาณสารอาหาร %</Label>
                                            </Col>

                                            <Label for="click_delete">ลบข้อมูล</Label>

                                        </Row>

                                        {this.state.nutrient_array.map((element, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input
                                                                    value={element.nutrient}
                                                                    name={"nutrient"}
                                                                    type="text"
                                                                    id="nutrient"
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
                                                    </td>
                                                    <td>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input
                                                                    value={element.percent}
                                                                    name={"percent"}
                                                                    type="number"
                                                                    id="percent"
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
                                                        <Row>
                                                            <Col md="8" />
                                                        </Row>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            name="click_delete"
                                                            style={{
                                                                width: 70,
                                                                fontSize: 16
                                                            }}
                                                            onClick={() =>
                                                                this._alert_ondelete_nutrient_array(index)
                                                            }
                                                            color="danger"
                                                        >
                                                            <GoTrashcan />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </Card>
                                    <br />
                                </Col>


                            </Row>

   

                            <Row>
                                <Col md="5">
                                    <FormGroup>
                                        <Label for="material">วัตถุดิบที่ใช้</Label>
                                        <Input
                                            style={{ fontSize: 20 }}
                                            name="material"
                                            value={this.state.material}
                                            type="select"
                                            id="material"
                                            placeholder=""
                                            onChange={event => this._oninput(event)}
                                        >
                                            <option  >--- กรุณากรอกข้อมูล ---</option>
                                            {this.props.namematerial.map((element, index) => {
                                                return (
                                                    <option value={element.name}>{element.name}</option>

                                                )

                                            })}


                                        </Input >
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="volume">ปริมาณ</Label>
                                        <Input
                                            style={{ fontSize: 20 }}
                                            name="volume"
                                            value={this.state.volume}
                                            type="number"
                                            label="ปริมาณ"
                                            placeholder=""
                                            onChange={event => this._oninput(event)}
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Label for="volume_type">หน่วย</Label>
                                        <Input
                                            style={{ fontSize: 20 }}
                                            type="select"
                                            value={this.state.volume_type}
                                            name="volume_type"
                                            placeholder=""
                                            onChange={event => {
                                                this._oninput(event);
                                            }}
                                        >
                                            <option value="" > - </option>
                                            <option value="กรัม">กรัม</option>
                                            <option value="กิโลกรัม">กิโลกรัม</option>
                                            <option value="ตัน">ตัน</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Button
                                            style={{
                                                // width: 80,
                                                // fontSize: 16,
                                                // marginRight: 50,
                                                marginTop: 38
                                            }}
                                            onClick={() => this._onaddmaterial()}
                                            color="primary"
                                        >
                                            เพิ่มข้อมูล
                    </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <Card body>
                                        <Row style={{ textAlign: "center" }}>
                                            <Col sm="4">
                                                <Label for="plant_name">วัตถุดิบที่ใช้</Label>
                                            </Col>
                                            <Col sm="4">
                                                <Label for="volume">ปริมาณ</Label>
                                            </Col>
                                            <Col sm="2">
                                                <Label for="volume_type">หน่วย</Label>
                                            </Col>
                                            <Col sm="2">
                                                <Label for="click">ลบข้อมูล</Label>
                                            </Col>
                                        </Row>
                                        {this.state.material_array.map((element, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Col >

                                                            <FormGroup>
                                                                <Input
                                                                    value={element.plant_name}
                                                                    name={"plant_name"}
                                                                    type="select"
                                                                    id="plant_name"
                                                                    onChange={event => {
                                                                        this._oninput_material(event, index);
                                                                    }}
                                                                    label=""
                                                                    style={{ fontSize: 20 }}
                                                                >
                                                                    {this.props.namematerial.map((element, index) => {
                                                                        return (
                                                                            <option value={element.name}>{element.name}</option>

                                                                        )

                                                                    })}

                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Col  >
                                                            <FormGroup>
                                                                <Input
                                                                    value={element.volume}
                                                                    name={"volume"}
                                                                    type="text"
                                                                    id="volume"
                                                                    onChange={event => {
                                                                        this._oninput_material(event, index);
                                                                    }}
                                                                    style={{ fontSize: 20 }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Col  >
                                                            <FormGroup>
                                                                <Input
                                                                    value={element.volume_type}
                                                                    type="select"
                                                                    name="volume_type"
                                                                    onChange={event => {
                                                                        this._oninput_material(event, index);
                                                                    }}
                                                                    style={{ fontSize: 20 }}
                                                                >

                                                                    <option value="กรัม">กรัม</option>
                                                                    <option value="กิโลกรัม">กิโลกรัม</option>
                                                                    <option value="ตัน">ตัน</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            name="click"
                                                            style={{
                                                                width: 70,
                                                                fontSize: 16
                                                            }}
                                                            onClick={() =>
                                                                this._alert_ondelete_material_array(index)
                                                            }
                                                            color="danger"
                                                        >
                                                            <GoTrashcan />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </Card>
                                    <br />
                                </Col>

                            </Row>

                            <div>

                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        {this.state.imagePreviweUrl ? (
                                            <img
                                                src={this.state.imagePreviweUrl}
                                                height="100"
                                                width="150"
                                            />
                                        ) : (
                                                <img
                                                    src={this.state.imagePreviweUrl}
                                                    height="100"
                                                    width="150"
                                                    align="middle"
                                                />
                                            )}
                                    </Col>
                                </Row>
                                <div style={{ marginTop: 15 }}>
                                    <Row>
                                        <Col style={{ textAlign: "center" }}>
                                            <FormGroup>
                                                <Label for="exampleCustomFileBrowser" />
                                                <CustomInput
                                                    type="file"
                                                    id="exampleCustomFileBrowser"
                                                    name="customFile"
                                                    label="กรุณาเลือกรูปภาพ"
                                                    onChange={event => this._onaddImage(event)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

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
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Modal_Edit_Order;
