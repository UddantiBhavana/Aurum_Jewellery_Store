// ---------- References ----------
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

const orderSummaryContainer = document.getElementById('orderSummaryContainer');
const toStep2Btn = document.getElementById('toStep2');
const addressForm = document.getElementById('addressForm');
const payBtn = document.getElementById('payBtn');

// ---------- Load cart ----------
let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

// ---------- Display Order Summary ----------
function displayOrderSummary() {
  orderSummaryContainer.innerHTML = '';
  checkoutCart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('checkout-item');
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;
    orderSummaryContainer.appendChild(div);
  });
}
displayOrderSummary();

// ---------- Step 1 → Step 2 ----------
toStep2Btn.addEventListener('click', () => {
  if (checkoutCart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  step1.style.display = 'none';
  step2.style.display = 'block';
});

// ---------- Step 2 → Step 3 ----------
addressForm.addEventListener('submit', (e) => {
  e.preventDefault();
  step2.style.display = 'none';
  step3.style.display = 'block';
});

// ---------- Step 3 → Step 4 (Payment & Save Order) ----------
payBtn.addEventListener('click', async () => {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

  // Get address details
  const formData = new FormData(addressForm);
  const address = {
    fullName: formData.get('fullName') || '',
    street: formData.get('street') || '',
    city: formData.get('city') || '',
    state: formData.get('state') || '',
    zip: formData.get('zip') || '',
    phone: formData.get('phone') || ''
  };

  // Build order object
  const orderData = {
    items: checkoutCart,
    total: checkoutCart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    paymentMethod,
    address,
    createdAt: new Date()
  };

  try {
    // Send order to backend
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    // Clear local cart
    localStorage.removeItem('checkoutCart');
    localStorage.removeItem('cart');

    // Show confirmation
    step3.style.display = 'none';
    step4.style.display = 'block';
  } catch (err) {
    console.error('Error saving order:', err);
    alert('Failed to place order. Please try again.');
  }
});
