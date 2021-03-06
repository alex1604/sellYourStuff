import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import './Search.css';

export default class SearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", products: [], isLoading: false, results: [] };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
  }

  async componentDidMount() {
    //Retrieving all products from database
    let editedList = [];
    let myFetch = () => {
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

          for (var i = 0; i < data.length; i++) {
            editedList.push({
              id: data[i]["_id"],
              title: data[i].name,
              description: data[i].info,
              image: data[i].userPicture,
              price: data[i].price.toString(),
              category: data[i].category,
              username: data[i].userName
            })
          }
          //this.setState({products: array});
          //for (var i = 0; i < data.length; i++) {
          //}
        }).catch(err => {
          console.log(err);
        })
    }
    let updateState = editedList => {
      this.setState({ products: editedList })
    }
    await myFetch()
    await updateState(editedList)
    this.resetComponent()

  }
  //recieves user input in search field
  /*
    handleChange(event) {
      this.setState({search: event.target.value});
    }*/
  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' })
  }
  /*
    generateKey(){
      this.setState({ key: this.state.key + 1 }, () => {
        return this.state.key
      })
    }*/

  //handleResultSelect = (e, { result }) => this.setState({ value: "" })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: "" });

    let tempArray = [];
    tempArray.push({
      "_id": {
        "$oid": result.id
      },
      "name": result.title,
      "price": result.price,
      "category": result.category,
      "userName": result.username,
      "userPicture": result.image,
      "info": result.description
    });

    this.props.filterBySearch(tempArray);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.resetComponent()
      }
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      let ogList = _.filter(this.state.products, isMatch).map(item => {
        return {
          userName: item.username,
          name: item.title,
          info: item.description,
          price: Number(item.price),
          id: item.id,
          category: item.category,
          userPicture: item.image,
        }
      })
      this.setState({
        isLoading: false,
        results: _.filter(this.state.products, isMatch),
      }, this.props.updateState(ogList))
    }, 300)
  }




  render() {

    const { isLoading, value, results } = this.state
    //console.log("Search value is " + this.state.value);

    return (
      <div style={{ margin: "3px 20px 3px 20px" }}>

        <label className="searchLabel">
          Search
          </label>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 30, { loading: true })}
          results={results}
          value={value}

        />
      </div>
    )
  }
}
