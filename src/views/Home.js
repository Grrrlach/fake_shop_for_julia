import React, { Component } from 'react';
import {Col, Row, Button} from 'react-bootstrap'
import ItemCard from '../components/ItemCard'
import { Navigate } from 'react-router-dom';
import axios from 'axios';





class Home extends Component {
    constructor() {
        super();
        this.state={
            categories:[],
            items:[],
            itemStart: 0,
            itemEnd:15,
            itemToEdit:{},
            redirect:false
        };
    };

    componentDidMount() {
        this.getAllCats();
        this.getAllItems();
    }

    getAllCats = async () =>{
        await axios.get('https://fakestoreapi.com/products/categories')
        .then(response=>{
            this.setState({categories:response.data}, ()=>console.log("categories set."))
        });
    }

    getAllItems = async () =>{
        await axios.get('https://fakestoreapi.com/products')
        .then(response=>{
            this.setState({items:response.data}, ()=>console.log("items set."))
        });
    }

    resetItemCounts = () =>{
        this.setState({itemStart:0, itemEnd:15});
    }

    handleCat = async (id) =>{
        this.resetItemCounts()
        if (id===-1){
            return await this.getAllItems();
        }
        return await this.getCatsItems(id);
        
    }

    getCatsItems=async(id)=>{
        let cat = this.state.categories[id];
        await axios.get(`https://fakestoreapi.com/products/category/${cat}`)
        .then(response=>{
            this.setState({items:response.data}, ()=>console.log("items set."))
        });
    }

    handlePrev=()=>{
        const oldStart=this.state.itemStart;
        const oldEnd=this.state.itemEnd;
        this.setState({itemStart:oldStart-15, itemEnd:oldEnd-15});
    }

    handleNext=()=>{
        const oldStart=this.state.itemStart;
        const oldEnd=this.state.itemEnd;
        this.setState({itemStart:oldStart+15, itemEnd:oldEnd+15});
    }

    goToEditItem = (item) => {
        this.setState({itemToEdit:item}, ()=>(
        localStorage.setItem('itemToEdit', JSON.stringify(item))
        ))
        this.setState({redirect:true});
    }

    deleteItem = (id) => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log(`Item number ${id} deleted.`))
    }

    render() {
        const styles = {
            catButton:{
                backgroundColor: "white",
                color:"black",
                width: '100%',
                border: '1px solid grey',
                borderRadius: '15px',
                marginBottom:'5px'
            },
            pageStyles:{
                backgroundColor: "grey",
                padding:"20px",
                minHeight:"94vh"
            },
            headerStyles:{
                color:"azure"
            }
        }

        return (
            <div style={styles.pageStyles}>
            {this.state.redirect ? <Navigate to={{pathname:"/edititem", props:{item:this.state.itemToEdit}}}/> :

                <Row>
                    <Col md={3}>
                        {/* category section */}
                        <center><h3 style={styles.headerStyles}>Product Categories</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            {/* Come back to here */}
                            <li>
                                <button style={styles.catButton} onClick={()=>this.handleCat(-1)}>All Items</button>
                            </li>
                            {this.state.categories.map(
                                (c)=><li key={this.state.categories.indexOf(c)}>
                                    <button style={styles.catButton} onClick={()=>this.handleCat(this.state.categories.indexOf(c))}>{c}</button>
                                </li>
                            )}

                            <li>
                                <a href="/createitem"><Button  style={{margin:"5px 0px", color:"azure"}} variant="info" >Create New Item</Button></a>

                            </li>
                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* item section */}
                        <Row>
                            {this.state.items.slice(this.state.itemStart,this.state.itemEnd)
                                .map((i)=><ItemCard item={i} key={i.id} addToUserCart={this.props.addToUserCart} goToEditItem={this.goToEditItem} deleteItem={this.deleteItem} isAdmin={this.props.isAdmin}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button variant="danger" className={"me-2 " + (this.state.itemStart===0?"disabled":'')} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button variant="success" className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>

                </Row>
            }
            </div>
        );
    }
}

export default Home;
