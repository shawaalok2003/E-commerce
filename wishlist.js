let wishlist = [];

// Function to add a product to the wishlist
function addToWishlist(productId) {
    const product = products.find(item => item.id === productId);
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        saveWishlistToLocalStorage();
        alert(`${product.name} has been added to your wishlist.`);
    } else {
        alert('This product is already in your wishlist.');
    }
}

// Function to save wishlist to local storage
function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to load wishlist from local storage
function loadWishlistFromLocalStorage() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

window.onload = loadWishlistFromLocalStorage;
function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist');
    const emptyMessage = document.getElementById('empty-message');
    
    wishlistContainer.innerHTML = '';
    if (wishlist.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    } else {
        emptyMessage.style.display = 'none';
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-item');
        
        wishlistItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
        `;
        
        wishlistContainer.appendChild(wishlistItem);
    });
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlistToLocalStorage();
    displayWishlist();
}

// Initialize wishlist on page load
window.onload = function() {
    loadWishlistFromLocalStorage();
    displayWishlist();
};