
export let cart = JSON.parse(localStorage.getItem('cart'));



//if the cart is empty at first, we give this default values
if(!cart){
  cart = [{
      productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      quantity: 1,
      deliveryOptionsId: '1'
    },
    {
      productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      quantity: 2,
      deliveryOptionsId: '3'
    }
  ];
}


//note: local storage can only save strings

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, value){
      let matchingItem;


      cart.forEach((product)=> {
        if(productId === product.productId){
          matchingItem = product
        }
      })

      if(matchingItem){
        matchingItem.quantity +=value
      } else {
        cart.push({
          productId: productId,
          quantity: value,
          deliveryOptionsId: '3' 
        })
      }

      saveToStorage();

}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=> {
      if(cartItem.productId !== productId){
        newCart.push(cartItem)
      }
    })

    cart = newCart;

    saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionId){

    let matchingProduct;

    cart.forEach((product)=>{
        if(product.productId === productId){
            matchingProduct = product;
        }
    })


    matchingProduct.deliveryOptionsId = deliveryOptionId;

    saveToStorage()
}

