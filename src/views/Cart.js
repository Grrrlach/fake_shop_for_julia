import React, { Component } from 'react';




class Cart extends Component {
    constructor() {
        super();
        this.state={
            cart:[]
        };
    };

    // static addToCart = (item) => {
    //     console.log(item.category);
    //     cart.push(item);
    // }

    render() {
        const styles={
            pageStyles:{
                backgroundColor: "grey",
                padding:"20px",
                paddingBottom:"54vh"
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            },
            cartItemList:{
                listStyleType:"none",
                color: "azure"
            }
        };

        // if(localStorage.getItem('cart')){
        //     var cart=localStorage.getItem('cart', (cart)=>console.log(cart));
        //     console.log(cart);
        // }
        return (
            <div style={styles.pageStyles}>
                <center><h1 style={styles.formHead}>Cart</h1></center>
                {this.props.cart?.length>0 ?
                <ul style={styles.cartItemList}>
                    {this.props.cart.map(item=>(
                        <li key={this.props.cart.indexOf(item)}>
                            {this.props.cart.indexOf(item)+1}. <b>{item.title.substring(0,40)}</b> ... {item.category}
                        </li>
                    ))}
                </ul>
                : "Shopping cart is empty"}
            </div>
        );
    }
}

export default Cart;


