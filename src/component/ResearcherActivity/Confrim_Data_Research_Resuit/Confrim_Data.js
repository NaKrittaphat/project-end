import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import Confrim from "./Modal_Confrim"
import { get, post } from "../../../service/service";
import Researcher from "../../ModalComponent/ModalResearcherComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import { user_token_decoded, user_token } from "../../../static/Constance";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Modal_all_Formula from "../../ModalComponent/Modal_all_Formula";
import { Button, Col } from "reactstrap";

class Confrim_Data extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      TableChart: [],
      Modalname: null,
      nameproduct: null,
      product_id: null
    };
  }

  get_result = async () => {
    try {
      await get("product/get_researcher_product", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ TableChart: result.result });
            
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


  model_send = (Modalname, name, product_id) => {
    this.setState({
      Modalname: Modalname,
      nameproduct: name,
      product_id: product_id
    })
    this.onOpenModal()

  }
 
  End = ( product_id )=> {
    const object = {
      product_id: product_id
    };
 
    swal({
      title: "ลบข้อมูล",
      text: "ยืนยันการลบข้อมูล",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        try {
          post(object, "product/send_researcher_cancel"  , user_token).then(
            res => {
              if (res.success) {
                swal("ลบสำเร็จ!", {
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
        swal("คำสั่งถูกยกเลิก!");
      }
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };


  datamap = () => {
    let dataTabel = [];
    this.state.TableChart.map((element, index) => {
      let datanutrient = [];

      element.nutrient.map((ele, i) => {
        datanutrient.push(ele.nutrient);
      });
      dataTabel.push({
        product_name: element.product_name,
        nutrient: datanutrient.join(),
        //     Researcher_name: element.researcher_name.join(),
        volume: [element.volume + " " + element.volume_type],
        btb: <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 220,
          }}>
            <Button
              style={{ width: 100 }}
              outline
              color="success"
              onClick={() =>
                this.model_send("Confrim", element.product_name, element.product_id)
              }
              className="default_button"
            >
              <IoMdCheckmark />
            </Button>

            <Button
              outline
              color="danger"
              style={{ width: 100 }}
              onClick={() => this.End(element.product_id)}
              className="default_button"
            >
              <IoMdClose />
            </Button>
          </div>
        </div>

      });
    });
    this.setState({ dataTabel: dataTabel });
  };

  get_name = async () => {
    try {
      await get("graph/get_tab_chart", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ namechart: result.result });


            this.setlabel();
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
    this.get_result();
    this.get_name()
  }

  render() {
    if (user_token_decoded.id === null || user_token_decoded.type !== 1) {
      return <Redirect push to="/" />;
    }

    // {product_name: "ดินเนอร์หรู", nutrient: "[{"nutrient":"ตับ"}]", volume: "1000", volume_type: "กิโลกรัม"}
    // const data = [{
    //     product_name: {product_name},
    //     nutrient:[{nutrient}],
    //     volume:[{volume}+{volume_type}],

    // }]
    const data = this.state.dataTabel;

    const columns = [
      {
        Header: "ชื่อผลิตภัณฑ์",
        accessor: "product_name" // String-based value accessors!
      },
      {
        Header: "สารอาหารที่ต้องการ",
        accessor: "nutrient"
      },
      {
        Header: "จำนวนผลิตภัณฑ์",
        accessor: "volume",
        filterable: false
      },
      {
        Header: "ยืนยันการพัฒนา",
        accessor: "btb",
        filterable: false
      },

    ];
    const { open } = this.state;
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
              </div>
            </div>
          </div>

          <Modal
            open={this.state.open}
            onClose={() => {
              this.onCloseModal();
            }}
          >
            <div>
              {this.state.Modalname === "Confrim" ?
                <div style={{ marginTop: 20 }}>
                  <Confrim
                    nameproduct={this.state.nameproduct}
                    product_id={this.state.product_id}
                    onCloseModal={() => {
                      this.onCloseModal();
                    }}
                  />
                </div>
                : null}
            </div>
          </Modal>
        </Col>
      </div>
    );
  }
}
export default Confrim_Data;
