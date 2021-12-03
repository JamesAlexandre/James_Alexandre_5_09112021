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

// Ajoutez les produits sélectionnés, au click, dans le localstorage
let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", () => {
  const quantity = document.getElementById("quantity");
  const color = selectColors.options[selectColors.selectedIndex];
  const selectedProduct = {
    id: id,
    quantity: quantity.value,
    color: color.value,
  };

  localStorage.setItem("products", JSON.stringify(selectedProduct));

  let storage = JSON.parse(localStorage.getItem("products"));

  if (typeof storage != "undefined" && storage != "null") {
    for (let i = 0; i < storage.length; i++) {
      if (
        storage[i].id == selectedProduct.id &&
        storage[i].color == selectedProduct.color
      ) {
        storage[i].quantity += selectedProduct.quantity;
      } else {
        storage = [];
        storage.push(selectedProduct);
      }
    }
  }
});
