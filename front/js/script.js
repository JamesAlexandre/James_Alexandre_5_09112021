//Récupère l'API

function getItems() {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
      //Crée un nouvel article pour chaque élément du tableau product
      //Ajoute les éléments des produits
      for (i = 0; i < product.length; i++) {
        const newItem = document.createElement("a");
        let parent = document.getElementById("items");
        let newLink = parent.appendChild(newItem);

        newLink.innerHTML = `
        <a href="./product.html?id=${product[i]._id}">
          <article>
            <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
            <h3 class="productName">${product[i].name}</h3>
            <p class="productDescription">${product[i].description}</p>
          </article>
        </a>
      `;
      }
    });
}
getItems();
