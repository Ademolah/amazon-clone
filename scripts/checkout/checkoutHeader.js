import { updateCartQuantity } from "./cartquantity.js";



let checkoutHeaderHTML = '';
export function renderCheckoutHeader(){
    checkoutHeaderHTML +=` 
        Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">3 items</a>)
    `

    document.querySelector('.checkout-header-middle-section').innerHTML= checkoutHeaderHTML;
}