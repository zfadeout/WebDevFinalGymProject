// Get the membership form and toggle button
const membershipForm = document.getElementById('membership-form');
const membershipToggleBtn = document.querySelector('.membership-toggle-btn');

// Add event listener to the toggle button
membershipToggleBtn.addEventListener('click', () => {
  membershipForm.parentElement.classList.toggle('show');
});

// Add event listener to the premium plan radio buttons
const premiumPlanRadios = document.querySelectorAll('input[name="premiumPlan"]');
premiumPlanRadios.forEach((radio) => {
  radio.addEventListener('change', calculateTotal);
});

// Add event listener to the months select dropdown
const monthsSelect = document.getElementById('months');
monthsSelect.addEventListener('change', calculateTotal);

// Calculate the total amount based on the selected plan and months
function calculateTotal() {
  const premiumPlan = document.querySelector('input[name="premiumPlan"]:checked').value;
  const months = parseInt(document.getElementById('months').value);
  const totalAmount = calculateTotalAmount(premiumPlan, months);
  document.getElementById('totalAmount').value = totalAmount;
}

// Add event listener to the form submit event
membershipForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get form input values
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvc = document.getElementById('cvc').value;
    const premiumPlan = document.querySelector('input[name="premiumPlan"]:checked').value;
    const months = parseInt(document.getElementById('months').value);
    const cardType = document.getElementById('cardType').value;
  
    // Perform validation
    const isCardNumberValid = validateCardNumber(cardNumber, cardType);
    const isExpirationDateValid = validateExpirationDate(expirationDate);
    const isCvcValid = validateCvc(cvc, cardType);
  
    if (isCardNumberValid && isExpirationDateValid && isCvcValid) {
      // Form is valid, display the total amount section
      const totalAmount = calculateTotalAmount(premiumPlan, months);
      document.getElementById('displayTotalAmount').textContent = totalAmount;
      document.getElementById('totalAmountSection').style.display = 'flex';
    } else {
      // Form is invalid, display an error message
      alert('Please check your card information and try again.');
    }
  });


window.addEventListener('load', () => {
  if (window.location.pathname.includes('confirmation.html')) {
    document.getElementById('receiptName').textContent = sessionStorage.getItem('name');
    document.getElementById('receiptCardNumber').textContent = sessionStorage.getItem('cardNumber');
    document.getElementById('receiptExpirationDate').textContent = sessionStorage.getItem('expirationDate');
    document.getElementById('receiptPlan').textContent = getPlanName(sessionStorage.getItem('premiumPlan'));
    document.getElementById('receiptMonths').textContent = sessionStorage.getItem('months');
    document.getElementById('receiptAmount').textContent = sessionStorage.getItem('totalAmount');
  }
});

// Card number validation function
function validateCardNumber(cardNumber, cardType) {
  // Remove all non-digit characters from the card number
  const sanitizedCardNumber = cardNumber.replace(/\D/g, '');

  // Check if the card number matches the selected card type pattern
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardPattern = /^5[1-5][0-9]{14}$/;
  const discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

  switch (cardType) {
    case 'visa':
      return visaPattern.test(sanitizedCardNumber);
    case 'mastercard':
      return mastercardPattern.test(sanitizedCardNumber);
    case 'discover':
      return discoverPattern.test(sanitizedCardNumber);
    default:
      return false;
  }
}

// Expiration date validation function
function validateExpirationDate(expirationDate) {
  // Remove all non-digit characters from the expiration date
  const sanitizedExpirationDate = expirationDate.replace(/\D/g, '');

  // Check if the expiration date is in the correct format (MMYY)
  const pattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

  if (!pattern.test(sanitizedExpirationDate)) {
    return false;
  }

  const [month, year] = sanitizedExpirationDate.match(pattern).slice(1);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  // Check if the expiration date is in the future
  if (year > currentYear) {
    return true;
  } else if (year === currentYear && month >= currentMonth) {
    return true;
  } else {
    return false;
  }
}

// CVC validation function
function validateCvc(cvc, cardType) {
  // Check if the CVC is a 3-digit number
  const cvcPattern = /^[0-9]{3}$/;

  if (!cvcPattern.test(cvc)) {
    return false;
  }

  // Check if the CVC matches the selected card type
  switch (cardType) {
    case 'visa':
    case 'mastercard':
    case 'discover':
      return true;
    default:
      return false;
  }
}

// Calculate total amount based on premium plan and months
function calculateTotalAmount(premiumPlan, months) {
    let monthlyPrice = 40;
  
    if (premiumPlan === 'super') {
      monthlyPrice = 55;
    } else if (premiumPlan === 'legendary') {
      monthlyPrice = 70;
    }
  
    const subtotal = monthlyPrice * months;
    const tax = subtotal * 0.08; // Calculate 8% tax
    const totalAmount = subtotal + tax;
  
    return `$${totalAmount.toFixed(2)}`;
  }

// Get the plan name based on the premium plan value
function getPlanName(premiumPlan) {
  if (premiumPlan === 'super') {
    return 'Super Edition';
  } else if (premiumPlan === 'legendary') {
    return 'Legendary Edition';
  } else {
    return 'Base Plan';
  }
}

const sliderContainer = document.querySelector('.slider-container');
const levels = document.querySelector('.levels');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const levelWidth = levels.querySelector('th').offsetWidth;
const visibleLevels = 15;
const totalLevels = levels.querySelectorAll('th').length;
let currentPosition = 0;

leftArrow.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    sliderContainer.style.transform = `translateX(-${currentPosition * levelWidth}px)`;
  }
});

rightArrow.addEventListener('click', () => {
  if (currentPosition < totalLevels - visibleLevels) {
    currentPosition++;
    sliderContainer.style.transform = `translateX(-${currentPosition * levelWidth}px)`;
  }
});