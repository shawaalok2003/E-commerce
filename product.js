document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    // Example API endpoint
    const apiURL = 'https://fakestoreapi.com/products';

    fetch(apiURL)
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="card-body">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="cart-button" onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
                <button class="wishlist-button" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

function addToCart(productName, productPrice) {
    // Your logic for adding to the cart
    alert(`Added ${productName} to the cart!`);
}

function addToWishlist(productId) {
    // Your logic for adding to the wishlist
    alert(`Added product ID ${productId} to the wishlist!`);
}