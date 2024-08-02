document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Encryption/Decryption functionality
    const encryptButton = document.querySelector('#encrypt-button');
    const decryptButton = document.querySelector('#decrypt-button');
    const switchButton = document.querySelector('#switch-button');
    const resultArea = document.querySelector('#result');
    const options = document.getElementById('select-cipher');

    if (encryptButton) encryptButton.addEventListener('click', encrypt);
    if (decryptButton) decryptButton.addEventListener('click', decrypt);
    if (switchButton) switchButton.addEventListener('click', flip);
    if (resultArea) resultArea.disabled = true;

    if (options) {
        options.addEventListener('change', function (event) {
            const value = event.target.value;
            document.getElementById("shift").style.display = value === "caesar" ? "inline-block" : "none";
            document.getElementById("shift-label").style.display = value === "caesar" ? "inline-block" : "none";
            document.getElementById("keyword").style.display = value === "keyword" ? "inline-block" : "none";
            document.getElementById("keyword-label").style.display = value === "keyword" ? "inline-block" : "none";
        });
    }

    // Support Page Star Rating 
    const stars = document.querySelectorAll('.rating .star');
    const submitButton = document.getElementById('submit-rating');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            updateStars(currentRating);
        });
    });

    if (submitButton) {
        submitButton.addEventListener('click', function() {
            let notifyArea = document.getElementById('notification');
            let message = document.createElement('p');
            let seconds = document.createElement('p');
            message.innerHTML = `You have rated ${currentRating} stars!`;
            message.classList.add("glowing-text");
            seconds.innerHTML = "5";
            
            notifyArea.appendChild(message);
            notifyArea.appendChild(seconds);
            setTimeout(() => {
                notifyArea.removeChild(message);
                notifyArea.removeChild(seconds);
            }, 5000);
            
            let count = 5;
            const countdown = setInterval(() => {
                count -= 1;
                seconds.innerHTML = count;
                if(count === 0) clearInterval(countdown);
            }, 1000);
        });
    }

    // Account functionality
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Here you would typically send this data to a server
            console.log('Account creation attempted');
            alert('Account created successfully!');
            this.reset();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Here you would typically verify credentials with a server
            console.log('Login attempted');
            alert('Login successful!');
            this.reset();
        });
    }
});

function updateStars(rating) {
    const stars = document.querySelectorAll('.rating .star');
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function encrypt() {
    const option = document.getElementById('select-cipher').value;
    const text = document.getElementById('input').value;
    switch(option) {
        case "caesar": caesarEncrypt(text); break;
        case "atbash": atbashEncrypt(text); break;
        case "keyword": keywordEncrypt(text); break;
        case "morse": morseEncrypt(text); break;
    }
}

function decrypt() {
    const option = document.getElementById('select-cipher').value;
    const text = document.getElementById('input').value;
    switch(option) {
        case "caesar": caesarDecrypt(text); break;
        case "atbash": atbashDecrypt(text); break;
        case "keyword": keywordDecrypt(text); break;
        case "morse": morseDecrypt(text); break;
    }
}

function flip() {
    const leftHeading = document.getElementById("left-heading");
    const rightHeading = document.getElementById("right-heading");
    [leftHeading.textContent, rightHeading.textContent] = [rightHeading.textContent, leftHeading.textContent];

    document.getElementById('result').innerHTML = "";

    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    encryptButton.style.display = encryptButton.style.display === "none" ? "block" : "none";
    decryptButton.style.display = decryptButton.style.display === "none" ? "block" : "none";
}

function caesarEncrypt(inputText) {
    const shift = parseInt(document.getElementById('shift').value);
    const encoded = inputText.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
    document.getElementById('result').textContent = encoded;
}

function caesarDecrypt(inputText) {
    const shift = parseInt(document.getElementById('shift').value);
    const decoded = inputText.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
    }).join('');
    document.getElementById('result').textContent = decoded;
}

function atbashEncrypt(inputText) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    const encoded = inputText.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const upperChar = char.toUpperCase();
            const index = alphabet.indexOf(upperChar);
            let transformedChar = reverseAlphabet[index];
            return char === char.toLowerCase() ? transformedChar.toLowerCase() : transformedChar;
        }
        return char;
    }).join('');
    document.getElementById('result').textContent = encoded;
}

function atbashDecrypt(inputText) {
    return atbashEncrypt(inputText); // Atbash is its own inverse
}

function generateCipherAlphabet(keyword) {
    const uniqueKeyword = Array.from(new Set(keyword.toUpperCase()));
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return uniqueKeyword.join('') + alphabet.split('').filter(letter => !uniqueKeyword.includes(letter)).join('');
}

function keywordEncrypt(inputText) {
    const keyword = document.getElementById('keyword').value;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cipherAlphabet = generateCipherAlphabet(keyword);
    const encoded = inputText.split('').map(char => {
        const isUpperCase = char === char.toUpperCase();
        const baseChar = char.toUpperCase();
        if (alphabet.includes(baseChar)) {
            const cipherChar = cipherAlphabet[alphabet.indexOf(baseChar)];
            return isUpperCase ? cipherChar : cipherChar.toLowerCase();
        }
        return char;
    }).join('');
    document.getElementById('result').textContent = encoded;
}

function keywordDecrypt(inputText) {
    const keyword = document.getElementById('keyword').value;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cipherAlphabet = generateCipherAlphabet(keyword);
    const decoded = inputText.split('').map(char => {
        const isUpperCase = char === char.toUpperCase();
        const baseChar = char.toUpperCase();
        if (cipherAlphabet.includes(baseChar)) {
            const originalChar = alphabet[cipherAlphabet.indexOf(baseChar)];
            return isUpperCase ? originalChar : originalChar.toLowerCase();
        }
        return char;
    }).join('');
    document.getElementById('result').textContent = decoded;
}

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
    const encoded = inputText.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    document.getElementById('result').textContent = encoded;
}

function morseDecrypt(inputText) {
    const morseToText = Object.keys(morseCode).reduce((obj, key) => {
        obj[morseCode[key]] = key;
        return obj;
    }, {});
    const decoded = inputText.split(' ').map(symbol => morseToText[symbol] || symbol).join('');
    document.getElementById('result').textContent = decoded;
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let notifyArea = document.getElementById('notification');
            let message = document.createElement('p');
            let seconds = document.createElement('p');
            message.innerHTML = "Thank you for your message. We'll get back to you soon!";
            message.classList.add("glowing-text");
            seconds.innerHTML = "5";
            
            notifyArea.appendChild(message);
            notifyArea.appendChild(seconds);
            
            setTimeout(() => {
                notifyArea.removeChild(message);
                notifyArea.removeChild(seconds);
                contactForm.reset();
            }, 5000);
            
            let count = 5;
            const countdown = setInterval(() => {
                count -= 1;
                seconds.innerHTML = count;
                if(count === 0) clearInterval(countdown);
            }, 1000);
        });
    }
});