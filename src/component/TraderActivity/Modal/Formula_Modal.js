import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import ReactHighcharts from "react-highcharts";
import SolidGauge from "highcharts/modules/solid-gauge";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import { IoMdArchive } from "react-icons/io";
import swal from "sweetalert";
 
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
  Button
} from "reactstrap";
import { get, post, ip } from "../../../service/service";
import { user_token_decoded, user_token } from "../../../static/Constance";
SolidGauge(ReactHighcharts.Highcharts);

class Formula_Modal extends Component {
  constructor() {
    super();
    this.state = {
      chartData: null,
      show_graph: false
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right"
  };
 
  Onsubmit = async (plan_id, product_id) => {
    const object = {
      plan_id: plan_id,
      product_id: product_id
    };
    console.log("object", object);
    swal({
      title: "เลือกผลิตภัณฑ์นี้",
      text: "ยืนยันการส่งข้อมูล",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        try {
          post(object, "plan/send_plan_confirm", user_token).then(res => {
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
  componentWillMount() {
     
    setTimeout(() => {
      this.setState({ show_graph: true });
    }, 1000);
  }
  render() {
    const options = {
      colors: [
        "#7cb5ec",
        "#90ed7d",
        "#f15c80",
        "#f7a35c",
        "#434348",
        "#8085e9",
        "#e4d354",
        "#2b908f",
        "#f45b5b",
        "#91e8e1"
      ],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "Kunlasatri"
        }
      },
      title: {
        text: " ",
        style: {
          fontSize: 30
        }
      },

      dataLabels: {
        style: {
          fontSize: 18
        }
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          connectorColor: "silver",
          dataLabels: {
            enabled: true
            // style:{
            //     fontSize:30
            // }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:18px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0; font-size:18px">  {series.name} : </td>' +
          '<td style="padding:0; font-size:18px"><b>  {point.y} % </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
        style: {
          fontSize: 15
        }
      },

      credits: {
        enabled: false
      },
      //   series: this.data_piechart(this.props.result)
      series: [
        {
          dataLabels: {
            style: {
              fontSize: 18
            }
          },
          name: "ปริมาณ",
          colorByPoint: true,
          data: this.props.chartData
        
        }
      ]
    };
    
    const data = this.props.material;
    const columns = [
      {
        Header: "วัตถุดิบที่ใช้",
        accessor: "plant_name" // Custom value accessors!
      } ,
      {
        Header: "จำนวน",
        accessor: "volume"
      },
     
      {
        Header: "หน่วย",
        accessor: "volume_type"
      },
      {
        Header: "ราคาเฉลี่ย(บาท/กก.)",
        accessor: "price_kg"
      },
      {
        Header: "ราคาเฉลี่ยรวม ",
        accessor: "price_volume"
      }
    ];

    return (
      <div style={{ width: "100%" }}>
      <Col >
      <Card>
         <CardHeader body inverse style={{  textAlign: 'center', fontSize: 24 }}> 
         ชื่อผลิตภัณฑ์ {this.props.product_name} สูตรที่ : {this.props.product_topic}</CardHeader>
       </Card>
        <br/>
        <div className="chart" style={{ width: 500, textAlign: "center" }}>
          {this.state.show_graph ? (
            <Col>
            <ReactHighcharts config={options} />
          </Col>
          ) : (
            <div
              style={{ textAlign: "center", height: 170, marginLeft: "45%" }}
            >
              <div style={{ marginTop: 80 }}>
                <ReactLoading type="spin" color="#fffff" />
              </div>
            </div>
          )}
        </div>
        <br/>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#0000",
            marginTop: 10
          }}
        >
          <ReactTable
            style={{ borderStyle: "solid", borderWidth: 1 }}
            data={data}
            columns={columns}
            defaultPageSize={5}
            noDataText="Oh Noes!"
            className="-striped -highlight"
            responsive
            size="sm"
          />
        </div>
        <div style={{ fontSize: 32, textAlign: "center" }}>
            <Button
              style={{  width: 150 }}
              onClick={() => this.Onsubmit(this.props.plan_id,this.props.product_id )}
              outline color="success"

            >
          
              เลือกสูตรผลิตภัณฑ์นี้
            </Button>
          </div>
      </Col>
      </div>
    );
  }
}
export default Formula_Modal;
