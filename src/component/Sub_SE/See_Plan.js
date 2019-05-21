import React, { Component } from 'react'
import { get, post } from '../../service/service';
import { user_token_decoded, user_token } from '../../static/Constance'
import {
    Button, Form, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardBody, Table
} from 'reactstrap';



class Send_to_SE extends Component {
    constructor() {
        super()
        this.state = {
            get_data:[]
        }
    }

    get_data = async () => {
        try {
            await get("send_analytics/get_plan_se", user_token)
                .then(result => {
                    if (result.success) {
                        this.setState({ get_data: result.result });
                        

                        this.test()
                    } else {
                        alert(result.error_message);
                    }
                })
                .catch(err => { });
        } catch (error) {
            console.log(error);
        }
    };

    componentWillMount(){
        this.get_data()
    }

    render() {


        return (
            <div style={{ marginTop: 30 }}>
             {/* <div style={{ textAlign: "center", fontSize: 30, marginBottom: 20 }}>
                    แผนการเพาะปลูก
        </div> */}

                <Col  sm="12" md={{ size: 10, offset: 1 }}>
                    <Card>
                      
                        <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center', fontSize: 30 }}>แผนการเพาะปลูก</CardHeader>
                        <CardBody>
                            <Table responsive size="sm" >
                                <thead>
                                    <tr>
                                        <th>ชนิดพืชที่ควรปลูก</th>
                                        <th>ปริมาณ</th>
                                        <th>หน่วย</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.get_data.map((element)=>{
                                       return(
                                        <tr style={{backgroundColor:element.status_reading? "transparent":'#FF0000'}}>
                                        <td>{element.plant}</td>
                                        <td>{element.volume}</td>
                                        <td>{element.volume_type}</td>
                                    </tr>
                                       )
                                    })}
                                    
                                </tbody>
                            </Table>
                        </CardBody>

                    </Card>
                </Col>
             


            </div>
        )
    }
}
export default Send_to_SE