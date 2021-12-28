import React, { Component } from 'react';




class Cart extends Component {
    constructor() {
        super();
        this.state={
            cart:[]
        };
    };

    render() {
        const styles={
            stylePage:{
                padding:"20px",
            },
            formHead:{
                color: "black",
            },
            cartList:{
                color: "black"
            },
            itemImg:{
                maxHeight:"200px", 
                width:"150px", 
                objectFit:"contain", 
                marginTop:"5%", 
                marginLeft:"5%", 
                border:"solid"
            },
            cartTotal:{
                color: "black"
            }
        };

        return (
            <div style={styles.stylePage}>
                <center><h1 style={styles.formHead}>Cart</h1></center>
                {this.props.cart?.length>0 ?
                <>
                <p style={styles.cartTotal}>Cart Total: <b>${this.props.cartTotal}</b></p>
                <ul style={styles.cartList}>
                    {this.props.cart.map(item=>(
                        <li key={this.props.cart.indexOf(item)}>
                            {this.props.cart.indexOf(item)+1}. <b>{item.title.substring(0,40)}</b> <div style={{float:"right"}}><b>${item.price}</b></div>
                            <br/> <img src={item.image} style={styles.itemImg} alt={item.title.substring(0,20)+"... image"}/>
                            <br/> <div>{item.category} </div>
                            <br/>
                        </li>
                    ))}
                </ul>
                </>
                : "Your Cart is Empty"}
            </div>
        );
    }
}

export default Cart;


