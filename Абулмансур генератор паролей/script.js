const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsLower = "abcdefghijklmnopqrstuvwxyz";
const charsNumbers = '0123456789';
const charsSymbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthVal = document.getElementById("lengthVal");
const uppercaseCb = document.getElementById('uppercaseCb');
const lowercaseCb = document.getElementById('lowercaseCb');
const numbersCb = document.getElementById('numbersCb');
const symbolsCb = document.getElementById('symbolsCb');
const generateBtn = document.getElementById('generateBtn');
const strengthText = document.getElementById('strengthText');

const bars = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4')
];

function generatePassword() {
    let allowedChars = '';
    if (uppercaseCb.checked) allowedChars += charsUpper;
    if (lowercaseCb.checked) allowedChars += charsLower;
    if (numbersCb.checked) allowedChars += charsNumbers;
    if (symbolsCb.checked) allowedChars += charsSymbols;

    if (allowedChars === '') {
        passwordOutput.value = 'Выберите типы символов!';
        resetStrength();
        return;
    }

    const length = parseInt(lengthSlider.value);
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    passwordOutput.value = password;
    evaluateStrength(password);
}

function evaluateStrength(pwd) {
    let score = 0;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 20) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let level = Math.min(Math.floor(score * 0.8), 4);
    const descriptions = ['Слабый', 'Нормальный', 'Хороший', 'Надежный', 'Максимальный'];
    const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#10b981'];

    strengthText.innerText = descriptions[level] || 'Слабый';

    bars.forEach((bar, index) => {
        if (index < level) {
            bar.style.backgroundColor = colors[level];
        } else {
            bar.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
        }
    });
}

function resetStrength() {
    strengthText.innerText = "Не определен";
    bars.forEach(bar => bar.style.backgroundColor = 'rgba(255, 255, 255, 0.06)');
}

lengthSlider.addEventListener('input', () => {
    lengthVal.innerText = lengthSlider.value;
    generatePassword();
});

generateBtn.addEventListener('click', generatePassword);

[uppercaseCb, lowercaseCb, numbersCb, symbolsCb].forEach(cb => {
    cb.addEventListener('change', generatePassword);
});

copyBtn.addEventListener('click', () => {
    if (!passwordOutput.value || passwordOutput.value.includes('Выберите')) {
        return;
    }
    navigator.clipboard.writeText(passwordOutput.value)
        .then(() => {
            copyBtn.style.color = '#10b981';
            setTimeout(() => {
                copyBtn.style.color = '#9ca3af';
            }, 1000);
        })
        .catch(err => {
            console.error('Не удалось скопировать пароль: ', err);
        });
});

generatePassword();
