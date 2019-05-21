import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import { get, post } from "../../../service/service";
import Researcher from "../../ModalComponent/ModalResearcherComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import { user_token_decoded, user_token } from "../../../static/Constance";
import { IoIosPaper, IoMdClipboard, IoIosCheckboxOutline } from "react-icons/io";
import Modal_all_Formula from "../../ModalComponent/Modal_all_Formula";
import { Button, Col } from "reactstrap";

class Add_Result extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      TableChart: [],
      Modalname: null,
      nameproduct: null,
      product_id: null,
      time_id:null
    };
  }

  get_result = async () => {
    try {
      await get("product/get_researcher_confirm", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ TableChart: result.result });
console.log("st",this.state.TableChart);

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


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  Modal_name = (Modalname, nameproduct, product_id) => {
    this.setState({
      Modalname: Modalname,
      nameproduct: nameproduct,
      product_id: product_id
    });
    this.onOpenModal();
  };

  Model_show = (Modalname, product_id,time_id) => {
    this.setState({ Modalname: Modalname, product_id: product_id,time_id:time_id });


    this.model_send(product_id,time_id);
  };

  model_send = async (product_id,time_id) => {
    const object = {
      product_id: product_id,
      time_id:time_id
    };
    console.log('object', object)
    swal({
      title: "ยืนยันการส่งข้อมูล",
      text: "ข้อมูลจะถูกส่งไปยังฐานข้อมูล",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {


        post(object, "product/send_researcher_plan_end", user_token).then(
          res => {
            if (res.success) {
              swal("ข้อมูลถูกส่งสำเร็จ!", {
                icon: "success"
              });
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              console.log(res.error_message);
            }
          }
        );


      } else {
        swal("คำสั่งถูกยกเลิก!");
      }
    });

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
        date: <div> <div style={{ fontSize: 18, color: "green" }}>
          วันที่เริ่มต้น :{element.time.map((element, index) => {
          return (
            
              <a >
                 {element.begin}  </a> 
          )
        }) 
        } 
          </div>
          <div style={{ fontSize: 18, color: "red" }}> วันที่สิ้นสุด :{element.time.map((element, index) => {
          return (
        
            
              <a >
               {element.end}
              </a>
         
          )
        }) 
        } </div>
        
        </div>,
        volume: [element.volume + " " + element.volume_type],
        btb: (
          <Button
            style={{ width: 100 }}
            outline

            onClick={() =>
              this.Modal_name(
                "complete",
                element.product_name,
                element.product_id
              )
            }
            className="default_button"
          >
            <IoMdClipboard />
          </Button>
        ),

        confrim: <Button
          outline
          color="primary"
          style={{ width: 100 }}
          onClick={() => this.Model_show("all_Formula", element.product_id,element.time_id)}
          className="default_button"
        >
          <IoIosCheckboxOutline />
        </Button>
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
        Header: "ระยะเวลาการพัฒนา ",
        accessor: "date",
        filterable: false
      },
      {
        Header: "กรอกข้อมูล",
        accessor: "btb",
        filterable: false
      },
      // {
      //   Header: "ข้อมูลผลิตภัณฑ์",
      //   accessor: "btb1",
      //   filterable: false
      // },
      {
        Header: "พัฒนาเสร็จสิ้น",
        accessor: "confrim",
        filterable: false
      }
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
              {this.state.Modalname === "complete" ? (
                <div style={{ marginTop: 20 }}>
                  <Researcher
                    nameproduct={this.state.nameproduct}
                    product_id={this.state.product_id}
                    namematerial={this.state.namechart}
                    onCloseModal={() => {
                      this.onCloseModal();
                    }}
                  />
                </div>
              ) : this.state.Modalname === "all_Formula" ? (
                <div style={{ marginTop: 30 }}>
                  <Modal_all_Formula Tablesend={this.state.Tablesend} />
                </div>
              ) : null}
            </div>
          </Modal>
        </Col>
      </div>
    );
  }
}
export default Add_Result;
