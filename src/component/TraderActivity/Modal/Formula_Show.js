import React, { Component } from "react";
import {
  Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Table
} from 'reactstrap';
import ReactHighcharts from "react-highcharts";
import SolidGauge from "highcharts/modules/solid-gauge";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import { IoMdArchive } from "react-icons/io";
import swal from "sweetalert";
 
import { get, post, ip } from "../../../service/service";
import { user_token_decoded, user_token } from "../../../static/Constance";
SolidGauge(ReactHighcharts.Highcharts);

class Formula_Show extends Component {
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
 
  componentWillMount() {
    // alert(1)
    this.setState({ chartData: { ...this.props.chartData } });
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
        
      </Col>
      </div>
    );
  }
}
export default Formula_Show;
