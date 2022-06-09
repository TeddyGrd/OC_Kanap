
// Fonction de récupération des donnée de l'api

const apiProduct = async () => {
  fetch('http://localhost:5500/api/products')
    .then((response) => response.json())
    //Appel de la fonction principal
    .then(data => kanap(data)
    )
};

apiProduct()

// Fonction principal pour afficher les produit sur la page html
function kanap(data){
  //boucle afin de récupérer le nombre de produit dans l'api 
  for (const i of data){

    //récuperation de l'élément parent pour chaque produit
    const sectionItem =  document.getElementById("items");

    //déclaration des éléments a créer et intégrer sur la page html
    const newLink = document.createElement('a');
    const newArticle = document.createElement('article');
    const newImg = document.createElement('img');
    const newH3 = document.createElement('h3');
    const newp = document.createElement('p');

    // Ajout de classe sur newp et newH3
    newH3.classList.add("productName");
    newp.classList.add("productDescription");

    // Ajout des attribut href pour envoyer sur la page produit en question et ajout des src-alt pour les image de chaque produit
    newLink.href = "./product.html?"+i._id;
    newImg.src = i.imageUrl;
    newImg.alt = i.altTxt;

    //recupération des texte de l'api et intégration des texte dans les nouveaux h3 et p 
    const nodeNewH3 = document.createTextNode(i.name);
    const nodeNewP = document.createTextNode(i.description);

    //Ajout de chaque enfant dans sont élément parent
    newH3.appendChild(nodeNewH3);
    newp.appendChild(nodeNewP);
    sectionItem.append(newLink);
    newLink.append(newArticle);
    newArticle.append(newImg, newH3, newp);
  }
}