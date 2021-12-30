// Extraire l'id depuis l'URL
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

//Si on trouve un id dans l'URL de la page...
if (id) {
  //...alors c'est la page confirmation, insérer l'id de commande sur la page
  let span = document.getElementById("orderId");
  span.textContent = id;
} else { // sinon on est sur la page panier alors jouer tout le script de la page 
  const cartItems = document.getElementById("cart__items");

  let products = JSON.parse(localStorage.getItem("products"));
  let totalProducts = 0;
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    totalProducts += parseInt(products[i].quantity);
    totalPrice += products[i].price * products[i].quantity;

    //Creation des éléments du DOM 
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
    p3.classList.add("quantity");
    divContentSettingsQuantity.appendChild(p3);

    let input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = products[i].quantity;
    divContentSettingsQuantity.appendChild(input);

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

  let quantity = document.getElementById("totalQuantity");
  quantity.textContent = totalProducts;

  let price = document.getElementById("totalPrice");
  price.textContent = totalPrice;

  //Modification de la quantité
  let input = document.getElementsByClassName("itemQuantity");
  let result = document.getElementsByClassName("quantity");

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", (e) => {
      result[i].textContent = `Qté : ${e.target.value}`;
      let difference =
        parseInt(e.target.value) - parseInt(products[i].quantity);
      products[i].quantity = parseInt(products[i].quantity) + difference;
      totalProducts = parseInt(totalProducts) + difference;
      quantity.textContent = totalProducts;
      totalPrice += difference * products[i].price;
      price.textContent = totalPrice;

      localStorage.setItem("products", JSON.stringify(products));
    });
  }

  // Suppression du produit
  let deleteButton = document.getElementsByClassName("deleteItem");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", () => {
      products.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(products));
      location.reload();
    });
  }
//Mise en place du contrôle du formulaire à l'aide des RegEx
  const form = document.querySelector(".cart__order__form");
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="email"]'
  );

  let firstName, lastName, address, city, email;

  const errorDisplay = (tag, message, valid) => {
    const errorMsg = document.getElementById(`${tag}ErrorMsg`);

    if (!valid) {
      errorMsg.textContent = message;
    } else {
      errorMsg.textContent = message;
    }
  };

  const firstNameChecker = (value) => {
    if (value.length == 0) {
      errorDisplay("firstName", "Veuillez entrer votre prénom");
      firstName = null;
    } else if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)) {
      errorDisplay(
        "firstName",
        "Le prénom ne doit pas contenir de caractère spécial"
      );
      firstName = null;
    } else {
      errorDisplay("firstName", "", true);
      firstName = value;
    }
  };

  const lastNameChecker = (value) => {
    if (value.length == 0) {
      errorDisplay("lastName", "Veuillez entrer votre nom");
      lastName = null;
    } else if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)) {
      errorDisplay(
        "lastName",
        "Le nom ne doit pas contenir de caractère spécial"
      );
      lastName = null;
    } else {
      errorDisplay("lastName", "", true);
      lastName = value;
    }
  };

  const addressChecker = (value) => {
    if (value.length == 0) {
      errorDisplay("address", "Veuillez entrer votre adresse");
      address = null;
    } else if (!value.match(/^[#.0-9a-zA-Z\s,-:]+$/)) {
      errorDisplay(
        "address",
        "L'adresse ne doit pas contenir de caractère spécial"
      );
      address = null;
    } else {
      errorDisplay("address", "", true);
      address = value;
    }
  };

  const cityChecker = (value) => {
    if (value.length == 0) {
      errorDisplay("city", "Veuillez entrer votre ville");
      city = null;
    } else if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)) {
      errorDisplay(
        "city",
        "La ville ne doit pas contenir de caractère spécial"
      );
      city = null;
    } else {
      errorDisplay("city", "", true);
      city = value;
    }
  };

  const emailChecker = (value) => {
    if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      errorDisplay("email", "L'adresse mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "firstName":
          firstNameChecker(e.target.value);
          break;
        case "lastName":
          lastNameChecker(e.target.value);
          break;
        case "address":
          addressChecker(e.target.value);
          break;
        case "city":
          cityChecker(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        default:
          null;
      }
    });
  });

  //Requête POST au click sur le bouton commander
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let arrayId = [];

    if (
      firstName &&
      lastName &&
      address &&
      city &&
      email &&
      products.length > 0
    ) {
      //objet contact contenant les inputs
      let contact = {
        firstName,
        lastName,
        address,
        city,
        email,
      };
      //array contenant les id des produits achetés
      products.forEach((product) => {
        arrayId.push(product.id);
      });

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          contact: contact,
          products: arrayId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();//Vider le localstorage après la commande
          document.location.href = `./confirmation.html?id=${data.orderId}`;//Renvoie à la page confirmation en insérant l'id de commande dans l'URL 
        });
    } else {
      alert("Sélectionnez un produit");
    }
  });
}
