
let productOption = JSON.parse(localStorage.getItem("product"));

async function recupPanier(){
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

        const pQuantity = newP("Qté : "+ numberArticle);
        newInput.value = "42";
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
    }
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
