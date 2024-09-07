let cart = [];
let products = [
    { name: 'Smartphone', category: 'electronics', price: 299.99, imgSrc: 'https://images.unsplash.com/photo-1600087626014-e652e18bbff2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'T-Shirt', category: 'clothing', price: 19.99, imgSrc: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHNoaXJ0fGVufDB8fDB8fHww' },
    { name: 'Laptop', category: 'electronics', price: 799.99, imgSrc: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww' },
    { name: 'Book', category: 'books', price: 9.99, imgSrc: 'https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Headphones', category: 'electronics', price: 49.99, imgSrc: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww' },
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
           <button class="cart-button" onclick="addToCart('${product.name}', ${product.price})">
    Add to Cart
</button>
<button class="wishlist-button" onclick="addToWishlist(${product.id})">
    Add to Wishlist
</button>
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
    const brandFilter = document.getElementById('brand-filter').value;
    const ratingFilter = document.getElementById('rating-filter').value;
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

    if (brandFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.brand === brandFilter);
    }

    if (ratingFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.rating >= parseInt(ratingFilter));
    }

    displayProducts(filteredProducts);
}

function init() {
    loadCartFromLocalStorage();
    displayProducts(products);
}

window.onload = init;
const translations = {
    en: {
        welcome: "Welcome",
        search: "Search products..."
    },
    es: {
        welcome: "Bienvenido",
        search: "Buscar productos..."
    }
};

function changeLanguage() {
    const language = document.getElementById('language-select').value;
    document.querySelector('#search-bar').placeholder = translations[language].search;
    document.querySelector('h1').textContent = translations[language].welcome;
    console.log(`Language changed to: ${language}`);
}
