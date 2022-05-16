
const apiProduct = async () => {
  fetch('http://localhost:5500/api/products')
    .then((response) => response.json())
    .then(data => kanap(data)
    )
};

apiProduct()

function kanap(data){
  for (const i of data){

    const sectionItem =  document.getElementById("items");

    const newLink = document.createElement('a');
    const newArticle = document.createElement('article');
    const newImg = document.createElement('img');
    const newH3 = document.createElement('h3');
    const newp = document.createElement('p');

    newH3.classList.add("productName");
    newp.classList.add("productDescription");

    newLink.href = "./product.html?"+i._id;
    newImg.src = i.imageUrl;
    newImg.alt = i.altTxt;
    newH3.innerHTML = i.name;
    newp.innerHTML = i.description;

    sectionItem.append(newLink);
    newLink.append(newArticle);
    newArticle.append(newImg, newH3, newp);
  }
}