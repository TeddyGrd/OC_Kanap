
// Fonction de récupération des donnée de l'api
const apiProduct = async () => {
    fetch('http://localhost:5500/api/products')
      .then((response) => response.json())

// Appel de la fonction principal product
      .then(data => product(data)
      )
  };


apiProduct()

function product(data){

    // récupération de l'url de la page et suppression du ? pour recuperer seulement l'idProduit
    let url = window.location.search;
    url = url.replace ("?","");

    // boucle afin de récupérer le nombre de produit dans l'api
    for (const i of data){

    // Si l'url est égal a un idProduit dans l'api
        if (i._id == url){

        //récupération des éléments parent
            const itemImg = document.getElementsByClassName('item__img')[0];
            const h1Title = document.getElementById('title');
            const price = document.getElementById('price');
            const pId = document.getElementById("description");

            let optionsColors = document.getElementById("colors");
            
            // Création des nouveaux élément a intégrer
            const newImg = document.createElement("img");

            // récupération de toute les donnée du produit depuis l'api
            let productOption = {
                nameProduct: i.name,
                priceProduct: i.price,
                idProduct: i._id,
                urlProduct: i.imageUrl,
                descriptionProduct: i.description,
                altProduct: i.altTxt,
             };
    
            // On donne a l'img une src et un alt grâce au donnée recuperer de l'api
            newImg.alt = i.altTxt;
            newImg.src = i.imageUrl;

            // Ajout des texte récuperer depuis l'api
            const newH1Title = document.createTextNode(i.name);
            const newPrice = document.createTextNode(i.price);
            const newPId = document.createTextNode(i.description);
            
            // Ajout de chaque enfant dans leur parent
            h1Title.appendChild(newH1Title);
            price.appendChild(newPrice);
            pId.appendChild(newPId);

            itemImg.append(newImg);
            
            // boucle afin de récuperer les donnée dans l'objet colors depuis l'api
            for( const x of i.colors){
                const option = document.createElement("option");

                //on créer un texte contenant les option de couleurs de l'objet
                const newOption = document.createTextNode(x)
                // On ajoute les enfant a leur parent (comprennant la liste de couleur)
                option.appendChild(newOption);
                optionsColors.append(option);
            }
            //Ajout d'un événement lors duquel le clic va envoyer les donnée et option du canapé dans un localStorage pour l'utilisateur
            let buttonCart = document.getElementById("addToCart");
            buttonCart.addEventListener("click", () => {
                //Appel de la fonction d'envoi de donnée il prend en argument la variable contenant les donnée du produit recuperer plus haut 
                paramItem(productOption);
            });

        }
    }
}


function paramItem(productOption){
    
    //déclaration des variables contenant la couleur ainsi que la quantité choisie de l'utilisateur
    let optionsColors = document.getElementById("colors");
    let itemQuantity = document.getElementById("quantity");

    //si la couleur n'est pas null et la quantité supérieur ou égal a 1 
    if( optionsColors.value && itemQuantity.value >=1){

        //On donne la couleurs et la quantité voulue de l'utilisateur dans la variable objet contenant déjà tout ce qui concerne le canapé en question
        productOption.colorsProduct = optionsColors.value;
        productOption.numberProduct = itemQuantity.value;

        //On tente de recuperer un objet sous le nom de product dans le local storage  
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));

        //si productLocalStorage existe donc bel est bien
        if(productLocalStorage){
            //boucle l'équivalent du nombre du nombre de produit dans le local storage
            for(let  i = 0 ; i < productLocalStorage.length; i++){
                //si un produit dans le local storage a le même id et la même couleur
                if(productLocalStorage[i].idProduct == productOption.idProduct && productLocalStorage[i].colorsProduct == productOption.colorsProduct){
                    //alors
                    return(
                        //On recupere le produit depuis le local Storage et on ajoute la quantité voulue de l'utilisateur sur le produit déjà existant
                        productLocalStorage[i].numberProduct = parseInt(productLocalStorage[i].numberProduct) + parseInt(itemQuantity.value),
                        localStorage.setItem("product",JSON.stringify(productLocalStorage)),
                        productLocalStorage = JSON.parse(localStorage.getItem("product")),
                        //Appel de la fonction de confirmation
                        confirmation(productOption)
                    )
                }
            }
             for(let  i = 0 ; i < productLocalStorage.length; i++){
                 //si un produit dans le local storage a le même id et une couleur différente ou un id identique
                 if (productLocalStorage[i].idProduct == productOption.idProduct && productLocalStorage[i].colorsProduct != productOption.colorsProduct || productLocalStorage[i].idProduct == productOption.idProduct) {
                     return(
                         //On recupere le produit depuis le local Storage et on ajoute la quantité voulue de l'utilisateur sur le produit déjà existant        
                         productLocalStorage.push(productOption),
                         localStorage.setItem("product",JSON.stringify(productLocalStorage)),
                         (productLocalStorage = JSON.parse(localStorage.getItem("product"))),
                         confirmation(productOption)
                         )
               }
            }
            for(let  i = 0 ; i < productLocalStorage.length; i++){
                //si un produit dans le local storage a un id différent et une couleur differente ou un id identique 
                if (productLocalStorage[i].idProduct != productOption.idProduct && productLocalStorage[i].colorsProduct != productOption.colorsProduct || productLocalStorage[i].idProduct == productOption.idProduct) {
                    return(
                        // Ajout du produit dans le local storage     
                        productLocalStorage.push(productOption),
                        localStorage.setItem("product",JSON.stringify(productLocalStorage)),
                        (productLocalStorage = JSON.parse(localStorage.getItem("product"))),
                        confirmation(productOption)
                        )
                }
            }
            //Si i est supérieur ou égal au nombre de produit dans le storage 
            for(let  i = 0 ; i >= productLocalStorage.length; i++){
                    return(
                        // Ajout du produit dans le local storage sans condition
                        productLocalStorage.push(productOption),
                        localStorage.setItem("product",JSON.stringify(productLocalStorage)),
                        (productLocalStorage = JSON.parse(localStorage.getItem("product"))),
                        confirmation(productOption)
                        )
                }
        }
        else{
            //Sinon créer la key et intégrer les donnée a productLocalStorage avant de pousser celle-ci dans le localStorage
            productLocalStorage = [];
            productLocalStorage.push(productOption);
            localStorage.setItem("product",JSON.stringify(productLocalStorage));
            confirmation(productOption);
        }

    }
    else {
        //Sinon on previent l'utilisateur qu'il n'a pas bien renseigner son article
        alert("veuillez à bien renseigner une couleur et votre nombre d'article");
    } 
}

//fonction pour afficher a l'utilisateur que sont ajout au panier a bien étais prise en compte
function confirmation(productOption){

    const test = productOption.numberProduct +" "+ productOption.nameProduct +" "+productOption.colorsProduct +" a bien été ajouté au panier";
    if(window.confirm(test));
}