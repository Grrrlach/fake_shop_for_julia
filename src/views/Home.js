import React, { Component } from 'react';
import {Col, Row, Button} from 'react-bootstrap'
import ItemCard from '../components/ItemCard'
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';





class Home extends Component {
    constructor() {
        super();
        this.state={
            categories:[],
            items:[],
            startAt: 0,
            endAt:6,
            itemToEdit:{},
            redirect:false
        };
    };

    componentDidMount() {
        this.getCategories();
        this.getItems();
    }

    getCategories = async () =>{
        await axios.get('https://fakestoreapi.com/products/categories')
        .then(response=>{
            this.setState({categories:response.data})
        });
    }

    getItems = async () =>{
        await axios.get('https://fakestoreapi.com/products')
        .then(response=>{
            this.setState({items:response.data})
        });
    }

    resetItemCounts = () =>{
        this.setState({startAt:0, endAt:6});
    }

    handleCategory = async (id) =>{
        this.resetItemCounts()
        if (id===-1){
            return await this.getItems();
        }
        return await this.getCategoryItems(id);
        
    }

    getCategoryItems=async(id)=>{
        let category = this.state.categories[id];
        await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(response=>{
            this.setState({items:response.data})
        });
    }

    handlePrev=()=>{
        const oldStart=this.state.startAt;
        const oldEnd=this.state.endAt;
        this.setState({startAt:oldStart-6, endAt:oldEnd-6});
    }

    handleNext=()=>{
        const oldStart=this.state.startAt;
        const oldEnd=this.state.endAt;
        this.setState({startAt:oldStart+6, endAt:oldEnd+6});
    }

    goToEdit = (item) => {
        this.setState({itemToEdit:item}, ()=>(
        localStorage.setItem('itemToEdit', JSON.stringify(item))
        ))
        this.setState({redirect:true});
    }

    deleteItem = (id) => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.data)
    }
   
    render() {
        // console.log("Julia rocks")
        const styles = {
            category:{
                color:"black",
                border: '1px solid grey'
            },
            stylePage:{
                padding:"20px"
                // justify:"center"
            },
            headerStyles:{
                color:"red"
            }
        }

        return (
            <div style={styles.stylePage}>
            {this.state.redirect ? <Redirect to={{pathname:"/edit", props:{item:this.state.itemToEdit}}}/> :

                <Row>
                    {/* menu */}
                    <Col md={3}>
                        <center><h3 style={styles.headerStyles}>Select from our products!</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            {this.state.categories.map(
                                (c)=><li key={this.state.categories.indexOf(c)}>
                                    <button style={styles.category} onClick={()=>this.handleCategory(this.state.categories.indexOf(c))}>{c}</button>
                                </li>
                            )}

                            <li>
                                <a href="/create"><Button  style={{margin:"5px 0px", backgroundColor:"red", color:"azure"}} variant="info" >Create New Item</Button></a>

                            </li>
                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* item */}
                        <Row>
                            {this.state.items.slice(this.state.startAt,this.state.endAt)
                                .map((i)=><ItemCard item={i} key={i.id} addToUserCart={this.props.addToUserCart} goToEdit={this.goToEdit} deleteItem={this.deleteItem} isAdmin={this.props.isAdmin}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button variant="info"  onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button variant="primary" onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>

                </Row>
            }
            </div>
        );
    }
}

export default Home;
