import { convertFromCents } from "../scripts/utils/money.js";

if(convertFromCents(3098) === '30.987'){
    console.log('Passed')
} else {
    console.log('Failed')
}

if(convertFromCents(0) === '0.00'){
    console.log('Passed')
} else {
    console.log('Failed')
}

if(convertFromCents(2000.5) === '20.01'){
    console.log('Passed')
} else {
    console.log('Failed')
}

if(convertFromCents(2000.4) === '20.00'){
    console.log('Passed')
} else {
    console.log('Failed')
}