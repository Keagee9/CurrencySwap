const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Currency Converter Logic
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const API_URL = 'https://v6.exchangerate-api.com/v6/';

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
const swapBtn = document.getElementById('swap-currencies');

// Popular currencies
const popularCurrencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NZD'
];

// Initialize currency dropdowns
async function initializeCurrencies() {
    try {
        const response = await fetch(`${API_URL}${API_KEY}/codes`);
        const data = await response.json();
        
        if (data.result === 'success') {
            const currencies = data.supported_codes;
            
            // Sort currencies to put popular ones first
            currencies.sort((a, b) => {
                const aPopular = popularCurrencies.includes(a[0]);
                const bPopular = popularCurrencies.includes(b[0]);
                if (aPopular && !bPopular) return -1;
                if (!aPopular && bPopular) return 1;
                return a[0].localeCompare(b[0]);
            });

            currencies.forEach(([code, name]) => {
                const option = `<option value="${code}">${code} - ${name}</option>`;
                fromCurrency.insertAdjacentHTML('beforeend', option);
                toCurrency.insertAdjacentHTML('beforeend', option);
            });

            // Set default values
            fromCurrency.value = 'USD';
            toCurrency.value = 'EUR';
        }
    } catch (error) {
        console.error('Error fetching currencies:', error);
        showError('Failed to load currencies. Please try again later.');
    }
}

// Convert currency
async function convertCurrency() {
    if (!amount.value || amount.value <= 0) {
        showError('Please enter a valid amount');
        return;
    }

    try {
        convertBtn.disabled = true;
        convertBtn.textContent = 'Converting...';

        const response = await fetch(`${API_URL}${API_KEY}/pair/${fromCurrency.value}/${toCurrency.value}/${amount.value}`);
        const data = await response.json();

        if (data.result === 'success') {
            const convertedAmount = data.conversion_result.toFixed(2);
            result.innerHTML = `
                <span class="result-amount">${convertedAmount}</span>
                <span class="result-currency">${toCurrency.value}</span>
            `;
        } else {
            showError('Conversion failed. Please try again.');
        }
    } catch (error) {
        console.error('Error converting currency:', error);
        showError('Conversion failed. Please try again later.');
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = 'Convert';
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    if (amount.value) {
        convertCurrency();
    }
}

// Show error message
function showError(message) {
    result.innerHTML = `<span class="error">${message}</span>`;
}

// Event listeners
if (convertBtn) {
    convertBtn.addEventListener('click', convertCurrency);
}

if (swapBtn) {
    swapBtn.addEventListener('click', swapCurrencies);
}

// Initialize currencies if on the converter page
if (fromCurrency && toCurrency) {
    initializeCurrencies();
}

// Form Validation
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        alert('Login functionality will be implemented soon!');
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Add your signup logic here
        alert('Sign up functionality will be implemented soon!');
    });
}