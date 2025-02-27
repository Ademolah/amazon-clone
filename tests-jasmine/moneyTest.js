// import { describe } from "pm2";
import { convertFromCents } from "../scripts/utils/money.js";

describe('test suit: formatCurrency', ()=> {
    it('converts cents into dollars', ()=>{
        expect(convertFromCents(1956)).toEqual('19.56')
    });

    it('works with 0', ()=>{
        expect(convertFromCents(0)).toEqual('0.00')
    });

    it('works with rounding up', ()=>{
        expect(convertFromCents(2000.5)).toEqual('20.01')
    })
})
