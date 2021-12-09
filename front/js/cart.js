const cartItems = document.getElementById("cart__items");

let products = JSON.parse(localStorage.getItem("products"));
let totalProducts = [];
let totalPrice = [];

for (let i = 0; i < products.length; i++) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", `${products[i].id}`);
  article.setAttribute("data-color", `${products[i].color}`);
  cartItems.appendChild(article);

  let divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  article.appendChild(divImg);

  let img = document.createElement("img");
  img.src = products[i].img;
  divImg.appendChild(img);

  let divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  article.appendChild(divContent);

  let divContentDescription = document.createElement("div");
  divContentDescription.classList.add("cart__item__content__description");
  divContent.appendChild(divContentDescription);

  let h2 = document.createElement("h2");
  h2.textContent = products[i].title;
  divContentDescription.appendChild(h2);

  let p1 = document.createElement("p");
  p1.textContent = products[i].color;
  divContentDescription.appendChild(p1);

  let p2 = document.createElement("p");
  p2.textContent = products[i].price + " €";
  divContentDescription.appendChild(p2);

  let divContentSettings = document.createElement("div");
  divContentSettings.classList.add("cart__item__content__settings");
  divContent.appendChild(divContentSettings);

  let divContentSettingsQuantity = document.createElement("div");
  divContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  divContentSettings.appendChild(divContentSettingsQuantity);

  let p3 = document.createElement("p");
  p3.textContent = `Qté : ${products[i].quantity}`;
  divContentSettingsQuantity.appendChild(p3);

  let input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = products[i].quantity;

  let divContentSettingsDelete = document.createElement("div");
  divContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  divContentSettings.appendChild(divContentSettingsDelete);

  let p4 = document.createElement("p");
  p4.classList.add("deleteItem");
  p4.textContent = "Supprimer";
  divContentSettingsDelete.appendChild(p4);
}

// Affichage de la quantité totale et du prix totale dans sur la page panier

for (let i = 0; i < products.length; i++) {
  totalProducts.push(parseInt(products[i].quantity));
  totalPrice.push(parseInt(products[i].quantity) * parseInt(products[i].price));
}

const reducer = (previousValue, currentValue) => previousValue + currentValue;

let quantity = document.getElementById("totalQuantity");
quantity.textContent = totalProducts.reduce(reducer);

let price = document.getElementById("totalPrice");
price.textContent = totalPrice.reduce(reducer);
