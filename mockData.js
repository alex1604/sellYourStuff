module.exports = {
  generateData: (times) => {
    console.log("inside mockdata");

    let myArray = [];

    const name = [
      "Bargain",
      "Random item",
      "First come first served",
      "A second hand must-have in good condition",
      "Sell because of move",
      "Minor scratches, but functional",
    ];
    const product_id = [999, 849, 699, 499, 299, 179, 99, 59, 29, 10];
    const category = [
      "Home",
      "Clothing",
      "Entertainment",
      "Technology",
      "Industrial",
      "Other",
    ];
    const seller = [
      "Albin Engman",
      "Alejandro Garcia",
      "Anna Faixova",
      "Elin Jakobsson",
      "Sara",
    ];
    const images = [
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2F109712811natural.jpg?alt=media&token=c6edfefb-b26d-4f6b-961b-47d0ab118a0d",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2F70770b9813961d99a75900c750396fb9.jpg?alt=media&token=2569a57f-00ac-4a45-a46c-a91a43ec8b31",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fdirty-microwave-oven-22578903.jpg?alt=media&token=522fb577-bb83-4887-94c8-e4925ba58c7f",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fdownload.jpeg?alt=media&token=969135af-9dcf-4d68-9820-7f01a25fb5ce",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fgripsholm-golvlampa-massingbok-145cm.jpeg?alt=media&token=fcc84212-5c29-41e8-a7a5-5ac7c076c568",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fimages%20(1).jpeg?alt=media&token=69b056d0-5800-4e75-9b6f-6e1389171f1b",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fimages.jpeg?alt=media&token=3deb54b0-9ca0-42e3-8ec0-e6269a033928",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fweird-stuff-28.jpg?alt=media&token=7cbaafd7-4b19-4fcf-8c65-2ed3ced766a6",
      "https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fold_used_toothbrush_with_worn_out_bristles.jpg?alt=media&token=f71fd627-bb17-4304-90f8-e7b3c1ea6c85",
    ];
    const info = [
      "Don't buy this, it's a terrible thing not intended for thy world",
      "Consider buying this, it's an average item to an average price.",
      "Buy this! It's a practically legal item.",
    ];
    const pi = [];

    function randomElement(list) {
      let r = Math.random() * list.length;
      return list[Math.floor(r)];
    }

    function createObject(newList) {
      let newObject = {};
      newObject.name = randomElement(name);
      newObject.price = randomElement(product_id);
      newObject.category = randomElement(category);
      newObject.userName = randomElement(seller);
      newObject.userPicture = randomElement(images);
      newObject.info = randomElement(info);
      newList.push(newObject);
    }

    for (i = 0; i < times; i++) {
      createObject(myArray);
    }

    return myArray;
  },
};
