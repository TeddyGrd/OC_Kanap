

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

    
            newImg.alt = i.altTxt;
            newImg.src = i.imageUrl;
            h1Title.innerHTML = i.name;
            price.innerHTML = i.price;
            pId.innerHTML = i.description;

            itemImg.append(newImg);
            
            for( const x of i.colors){
                const newOption = document.createElement("option");
                newOption.value =  x;
                newOption.innerHTML= x;
                optionsColors.append(newOption);
            }
        }
    }
}
