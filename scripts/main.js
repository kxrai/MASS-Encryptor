//Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.querySelector('#encrypt-button');
    encryptButton.addEventListener('click', encrypt);
    const decryptButton = document.querySelector('#decrypt-button');
    decryptButton.addEventListener('click', decrypt);
    const switchButton = document.querySelector('#switch-button');
    switchButton.addEventListener('click', flip);
    var resultArea = document.querySelector('#result');
    resultArea.disabled = true;
    var options = document.getElementById('select-cipher');
    options.addEventListener('change', function (event) {
        const selection = event.target;
        const value = selection.value;
        if (value == "caesar") {
            document.getElementById("shift").style.display = "inline-block";
            document.getElementById("shift-label").style.display = "inline-block";
            document.getElementById("keyword").style.display = "none";
            document.getElementById("keyword-label").style.display = "none";
        }
        else if (value == "keyword") {
            document.getElementById("shift").style.display = "none";
            document.getElementById("shift-label").style.display = "none";
            document.getElementById("keyword").style.display = "inline-block";
            document.getElementById("keyword-label").style.display = "inline-block";
        }
        else {
            document.getElementById("shift").style.display = "none";
            document.getElementById("shift-label").style.display = "none";
            document.getElementById("keyword").style.display = "none";
            document.getElementById("keyword-label").style.display = "none";
        }
    });
  });

//Call Correct Cipher Encryption
function encrypt() {
    let option = document.getElementById('select-cipher').value;
    let text = document.getElementById('input').value;
    if (option == "caesar") {
        caesarEncrypt(text);
    }
    else if (option == "atbash") {
        atbashEncrypt(text);
    }
    else if (option == "keyword") {
        keywordEncrypt(text);
    }
    else if (option == "morse") {
        morseEncrypt(text);
    }
}

//Call Correct Cipher Decryption
function decrypt() {
    let option = document.getElementById('select-cipher').value;
    let text = document.getElementById('input').value;
    if (option == "caesar") {
        caesarDecrypt(text);
    }
    else if (option == "atbash") {
        atbashDecrypt(text);
    }
    else if (option == "keyword") {
        keywordDecrypt(text);
    }
    else if (option == "morse") {
        morseDecrypt(text);
    }
}

//Switch between encrypt and decrypt
function flip() {
    let leftHeading = document.getElementById("left-heading");
    leftTitle = leftHeading.textContent;
    let rightHeading = document.getElementById("right-heading");
    rightTitle = rightHeading.textContent;

    leftHeading.innerHTML = rightTitle;
    rightHeading.innerHTML = leftTitle;

    document.getElementById('result').innerHTML = "";

    let encryptButton = document.getElementById('encrypt-button');
    let decryptButton = document.getElementById('decrypt-button');

    if (encryptButton.style.display == "none"){
        encryptButton.style.display = "block";
        decryptButton.style.display = "none";
    }
    else {
        encryptButton.style.display = "none";
        decryptButton.style.display = "block";
    }
    
}

// Caesar Cipher
function caesarEncrypt(inputText) {
    var shift = parseInt(document.getElementById('shift').value);
    let encoded = inputText.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt();
            let base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
    console.log(inputText, shift, encoded);
    var result = document.getElementById('result');
    result.textContent = encoded;
}
function caesarDecrypt(inputText) {
    var shift = parseInt(document.getElementById('shift').value);
    let decoded = inputText.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt();
            let base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
    }).join('');
    console.log(inputText, shift, decoded);
    var result = document.getElementById('result');
    result.textContent = decoded;
}


// Atbash Cipher
function atbashEncrypt(inputText) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    let encoded = inputText.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            let upperChar = char.toUpperCase();
            const index = alphabet.indexOf(upperChar);
            let transformedChar = reverseAlphabet[index];
            if (char === char.toLowerCase()) {
                transformedChar = transformedChar.toLowerCase();
            }
            return transformedChar;
        }
        return char;
    }).join('');
    console.log(inputText, encoded);
    var result = document.getElementById('result');
    result.textContent = encoded;
}

function atbashDecrypt(inputText) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    let decoded = inputText.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            let upperChar = char.toUpperCase();
            const index = reverseAlphabet.indexOf(upperChar);
            let transformedChar = alphabet[index];
            if (char === char.toLowerCase()) {
                transformedChar = transformedChar.toLowerCase();
            }
            return transformedChar;
        }
        return char;
    }).join('');
    console.log(inputText, decoded);
    var result = document.getElementById('result');
    result.textContent = decoded;
}
// Keyword Cipher
function generateCipherAlphabet(keyword) {
    const uniqueKeyword = Array.from(new Set(keyword.toUpperCase()));
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cipherAlphabet = uniqueKeyword.join('') + alphabet.split('').filter(letter => !uniqueKeyword.includes(letter)).join('');
    return cipherAlphabet;
}

function keywordEncrypt(inputText) {
    var keyword = document.getElementById('keyword').value;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cipherAlphabet = generateCipherAlphabet(keyword);
    let encoded = inputText.split('').map(char => {
        const isUpperCase = char === char.toUpperCase();
        const baseChar = char.toUpperCase();
        if (alphabet.includes(baseChar)) {
            const cipherChar = cipherAlphabet[alphabet.indexOf(baseChar)];
            return isUpperCase ? cipherChar : cipherChar.toLowerCase();
        }
        return char;
    }).join('');
    console.log(inputText, keyword, encoded);
    var result = document.getElementById('result');
    result.textContent = encoded;
}

function keywordDecrypt(inputText) {
    var keyword = document.getElementById('keyword').value;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cipherAlphabet = generateCipherAlphabet(keyword);
    let decoded = inputText.split('').map(char => {
        const isUpperCase = char === char.toUpperCase();
        const baseChar = char.toUpperCase();
        if (cipherAlphabet.includes(baseChar)) {
            const originalChar = alphabet[cipherAlphabet.indexOf(baseChar)];
            return isUpperCase ? originalChar : originalChar.toLowerCase();
        }
        return char;
    }).join('');
    console.log(inputText, keyword, decoded);
    var result = document.getElementById('result');
    result.textContent = decoded;
}
// Morse Code
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '0': '-----', ' ': '/'
};

function morseEncrypt(inputText) {
    let encoded = inputText.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    console.log(inputText, encoded);
    var result = document.getElementById('result');
    result.textContent = encoded;
}

function morseDecrypt(inputText) {
    const morseToText = Object.keys(morseCode).reduce((obj, key) => {
        obj[morseCode[key]] = key;
        return obj;
    }, {});
    let decoded = inputText.split(' ').map(symbol => morseToText[symbol] || symbol).join('');
    console.log(inputText, decoded);
    var result = document.getElementById('result');
    result.textContent = decoded;
}

// Support Page Star Rating 
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating .star');
    const submitButton = document.getElementById('submit-rating');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            updateStars(currentRating);
        });
    });

    submitButton.addEventListener('click', function() {
        let notifyArea = document.getElementById('notification');
        let message = document.createElement('p');
        let seconds = document.createElement('p');
        message.innerHTML = `You have rated ${currentRating} stars!`;
        message.classList.add("glowing-text")
        seconds.innerHTML = "5";
        
        notifyArea.appendChild(message);
        notifyArea.appendChild(seconds);
        setTimeout(function(){
            notifyArea.removeChild(message);
            notifyArea.removeChild(seconds);}, 5000);
        let count = 5;
        const countdown = setInterval(function(){
            count -= 1;
            seconds.innerHTML = count;
            if(count == 0){
                clearInterval(countdown);
            }
        }, 1000);
    });

    function updateStars(rating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});


// Form Validation for Contact Page
function validateEmail(input) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(input);
}

function validateForm(event) {
    var emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
    } else {
        event.preventDefault(); // Prevent the default form submission
        document.getElementById('thank-you-message').style.display = 'block'; // Show the thank you message
        setTimeout(function() {
            document.getElementById('contact-form').reset(); // Reset the form
            document.getElementById('thank-you-message').style.display = 'none'; // Hide the thank you message
        }, 5000);
        let seconds = document.getElementById('countdown');
        seconds.innerHTML = 5;
        let count = 5;
        const countdown = setInterval(function(){
            count -= 1;
            seconds.innerHTML = count;
            if(count == 0){
                clearInterval(countdown);
            }
        }, 1000);
    }
}
