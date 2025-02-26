import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function isWeekend(date){
    let today = date.format('dddd')

    return today === 'Saturday' || today === 'Sunday'
}



// function checkDay(date, deliveryOption){
//     if(isWeekend(date) && date === 'Sunday' && deliveryOption.deliveryDays===7){
//         date.add(1, 'day')
//     } else if(isWeekend(date) && date === 'Saturday' && deliveryOption.deliveryDays===7){
//         date.add(2, 'days')
//     }
// }