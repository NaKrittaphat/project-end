import React, { Component } from 'react'
import ReactTable from 'react-table'
import Modal from 'react-responsive-modal'
import Information from '../../../component/ModalComponent/Modalinformation'
import Send from '../../../component/ModalComponent/ModalSend'
import { get } from '../../../service/service';
import { user_token_decoded, user_token } from '../../../static/Constance'
import { IoMdPersonAdd, IoMdClipboard, IoIosCheckbox, IoMdRemoveCircle ,IoMdWarning} from "react-icons/io";

import {MdAccessTime,MdHelpOutline} from "react-icons/md";
import {
    Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Table
} from 'reactstrap';
class Send_Prouct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            modal_valiable: null,
            graph_data: [],
            modal_data: [],
            plant: null,
            month: null,
            Modalname: null,
            nameproduct: null,
            nutrient: null,
            volume: null,
            product_id: null,
            volume_type: null,
            confirm: [],
            cancel: [],
            Researcher_name:[],
            all_user_id:[]
        }
    };
    Modal_name = (Modalname, nameproduct, nutrient, volume, volume_type) => {
        this.setState({
            Modalname: Modalname,
            nameproduct: nameproduct,
            nutrient: nutrient,
            volume: volume,
            volume_type: volume_type
        })
        this.onOpenModal()

    };
    Modal_send = (Modalname, nameproduct, product_id,Researcher_name,all_user_id) => {
        this.setState({
            Modalname: Modalname,
            nameproduct: nameproduct,
            product_id: product_id,
            Researcher_name:Researcher_name,
            all_user_id:all_user_id
        })
        this.onOpenModal()
    };

    Modal_confirm = (Modalname, confirm) => {
        this.setState({
            Modalname: Modalname,
            confirm: confirm
        })
        console.log(this.state.confirm)
        this.onOpenModal()
    };

    Modal_cancel = (Modalname, cancel) => {
        this.setState({
            Modalname: Modalname,
            cancel: cancel
        })

        this.onOpenModal()
    };
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    get_result = async () => {

        try {
            await get('product/get_product', user_token).then((result) => {
                if (result.success) {
                    this.setState({ TableChart: result.result })
                    console.log("log",this.state.TableChart)
                    this.datamap()

                } else {
                    alert(result.error_message)
                }
            }).catch((err) => {

            });
        } catch (error) {
            console.log(error)
        }
    }

    datamap = () => {
        let dataTabel = []


        this.state.TableChart.map((element, index) => {

            let datanutrient = []
            let confirm_name = []
            let cancel_name = []

            element.nutrient.map((ele, i) => {
                datanutrient.push(
                    ele.nutrient
                )
            })


            dataTabel.push(
                {
                    trader_name: (element.name + " " + element.last_name),
                    product_name: (element.product_name),
                    nutrient: datanutrient.join(),
                    Researcher_name: element.researcher_name.join(),
                    volume: (element.volume),
                    volume_type: (element.volume_type),
                    btb: <Button style={{ width: 100, textAlign: 'center' }} outline color="info" onClick={() => this.Modal_name("saerch", (element.product_name), datanutrient.join(), (element.volume), (element.volume_type))} className="default_button">
                        <IoMdClipboard></IoMdClipboard>
                    </Button>,
                    btb1: <Button style={{ width: 100, textAlign: 'center' }} outline color="success" onClick={() => this.Modal_send("send", (element.product_name), (element.product_id),element.researcher_name,element.all_user_id)} className="default_button">
                        <IoMdPersonAdd  ></IoMdPersonAdd>
                    </Button>,

                    confirm:
                        <Button style={{ width: 100, textAlign: 'center' }}
                            outline color="success" onClick={() => this.Modal_confirm("confirm", element.researcher_confirm_name)} className="default_button">
                            <IoIosCheckbox />
                        </Button>,

                    cancel: <Button style={{ width: 100, textAlign: 'center' }}
                        outline color="danger"
                        onClick={() => this.Modal_cancel("cancel", element.researcher_cancel_name)} className="default_button">
                        <IoMdRemoveCircle />
                    </Button>,

                })

        })



        this.setState({ dataTabel: dataTabel })

    }
    componentWillMount() {
        this.get_result()

    }

    render() {


        const data = this.state.dataTabel

        const columns = [{
            id: 'name_trader',
            Header: 'ผู้สั่งพัฒนาผลิตภัณฑ์',
            accessor: 'trader_name'
        },
        {

            Header: 'ชื่อผลิตภัณฑ์',
            accessor: 'product_name' // Custom value accessors!
            // 
        },
        {
            Header: 'ข้อมูล',
            accessor: 'btb',
            filterable: false

        },
        {
            Header: 'ส่งความต้องการ',
            accessor: 'btb1',
            filterable: false
        },
        {
            Header: 'ชื่อนักวิจัยที่เลือก',
            accessor: 'Researcher_name'
        },
        {
            Header: 'นักวิจัยที่ตกลง',
            accessor: 'confirm',
            filterable: false
        }
            , {
            Header: 'นักวิจัยที่ยกเลิก',
            accessor: 'cancel',
            filterable: false
        }
        ]

        return (
            <div>
                <Col>
                    <div style={{ marginTop: 30, width: '100%', height: 100, justifyContent: 'center' }} >
                        <div className="table_yearround" style={{ textAlign: 'center', width: '80' }}>
                            <div style={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#0000' }} >
                                < ReactTable style={{ borderStyle: 'solid', borderWidth: 1 }}
                                    data={data}
                                    columns={columns}
                                    defaultPageSize={10}
                                    noDataText="ไม่พบข้อมูล!"
                                    className="-striped -highlight"
                                    filterable
                                // pivotBy={["firstName"]}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={() => { this.onCloseModal(); }} >
                        {this.state.Modalname === "saerch" ? <div style={{ marginTop: 30, width: 550 }} >
                            <Information
                                nameproduct={this.state.nameproduct}
                                nutrient={this.state.nutrient}
                                nutrient_value={this.state.volume}
                                nutrient_volume_type={this.state.volume_type}
                            />
                        </div>
                            : this.state.Modalname === "send" ? <div style={{ marginTop: 30  }} >
                                <Send
                                    nameproduct={this.state.nameproduct}
                                    idproduct={this.state.product_id}
                                    onClose={() => { this.onCloseModal(); }}
                                    element_nameresearch ={this.state.Researcher_name}
                                    all_user_id = {this.state.all_user_id}
                                />

                            </div> :
                                this.state.Modalname === "confirm" ? <div style={{ marginTop: 30, width: 550 }}>
                                    {this.state.confirm.length <= 0 ?
                                        <div style={{ fontSize: 32,color : "back",textAlign :"center",borderColor:"green",borderStyle:"solid"}}><MdHelpOutline style={{color : "green"}}></MdHelpOutline>
                                           <br/>
                                           ไม่มีข้อมูล
                                 </div>
                                        : <Card>
                                            <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30 }}> นักวิจัยที่ตกลง</CardHeader>
                                            <CardBody>

                                                <Table hover style={{textAlign : "center"}}>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ fontSize: 24 }}>รายชื่อ</th>
                                                            <th style={{ fontSize: 24, color: "green" }}>วันที่เริ่มต้น</th>
                                                            <th style={{ fontSize: 24, color: "red" }}>วันที่สิ้นสุด</th>
                                                        </tr>
                                                    </thead>

                                                    {this.state.confirm.map((element, index) => {

                                                        return (
                                                            <tbody>
                                                                <tr>
                                                                    <td  >

                                                                        {element.name}

                                                                    </td>

                                                                    <td style={{ color: "green" }}>

                                                                        {element.begin}

                                                                    </td>

                                                                    <td style={{ color: "red" }}>

                                                                        {element.end}

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )


                                                    })}
                                                </Table>
                                            </CardBody>
                                        </Card>}


                                </div> :
                                    this.state.Modalname === "cancel" ? <div style={{ marginTop: 30, width: 550 }} >

                                        {this.state.cancel.length <= 0 ?
                                             <div style={{ fontSize: 32,color : "red",textAlign :"center",borderColor:"red",borderStyle:"solid"}}><IoMdWarning style={{color : "red"}}></IoMdWarning> 
                                             <br/>
                                             ไม่มีข้อมูล 
                                 </div>
                                            : <Card>
                                                <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30, color: "red" }}> นักวิจัยที่ยกเลิก</CardHeader>
                                                <CardBody>
                                                <Table hover style={{textAlign : "center"}}>
                                                <th style={{ fontSize: 24 }}>รายชื่อ</th>
                                                {this.state.cancel.map((element, index) => {

                                                    return (
                                                        <tbody>
                                                            <tr>
                                                                <td  >

                                                                    {element.name}

                                                                </td>

                                                                
                                                            </tr>
                                                        </tbody>
                                                    )


                                                    })}
                                                       </Table>
                                                </CardBody>
                                            </Card>}
                                    </div> :
                                        null}

                    </Modal>
                </Col>
            </div>
        )

    }
}
export default Send_Prouct