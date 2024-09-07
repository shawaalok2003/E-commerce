function addToCart(productName, productPrice) {
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');

    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td style: width:100px; height:50px;><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

window.onload = displayCart;
let discountCode = 'SAVE10'; // Example discount code
let discountAmount = 10; // Example discount amount in dollars

function applyDiscount() {
    const code = document.getElementById('discount-code').value;
    if (code === discountCode) {
        alert(`Discount applied: $${discountAmount}`);
        // Update the cart total after discount
    } else {
        alert('Invalid discount code.');
    }
}
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Example checkout function (simplified)
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Create an order object
    const order = {
        orderId: Date.now(), // Unique ID based on current timestamp
        productName: cart.map(item => item.name).join(', '),
        quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };

    // Save the order
    saveOrder(order);

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to a payment platform (for demonstration)
    window.location.href = "https://buy.stripe.com/test_28o15j9IX9Ss4TueUY";
}
