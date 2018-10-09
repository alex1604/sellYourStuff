import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
import fetch from 'isomorphic-fetch'
// import firebase from 'firebase'
import Profile from './components/Profile'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      currentTab: "login",
      products: [],
      user: {},
      token: ""
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({currentTab: ind});
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})
  changeToShop = () => this.setState({currentTab: "shop"})

  componentDidMount(){
    fetch('http://localhost:3000/api/products, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
    }).then()
    if( req.readyState == 4){
        console.log(req.response)
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
      <div>
        <h2>You are logged in, {this.state.user.name}</h2>
        <Profile user={this.state.user}/>
      </div>
    )
    let currentApp = null;
    if(this.state.currentTab === "shop"){
      currentApp = <ProductList productsProp = {this.state.products}/>
    }
    return (
      <div className="App">
        <Menu setUser={this.setUserState}
              isLoggedIn={this.isLoggedIn}
              clickEvent={this.tabClick}
              chosenTab={this.state.currentTab}/>

        <main className="mainView">
          {currentApp}
          <button onClick={this.changeToShop}> Change to shop </button>

            <div id="productsPage" className={(this.state.currentTab==="products") ? "show" : "hide"}>
            products page
            </div>
            <div id="profilePage" className={((this.state.currentTab==="profile") && (this.state.isLoggedIn===true)) ? "show" : "hide"}>
              {loggedIn}
            </div>
            <div id="cartPage" className={((this.state.currentTab==="cart") && (this.state.isLoggedIn===true)) ? "show" : "hide"}>
              shopping cart page
            </div>
        </main>
      </div>
    );
  }
}

export default App;
