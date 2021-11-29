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
            <>

            <Col>
            {/* come back for single item */}
                <Card style={{ width: '150px', marginBottom:"25px" }}>
                <Card.Img variant="top" style={{maxHeight:"100px", width:"130px", objectFit:"contain", marginTop:"10px", marginLeft:"10px"}} alt={this.props.item.title.substring(0,20)+"... image"}
                    src={this.props.item.image ?? 'https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png' } />
                <Card.Body>
                    <Card.Title>{this.props.item.title.substring(0,20)+"..." ?? "No name"}</Card.Title>
                    <Card.Subtitle style={{color:"blue", fontSize:"12px"}} className="float-start">- {this.props.item.category ?? 'No category'} </Card.Subtitle>

                    <br/>
                    <Card.Text>
                    {this.props.item.description.substring(0,50)+"..." ?? "No Description"}
                    </Card.Text>

                    <Card.Subtitle className="float-end">${this.props.item.price ?? '?.??'} </Card.Subtitle>
                    <br/>
                    <div>
                    <button  style={{margin:"5px 0px"}} style={{backgroundColor:"white", border:'none', color:'blue'}} onClick={()=>this.handleRenderItem()}>See More</button>
                    <Button  style={{margin:"5px 0px"}} variant="success" onClick={()=>this.handleAddToCart(this.props.item)} >Add To Cart</Button>
                    {this.props.isAdmin ?
                    <>
                    <Button  style={{margin:"5px 0px"}} variant="warning" onClick={()=>this.props.goToEditItem(this.props.item)} >Edit Item</Button>
                    <Button  style={{margin:"5px 0px"}} variant="danger" onClick={()=>this.props.deleteItem(this.props.item.id)} >Delete Item</Button>
                    </>
                    :''}
                    </div>
                </Card.Body>
                </Card>
            </Col>
            
            </>
        )
    }
}