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
            pageStyles:{
                backgroundColor: "grey",
                padding:"20px 80px",
                minHeight:"94vh"
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            },
            cartItemList:{
                listStyleType:"none",
                color: "azure"
            },
            itemImg:{
                maxHeight:"100px", 
                width:"130px", 
                objectFit:"contain", 
                marginTop:"10px", 
                marginLeft:"10px", 
                border:"solid",
                borderRadius:"5px",
                borderColor:"white",
                backgroundColor: "white"
            },
            cartTotal:{
                color: "azure"
            }
        };

        return (
            <div style={styles.pageStyles}>
                <center><h1 style={styles.formHead}>Cart</h1></center>
                {this.props.cart?.length>0 ?
                <>
                <p style={styles.cartTotal}>Cart Total: <b>${this.props.cartTotal}</b></p>
                <ul style={styles.cartItemList}>
                    {this.props.cart.map(item=>(
                        <li key={this.props.cart.indexOf(item)}>
                            {this.props.cart.indexOf(item)+1}. <b>{item.title.substring(0,40)}</b> <div style={{float:"right"}}><b>${item.price}</b></div>
                            <br/> &nbsp;&nbsp;&nbsp;<img src={item.image} style={styles.itemImg} alt={item.title.substring(0,20)+"... image"}/>
                            <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.category}
                            <br/>
                        </li>
                    ))}
                </ul>
                </>
                : "Shopping cart is empty"}
            </div>
        );
    }
}

export default Cart;


