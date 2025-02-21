export const cart = [{
  productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  quantity: 6
},
{
  productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  quantity: 2
}
];

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