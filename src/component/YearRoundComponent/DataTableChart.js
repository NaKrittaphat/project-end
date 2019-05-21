import React, { Component } from "react";
import ReactTable from "react-table";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button,
  Progress 
} from "reactstrap";
import Modal from "react-responsive-modal";
import { ColorGraph } from "../../static/ColorGraph";
import ModalGraphComponent from "../ModalComponent/ModalGraphComponent";
import { post } from "../../service/service";
import "react-table/react-table.css";
import { user_token_decoded, user_token } from "../../static/Constance";

class TableChart extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      modal_valiable: null,
      graph_data: [],
      modal_data: [],
      plant: null,
      month: null,
      result_data:[]
    };
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };


  data_on_modal = async (plant,month,volume) => {
    let object = {
      plant: plant,
      month: month,
      volume: volume
    };
    // console.log("obj",object);
    
    try {
      await post(object, "se/get_se_chart_value", user_token)
        .then(result => {
          if (result.success) {
            this.setState({
              result_data:result.result,
              plant: plant,
              month: month,
              volume: volume
            });
            console.log("resr",this.state.result_data);
            
            
   
            
            this.onOpenModal();
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
   
    return (
      <div>
        <div style={{ marginTop: 10}}>
        <Row>
        
        <Card>
                <CardHeader body inverse style={{ backgroundColor: '#F0F8FF'}}>
                เดือน {this.props.result.month}
                 
                </CardHeader>
                <CardBody outline color="success" >
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                        <th>ชนิดของพืช</th>
                        <th>ปริมาณ (กิโลกรัม)</th>
                        <th>รายละเอียด</th>
                      </tr>
                    </thead>
                   
                    <tbody>
                      {this.props.result.plant
                        ? this.props.result.plant.map((element, index) => {
                            return (
                              <tr>
                                <td>{element.plant}</td>
                                <td>{element.volume}</td>
                                {/* <Progress animated  value={element.volume} style={{cursor:"pointer",marginTop:13 ,height:12}} onClick={() => {
                                      this.data_on_modal(
                                        element.plant,
                                        this.props.result.month,
                                        element.volume
                                      );
                                    }}/> */}
                                <td>
                                  <Badge
                                    style={{ cursor: "pointer", fontSize: 18 }}
                                    color="primary"
                                    accessor="click"
                                    onClick={() => {
                                      this.data_on_modal(
                                        element.plant,
                                        this.props.result.month,
                                        element.volume
                                      );
                                    }}
                                  >
                                    Click
                                  </Badge>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
         
        </Row>        
        </div>

        <div>
          <Modal
            open={this.state.open}
            onClose={() => {
              this.onCloseModal();
            }}
          >
            <div style={{ width: 500, height: 200, textAlign: "center" }}>
              <ModalGraphComponent
                volume={this.state.volume}
                plant={this.state.plant}
                month={this.state.month}
                result={this.state.result_data}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default TableChart;
