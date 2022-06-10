let responseId = (localStorage.getItem("responseId"));

console.log(responseId);


const spanId = document.getElementById("orderId");
spanId.append(responseId);