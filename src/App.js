import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './views/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Logout from './views/Logout';
import Cart from './views/Cart';
import CreateItem from './views/Create';
import EditItem from './views/Edit';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {titleCase} from './helpers';



export default class App extends Component {

  constructor(){
    super();
    this.state={
      username:'',
      token:'',
      cart:[],
      cartTotal:0,
      userFullName:'',
      itemToEdit:{},
      isAdmin: true
    };
  }

  setUser = (username) =>{
    this.setState({username});
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
    let { token, cart, cartTotal } = this.state;
    return (
      <div>
        <NavBar token={token} userFullName={this.state.userFullName}/>
        {/* {"my token: "+token} */}



        <Switch>


          <Route path = '/cart'>
            <ProtectedRoute token={token}>
              <Cart cart={cart} cartTotal={cartTotal}/>
            </ProtectedRoute>
          </Route>

          <Route path = '/create'>
            <AdminRoute token={token} isAdmin={this.state.isAdmin}>
              <CreateItem/>
            </AdminRoute>
          </Route>

          <Route path = '/edit'>
            <AdminRoute token={token} isAdmin={this.state.isAdmin}>
            <EditItem/>
          </AdminRoute>
          </Route>

          <Route path = '/logout'>
            <ProtectedRoute token={token}>
              <Logout setToken={this.setToken} token={token}/>
            </ProtectedRoute>
          </Route>

          <Route path = '/login'>
            <Login setToken={this.setToken} token={token} setName={this.setName}/>
          </Route>

          <Route path = '/'>
            <ProtectedRoute token={token}>
              <Home token={token} setToken={this.setToken} addToUserCart={this.addToUserCart} isAdmin={this.state.isAdmin}/>
            </ProtectedRoute>
          </Route>
          
        </Switch>
      </div>
    );
  }
}