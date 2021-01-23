import React, { Component } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";

class userProdItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        userPicture: this.props.userPicture,
        name: this.props.name,
        userName: this.props.userName,
        userEmail: this.props.userEmail,
        info: this.props.info,
        imageName: this.props.imageName,
        id: this.props.id,
        price: this.props.price,
        category: this.props.category,
      },
    };
  }
  render() {
    let objectSendToEdit = {
      userPicture: this.props.userPicture,
      name: this.props.name,
      userName: this.props.userName,
      userEmail: this.props.userEmail,
      info: this.props.info,
      imageName: this.props.imageName,
      id: this.props.id,
      price: this.props.price,
      category: this.props.category,
    };
    return (
      <Card>
        <Image src={this.props.userPicture} style={{ height: "250px" }} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className="date">Listed by {this.props.userName}</span>
          </Card.Meta>
          <Card.Description>{this.props.info}</Card.Description>
        </Card.Content>
        <Card.Content>
          <span>
            {this.props.price} <Icon name="euro" />
          </span>
          <br />
          <span> Category: {this.props.category}</span>
          <div className="ui two buttons" style={{ marginTop: "20px" }}>
            <Button
              basic
              color="green"
              onClick={() => this.props.editInformation(objectSendToEdit)}
            >
              Edit
            </Button>
            <Button
              basic
              color="red"
              onClick={() => console.log(this.props.id)}
            >
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default userProdItem;
