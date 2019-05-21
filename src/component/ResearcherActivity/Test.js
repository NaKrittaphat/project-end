import React, { Component } from 'react'
import ReactTable from 'react-table'
import { get, post } from '../../service/service';
import { user_token_decoded, user_token } from '../../static/Constance'

class Transport_chart extends Component {
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
                    Researcher_name: datauser.join()
                })

        })
        this.setState({ dataTabel: dataTabel })

    }
    componentWillMount() {
        // this.get_result()

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
                Header: 'สถาณที่',
                accessor: 'product_name' // String-based value accessors!
            },
            {
                Header: 'ค่าขนส่ง',
                accessor: 'factory',
                filterable: false
            },
            {
                Header: 'ค่าผลผลิต',
                accessor: 'btb',
                filterable: false
            },
            {
                Header: '',
                accessor: 'lk',
                filterable: false
            }
        ]
        const { open } = this.state;
        return (
            <div>
                <div style={{ fontSize: 30, textAlign: "center" }}> {this.props.nameSE}</div>

                < ReactTable style={{ borderStyle: 'solid', borderWidth: 1 }}
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    noDataText="ไม่พบข้อมูล!"
                    className="-striped -highlight"
                    filterable
                />



            </div>
        )

    }
}
export default Transport_chart