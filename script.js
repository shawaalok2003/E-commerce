let cart = [];
let products = [
    { name: 'Smartphone', category: 'electronics', price: 299.99, imgSrc: 'smartphone.jpg' },
    { name: 'T-Shirt', category: 'clothing', price: 19.99, imgSrc: 'tshirt.jpg' },
    { name: 'Laptop', category: 'electronics', price: 799.99, imgSrc: 'laptop.jpg' },
    { name: 'Book', category: 'books', price: 9.99, imgSrc: 'book.jpg' },
    { name: 'Headphones', category: 'electronics', price: 49.99, imgSrc: 'headphones.jpg' },
    // Add more products here
];

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

function updateCart() {
    let cartIcon = document.querySelector('.cart-icon a');
    let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartIcon.textContent = `Cart (${totalItems})`;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function displayProducts(productsToDisplay) {
    const productGrid = document.getElementById('product-list');
    productGrid.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imgSrc}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    let filteredProducts = products;

    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    if (priceFilter !== 'all') {
        if (priceFilter === 'low') {
            filteredProducts = filteredProducts.filter(product => product.price < 50);
        } else if (priceFilter === 'mid') {
            filteredProducts = filteredProducts.filter(product => product.price >= 50 && product.price <= 100);
        } else if (priceFilter === 'high') {
            filteredProducts = filteredProducts.filter(product => product.price > 100);
        }
    }

    displayProducts(filteredProducts);
}

function init() {
    loadCartFromLocalStorage();
    displayProducts(products);
}

window.onload = init;