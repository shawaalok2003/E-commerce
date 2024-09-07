// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log('Product ID:', productId);

if (productId) {
    // Fetch product details based on the ID
    fetch(`https://api.example.com/products/${productId}`)
        .then(response => {
            console.log('API Response:', response);
            return response.json();
        })
        .then(product => {
            console.log('Product data:', product); // Log the data

            // Ensure product data exists before displaying
            if (product) {
                const productDetailsSection = document.getElementById('product-details');
                productDetailsSection.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h2>${product.name}</h2>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <p class="description">${product.description}</p>
                        <button class="cart-button" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                        <button class="wishlist-button" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                    </div>
                `;
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
} else {
    console.error('Product ID not found in URL');
}