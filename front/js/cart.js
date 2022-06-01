
let productOption = JSON.parse(localStorage.getItem("product"));



function recupPanier(){
     let priceTotal = 0;
     let articleTotal = 0; 

    for(i of productOption){

        const sectionCartItem = document.getElementById("cart__items");
        const newArticle = document.createElement("article");
        newArticle.classList.add("cart__item");
        
        let article = i;

        let nameArticle = article.nameProduct;
        let priceArticle = article.priceProduct;
        let idArticle = article.idProduct;
        let colorsArticle = article.colorsProduct;
        let numberArticle = article.numberProduct;
        let urlArticle = article.urlProduct;
        let descriptionProduct = article.descriptionProduct;
        let altArticle = article.altProduct;


        let newImg = document.createElement("img");
        let newH2 = document.createElement("h2");
        let newInput = document.createElement("input");

        const classCartItemImg = "cart__item__img";
        const classCartItemContent = "cart__item__content"
        const classCartItemContentDescription = classCartItemContent+"__description";
        const classCartItemContentSettings = "cart__item__content__settings";
        const classCartItemContentSettingsQuantity = classCartItemContentSettings +"__quantity";
        const classDivDelete = "cart__item__content__settings__delete";

        const divImg = newDiv(classCartItemImg);
        const divContent = newDiv(classCartItemContent);
        const divContentDescription = newDiv(classCartItemContentDescription);

        newImg.src = urlArticle;
        newImg.alt = altArticle;
        divImg.append(newImg);

        newH2 = document.createTextNode(nameArticle);
        const pDescription = newP(colorsArticle);
        const pPrice = newP(priceArticle + " €");

        const divContentSettings = newDiv(classCartItemContentSettings);
        const divContentSettingsQuantity = newDiv(classCartItemContentSettingsQuantity);

        const pQuantity = newP("Qté :");
        newInput.value = numberArticle;
        newInput.type = "number"
        newInput.min = "1";
        newInput.max = "100";
        newInput.classList.add("itemQuantity");
        newInput.name = "itemQuantity";

        const divDelete = newDiv(classDivDelete);
        const pDelete = newP("Supprimer");
        pDelete.classList.add("deleteItem");

        divContentDescription.append(newH2,pDescription,pPrice);
        divContentSettings.append(divContentSettingsQuantity,divDelete);
        divDelete.append(pDelete);
        divContentSettingsQuantity.append(pQuantity,newInput);
        divContent.append(divContentDescription,divContentSettings);
        newArticle.append(divImg,divContent);
        sectionCartItem.append(newArticle);

      priceTotal = priceArticle*numberArticle + priceTotal;
       articleTotal = parseInt(numberArticle) + articleTotal;


    }
     const articleTotaux = document.getElementById("totalQuantity");
     const priceTotaux = document.getElementById("totalPrice");
    articleTotaux.append(articleTotal);
    priceTotaux.append(priceTotal);

    selectionArticle();

    let quantityValue = document.getElementsByClassName("itemQuantity");
    for(let i = 0; i < quantityValue.length; i++) {
        quantityValue[i].addEventListener('change', () => {
            articleQuantity(quantityValue, i);
        })
    }
}

function selectionArticle(){

    let selectDelete = document.getElementsByClassName("deleteItem");

    for(let i = 0; i < selectDelete.length; i++) {
        selectDelete[i].addEventListener("click", () => {
          deleteArticle(i);
        })
      }
}

function deleteArticle(i){
    let articleSelectionner = productOption[i].idProduct;
    let tab = []
    tab = productOption;
    tab.splice([i],1);
    productOption = localStorage.setItem('product', JSON.stringify(tab));
    console.log(articleSelectionner);
    console.log(i);
    location.reload();
}

function articleQuantity (quantityValue,i){

        console.log(quantityValue[i].value);
        productOption[i].numberProduct =  parseInt(quantityValue[i].value);
        localStorage.setItem("product",JSON.stringify(productOption));
        productOption = JSON.parse(localStorage.getItem("product"));  

        // let priceTotal = 0;
        // let articleTotal = 0; 
        
        
        // priceTotal = productOption[i].priceProduct * quantityValue[i].value + priceTotal;
        // articleTotal = parseInt(quantityValue[i].value) + articleTotal;

        // const articleTotaux = document.getElementById("totalQuantity");
        // const priceTotaux = document.getElementById("totalPrice");
        // articleTotaux.append(articleTotal);
        // priceTotaux.append(priceTotal);

}



recupPanier();


function newDiv(classDiv){
    const newDiv = document.createElement("div");
    newDiv.classList.add(classDiv);
    return newDiv
}
function newP(par){
    const newP = document.createElement("p");
    paramP = document.createTextNode(par);
    newP.appendChild(paramP);
    return newP
}