import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: "login",
      products: [],
      isLoggedIn: false
    }
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})
  changeToShop = () => this.setState({currentPage: "shop"})

  componentDidMount(){
    console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
    if( req.readyState == 4){
        this.setState({ products: JSON.parse(req.response) })
        console.log(this.state.products)
    }
    else {
      console.log(req.status)
    }
  }
  req.open('GET', 'http://localhost:3000/api/products');
  req.send();
    /*fetch('http://localhost:3000/api/products', {
      method: "GET",
      header: {
        'Access-Control-Allow-Origin' : '*',
      }
    })
    .then(res => {
      console.log("Inside fetch")
      return res.json()
    })
    .then(json => {
      console.log(json)
    })*/
  }
  render() {
    const loggedIn = !this.state.isLoggedIn ? (
      null
    ) : (
      <h2>You are logged in, {this.state.user.name}</h2>
    )
    let currentApp = null;
    if(this.state.currentPage === "shop"){
      currentApp = <ProductList productsProp = {this.state.products}/>
    }
    return (
      <div className="App">
        <Menu setUser={this.setUserState} isLoggedIn={this.isLoggedIn}/>
        <main className="mainView">
          {currentApp}
          <button onClick={this.changeToShop}> Change to shop </button>
            {loggedIn}
        </main>
      </div>
    );
  }
}

export default App;
