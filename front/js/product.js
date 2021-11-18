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

    itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    itemTitle.innerText = product.name;
    price.innerText = product.price;
    description.innerText = product.description;

    for (i = 0; i < product.colors.length; i++) {
      selectColors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  })
);
