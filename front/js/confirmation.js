

function main(){

    let responseId = (localStorage.getItem("responseId"));
    const spanId = document.getElementById("orderId");
    spanId.append(responseId);
}

//Appel de la fonction main
main();