import React, { Component } from 'react'


class ModalImg extends Component {

    constructor() {
        super()
        this.state = {
        }

    }

    

    render() {
        return (
            <div >
                <img src={this.props.image} style={{width:"100%"}}/>
            </div >
        )
    }
}

export default ModalImg