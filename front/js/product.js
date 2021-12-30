// Déclaration des variables correspondantes aux éléments du DOM à modifier
const itemImg = document.querySelector(".item__img");
const itemTitle = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const selectColors = document.getElementById("colors");

//Extraire l'id depuis l'URL

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

//Ajoute les éléments du produit de la page dynamiquement

fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
  res.json().then((product) => {
    document.title = product.name;
    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    itemImg.appendChild(img);

    itemTitle.innerText = product.name;
    price.innerText = product.price;
    description.innerText = product.description;

    for (i = 0; i < product.colors.length; i++) {
      let option = document.createElement("option");
      option.value = product.colors[i];
      option.textContent = product.colors[i];
      selectColors.appendChild(option);
    }
  })
);

//Modification de la valeur intitale de l'input
document.querySelector("input").setAttribute("value", "1");
//Désactive l'option nulle "choisissez une couleur"
document
  .querySelector("option:first-child")
  .setAttribute("disabled", "disabled");

// Ajouter les produits sélectionnés, au click, dans le localstorage
function addToCart() {
  let addToCart = document.getElementById("addToCart");

  addToCart.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");
    const color = selectColors.options[selectColors.selectedIndex];
    const selectedProduct = {
      id: id,
      quantity: quantity.value,
      color: color.value,
      title: itemTitle.textContent,
      img: document.body.querySelector(".item__img img").src,
      alt: document.body.querySelector(".item__img img").alt,
      price: price.textContent,
    };

    if (selectedProduct.color != "") {
      let products = [];
      let storage = localStorage.getItem("products");
      if (storage) {
        products = JSON.parse(storage);
        let found = false;
        for (let i = 0; i < products.length; i++) {
          if (
            products[i].id == selectedProduct.id &&
            products[i].color == selectedProduct.color
          ) {
            products[i].quantity =
              parseInt(products[i].quantity) +
              parseInt(selectedProduct.quantity);
            found = true;
          }
        }
        if (!found) {
          products.push(selectedProduct);
        }
      } else {
        products = [selectedProduct];
      }

      localStorage.setItem("products", JSON.stringify(products));

      addToCart.innerText = "Ajouté !";
      setTimeout(() => {
        addToCart.innerText = "Ajouter au panier";
      }, 3000);

      for (let i = 0; i < products.length; i++) {
        let panierButton = document.querySelector("nav a:nth-child(2)");
        panierButton.innerHTML = `<a href="./cart.html"><li>Panier <span style="color: red; font-weight: bold;">${products.length}</span></li></a>`;
      }
    }
  });
}

addToCart();


//Affichage du nombre d'article sur le bouton panier
let products = JSON.parse(localStorage.getItem("products"));
for (let i = 0; i < products.length; i++) {
  let panierButton = document.querySelector("nav a:nth-child(2)");
  panierButton.innerHTML = `<a href="./cart.html"><li>Panier <span style="color: red; font-weight: bold;">${products.length}</span></li></a>`;
}