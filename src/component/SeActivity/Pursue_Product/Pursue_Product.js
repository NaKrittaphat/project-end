import React, { Component } from 'react'
import ReactTable from 'react-table'
import './Pursue_Product.css'
import { ColorGraph } from "../../../static/ColorGraph"
import Formula from '../../../component/ModalComponent/ModalFormulaComponent'
import Showimg from '../../../component/ModalComponent/ModalImg'
import Modal from 'react-responsive-modal'
import { get, post, ip } from '../../../service/service';
import { user_token_decoded, user_token } from '../../../static/Constance'
import { Redirect } from 'react-router-dom'
import { IoIosPie } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import { Row, Col,Button } from "reactstrap";
import swal from "sweetalert";
class Pursue_Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            modal_valiable: null,
            graph_data: [],
            modal_data: [],
            plant: null,
            month: null,
            percent: [],
            image: null,
            chartData: null,
            TableChart: [],
            plan_id:null,
            product_id:null,
            Modalname: null,
            product_name: null,
            product_topic: null,
            nutrient: [],
            material: [],
        }
    }
    datamodal = (Modalname, product_name, product_topic, nutrient, material, plan_id,product_id) => {

        this.setState({
            chartData: [],
            plan_id:plan_id,
            product_id:product_id
        })
 
 
 
        this.setState({
            Modalname: Modalname,
            product_topic: product_topic,
            product_name: product_name,
            chartData:nutrient,
        
            material: material
            
            
        });
       
        
        

        setTimeout(() => { this.onOpenModal() }, 200)




    }
    Onsubmit = async (product_id,plan_id) => {
        const object = {
          product_id: product_id,
          plan_id:plan_id
        };
    
            try {
              post(object, "plan/se_send_plan_trader", user_token).then(res => {
                if (res.success) {
                  swal("ข้อมูลถูกส่งสำเร็จ!", {
                    icon: "success"
                  });
                  setTimeout(() => {
                    window.location.reload(true);
                  }, 1000);
                } else {
                  console.log(res.error_message);
                }
              });
            } catch (err) {
              console.log(object);
            }
      };


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

    get_result = async () => {

        try {
            await get('plan/get_all_plan', user_token).then((result) => {
                if (result.success) {
                    this.setState({ TableChart: result.result })
                    console.log("re",result.result);
                    
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
            element.plan.map((element1, i) => {
                let datanutrient = []
                let datapercent = []
                let dataplant_name = []
                let price_volume = []
                
                element1.nutrient.map((element2, ii) => {
                    datanutrient.push(
                        element2.nutrient
                    )
                    datapercent.push(
                        element2.percent
                    )
                })


 
                element1.material.map((element3, iii) => {
                    dataplant_name.push(
                        element3.plant_name
                    )
               
                    price_volume.push(
                        element3.price_volume
                    )
                     


                })


                dataTabel.push(
                    {
                    
                        // material_all:dataplant_name,datavolume,datavolume_type,
                        Product_name: element1.plan_name,
                        product_topic: element1.product_topic,
                        price_all :element1.price_all.toFixed(2),
                        volume:element1.volume,
                        volume_type:element1.volume_type,
                        nutrient: datanutrient.join(),
                        material: dataplant_name.join(),
                        price  : element1.price_obj.toFixed(2) ,
                        pic: <Button  outline color="success" style={{ width: 100 }} onClick={() => this.imagemodal("img", ip + element1.image)}><MdCameraAlt /></Button>,
                        // <img src={ip+element1.image} onClick={() => this.imagemodal("img",)} />,
                        btb: <Button outline
                        color="danger"
                        style={{ width: 100 }}
                            onClick={() => this.datamodal("topic",
                                element1.plan_name,
                                element1.product_topic,
                                element1.nutrient,
                                element1.material,
                                element1.plan_id,
                                element.product_id
                                )} className="default_button">
                            <IoIosPie></IoIosPie>
                            </Button>,
                        sent_trader: <Button outline
                        color="primary"
                        style={{ width: 100 }}
                        onClick={() => this.Onsubmit(element1.plan_id,
                            element.product_id)}>
                            <IoIosPie></IoIosPie>
                            </Button>
                    })

            })



        })
        this.setState({ dataTabel: dataTabel })
      
    }

    componentWillMount() {
        this.get_result()
        // this.loaddata()
    }
    render() {


        if ((user_token_decoded.id === null) || (user_token_decoded.type !== 4 && user_token_decoded.type !== 5)  ) {
            return <Redirect push to="/" />

        }
        else{}

        const data = this.state.dataTabel
        const columns = [{

            id: 'firstName',
            Header: 'ชื่อผลิตภัณฑ์',
            accessor: 'Product_name' // Custom value accessors!
        }, 
        {

            Header: 'ชื่อสูตร',
            accessor: 'product_topic'
        }, 
        {
            Header: "จำนวนที่สั่ง",
            accessor: "volume",
            filterable: false
        },
        {
            Header: "หน่วย",
            accessor: "volume_type",
            filterable: false
          },
          {
            Header:"ราคาต่อชิ้น (บาท)",
            accessor : "price",
            filterable: false 
          },
          {
            Header: "ราคาทั้งหมด (บาท)",
            accessor: "price_all",
            filterable: false
          },
        //  {
        //     Header: 'วัตถุดิบที่ใช้',
        //     accessor: 'material',

        // },
         {

            Header: 'รูปประกอบ',
            accessor: 'pic',
            filterable: false
        },
        {
            Header: 'รายละเอียดผลิตภัณฑ์',
            accessor: 'btb',
            filterable: false
        },
        // {
        //     Header: 'ส่งผลิตภัณฑให้ผู้ประกอบการ',
        //     accessor: 'sent_trader',
        //     filterable: false
        // }
        ]


        return (
            <div>
               <Col>
               <div style={{ marginTop: 30, width: '100%', height: 100, justifyContent: 'center',textAlign: 'center'}} >
                    <div className="table_yearround" style={{ width: '80' }}>
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

                        <Modal open={this.state.open} onClose={this.onCloseModal} >

                            {this.state.Modalname === "topic" ?
                                <div style={{ marginTop: 20 , textAlign: "center" }} >
                                    <Formula
                                      
                                        product_topic={this.state.product_topic}
                                        chartData={this.state.chartData}
                                        product_name={this.state.product_name}
                                        material={this.state.material}
                                        plan_id={this.state.plan_id}
                                        product_id={this.state.product_id}

                                    />
                                </div>
                                : this.state.Modalname === "img" ? 
                                <div style={{ textAlign: "center", marginTop: 20, width: 500 }}>
                                <Showimg image={this.state.image} />
                              </div> : null}

                        </Modal>
                    </div>
                </div>

               </Col>
            </div>
        )

    }
}
export default Pursue_Product