
function generateOneDigit() {
    var randomNumber = Math.floor(Math.random() * 10) // 00 - 09
    return randomNumber;
}


function generateTwoDigit() {
    var randomNumber = Math.floor(Math.random() * 100) // 00 - 99
    return randomNumber;
}


function generateSixDigit() {
    var randomNumber = Math.floor(Math.random() * 900000) + 100000 // 100000 - 999999
    return randomNumber;
}


export default { generateOneDigit, generateTwoDigit, generateSixDigit };