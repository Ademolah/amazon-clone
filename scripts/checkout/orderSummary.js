import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { convertFromCents } from "../utils/money.js";
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";

hello()

const today = dayjs()
const deliveryDate = today.add(7, 'days')


export function renderOrderSummary(){

    updateCartQuantity()

    let itemHtml = '';

    cart.forEach((cartItem)=> {
        const productId = cartItem.productId;
        

        let matchingProduct;

        products.forEach((product) => {
            if(product.id === productId){
                matchingProduct = product
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionsId;

        let deliveryOption;

        deliveryOptions.forEach((option)=> {
            if(option.id === deliveryOptionId){
                deliveryOption = option
            }
        });



        const today = dayjs()
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );

        const dateFormat = deliveryDate.format('dddd, MMMM D');


        itemHtml  += `
            <div class="cart-item-container 
                js-cart-item-container-${matchingProduct.id}
            ">
                <div class="delivery-date">
                Delivery date: ${dateFormat}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${convertFromCents(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link "
                    data-product-id="${matchingProduct.id}
                    ">
                        Update
                    </span>
                    <input type="number" class='quantity-input'>
                    <span class="save-quantity-link link-primary 
                        js-save-link"
                        data-product-id="${matchingProduct.id}"
                    >Save</span>
                    <span class="delete-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>
        `

    })

    function deliveryOptionsHTML(matchingProduct, cartItem){

        let deliveryHTML = '';

        deliveryOptions.forEach((deliveryOption)=> {
            const today = dayjs()
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days'
            );

            const dateFormat = deliveryDate.format('dddd, MMMM D');

            const price = deliveryOption.priceCents === 0 ? 'FREE' :
            `$${convertFromCents(deliveryOption.priceCents)} -`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

            deliveryHTML += `
                <div class="delivery-option js-delivery-options"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}"
                >
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateFormat}
                        </div>
                        <div class="delivery-option-price">
                        ${price}  Shipping
                        </div>
                    </div>
                </div>
            
            `
        })

        return deliveryHTML;
    }

    document.querySelector('.order-summary').innerHTML = itemHtml;

    document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId

            console.log(productId)
        
            removeFromCart(productId)

            const container = document.querySelector(`.js-cart-item-container-${productId}`)

            container.remove()
            
        })
    })

    document.querySelectorAll('.js-update-link').forEach((link)=>{
        link.addEventListener('click', ()=> {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`)

            container.classList.add('is-editing-quantity')
            
        });
    });


    document.querySelectorAll('.js-save-link').forEach((link)=> {
        link.addEventListener('click', ()=> {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`)


            container.classList.remove('.js-save-link')
        })
    })


    function updateCartQuantity(){
        let quantity =0;

        cart.forEach((item) => {
            quantity += item.quantity;
        })

        document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} Items`

    }

    document.querySelectorAll('.js-delivery-options').forEach((option)=> {
        
        option.addEventListener('click', ()=> {
            const productId = option.dataset.productId;
            const deliveryOptionId = option.dataset.deliveryOptionId;
            // const { productId, deliveryOptionId} = option.dataset;


            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()
        })
    })


}

