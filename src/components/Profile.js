import React, { Component } from 'react'
import { Image, Button, Icon, Divider, Form, TextArea } from 'semantic-ui-react'
import defaultUser from '../defaultUser.jpg'
import fetch from 'isomorphic-fetch'

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
    imgSrc: defaultUser,
    openEdit: false,
    editAbout: "We would like to know you better. Write something about you!",

    }
  }

  handleEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout});
    console.log(this.props.user);
  }
  clickTest = () => {
    let id = this.props.user.id;
    console.log('this is the user id: ' + this.props.user.id);
    let urlFetch = "http://localhost:3000/api/users";
    console.log(urlFetch);
    fetch( urlFetch,
      {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }
  ).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    return(
      <React.Fragment>
      <div className="ui raised card centered fluid">
        <div className="content profile">
        <Image src={this.props.user.picture}
        alt="profile picture" size="small" circular/>
        <h2>{this.props.user.name}</h2>
        <div className="divider"></div>
        <p>{this.props.user.email}</p>
        <p id="about me">About me:
        </p>
        {this.state.editAbout}
        {this.state.openEdit ? (
          <div>
          <Form style={{marginTop: "20px", width:"70%"}}>
            <TextArea
              name='aboutMe'
              placeholder={this.state.editAbout}
              onChange={event => this.setState({editAbout: event.target.value}) }>
              </TextArea>
          </Form>
          <Button content="Save" icon="save" floated='right' style={{marginTop:"15px"}} />
          </div>
        ): null}
        <Button content="Edit" icon="edit" floated='right' style={{marginTop:"15px"}} disabled={this.state.openEdit} onClick={() => this.handleEdit() }/>
      </div>
    </div>
    <Button color='green' floated="right">
      <Icon name="plus"/> Create new item
    </Button>

    <h2>Your stuff to sell:</h2>
  </React.Fragment>
    )
  }
}
