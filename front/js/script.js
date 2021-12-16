//Récupère l'API

function getItems() {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
      //Crée un nouvel article pour chaque élément du tableau product
      //Ajoute les éléments des produits
      for (i = 0; i < product.length; i++) {
        //Création du lien
        let a = document.createElement("a");
        a.href = `./product.html?id=${product[i]._id}`;
        //Création de la balise article
        let article = document.createElement("article");
        a.appendChild(article);
        //Création de la balise img
        let img = document.createElement("img");
        img.src = product[i].imageUrl;
        img.alt = product[i].altTxt;
        article.appendChild(img);
        //Création du h3
        let h3 = document.createElement("h3");
        h3.classList.add("productName");
        h3.textContent = product[i].name;
        article.appendChild(h3);
        //Création de la balise p 
        let p = document.createElement("p");
        p.classList.add("productDescription");
        p.textContent = product[i].description;
        article.appendChild(p);
        //Attribution de a enfant de la balise section
        let parent = document.getElementById("items");
        parent.appendChild(a); 

        
      }
    });
}
getItems();

let products = JSON.parse(localStorage.getItem("products"));
for (let i = 0; i < products.length; i++) {
  let panierButton = document.querySelector("nav a:nth-child(2)");
  panierButton.innerHTML = `<a href="./cart.html"><li>Panier <span style="color: red; font-weight: bold;">${products.length}</span></li></a>`;
}