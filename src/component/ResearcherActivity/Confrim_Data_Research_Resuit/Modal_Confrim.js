import React, { Component } from "react";
import { post, get } from "../../../service/service";
import swal from "sweetalert";
import { GoTrashcan } from "react-icons/go/";

import { user_token_decoded, user_token } from "../../../../src/static/Constance";
import {
    Input,
    Row,
    Col,
    Button,
    Container,
    Table,
    Form,
    FormGroup,
    Label,
    CustomInput,
    Card,
    CardBody,
    CardHeader
} from "reactstrap";


const datadate = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31

]

class Modal_Confrim extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            product_name: null,
            nutrient: null,
            nutrient_array: [],
            nutrient_array_add: [],
            getfarmerid: [],
            material: null,
            material_array: [],
            material_array_add: [],
            FileReader: null,
            product_topic: null
        };
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    adddate=() =>{

        let begin = []
        let end = []
        begin.push(
            
            this.state.daybigin +" "+  this.state.montnbigin +" "+  this.state.yearbigin 
          
        )
        end.push(
         
           this.state.dayend +" "+  this.state.montnend+" "+  this.state.yearend 
      
        )
        this.setState({begin : begin,
            end : end
        })
        swal({
            title: "ยืนยัน ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
          }).then(willDelete => {
            if (willDelete) {
                this.Onsubmit()
            } else {
              // swal("ลบข้อมูลไม่สำเร็จ !");
            }
          });

   
        
    }

    Onsubmit = async () => {
        const { begin,end, } = this.state;
 
        const object = {
            begin: begin,
            end: end,
            product_id : this.props.product_id
        };
    
      
        if ( object) {
            try {
                await post(object, "product/send_researcher_confirm", user_token).then(
                    res => {
                        console.log(res);
                        if (res.success) {
                            // alert("ส่งข้อมูลสำเร็จ")
                            swal("ส่งข้อมูลสำเร็จ");
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        } else {
                            swal("กรุณากรอกข้อมูลให้ครบถ้วน");
                            console.log(res.error_message);
                        }
                    }
                );
            } catch (err) {
                console.log(object);
            }
        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    };
    
    select = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    };

     
    componentWillMount() {
 this.setState({daybigin : 1,
    dayend : 1,
    montnbigin  :  "มกราคม",
    montnend :  "มกราคม",
    yearbigin : 2561 ,
    yearend : 2561
})
 }
    render() {
        return (


            <div style={{width: 500}}>
                <div style={{ fontSize: 30, textAlign: "center" }}>พัฒนาผลิตภัณฑ์</div>
                <div style={{ fontSize: 25, textAlign: "center" }}>
                    ชื่อผลิตภัณฑ์ : {this.props.nameproduct}
                </div>
                <br />
                <Container>
                    <Row>
                        <Col  >

                            <Row>

                                <Col sm="12">
                                <CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' ,color : "green" }}>วันที่เริ่มต้นการพัฒนา</CardHeader>
                                    <Card body>
                                        <Row >
                                            <Col sm="4" style={{ textAlign: 'center' }}>
                                                <Label for="nutrient">วันที </Label>
                                            </Col>
                                            <Col sm="4">
                                                <Label for="percent">เดือน</Label>
                                            </Col>

                                            <Label for="click_delete">ปี</Label>

                                        </Row>

                                        <tr>
                                            <td>
                                                <Col  >
                                                    <FormGroup>
                                                      
                                                                 <Input
                                                            value = {this.state.daybigin}
                                                            name={"daybigin"}
                                                            type="select"
                                                            id="daybigin"
                                                            onChange={event => {
                                                              this.select(
                                                                event 
                                                              );
                                                            }}
                                                            label=""
                                                            style={{ fontSize: 20 }}
                                                            
                                                         >  
                                                        
                                                         {datadate.map((element,index)=>{
                                                            return(
                                                        <option  > {index+1}</option>
                                                        )
                                                         })}
                                                      </Input>

                                                     
                                                       
                                                    </FormGroup>
                                                </Col>
                                            </td>
                                            <td>
                                                <Col >
                                                    <FormGroup>
                                                  
                                                               {this.state.daybigin <=29 ?  
                                                                <Input
                                                                value = {this.state.montnbigin}
                                                                name={"montnbigin"}
                                                                type="select"
                                                                id="montnbigin"
                                                                onChange={event => {
                                                                  this.select(
                                                                    event 
                                                                  );
                                                                }}
                                                                label=""
                                                                style={{ fontSize: 20 }}
                                                             >  
                                                               <option  > มกราคม  </option>
                                                              <option  > กุมภาพันธ์  </option>
                                                              <option  > มีนาคม  </option>
                                                              <option  > เมษายน  </option>
                                                              <option  > พฤษภาคม  </option>
                                                              <option  > มิถุนายน  </option>
                                                              <option  > กรกฎาคม  </option>
                                                              <option  > สิงหาคม  </option>
                                                              <option  > กันยายน  </option>
                                                              <option  > ตุลาคม  </option>
                                                              <option  > พฤศจิกายน  </option>
                                                              <option  > ธันวาคม  </option>    </Input> :
                                                              
                                                              this.state.daybigin <=30 ?
                                                              <Input
                                                                value = {this.state.montnbigin}
                                                                name={"montnbigin"}
                                                                type="select"
                                                                id="montnbigin"
                                                                onChange={event => {
                                                                  this.select(
                                                                    event 
                                                                  );
                                                                }}
                                                                label=""
                                                                style={{ fontSize: 20 }}
                                                             >   
                                                              <option  > มกราคม  </option>
                                                       
                                                              <option  > มีนาคม  </option>
                                                              <option  > เมษายน  </option>
                                                              <option  > พฤษภาคม  </option>
                                                              <option  > มิถุนายน  </option>
                                                              <option  > กรกฎาคม  </option>
                                                              <option  > สิงหาคม  </option>
                                                              <option  > กันยายน  </option>
                                                              <option  > ตุลาคม  </option>
                                                              <option  > พฤศจิกายน  </option>
                                                              <option  > ธันวาคม  </option>  

                                                              
                                                              </Input> 
                                                               
                                                               :
                                                               this.state.daybigin <=31?
                                                               <Input
                                                                 value = {this.state.montnbigin}
                                                                 name={"montnbigin"}
                                                                 type="select"
                                                                 id="montnbigin"
                                                                 onChange={event => {
                                                                   this.select(
                                                                     event 
                                                                   );
                                                                 }}
                                                                 label=""
                                                                 style={{ fontSize: 20 }}
                                                              >   
                                                              

                                                                <option  > มกราคม  </option>
                                                       
                                                              <option  > มีนาคม  </option>
                                                           
                                                              <option  > พฤษภาคม  </option>
                                                         
                                                              <option  > กรกฎาคม  </option>
                                                              <option  > สิงหาคม  </option>
                                                          
                                                              <option  > ตุลาคม  </option>
                                                          
                                                              <option  > ธันวาคม  </option>  
                                                               </Input> 
                                                                
                                                                :
                                                                null } 
                                                       
                                                        
                                                   
                                                    </FormGroup>
                                                </Col>
                                                <Row>
                                                </Row>
                                            </td>
                                            <td>
                                                <Col  >
                                                    <FormGroup>
                                                      
                                                                 <Input
                                                            value = {this.state.yearbigin}
                                                            name={"yearbigin"}
                                                            type="select"
                                                            id="yearbigin"
                                                            onChange={event => {
                                                              this.select(
                                                                event 
                                                              );
                                                            }}
                                                            label=""
                                                            style={{ fontSize: 20 }}
                                                            
                                                         >  
                                                        
                                                        
                                                        <option  > 2561 </option>
                                                        <option  > 2562 </option>
                                                        <option  > 2563 </option>
                                                        <option  > 2564 </option>
                                                        <option  > 2565 </option>
                                                        <option  > 2566 </option>
                                                        <option  > 2567 </option>
                                                        <option  > 2568 </option>
                                                        <option  > 2569 </option>
                                                        <option  > 2570 </option>
                                                      
                                                      </Input>

                                                     
                                                       
                                                    </FormGroup>
                                                </Col>
                                            </td>
                                        </tr>
                                    
                    </Card>
                                    <br />
                                </Col>


                            </Row>


                          <Row>

<Col sm="12">
 
 
<CardHeader body inverse style={{ backgroundColor: '#F0F8FF', textAlign: 'center' ,color : "red" }}>วันที่สิ้นสุดการพัฒนา</CardHeader>
    
    <Card body>
        <Row >
            
            <Col sm="4" style={{ textAlign: 'center' }}>
                <Label for="nutrient">วันที </Label>
            </Col>
            <Col sm="4">
                <Label for="percent">เดือน</Label>
            </Col>

            <Label for="click_delete">ปี</Label>

        </Row>

        <tr>
            <td>
                <Col  >
                    <FormGroup>
                      
                                 <Input
                            value = {this.state.dayend}
                            name={"dayend"}
                            type="select"
                            id="dayend"
                            onChange={event => {
                              this.select(
                                event 
                              );
                            }}
                            label=""
                            style={{ fontSize: 20 }}
                            
                         >  
                        
                         {datadate.map((element,index)=>{
                            return(
                        <option  > {index+1}</option>
                        )
                         })}
                      </Input>

                     
                       
                    </FormGroup>
                </Col>
            </td>
            <td>
                <Col >
                    <FormGroup>
                  
                               {this.state.dayend<=29 ?  
                                <Input
                                value = {this.state.montnend}
                                name={"montnend"}
                                type="select"
                                id="montnend"
                                onChange={event => {
                                  this.select(
                                    event 
                                  );
                                }}
                                label=""
                                style={{ fontSize: 20 }}
                             >  
                               <option  > มกราคม  </option>
                              <option  > กุมภาพันธ์  </option>
                              <option  > มีนาคม  </option>
                              <option  > เมษายน  </option>
                              <option  > พฤษภาคม  </option>
                              <option  > มิถุนายน  </option>
                              <option  > กรกฎาคม  </option>
                              <option  > สิงหาคม  </option>
                              <option  > กันยายน  </option>
                              <option  > ตุลาคม  </option>
                              <option  > พฤศจิกายน  </option>
                              <option  > ธันวาคม  </option>    </Input> :
                              
                              this.state.dayend <=30 ?
                              <Input
                                value = {this.state.montnend}
                                name={"montnend"}
                                type="select"
                                id="montnend"
                                onChange={event => {
                                  this.select(
                                    event 
                                  );
                                }}
                                label=""
                                style={{ fontSize: 20 }}
                             >   
                              <option  > มกราคม  </option>
                       
                              <option  > มีนาคม  </option>
                              <option  > เมษายน  </option>
                              <option  > พฤษภาคม  </option>
                              <option  > มิถุนายน  </option>
                              <option  > กรกฎาคม  </option>
                              <option  > สิงหาคม  </option>
                              <option  > กันยายน  </option>
                              <option  > ตุลาคม  </option>
                              <option  > พฤศจิกายน  </option>
                              <option  > ธันวาคม  </option>  

                              
                              </Input> 
                               
                               :
                               this.state.dayend <=31?
                               <Input
                                 value = {this.state.montnend}
                                 name={"montnend"}
                                 type="select"
                                 id="montnend"
                                 onChange={event => {
                                   this.select(
                                     event 
                                   );
                                 }}
                                 label=""
                                 style={{ fontSize: 20 }}
                              >   
                              

                                <option  > มกราคม  </option>
                       
                              <option  > มีนาคม  </option>
                           
                              <option  > พฤษภาคม  </option>
                         
                              <option  > กรกฎาคม  </option>
                              <option  > สิงหาคม  </option>
                          
                              <option  > ตุลาคม  </option>
                          
                              <option  > ธันวาคม  </option>  
                               </Input> 
                                
                                :
                                null } 
                       
                        
                   
                    </FormGroup>
                </Col>
                <Row>
                </Row>
            </td>
            <td>
                <Col  >
                    <FormGroup>
                      
                                 <Input
                            value = {this.state.yearend}
                            name={"yearend"}
                            type="select"
                            id="yearend"
                            onChange={event => {
                              this.select(
                                event 
                              );
                            }}
                            label=""
                            style={{ fontSize: 20 }}
                            
                         >  
                        
                        
                        <option  > 2561 </option>
                        <option  > 2562 </option>
                        <option  > 2563 </option>
                        <option  > 2564 </option>
                        <option  > 2565 </option>
                        <option  > 2566 </option>
                        <option  > 2567 </option>
                        <option  > 2568 </option>
                        <option  > 2569 </option>
                        <option  > 2570 </option>
                      
                      </Input>

                     
                       
                    </FormGroup>
                </Col>
            </td>
        </tr>
    
</Card>
    <br />
</Col>


</Row>

                            <div
                                style={{
                                    marginTop: 30,
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "row"
                                }}
                            >
                                <Button
                                    style={{ width: 100, fontSize: 20, marginRight: 15 }}
                                    onClick={() => this.adddate()}
                                    outline
                                    color="success"
                                >
                                    ตกลง
                </Button>
                                <Button
                                    style={{ width: 100, fontSize: 20, marginLeft: 15 }}
                                      onClick={() => this.props.onCloseModal()}
                                    outline
                                    color="danger"
                                >
                                    ยกเลิก
                </Button>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Modal_Confrim;
