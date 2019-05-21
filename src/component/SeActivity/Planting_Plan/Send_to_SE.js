import React, { Component } from 'react'
import { get, post } from '../../../service/service';
import Modalshow from '../Planting_Plan/Modalshow'
import { user_token_decoded, user_token } from '../../../static/Constance'
import {
    Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardBody,
    Table, CardGroup, Badge
} from 'reactstrap';
import swal from "sweetalert";
import Select from "react-select";
import { MdDirections } from 'react-icons/md';
import Modal from 'react-responsive-modal'

class Send_to_SE extends Component {
    constructor() {
        super()
        this.state = {
            need_plant: null,
            data_result: [],
            namechart: [],
            select_se: null,
            volume: null,
            data: [],
            plant: null,
            open: false,
            DataChart: [],
            unit: null,
            name_plant: null,
            result_data: [],
            volume_all: null

        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });

    };



    get_name = async () => {
        try {
            await get("graph/get_tab_chart ", user_token)
                .then(result => {
                    if (result.success) {
                        this.setState({ namechart: result.result });
                        console.log("asdfasf", this.state.namechart);


                    } else {
                        alert(result.error_message);
                    }
                })
                .catch(err => { });
        } catch (error) {
            console.log(error);
        }
    };


    select = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


    select_plant = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    };

    select_plan = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        setTimeout(() => {
            this.get_graph_radar(this.state.plant);
        }, 500);
    };

    get_graph_radar = async plant_name => {
        const object = { plant_name: plant_name };
        // console.log(plant_name)
        if (plant_name) {
            try {
                await post(object, "send_analytics/get_plant", user_token).then(result => {
                    if (result.success) {
                        this.setState({ data_result: result.result });
                        console.log("data_res", this.state.data_result);

                        this.test()
                    } else {
                        alert(result.error_message);
                    }
                })
                    .catch(err => { });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("err");
        }
    };

    _onaddbox = async () => {
        const { select_se, need_plant, volume, unit } = this.state;
        const object = {
            name: select_se,
            plant: need_plant,
            volume: volume,
            volume_type: unit
        };
        if (object) {
            try {
                await post(object, "send_analytics/add_year_round", user_token).then(
                    res => {
                        console.log(res);
                        if (res.success) {
                            // alert("ส่งข้อมูลสำเร็จ")
                            swal("ส่งข้อมูลสำเร็จ");
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
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


    on_get_graph_result = async () => {
        try {
            await get("graph/get_table_plant", user_token)
                .then(result => {
                    if (result.success) {
                        // result.result.pop()
                        this.setState({ DataChart: result.result });
                        // console.log("log",this.state.DataChart);

                    } else {
                        alert(result.error_message);
                    }
                })
                .catch(err => { });
        } catch (error) {
            console.log(error);
        }
    };

    data_on_modal = async (name, volume_all) => {
        let object = {
            name_plant: name,
            volume_all: volume_all
        };
        console.log(object);


        try {
            await post(object, "se/get_plant_volume_all_se", user_token)
                .then(result => {
                    if (result.success) {
                        this.setState({
                            result_data: result.result,
                            name_plant: name,
                            volume_all: volume_all
                        });

                        this.onOpenModal();
                    } else {
                        alert(result.error_message);
                    }
                })
                .catch(err => { });
        } catch (error) {
            console.log(error);
        }
    };


    componentWillMount() {

        this.get_name()
        this.on_get_graph_result()
        this.get_graph_radar("ทั้งหมด")

    }

    render() {


        return (
            <div style={{ marginTop: 30 }}>

                <Row style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 5 }}>
                    <Col sm="2" style={{ fontSize: 20, marginTop: 10 }}>
                        <Input type="select"
                            name="plant"
                            value={this.state.plant}
                            id="plant"
                            onChange={event => {
                                this.select_plan(event);
                            }}
                            style={{ fontSize: 20 }}
                        >
                            <option>ทั้งหมด</option>

                            <option>ทั้งหมด</option>
                            {this.state.namechart.map((element, index) => {
                                return (
                                    <option  >{element.name}</option>

                                )

                            })}
                        </Input>
                    </Col>
                </Row>

                <div style={{ marginTop: 30 }} />
                <Col>
                    <CardGroup style={{ textAlign: "center" }}>
                        <Card>
                            <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' }}>ชนิดพืช</CardHeader>
                            <CardBody>
                                <Table borderless>
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    {this.state.data_result.map((element, index) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <th >
                                                        {element.name}
                                                    </th>

                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </CardBody>
                        </Card>
                        <Card>

                            <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' }}>วัตถุดิบที่มีอยู่ทั้งหมด (กิโลกรัม)</CardHeader>
                            <CardBody>
                                {/* borderless */}
                                <Table borderless>
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    {this.state.data_result.map((element, index) => {
                                        return (
                                            <tbody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                <tr>
                                                    <td>
                                                        {element.volume_all}
                                                    </td>
                                                    <td >

                                                        <Badge
                                                            style={{ cursor: "pointer", fontSize: 18, marginLeft: "70%" }}
                                                            color="primary"
                                                            accessor="click"
                                                            onClick={() => {
                                                                this.data_on_modal(
                                                                    element.name,
                                                                    element.volume_all
                                                                );
                                                            }}
                                                        >
                                                            รายละเอียด
                                                          </Badge>

                                                    </td>

                                                </tr>

                                            </tbody>
                                        )
                                    })
                                    }
                                </Table>
                            </CardBody>

                        </Card>
                        <Card>
                            <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' }}>วัตถุดิบที่ใช้ในการแปรรูป (กิโลกรัม)</CardHeader>
                            <CardBody>
                                {JSON.stringify(this.state.data_result.all)}
                                <Table borderless>
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    {this.state.data_result.map((element, index) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <td  >

                                                        {element.volume_process > 0 ?
                                                            <div style={{ color: "green" }}>
                                                                {element.volume_process}
                                                            </div> :
                                                            <div> {element.volume_process}</div>}

                                                    </td>
                                                </tr>
                                            </tbody>
                                        )

                                    })}
                                </Table>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', color: "red" }}>วัตถุดิบที่ต้องทำการปลูกเพิ่ม (กิโลกรัม)</CardHeader>
                            <CardBody>
                                <Table borderless>
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    {this.state.data_result.map((element, index) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <td  >
                                                        {element.volume_want > 0 ?
                                                            <div style={{ color: "red" }}>
                                                                {element.volume_want}
                                                            </div> :
                                                            <div> {element.volume_want}</div>}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )

                                    })}
                                </Table>
                            </CardBody>

                        </Card>
                    </CardGroup>

                          
                        </Col>
        
                <br />
                <Col sm="12" md={{ size: 8, offset: 2 }} style={{ fontSize: 30, marginBottom: 20 }}>
                    <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' }}>
                        วางแผนการเพาะปลูก
        </CardHeader>
                </Col>


                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <Form>
                        <Row>
                            <Col sm='4'>
                                <FormGroup>
                                    <Label for="select_se">เลือก SE </Label>
                                    <Input type="select"
                                        name="select_se"
                                        value={this.state.select_se}
                                        id="select_se"
                                        onChange={event => {
                                            this.select(event);
                                        }}
                                        style={{ fontSize: 20 }}
                                    >
                                        <option>---กรุณาเลือกเครือข่าย---</option>
                                        <option>ภาคีเครือข่ายสุดยอดข้าวไทย</option>
                                        <option> บริษัทกรีนโกรทออร์แกนิค</option>
                                        <option> วิสาหกิจชุมชนปลาบู่ข้าวอินทรีย์ </option>
                                        <option>บริษัทเก้าศิริจำกัด </option>
                                        <option>เครือข่ายเกษตรกรอินทรีย์อีสาน</option>

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm='8'>
                                <FormGroup>
                                    <Label for="need_plant">พืชที่ต้องการให้ปลูก</Label>
                                    <Input type="select"
                                        name="need_plant"
                                        id="need_plant"
                                        value={this.state.need_plant}
                                        onChange={event => {
                                            this.select(event);
                                        }}
                                        placeholder="" style={{ fontSize: 20 }}  >

                                        <option>---กรุณาเลือกชนิดพืช---</option>

                                        {this.state.namechart.map((element, index) => {
                                            return (
                                                <option  >{element.name}</option>

                                            )

                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="volume">ปริมาณที่ต้องการ</Label>
                                    <Input type="number"
                                        name="volume"
                                        label="ปริมาณ"
                                        value={this.state.volume}
                                        id="volume"
                                        onChange={event => {
                                            this.select(event);
                                        }}
                                        placeholder="" style={{ fontSize: 20 }} />
                                </FormGroup>
                            </Col>
                            <Col sm="4">
                                <FormGroup>
                                    <Label for="unit">หน่วย</Label>
                                    <Input type="select" name="unit" id="unit" style={{ fontSize: 20 }}
                                        value={this.state.unit}
                                        onChange={event => {
                                            this.select(event);
                                        }}
                                    >
                                        <option>---กรุณาเลือก--- </option>
                                        <option>กรัม</option>
                                        <option>กิโลกรัม</option>
                                        <option>ตัน</option>


                                        {/* <option>   </option> */}

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm='2'>
                                <FormGroup>
                                    <Button
                                        style={{
                                            width: 110,
                                            // fontSize: 16,
                                            // marginRight: 50,
                                            marginTop: 38
                                        }}
                                        onClick={() => this._onaddbox()}
                                        color="primary"
                                    >
                                        กดเพื่อส่งข้อมูล
                      </Button>
                                </FormGroup>
                            </Col>

                        </Row>

                    </Form>

                </Col>

                <br />
                <div>
                    <Modal
                        open={this.state.open}
                        onClose={() => {
                            this.onCloseModal();
                        }}
                    >
                        <div style={{ width: 500, height: 200, textAlign: "center" }}>
                            <Modalshow
                                result={this.state.result_data}
                                volume_all={this.state.volume_all}
                                plant={this.state.name_plant}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Send_to_SE