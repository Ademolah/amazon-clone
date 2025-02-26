import { cart } from "../../data/cart.js";


export function updateCartQuantity(){
    let quantity =0;

    cart.forEach((item) => {
        quantity += item.quantity;
    })

    document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} Items`

    return quantity
}