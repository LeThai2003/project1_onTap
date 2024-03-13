//alert
const alert = document.querySelector("[show-alert]");
if(alert)
{
    let time = alert.getAttribute("data-time");
    time = parseInt(time);
    setTimeout(() => {
        alert.classList.add("alert-hidden");
    }, time);

    const closeAlert = alert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        alert.classList.add("alert-hidden");
    });
}
//end alert

//----change quantity 
const tableCart = document.querySelector("[table-cart]");
if(tableCart)
{
    const inputsQuantity = tableCart.querySelectorAll("input[name='quantity']");
    inputsQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("item-id");
            const quantity = parseInt(input.value);

            window.location.href = `/carts/update/${productId}/${quantity}`;
        });
    });
}
//----change quantity 