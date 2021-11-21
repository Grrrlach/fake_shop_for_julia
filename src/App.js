import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Logout from './views/Logout';
import Cart from './views/Cart';
import ItemCard from './components/ItemCard';
import {startRedirect} from './views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class App extends Component {

  constructor(){
    super();
    this.state={
      user:'',
      token:'',
      cart:[]
    };
  }

  setUser = (user) =>{
    this.setState({user});
  }

  setToken = (token) =>{
    localStorage.setItem('token',token);

    this.setState({token:token}, ()=>{startRedirect(token)});
  }
  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token')}
  }

  addToUserCart = (item) =>{
    let cart = this.state.cart;
    cart.push(item);
    // localStorage.setItem('cart',cart);
    this.setState({cart:cart}, ()=>console.log("cart updated."))
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        {/* {"my token: "+this.state.token} */}

        <Routes>
          <Route path = '/' element={
            <ProtectedRoute token={this.state.token}>
              <Home token={this.state.token} setToken={this.setToken} addToUserCart={this.addToUserCart}/>
            </ProtectedRoute>
          }/>
          <Route path = '/cart' element={
            <ProtectedRoute token={this.state.token}>
              <Cart cart={this.state.cart}/>
            </ProtectedRoute>
          }/>
          <Route path = '/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
          }/>

          <Route path = '/login' element={
            <Login setToken={this.setToken} token={this.state.token}/>
          }/>
        </Routes>
      </div>
    );
  }
}
