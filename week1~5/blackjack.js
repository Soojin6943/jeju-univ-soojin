// blackjack.js
let cardOne = 7;
let cardTwo = 5;
let sum = cardOne + cardTwo;
let cardOneBank = 7;
let cardTwoBank = 5;
let cardThreeBank = 6;
let cardFourBank = 2;
// backsum 20

if (sum === 21){
    console.log('You Win');
} else {
    while (sum < 17){
        let plusCard = 4;
        sum += plusCard;
        // sum = 20
    }
    // let cardThree = 7;
    // sum += cardThree;

    if (sum> 21) {// sum이 딜러
        console.log('You lost');
    }
    console.log(`You have ${sum} points`);

    let bankSum = cardOneBank + cardTwoBank + cardThreeBank + cardFourBank;

    if (bankSum > 21 || (sum <= 21 && sum > bankSum)) {
        console.log('You win');
    } else if (bankSum == sum) {
        console.log("Draw");
    }
     else {
        console.log('Bank wins');
    }
}
