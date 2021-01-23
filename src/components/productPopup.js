import React, { Component } from "react";
import { Image, Button, Header, Modal } from "semantic-ui-react";

class productItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  close = () => this.setState({ open: false });
  addProductToCart = () => {
    this.props.addToCart(this.props.product);
  };

  render() {
    return (
      <Modal trigger={<Button compact>Info</Button>}>
        <Modal.Header>{this.props.product.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={this.props.product.userPicture} />
          <Modal.Description>
            <Header>Listed by: {this.props.product.userName}</Header>
            <p>{this.props.product.info}</p>
            <p>{this.props.product.price} euros</p>
            <Modal.Actions>
              <Button
                onClick={this.addProductToCart}
                size="large"
                color="green"
                floated="right"
              >
                {" "}
                Buy{" "}
              </Button>
            </Modal.Actions>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default productItem;
