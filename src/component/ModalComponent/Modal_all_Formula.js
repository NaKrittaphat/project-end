import React, { Component } from 'react'
 
import Modal from 'react-responsive-modal'
 
import { post, ip } from '../../service/service';
import Showimg from '../../component/ModalComponent/ModalImg'
import { user_token_decoded, user_token } from '../../static/Constance'
import { IoIosTrash, IoIosCreate, IoMdPaperPlane, IoMdWarning } from "react-icons/io";
import Modal_Edit from '../ResearcherActivity/Modal_Edit_Order'
import swal from 'sweetalert'
import {
    Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Table
} from 'reactstrap';
class Modal_all_Formula extends Component {
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
            dataplan: null,
            product_id: null,
            dataTabel: [],

        }
    };
    Modal_Edit = (Modalname, dataplan) => {
        this.setState({
            Modalname: Modalname,
            dataplan: dataplan,
        })
        this.onOpenModal()

    };

    Modal_Delete = async (plan_id) => {
        const object = {
            plan_id: plan_id
        }
        swal({
            title: "ลบข้อมูล",
            text: "ยืนยันการลบข้อมูล",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        post(object, 'plan/researcher_delete_product_plan', user_token).then((res) => {
                            if (res.success) {
                                swal("ลบสำเร็จ!", {
                                    icon: "success",
                                });
                                setTimeout(window.location.reload(true), 5000);
                            } else {
                                console.log(res.error_message)
                            }
                        })
                    } catch (err) {
                        console.log(object)
                    }


                } else {
                    swal("คำสั่งถูกยกเลิก!");
                }
            });
    }


    Modal_send = async( plan_id, product_id) => {
        const object = {
            plan_id: plan_id,
            product_id:product_id
        }
        // console.log("object",object)
        swal({
            title: "ส่งข้อมูลไปยัง SE กลาง",
            text: "ยืนยันการส่งข้อมูล",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        post(object, 'plan/send_plan_se', user_token).then((res) => {
                            if (res.success) {
                                swal("ส่งสำเร็จ!", {
                                    icon: "success",
                                });
                                setTimeout(window.location.reload(true), 5000);
                            } else {
                                console.log(res.error_message)
                            }
                        })
                    } catch (err) {
                        console.log(object)
                    }


                } else {
                    swal("คำสั่งถูกยกเลิก!");
                }
            });
    }

    imagemodal = (Modalname, image) => {
        this.setState({
            Modalname: Modalname, image: image
        });
        this.onOpenModal()
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentWillMount() {
        // console.log("table",this.props.Tablesend)
    }

    render() {


        return (
            <div>
                {this.props.Tablesend.length <= 0 ?
                 <div style={{ fontSize: 32,color : "red",textAlign :"center",borderColor:"red",borderStyle:"solid"}}><IoMdWarning style={{color : "red"}}></IoMdWarning> 
                 <br/>
                 ยังไม่ได้กรอกข้อมูล  
                 </div> :
                   <div style={{textAlign : "center"}}>
                     
                                <Col Col sm="12"  >
                                <Card>
                                    <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30 }}>ข้อมูลที่ทำการพัฒนา</CardHeader>
                                    <CardBody>
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    {/* <th>ชื่อ SE</th> */}
                                                    <th>สารอาหาร</th>
                                                    <th>วัตถุดิบ</th>
                                                    <th>รูปภาพ</th>
            
                                                </tr>
                                            </thead>
                                            {this.props.Tablesend.map((element, index) => {
                            return (
                                            <tbody>
                                            <tr>
                                            <th scope="row"> {index + 1}</th>
                                
                                    <td  >
                                        {element.nutrient_precent.map((element1, index1) => {
                                            return (
                                                <div>
                                                    {element1.nutrient}  ({element1.percent} %)
                                        </div>
                                            )
                                        })}

                                    </td>
                                    <td  >
                                        {element.plant.map((element1, index1) => {
                                            return (
                                                <div>
                                                    {element1.plant_name} จำนวน {element1.volume} {element1.volume_type}
                                                </div>
                                            )
                                        })}

                                    </td>
                                    <td  ><img src={ip + element.image} onClick={() => this.imagemodal("img", ip + element.image)} /></td>
                                    
                                </tr>
                                            </tbody>
                                              )  })}
                                        </Table>
                                    </CardBody>
            
                                </Card>
                            </Col>
 </div>
                        } 
  
                <Modal open={this.state.open} onClose={() => { this.onCloseModal(); }} >
                    {
                        this.state.Modalname === "edit" ? <div  >
                            <Modal_Edit
                            dataplan={this.state.dataplan}
                            // nutrient={this.state.nutrient}
                            // nutrient_value={this.state.volume}
                            />
                        </div>
                            :

                            this.state.Modalname === "img" ? <div style={{ textAlign: 'center' }} >
                                <Showimg
                                    image={this.state.image}
                                />

                            </div> : null}

                </Modal>
            </div>
      
        )

    }
}
export default Modal_all_Formula