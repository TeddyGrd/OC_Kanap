
let productOption = JSON.parse(localStorage.getItem("product"));
let formKey = JSON.parse(localStorage.getItem("form"));

let priceTotal = 0;
let articleTotal = 0; 

function recupPanier(){

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

    const submitButton = document.getElementById("order");
    submitButton.addEventListener("click", () => {
        formulaire();
    } )

    const formName = document.getElementById("firstName");
    const formLastName = document.getElementById("lastName");
    const formAddress = document.getElementById("address");
    const formCity = document.getElementById("city");
    const formEmail = document.getElementById("email");

    formName.value = formKey[0].Prénom;
    formLastName.value = formKey[0].Nom;
    formAddress.value = formKey[0].Adresse;
    formCity.value = formKey[0].Ville;
    formEmail.value = formKey[0].Email;
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

    productOption[i].numberProduct =  parseInt(quantityValue[i].value);
    localStorage.setItem("product",JSON.stringify(productOption));
    productOption = JSON.parse(localStorage.getItem("product"));
    
    afficheTotal(quantityValue,i);

}


function afficheTotal(quantityValue,i){
    
    priceTotal = 0;
    articleTotal = 0; 


    const articleTotaux = document.getElementById("totalQuantity");
    const priceTotaux = document.getElementById("totalPrice");

    for(let x = 0 ; x < productOption.length ; x++ ){

        priceTotal = productOption[x].priceProduct * quantityValue[x].value + priceTotal,
        articleTotal = parseInt(quantityValue[x].value) + articleTotal;
    }
    
    priceTotaux.append(priceTotal);

    articleTotaux.innerText = "";
    articleTotaux.append(articleTotal);
    priceTotaux.innerText = "";
    priceTotaux.append(priceTotal);
    
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


function formulaire(){

    const formName = document.getElementById("firstName");
    const formLastName = document.getElementById("lastName");
    const formAddress = document.getElementById("address");
    const formCity = document.getElementById("city");
    const formEmail = document.getElementById("email");

    const formData = {
        Prénom: formName.value,
        Nom: formLastName.value,
        Adresse: formAddress.value,
        Ville : formCity.value,
        Email: formEmail.value,
    }

    console.log(validateName(formLastName.value))

    if(validateName(formName.value) && validateName(formLastName.value) && formAddress.value && formCity.value && formAddress.value && validateEmail(formEmail.value)){

        let formLocalStorage = JSON.parse(localStorage.getItem("form"));
        formLocalStorage = [];
        formLocalStorage.push(formData);
        localStorage.setItem("form",JSON.stringify(formLocalStorage));
    }
}

function validateEmail(email){
    let emailExp = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    let valid = emailExp.test(email);

    if(valid) {
        return true;
    } else {
        return false;
    }
}
function validateName(name){
    let nameExp = /^([a-zA-Z ]+)$/;
    let valid = nameExp.test(name);

    if(valid) {
        return true;
    } else {
        return false;
    }
}