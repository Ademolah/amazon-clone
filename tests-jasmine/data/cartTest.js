import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suit: addToCart', ()=> {
    it('adds an existing product to the Cart', ()=> {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage ,'getItem').and.callFake(()=> {
            return JSON.stringify([
                {
                    productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                    quantity: 1,
                    deliveryOptionsId: '1'
                  }
            ])
        })
        loadFromStorage()
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        ('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        // expect(cart[0].quantity).toEqual(2)
    });

    it('adds new product to the Cart', ()=> {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage ,'getItem').and.callFake(()=> {
            return JSON.stringify([])
        })
        loadFromStorage()

        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        // expect(cart[0].quantity).toEqual(1)
    });
})