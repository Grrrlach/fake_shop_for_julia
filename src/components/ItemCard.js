import React, { Component } from 'react'
import { Card, Col, Button } from 'react-bootstrap';

export default class ItemCard extends Component {

    constructor() {
        super();
        this.state={
            clicked:false,
            redirect:false

        };
    }

    handleRenderItem=()=>{
        this.setState({clicked:true})
    }

    handleAddToCart=(item)=>{
        this.props.addToUserCart(item);
    }

    render() {
        return (

                <Card style={{ width: '150px'}}>
                <Card.Img variant="top" alt={"product image goes here"}
                    src={this.props.item.image ?? 'public\no_image_available.png' } />
                <Card.Body>
                    <Card.Title>{this.props.item.title.substring(0,20)+"..." ?? "No name"}</Card.Title>
                    <Card.Subtitle style={{color:"blue", fontSize:"12px"}} className="float-start">- {this.props.item.category ?? 'No category'} </Card.Subtitle>

                    <br/>
                    <Card.Text>
                    {this.props.item.description.substring(0,50)+"..." ?? "Description not available"}
                    </Card.Text>

                    <Card.Subtitle className="float-end">${this.props.item.price ?? 'Price not available'} </Card.Subtitle>
                    <br/>
                    <div>
                    <Button  style={{margin:"10px 10px"}} variant="success" onClick={()=>this.handleAddToCart(this.props.item)} >I want this!</Button>
                    {this.props.isAdmin ?
                    <>
                    <Button  style={{margin:"10px 10px"}} variant="warning" onClick={()=>this.props.goToEdit(this.props.item)} >Edit</Button>
                    <Button  style={{margin:"10px 10px"}} variant="danger" onClick={()=>this.props.deleteItem(this.props.item.id)} >Delete</Button>
                    </>
                    :''}
                    </div>
                </Card.Body>
                </Card>
            
        )
    }
}