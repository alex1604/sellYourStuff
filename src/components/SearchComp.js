import React, { Component } from 'react';
import { Icon, Input, Search } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import './Search.css';

export default class SearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {value: "", products:[], isLoading: false, results:[], key: 0};
    //this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    //this.handleResultSelect = this.resetComponent.bind(this);
  }

  componentWillMount() {
      //Retrieving all products from database

      fetch('http://localhost:3000/api/search/', {
      method: 'POST',
      body: "message from search",
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
      })
      .then(response => {
        return response.json()
      }).then(data => {
        let editedList = [];
        for (var i = 0; i < data.length; i++) {
          editedList.push({
          id: data[i]["_id"],
          title: data[i].name,
          description: data[i].info,
          image: data[i].userPicture,
          price: data[i].price
        })
      }
        /*
          let array = [
            {id: 1,
            title: "hi all",
            description: "lorem ipsum lala",
            price: '2'},
            {id: 2,
            title: "many products",
            description: "furniture",
            price: '3'}
          ]*/
          this.setState({products: editedList});
          //this.setState({products: array});
          //for (var i = 0; i < data.length; i++) {
          //  console.log("Search results " + data[i].name);
          //}
      }).catch(err => {
        console.log(err);
      })

      this.resetComponent()

  }
//recieves user input in search field
/*
  handleChange(event) {
    this.setState({search: event.target.value});
  }*/
  resetComponent(){
    this.setState({ isLoading: false, results: [], value: '' })
  }

  generateKey(){
    this.setState({ key: this.state.key + 1 }, () => {
      return this.state.key
    })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) {
          this.resetComponent()
      }
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.products, isMatch),
      })
    }, 300)
  }




  render() {
  //let products = this.state.results;

  //if(results){
  //for (var i = 0; i < results.length; i++) {
  //  console.log("Search results " + results[i].title);
  //}
  const { isLoading, value, results } = this.state
  console.log("Result is " + this.state.results.title);
    return (
      <div>
          <Input icon placeholder='Search...' style={{margin:"3px 20px 3px 20px"}}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 30, { loading: true })}
            results={results} key={this.generateKey}
            value={value}
            {...this.props}
          />
          </Input>
      </div>
    )
  }
}
