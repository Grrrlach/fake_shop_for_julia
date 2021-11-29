import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Logout from './views/Logout';
import Cart from './views/Cart';
import CreateItem from './views/CreateItem';
import EditItem from './views/EditItem';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {titleCase} from './helpers';



export default class App extends Component {

  constructor(){
    super();
    this.state={
      user:'',
      token:'',
      cart:[],
      cartTotal:0,
      userFullName:'',
      itemToEdit:{},
      isAdmin: true
    };
  }

  setUser = (user) =>{
    this.setState({user});
  }

  setToken = (token) =>{
    localStorage.setItem('token',token);

    this.setState({token:token});
  }
  setName = (username) =>{
    let name = "";
    axios.get('https://fakestoreapi.com/users')
    .then(res=>{
      for(let user of res.data){
        if(user.username===username){
          name = user.name.firstname+" "+user.name.lastname;
          console.log(name);
          this.setState({userFullName:titleCase(name)});
          localStorage.setItem('name',titleCase(name));
          break;
        }
      }
    })
  }
  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token'),"name":localStorage.getItem('name')}
  }

  addToUserCart = (item) =>{
    let cart = this.state.cart;
    let cartTotal = this.state.cartTotal;
    cart.push(item);
    cartTotal+=parseFloat(item.price);
    this.setState({cart:cart, cartTotal:cartTotal}, ()=>console.log("cart updated."))
  }

  setItemToEdit = (item) => {

  }



  render() {
    return (
      <div>
        <NavBar token={this.state.token} userFullName={this.state.userFullName}/>
        {/* {"my token: "+this.state.token} */}

        <Routes>
          <Route path = '/' element={
            <ProtectedRoute token={this.state.token}>
              <Home token={this.state.token} setToken={this.setToken} addToUserCart={this.addToUserCart} isAdmin={this.state.isAdmin}/>
            </ProtectedRoute>
          }/>
          <Route path = '/cart' element={
            <ProtectedRoute token={this.state.token}>
              <Cart cart={this.state.cart} cartTotal={this.state.cartTotal}/>
            </ProtectedRoute>
          }/>          
          <Route path = '/createitem' element={
            <AdminRoute token={this.state.token} isAdmin={this.state.isAdmin}>
              <CreateItem/>
            </AdminRoute>
          }/>
          <Route path = '/edititem' element={
            <AdminRoute token={this.state.token} isAdmin={this.state.isAdmin}>
              <EditItem/>
            </AdminRoute>
          }/>
          <Route path = '/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
          }/>

          <Route path = '/login' element={
            <Login setToken={this.setToken} token={this.state.token} setName={this.setName}/>
          }/>
        </Routes>
      </div>
    );
  }
}
