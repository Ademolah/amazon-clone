import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { convertFromCents } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { updateCartQuantity } from "./cartquantity.js";



export function renderPaymentSummary(){
    let totalProductPrice = 0;
    let shippingPrice = 0;
   

    cart.forEach((cartItem)=> {
        const product = getProduct(cartItem.productId);

        totalProductPrice += product.priceCents * cartItem.quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId)
        shippingPrice += deliveryOption.priceCents 

    })

    const totalBeforeTax = totalProductPrice + shippingPrice
    const taxCents = totalBeforeTax * 0.1;

    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = ` 
            <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row js-item-quantity">
                    <div>Items (${updateCartQuantity()}):</div>
                    <div class="payment-summary-money">
                    $${convertFromCents( totalProductPrice)}
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">
                    $${convertFromCents(shippingPrice)}
                    </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">
                    $${convertFromCents(totalBeforeTax)}
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">
                        $${convertFromCents(taxCents)}
                    </div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">
                        $${convertFromCents(totalCents)}
                    </div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
        `
    
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}

// renderPaymentSummary()