//récupération des données product dans la panier storage
let productOption = JSON.parse(localStorage.getItem("product"));

let totalPrice = 0;
let totalItem = 0; 

// fonction principal
function cartRecover(){

    //boucle récuperant chaque élément dans le local storage
    for(i of productOption){

        //récupération des données de l'article dans le local storage
        let article = i;

        let nameArticle = article.nameProduct;
        let priceArticle = article.priceProduct;
        let colorsArticle = article.colorsProduct;
        let numberArticle = article.numberProduct;
        let urlArticle = article.urlProduct;
        let altArticle = article.altProduct;

        //récupération des noeuds parents
        const sectionCartItem = document.getElementById("cart__items");
        
        // Création des éléments DOM
        const newArticle = document.createElement("article");

        let newImg = document.createElement("img");
        let newH2 = document.createElement("h2");
        let newInput = document.createElement("input");

        //Ajout de la class requise sur les nouveaux article
        newArticle.classList.add("cart__item");

        //Déclaration des class nécéssaire
        const classCartItemImg = "cart__item__img";
        const classCartItemContent = "cart__item__content"
        const classCartItemContentDescription = classCartItemContent+"__description";
        const classCartItemContentSettings = "cart__item__content__settings";
        const classCartItemContentSettingsQuantity = classCartItemContentSettings +"__quantity";
        const classDivDelete = "cart__item__content__settings__delete";

        // déclaration des nouvelle div via une fonction newDiv
        const divImg = newDiv(classCartItemImg);
        const divContent = newDiv(classCartItemContent);
        const divContentDescription = newDiv(classCartItemContentDescription);


        // Ajout d'une image et d'un alt pour chaque élément du panier 
        newImg.src = urlArticle;
        newImg.alt = altArticle;

        //Ajout de la div img dans le noeud parent
        divImg.append(newImg);

        //Ajout des informations dans le nouveau h2
        newH2 = document.createTextNode(nameArticle);

        //Déclaration des nouveau <p> via la fonction newP
        const pDescription = newP(colorsArticle);
        const pPrice = newP(priceArticle + " €");
        const pQuantity = newP("Qté :");

        //Déclaration des nouvelles div via la fonction newDiv
        const divContentSettings = newDiv(classCartItemContentSettings);
        const divContentSettingsQuantity = newDiv(classCartItemContentSettingsQuantity);

        //Renseignement de tout les paramètre du nouvelle input
        newInput.value = numberArticle;
        newInput.type = "number"
        newInput.min = "1";
        newInput.max = "100";
        newInput.classList.add("itemQuantity");
        newInput.name = "itemQuantity";

        //Ajout du bouton supprimer avec un nouvelle div/p et une nouvelle classList
        const divDelete = newDiv(classDivDelete);
        const pDelete = newP("Supprimer");
        pDelete.classList.add("deleteItem");

        //Ajout de chaque enfants dans son noeud parents
        divContentDescription.append(newH2,pDescription,pPrice);
        divContentSettings.append(divContentSettingsQuantity,divDelete);
        divDelete.append(pDelete);
        divContentSettingsQuantity.append(pQuantity,newInput);
        divContent.append(divContentDescription,divContentSettings);
        newArticle.append(divImg,divContent);
        sectionCartItem.append(newArticle);

        //Calcul pour afficher le prix totaux de tout les article combiné
        totalPrice = priceArticle*numberArticle + totalPrice;
        totalItem = parseInt(numberArticle) + totalItem;


    }
    //Fin de la boucle

    //Récupération des noeud parent
    const itemTotals = document.getElementById("totalQuantity");
    const totalPrices = document.getElementById("totalPrice");

    //Ajout des enfant au noeud parent 
    itemTotals.append(totalItem);
    totalPrices.append(totalPrice);

    //appel de la fonction permettant de cibler un article pour le supprimer
    articleSelection();

    //Récupération de la quantité d'un article
    let quantityValue = document.getElementsByClassName("itemQuantity");

    //Boucle permettant de cibler un article et appel la fonction articleQuantity a chaque changement de valeur de l'input
    for(let i = 0; i < quantityValue.length; i++) {
        quantityValue[i].addEventListener('change', () => {
            articleQuantity(quantityValue, i);
        })
    }

    //Récupération du boutton order et appel de la fonction form au click de celui-ci
    const submitButton = document.getElementById("order");
    submitButton.addEventListener("click", () => {
        form(productOption);
    } )
}
//Sortie de la fonction principale


//Appel de la fonction principal
cartRecover();

function articleSelection(){

    //On récupère le bouton delete grâce a sa class
    let selectDelete = document.getElementsByClassName("deleteItem");

    //Boucle permettant de cibler un article et appel la fonction deleteArticle qui prend en argument i au click du bouton delete
    for(let i = 0; i < selectDelete.length; i++) {
        selectDelete[i].addEventListener("click", () => {
          deleteArticle(i);
        })
      }
}

function deleteArticle(i){
    let tab = []
    tab = productOption;
    //On retire 1 élément a l'emplacement i
    tab.splice([i],1);
    //On remet tab modifier dans le local storage
    productOption = localStorage.setItem('product', JSON.stringify(tab));
    //On force le reload de la page pour ne plus afficher le produit supprimer
    location.reload();
}

function articleQuantity (quantityValue,i){

    //le nombre d'article de productOption[i] prend la valeur de la value de l'input
    productOption[i].numberProduct =  parseInt(quantityValue[i].value);
    //changement du nombre d'article sur l'item en question dans le local storage
    localStorage.setItem("product",JSON.stringify(productOption));
    productOption = JSON.parse(localStorage.getItem("product"));
    
    //Appel de la fonction totalDisplay pour afficher le prix dynamiquement
    totalDisplay(quantityValue);

}


function totalDisplay(quantityValue){
    
    totalPrice = 0;
    totalItem = 0; 

    //récupération des noeuds parent
    const itemTotals = document.getElementById("totalQuantity");
    const totalPrices = document.getElementById("totalPrice");

    //boucle permettant de calculer le nombre de produit totaux avec leur prix respectif
    for(let x = 0 ; x < productOption.length ; x++ ){

        totalPrice = productOption[x].priceProduct * quantityValue[x].value + totalPrice,
        totalItem = parseInt(quantityValue[x].value) + totalItem;
    }
    
    //Ajout des enfants au noeud parent
    totalPrices.append(totalPrice);

    itemTotals.innerText = "";
    itemTotals.append(totalItem);
    totalPrices.innerText = "";
    totalPrices.append(totalPrice);
    
}

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


function form(productOption){

    //Récupération des éléments du formulaire
    const formName = document.getElementById("firstName");
    const formLastName = document.getElementById("lastName");
    const formAddress = document.getElementById("address");
    const formCity = document.getElementById("city");
    const formEmail = document.getElementById("email");

    //Si tout les éléments du forumulaire sont conforme
    if(validateName(formName.value) && validateName(formLastName.value) && formAddress.value && formCity.value && formAddress.value && validateEmail(formEmail.value)){

        //On récupère les value du formulaire dans un objet
        const contact = {
            firstName: formName.value,
            lastName: formLastName.value,
            address: formAddress.value,
            city : formCity.value,
            email: formEmail.value,
        }

        //déclaration de products en array
        let products = [];

        //Récupération de l'id de tout les article dans la variable products
        for(let i = 0 ; i < productOption.length; i++){
            products.push(productOption[i].idProduct)
            console.log(products);
        }

        //déclaration de sendForm comprennant products et contact
        const sendForm = {
            products,
            contact
        }

        //on envoi une requête POST contenant la variable sendForm
        let options =  fetch("http://localhost:5500/api/products/order",{
             method: "POST",
             body: JSON.stringify(sendForm),
             headers: {
                 "Accept": "application/json",
                 "Content-Type" : "application/json"
             }
         });
         options.then(async(response)=>{
            try{
                const contenue = await response.json();
                console.log(contenue)
                //Si la réponse du serveur est OK
                if (response.ok){
                    //On enregistre la réponse dans le local storage et on oriente la page vers la page de confirmation
                    localStorage.setItem("responseId", contenue.orderId);
                    window.location = "confirmation.html";
                }
            }
            catch(e){
                //On demande l'erreur dans la console
                console.log(e);
            }
         })   
    }
}

function validateEmail(email){
    //vérification de la validité d'un email avec les regex
    let emailExp = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    let valid = emailExp.test(email);

    if(valid) {
        return true;
    } else {
        return false;
    }
}
function validateName(name){
    //Vérification de la validité d'un nom (pas de numéro) avec les regex
    let nameExp = /^([a-zA-Z ]+)$/;
    let valid = nameExp.test(name);

    if(valid) {
        return true;
    } else {
        return false;
    }
}