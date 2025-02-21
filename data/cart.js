export const cart = [];

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
          quantity: value
        })
      }

}