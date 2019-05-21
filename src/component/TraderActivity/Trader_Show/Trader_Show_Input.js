import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import Send from "../../ModalComponent/ModalSend";
import { get, ip } from "../../../service/service";
import { user_token_decoded, user_token } from "../../../static/Constance";
import { IoIosPie } from "react-icons/io";
import { Row, Col } from "reactstrap";

class Trader_Show_Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal_valiable: null,
      graph_data: [],
      modal_data: [],
      plant: null,
      month: null,
      Modalname: null,
      nameproduct: null,
      nutrient: null,
      volume: null,
      product_id: null
    };
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
  Modal_send = (Modalname, nameproduct, product_id) => {
    this.setState({
      Modalname: Modalname,
      nameproduct: nameproduct,
      product_id: product_id
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
      await get("product/trader_get_product", user_token)
        .then(result => {
          if (result.success) {
            this.setState({ TableChart: result.result });
            this.datamap();
          } else {
            alert(result.error_message);
          }
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
    }
  };

  datamap = () => {
    let dataTabel = [];

    this.state.TableChart.map((element, index) => {
      let status = null;
      if (element.product_status === 3) {
        status = <div style={{ color: "green" }}>พัฒนาผลิตภัณฑ์เสร็จสิ้น !</div>;
      } else if (element.product_status === 2) {
        status = <div style={{ color: "#99FF00" }}>กำลังตรวจสอบการวิจัยผลิตภัณฑ์ !</div>;
      } else if (element.product_status === 1) {
        status = <div style={{ color: "#993300" }}>กำลังทำการวิจัยผลิตภัณฑ์ !</div>;
      } else {
        status = <div style={{ color: "red" }}>กำลังส่งข้อมูล !</div>;
      }
      dataTabel.push({
        product_name: element.product_name,
        status: status
        // product_id: dataTabel1()
      });
    });
    this.setState({ dataTabel: dataTabel });
  };

  componentWillMount() {
    this.get_result();
  }

  render() {
    const data = this.state.dataTabel;

    const columns = [
      {
        //         Header: 'ลำดับ',
        //         accessor: 'number_product',
        //         filterable: false
        // },
        // {

        id: "firstName",
        Header: "ชื่อผลิตภัณฑ์",
        accessor: "product_name"
        //
      },
      {
        Header: "สถานะ",
        accessor: "status",
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
          <Modal
            open={this.state.open}
            onClose={() => {
              this.onCloseModal();
            }}
          >
            {//     this.state.Modalname === "saerch" ? <div style={{ textAlign: 'center', marginTop: 20, width: 500 }} >
            //     <Information
            //         // nameproduct={this.state.nameproduct}
            //         // nutrient={this.state.nutrient}
            //         // nutrient_value={this.state.volume}
            //     />
            // </div>
            //     :
            this.state.Modalname === "send" ? (
              <div style={{ textAlign: "center" }}>
                <Send
                // nameproduct={this.state.nameproduct}
                // idproduct={this.state.product_id}
                // onClose={() => { this.onCloseModal(); }}
                />
              </div>
            ) : null}
          </Modal>
        </Col>
      </div>
    );
  }
}
export default Trader_Show_Input;
