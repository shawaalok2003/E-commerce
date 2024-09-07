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
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
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

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    } else {
        // Redirect to a specific URL if the cart is not empty
        window.location.href = "https://dhandaeasy.com";
    }
}

window.onload = displayCart;
