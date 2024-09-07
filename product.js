document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    const apiURL = 'https://fakestoreapi.com/products';

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
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
    alert(`Added ${productName} to the cart!`);
    // You can add more logic here to actually add the item to the cart
}

function addToWishlist(productId) {
    alert(`Added product ID ${productId} to the wishlist!`);
    // You can add more logic here to actually add the item to the wishlist
}