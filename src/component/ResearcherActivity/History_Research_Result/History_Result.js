import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import { post, get, ip } from "../../../service/service";
import swal from "sweetalert";
import { MdRestaurant, MdContentPaste, MdBorderColor } from "react-icons/md";
import { user_token_decoded, user_token } from "../../../static/Constance";
import { IoIosTrash, IoMdPaperPlane } from "react-icons/io";
import { GoTrashcan, GoFile } from "react-icons/go/";
import Showimg from "../../../component/ModalComponent/ModalImg";

import {
  Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Table
} from 'reactstrap';

class History_Result extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      // modal_valiable: null,
      // graph_data: [],
      // modal_data: [],
      plant: [],
      // month: null,
      Modalname: null,
      // dataplan: null,
      // product_id: null,
      nutrient: [],
      data_result: []
    };
  }

  result_data = async () => {
    try {
      await get("plan/get_plan_history", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ data_result: result.result });

            this.map_data();
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

  modal_nutrient = (Modalname, nutrient) => {
    this.setState({
      Modalname: Modalname,
      nutrient: nutrient
    });
    this.onOpenModal();

  };

  modal_plant = (Modalname, plant) => {
    this.setState({
      Modalname: Modalname,
      plant: plant
    });
    this.onOpenModal();
 
  };


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


 
      data.push({
        product_name: element.product_name,
        product_topic: element.product_topic,
        nutrient_data: (
          <Button
            outline

            className="default_button"
            style={{ width: 100 }}
            onClick={() => this.modal_nutrient("nutrient", element.nutrient_precent)}
          >
            <MdRestaurant />
          </Button>
        ),
        raw_material: (
          <Button
            outline
            color="primary"
            style={{ width: 100 }}
            onClick={() => this.modal_plant("plant", element.plant )}
          >
            <GoFile />
          </Button>
        ),
        image: (
          <img
            src={ip + element.image}
            onClick={() => this.imagemodal("img", ip + element.image)}
          />
        ),
      });
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
        accessor: "product_name"
      },
      {
        Header: "ชื่อสูตร",
        accessor: "product_topic"
      },
      {
        Header: "สารอาหาร",
        accessor: "nutrient_data",
        filterable: false
      },
      {
        Header: "วัตถุดิบ",
        accessor: "raw_material",
        filterable: false
      },
      {
        Header: "รูปภาพ",
        accessor: "image",
        filterable: false
      },


    ];


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
                  ) : this.state.Modalname === "nutrient" ? (
                    <div

                    > <Col Col sm="12"  >
                        <Card>
                          <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30 }}>สารอาหารทั้งหมด</CardHeader>
                          <CardBody>
                            <Table hover>
                              <thead>
                                <tr>
                                  <th>ลำดับ</th>
                                  {/* <th>ชื่อ SE</th> */}
                                  <th>ชื่อสารอาหาร</th>
                                  <th>ปริมาณ(%)</th>


                                </tr>
                              </thead>
                              {this.state.nutrient.map((element, index) => {
                                return (
                                  <tbody>
                                    <tr>
                                      <th scope="row"> {index + 1}</th>

                                      <td  >

                                        {element.nutrient}
                                      </td>
                                      <td  >

                                        {element.percent}
                                      </td>


                                    </tr>
                                  </tbody>
                                )
                              })

                              }
                            </Table>
                          </CardBody>

                        </Card>
                      </Col>

                    </div>
                  ) : this.state.Modalname === "plant" ?
                        <div   >
                          <Col Col sm="12"  >
                            <Card>
                              <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30 }}> วัตถุดิบทั้งหมด</CardHeader>
                              <CardBody>
                                <Table hover>
                                  <thead>
                                    <tr>
                                      <th>ลำดับ</th>
                                      {/* <th>ชื่อ SE</th> */}
                                      <th>ชื่อวัตถุดิบ </th>
                                      <th>ปริมาณ </th>
                                      <th>หน่วย </th>

                                    </tr>
                                  </thead>
                                  {this.state.plant.map((element, index) => {
                                    return (
                                      <tbody>
                                        <tr>
                                          <th scope="row"> {index + 1}</th>

                                          <td  >

                                            {element.plant_name}
                                          </td>
                                          <td  >

                                            {element.volume}
                                          </td>
                                          <td  >

                                            {element.volume_type}
                                          </td>


                                        </tr>
                                      </tbody>
                                    )
                                  })

                                  }
                                </Table>
                              </CardBody>

                            </Card>
                          </Col>
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
export default History_Result;
