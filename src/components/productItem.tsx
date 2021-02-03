import React, { useState } from "react";
import { Card, Icon, Image, Button, Label, Header } from "semantic-ui-react";
import Popups from "./productPopup.js";

type Item = {
  userPicture: string;
  name: string;
  userName: string;
  info: string;
  id: string;
  price: number;
  category: string;
};

type Props = {
  item: Item;
  cartFunction: (item: Item) => void;
};

export default function(props: Props) {
  const {
    item,
    item: { userPicture, name, userName, price, category },
    cartFunction,
  } = props;
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addProductToCart = () => {
    setIsAddingItem(true);
    cartFunction(item);
    setTimeout(() => {
      setIsAddingItem(false);
    }, 3000);
  };

  return (
    <Card>
      <Image src={userPicture} style={{ height: "250px" }} />
      <Card.Content>
        <Label color="black" ribbon="right">
          {category}
        </Label>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">Listed by {userName}</span>
        </Card.Meta>
        <Card.Description>
          <Popups product={item} addToCart={cartFunction} />
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Button
          color={isAddingItem ? "orange" : "green"}
          floated="right"
          onClick={addProductToCart}
        >
          {" "}
          {isAddingItem ? "Added to card" : "Buy"}{" "}
        </Button>
        <br />
        <div>
          <Header sub>Price</Header>
          <span>
            {price} <Icon name="euro" />
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}
