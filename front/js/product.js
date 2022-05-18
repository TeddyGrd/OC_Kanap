

const apiProduct = async () => {
    fetch('http://localhost:5500/api/products')
      .then((response) => response.json())
      .then(data => product(data)
      )
  };


apiProduct()

function product(data){

    let url = window.location.search;
    url = url.replace ("?","");
    
    for (const i of data){

        if (i._id == url){

            const itemImg = document.getElementsByClassName('item__img')[0];
            const h1Title = document.getElementById('title');
            const price = document.getElementById('price');
            const pId = document.getElementById("description");

            let optionsColors = document.getElementById("colors");
    
            const newImg = document.createElement("img");

            let productOption = {
                nameProduct: i.name,
                priceProduct: i.price,
                idProduct: i._id,
             };
    
            newImg.alt = i.altTxt;
            newImg.src = i.imageUrl;

            const newH1Title = document.createTextNode(i.name);
            const newPrice = document.createTextNode(i.price);
            const newPId = document.createTextNode(i.description);
            
            h1Title.appendChild(newH1Title);
            price.appendChild(newPrice);
            pId.appendChild(newPId);

            itemImg.append(newImg);
            
            for( const x of i.colors){
                const option = document.createElement("option");
                option.value =  x;
                const newOption = document.createTextNode(x)
                option.appendChild(newOption);
                optionsColors.append(option);
            }
            let buttonCart = document.getElementById("addToCart");
            buttonCart.addEventListener("click", () => {
                paramItem(productOption);
            });

        }
    }
}


function paramItem(productOption){
    
    let optionsColors = document.getElementById("colors");
    let itemQuantity = document.getElementById("quantity");

    if( optionsColors.value && itemQuantity.value >=1){
        console.log(optionsColors.value);
        console.log(itemQuantity.value);

        console.log (productOption);
        let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        if(productLocalStorage){
    
        }
        else{
            productLocalStorage = [];
            productLocalStorage.push(productOption);
    
            console.log(productLocalStorage);
        }
    }
    else {
        alert("veuillez à bien renseigner une couleur et votre nombre d'article");
    } 
}