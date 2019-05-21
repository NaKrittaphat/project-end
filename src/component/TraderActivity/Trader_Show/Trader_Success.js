import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import { post, get, ip } from "../../../service/service";
import swal from "sweetalert";
import { ColorGraph } from "../../../static/ColorGraph";
import { user_token_decoded, user_token } from "../../../static/Constance";
import { IoIosPie, IoMdPaperPlane } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import Formula from "../Modal/Formula_Show";
import Showimg from "../../../component/ModalComponent/ModalImg";
import { Row, Col, Button } from "reactstrap";


class Trader_Success extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      modal_valiable: null,
      graph_data: [],
      modal_data: [],
      plant: null,
      month: null,
      nameproduct: null,
      volume: null,
      plan_id:null,
      product_id:null,
      Modalname: null,
      product_name: null,
      product_topic: null,
      nutrient: [],
      material: [],
    };
  }

  result_data = async () => {
    try {
      await get("plan/get_plan_confirm_trader", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ data_result: result.result });
        
            this.map_data();
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
    }
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  datamodal = (Modalname, product_name, product_topic, nutrient, material, plan_id,product_id) => {

    this.setState({
  
        plan_id:plan_id,
        product_id:product_id,
 
        Modalname: Modalname,
        product_topic: product_topic,
        product_name: product_name,
        chartData:nutrient,
        material: material
    });
 
    setTimeout(() => { this.onOpenModal() }, 200)
}

  imagemodal = (Modalname, image) => {
    this.setState({
      Modalname: Modalname,
      image: image
    });
    this.onOpenModal();
  };
  map_data = () => {
    const data = [];
    this.state.data_result.map((element, index) => {
      element.plan.map((ele, ) => {
        data.push(
          {
            plan_name: ele.plan_name,
            product_topic: ele.product_topic,
            photo: <Button outline color="primary" style={{ width: 100 }} 
            onClick={() => this.imagemodal("img", ip + ele.image)}><MdCameraAlt /></Button>,
            btb: <Button outline
              color="success"
              style={{ width: 100 }}
              onClick={() => this.datamodal("topic",
                ele.plan_name,
                ele.product_topic,
                ele.nutrient,
                ele.material,
                ele.plan_id,
                element.product_id
              )} >
              <IoIosPie></IoIosPie>
            </Button>,
            volume:ele.volume,
            volume_type:ele.volume_type,
            pirce: ele.total_price,
            some_price:ele.price_obj 
                })
      })
    });
    this.setState({ data: data });
  };

  componentWillMount() {
    this.result_data();
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: "ชื่อผลิตภัณฑ์",
        accessor: "plan_name"
      },
      {
        Header: "ชื่อสูตร",
        accessor: "product_topic"
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
        accessor : "some_price",
        filterable: false 
      },
      {
        Header: "ราคาทั้งหมด (บาท)",
        accessor: "pirce",
        filterable: false
      },
      {
        Header: "รูปภาพประกอบ",
        accessor: "photo",
        filterable: false
      },

      {
        Header: "กราฟสูตรผลิตภัณฑ์",
        accessor: "btb",
        filterable: false
      }
      
    
    ];
   
    let { nutrient, plant } = this.state;
    return (
      <div>
        <Col>
          <div
            className="table_yearround"
            style={{ textAlign: "center", width: "80" }}
          >
            <div
              style={{
                marginTop: 30,
                width: "100%",
                height: 100,
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#0000"
                }}
              >
                <ReactTable
                  style={{ borderStyle: "solid", borderWidth: 1 }}
                  data={data}
                  columns={columns}
                  defaultPageSize={10}
                  noDataText="ไม่พบข้อมูล!"
                  className="-striped -highlight"
                  filterable
                />
                <Modal
                  open={this.state.open}
                  onClose={() => {
                    this.onCloseModal();
                  }}
                  classNames="modal-nutrient"
                >
              
                  {this.state.Modalname === "img" ? (
                    <div style={{ textAlign: "center" }}>
                      <Showimg image={this.state.image} />
                    </div>
                  ) :  this.state.Modalname === "topic" ?
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
                  : null}
                </Modal>
              
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}
export default Trader_Success;
