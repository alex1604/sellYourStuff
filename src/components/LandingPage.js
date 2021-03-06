import React, { Component } from 'react'
import { Image,  Button } from 'semantic-ui-react'
import Bob from '../image.png'

export default class LandingPage extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){

    return(
      <div className="landingPage">
        <Image src={Bob} style={{height:"50%"}} centered title="Image from shutterstock.com 1026506494"/>
        <h1>Welcome to E.BUY</h1>
        <h2>The online flea market</h2>
        <Button
          style={{ width: "220px", height:"50px", fontSize: "16px"}}
          animated='fade' color="orange"
          onClick={this.props.changeToShop}>
          <Button.Content visible>Go to market</Button.Content>
          <Button.Content hidden>NOW!</Button.Content>
        </Button>
      </div>
    )
  }
}
