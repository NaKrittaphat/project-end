import React, { Component } from 'react'
import ReactTable from 'react-table'
import Modal from 'react-responsive-modal'
import { get, post } from '../../../service/service';
import Researcher from '../../../component/ModalComponent/ModalResearcherComponent'
import swal from 'sweetalert'
import {user_token_decoded,user_token} from '../../../static/Constance'

class Call_Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            TableChart: [],
            Modalname: null,
            nameproduct: null
        }
    }

    get_result = async () => {

        try {
            await get('product/get_all_product_researcher', user_token).then((result) => {
                if (result.success) {
                    this.setState({ TableChart: result.result })
                
                    this.datamap()
                    
                } else {
                    alert(result.error_message)
                }
            }).catch((err) => {

            });
        } catch (error) {
            console.log(error)
        }
    }

    swalmodal = () => {
        swal({
            title: "ยืนยันการส่งข้อมูล",
            text: "ข้อมูลจะถูกส่งไปยังฐานข้อมูล",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("ข้อมูลถูกส่งสำเร็จ!", {
                        icon: "success",
                    });
                } else {
                    swal("คำสั่งถูกยกเลิก!");
                }
            });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    Modal_name = (Modalname, nameproduct) => {
        this.setState({ Modalname: Modalname, nameproduct: nameproduct })
        this.onOpenModal()

    };

    datamap = () => {
        let dataTabel = []
        this.state.TableChart.map((element, index) => {
    
           
            let datauser = []
           
            element.researcher_name.map((element3, iii) => {
                datauser.push(
                    element3.name
                )
                 
            })
            dataTabel.push(
                {
                    product_name: (element.product_name),
                    // nutrient: datanutrient.join(),
                    // volume: [(element.volume) + (element.volume_type)],
                    Researcher_name:datauser.join()
                })

        })
        this.setState({ dataTabel: dataTabel })

    }
    componentWillMount() {
        this.get_result()
        // this.loaddata()
    }

    render() {
        // {product_name: "ดินเนอร์หรู", nutrient: "[{"nutrient":"ตับ"}]", volume: "1000", volume_type: "กิโลกรัม"}
        // const data = [{
        //     product_name: {product_name},
        //     nutrient:[{nutrient}],
        //     volume:[{volume}+{volume_type}],

        // }]
        const data = this.state.dataTabel

        const columns = [
            {
                Header: 'ชื่อผลิตภัณฑ์',
                accessor: 'product_name' // String-based value accessors!
            },
             {
                Header: 'ชื่อนักวิจัย',
                accessor: 'Researcher_name'
            }
        ]
        const { open } = this.state;
        return (
            <div>
                <div className="table_yearround" style={{ textAlign: 'center', width: '80' }}>
                    <div style={{ marginTop: 50, width: '100%', height: 100, justifyContent: 'center' }} >
                        <div style={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#0000' }} >
                            < ReactTable style={{ borderStyle: 'solid', borderWidth: 1 }}
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


                <Modal open={this.state.open} onClose={() => { this.onCloseModal() }} >
                    <div style={{ textAlign: 'center' }} >
                        {this.state.Modalname === "complete" ?
                            <div style={{ textAlign: 'center', marginTop: 20 }} >
                                <Researcher nameproduct={this.state.nameproduct}
                                 />
                            </div>
                            : this.state.Modalname === "" ?
                                <div style={{ textAlign: 'center' }} >
                                    <Researcher />
                                </div>
                                : null}

                    </div>
                </Modal>
            </div>
        )

    }
}
export default Call_Product