import React, { Component } from 'react'
import {  Progress } from 'reactstrap';

class Modalshow extends Component {

    constructor() {
        super()
        this.state = {
            se_data: [],
            values: 0
        }
    }

    progres_bar = (percent, number, content, values) => {
        return (
            <div >
                
                <div style={{ width: '80%', fontSize: 17, display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                    <div >
                        {number + '. ' + content}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', marginLeft: 120 }}>
                        <div style={{ width: 100,marginRight:5,marginLeft:50 }}>{values + ' kg.'}</div>
                        <div style={{ width: 170, }}><Progress animated   color="primary" value={Math.round(percent)}></Progress></div>
                       
                        <div style={{ width: 50 ,marginLeft:10}}>{Math.round(percent) + ' %'}</div>
                    </div>
                </div>
            </div>
   
        )
    }

    componentWillMount() {
        this.percent_on_progres(this.props.result)
        // this.result_erer(this.props.result)
    }
  
    percent_on_progres = (result) => {
        let volume = 0
        result.map((element, index) => {
            volume += element.data
        })

        this.setState({ volume: volume })
    }

    calculate_percent = (data) => {
        return (data * 100) / this.state.volume
    }


    render() {
        return (
            
            <div style={{ marginTop: 30, width: '100%' ,fontSize:20}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div>{this.props.plant} </div>
                    <div>&nbsp;ปริมาณรวม {this.props.volume_all} กิโลกรัม</div>
                </div>
                {
                    this.props.result.map((element, index) => {    
                        return this.progres_bar(this.calculate_percent(element.data), index + 1, element.se_name, element.data)
                    })
                }

            </div >
        )
    }
}

export default Modalshow