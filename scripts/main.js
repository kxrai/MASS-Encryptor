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
    let encoded = inputText.toUpperCase().split('').map(char => {
        if (alphabet.includes(char)) {
            return cipherAlphabet[alphabet.indexOf(char)];
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
    let decoded = inputText.toUpperCase().split('').map(char => {
        if (cipherAlphabet.includes(char)) {
            return alphabet[cipherAlphabet.indexOf(char)];
        }
        return char;
    }).join('');
    console.log(inputText, keyword, decoded);
    var result = document.getElementById('result');
    result.textContent = decoded;
}

// Morse Code