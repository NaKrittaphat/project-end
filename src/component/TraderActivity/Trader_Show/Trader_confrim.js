import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import { ColorGraph } from "../../../static/ColorGraph";
import Formula from "../Modal/Formula_Modal";
import Showimg from "../../ModalComponent/ModalImg";
import { get, ip } from "../../../service/service";
import { user_token_decoded, user_token } from "../../../static/Constance";
import { IoIosPie } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import { Button, Row, Col } from "reactstrap";

class TraderActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal_valiable: null,
      graph_data: [],
      modal_data: [],
      plant: null,
      month: null,
      nameproduct: null,
      volume: null,
      plan_id: null,
      product_id: null,
      Modalname: null,
      product_name: null,
      product_topic: null,
      nutrient: [],
      material: [],
    };
  }


  datamodal = (Modalname, product_name, product_topic, nutrient, material, plan_id, product_id) => {

    this.setState({

      plan_id: plan_id,
      product_id: product_id,
      Modalname: Modalname,
      product_topic: product_topic,
      product_name: product_name,
      chartData: nutrient,
      material: material
    });

    setTimeout(() => { this.onOpenModal() }, 200)
  }

  Modal_name = (Modalname, nameproduct, nutrient, volume) => {
    this.setState({
      Modalname: Modalname,
      nameproduct: nameproduct,
      nutrient: nutrient,
      volume: volume
    });
    this.onOpenModal();
  };

  // Modal_send = (Modalname, nameproduct, product_id) => {
  //   this.setState({
  //     Modalname: Modalname,
  //     nameproduct: nameproduct,
  //     product_id: product_id
  //   });
  //   this.onOpenModal();
  // };

  imagemodal = (Modalname, image) => {
    this.setState({
      Modalname: Modalname,
      image: image
    });
    this.onOpenModal();
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  get_result = async () => {
    try {
      await get("plan/trader_get_plan", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ TableChart: result.result });
            console.log("reeee", this.state.TableChart);

            this.datamap();
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => { });
    } catch (error) {
      console.log(error);
    }
  };

  datamap = () => {
    let dataTabel = [];
    this.state.TableChart.map((element, index) => {
      element.plan.map((ele, ) => {
        dataTabel.push(
          {
            plan_name: ele.plan_name,
            product_topic: ele.product_topic,
            photo: <Button outline color="primary" style={{ width: 100 }} onClick={() => this.imagemodal("img", ip + ele.image)}><MdCameraAlt /></Button>,
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
            volume: ele.price_obj,
            some_volume: ele.volume,
            volume_type: ele.volume_type,
            price_all: ele.price_all
          })
      })
    })
    this.setState({ dataTabel: dataTabel })
  }

  componentWillMount() {
    this.get_result();
  }

  render() {
    const data = this.state.dataTabel;

    const columns = [
      {
        id: "firstName",
        Header: "ชื่อผลิตภัณฑ์",
        accessor: "plan_name"
        //
      },
      {
        Header: "ชื่อสูตร",
        accessor: "product_topic",

      },
      {
        Header: "จำนวนที่สั่ง",
        accessor: "some_volume",
        filterable: false
      },
      {
        Header: "หน่วย",
        accessor: "volume_type",
        filterable: false
      },
      {
        Header: "ราคาต่อชิ้น (บาท)",
        accessor: "volume",
        filterable: false
      },
      {
        Header: "ราคาทั้งหมด (บาท)",
        accessor: "price_all",
        filterable: false
      }
      , {
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

    return (
      <div>
        <Col>
          <div
            style={{
              marginTop: 30,
              width: "100%",
              height: 100,
              justifyContent: "center"
            }}
          >
            <div
              className="table_yearround"
              style={{ textAlign: "center", width: "80" }}
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
                // pivotBy={["firstName"]}
                />
              </div>
            </div>
          </div>
          <Modal open={this.state.open} onClose={() => { this.onCloseModal() }}>

            {this.state.Modalname === "topic" ?
              <div style={{ marginTop: 20, textAlign: "center" }} >
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
        </Col>
      </div>
    );
  }
}
export default TraderActivity;
