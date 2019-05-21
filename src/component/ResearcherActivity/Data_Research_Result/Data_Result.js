import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import { post, get, ip } from "../../../service/service";
import swal from "sweetalert";
import { MdRestaurant, MdContentPaste, MdBorderColor } from "react-icons/md";
import { user_token_decoded, user_token } from "../../../static/Constance";
import Edit from "../../../component/ResearcherActivity/Modal_Edit_Order";
import { IoIosTrash, IoMdPaperPlane } from "react-icons/io";
import { GoTrashcan, GoFile } from "react-icons/go/";
import Showimg from "../../../component/ModalComponent/ModalImg";
import {
  Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Table
} from 'reactstrap';
import { FaFileTextO } from "react-icons/fa/";

class Data_Result extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
 
      Modalname: null,
   
      data_result: []
    };
  }

  result_data = async () => {
    try {
      await get("plan/get_plan_researchar", user_token)
        .then(result => {
          if (result.success) {
            // let  data_result = this.state.data_result
            this.setState({ data_result: result.result });
         
            this.map_data();
            // console.log("data_result",this.state.data_result)
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

  modal_plant = (Modalname, plant) => {
    this.setState({
      Modalname: Modalname,
      plant: plant
    });
    this.onOpenModal();
 
  };

  modal_nutrient = (Modalname, nutrient) => {
    this.setState({
      Modalname: Modalname,
      nutrient: nutrient
    });
    this.onOpenModal();

  };

  // plant_modal = (plant_modal,plant) =>{
  //   this.setState({
  //     plant_modal:plant_modal,
  //     plant:plant
  //   })
  // this.onOpenModal()
  // }

  Modal_Delete = async plan_id => {
    const object = {
      plan_id: plan_id
    };
    console.log("object", object);
    swal({
      title: "ลบข้อมูล",
      text: "ยืนยันการลบข้อมูล",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        try {
          post(object, "plan/researcher_delete_product_plan", user_token).then(
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

  Modal_send = async (plan_id, product_id) => {
    const object = {
      plan_id: plan_id,
      product_id: product_id
    };
    console.log("object", object);
    swal({
      title: "ส่งข้อมูลไปยัง SE กลาง",
      text: "ยืนยันการส่งข้อมูล",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        try {
          post(object, "plan/send_plan_se", user_token).then(res => {
            if (res.success) {
              swal("ส่งสำเร็จ!", {
                icon: "success"
              });
              setTimeout(window.location.reload(true), 5000);
            } else {
              console.log(res.error_message);
            }
          });
        } catch (err) {
          console.log(object);
        }
      } else {
        swal("คำสั่งถูกยกเลิก!");
      }
    });
  };

  _onEditData = (
    Modalname,
    nameproduct,
    product_id,
    edit_nutrient,
    edit_plant,
    product_topic,
    image
  ) => {
    this.setState({
      Modalname: Modalname,
      nameproduct: nameproduct,
      product_id: product_id,
      edit_nutrient: edit_nutrient,
      edit_plant: edit_plant,
      product_topic : product_topic,
      image : image
    });
  
   setTimeout(()=>{this.onOpenModal() },100)
    
  };

  // }

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
      let nutrient = [];
      let plant = [];

      element.nutrient_precent.map((ele, i) => {
        nutrient.push(
          <div>
            ชื่อสารอหาร : {ele.nutrient} ให้สารอาหาร {ele.percent} %{" "}
          </div>
        );
        // this.setState({nutrient:nutrient})
      });

      element.plant.map((el, i) => {
        plant.push(
          <div>
            ชื่อวัตถุดิบ : {el.plant_name} จำนวน {el.volume} {el.volume_type}
          </div>
        );
      });

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
            onClick={() => this.modal_plant("plant",  element.plant)}
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
        edit_data: (
          <Button
            outline
            color="warning"
            style={{ width: 100 }}
            onClick={() =>
              this._onEditData("edit", element.product_name,
               element.plan_id, 
               element.nutrient_precent,
               element.plant,
                element.product_topic,
                 element.image
              )
            }
          >
            <MdBorderColor />
          </Button>
        ),
        delete_data: (
          <Button
            outline
            color="danger"
            style={{ width: 100 }}
            onClick={() => this.Modal_Delete(element.plan_id)}
          >
            <GoTrashcan />
          </Button>
        ),
        send_data: (
          <Button
            outline
            color="success"
            style={{ width: 100 }}
            onClick={() => this.Modal_send(element.plan_id, element.product_id)}
          >
            <IoMdPaperPlane />
          </Button>
        )
      });
    });
    this.setState({ data: data });
  };
  
  get_name = async () => {
    try {
      await get("graph/get_tab_chart", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ namechart: result.result });
 
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
    }
  }; 

  componentWillMount() {
    this.result_data();
    this.get_name()
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
      {
        Header: "แก้ไขข้อมูล",
        accessor: "edit_data",
        filterable: false
      },
      {
        Header: "ลบข้อมูล",
        accessor: "delete_data",
        filterable: false
      },
      {
        Header: "ส่งข้อมูล",
        accessor: "send_data",
        filterable: false
      }
    ];
    // const { open } = this.state;
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
                  ) : this.state.Modalname === "nutrient" ? (
                    <div
                       
                    >
                     <Col Col sm="12"  >
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

                        <div  >
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
                        : this.state.Modalname === "edit" ?
                          <div style={{marginTop: 20 }}>
                            <Edit 
 
                            edit_nutrient = {this.state.edit_nutrient} 
                            edit_plant = {this.state.edit_plant}  
                            nameproduct = {this.state.nameproduct}
                            product_id = {this.state.product_id} 
                            product_topic = {this.state.product_topic}
                            image = {this.state.image}
                            namematerial = {this.state.namechart}
                            onClose={() => { this.onCloseModal(); }}
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
export default Data_Result;
