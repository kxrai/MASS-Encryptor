

//Call Correct Cipher
function encrypt() {
    var option = document.getElementById('selectCipher').value;
    var text = document.getElementById('input').value;
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
function caesarDecrypt(inputText, shift) {
    let decoded = inputText.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt();
            let base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
    }).join('');
    var result = document.getElementById('result');
    result.textContent = decoded;
}


// Atbash Cipher


// Keyword Cipher


// Morse Code