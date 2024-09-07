let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function displayWishlist() {
    const wishlistDiv = document.getElementById('wishlist');
    wishlistDiv.innerHTML = '';

    wishlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('wishlist-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromWishlist('${item.name}')">Remove</button>
        `;
        wishlistDiv.appendChild(itemDiv);
    });
}

function addToWishlist(productName, productPrice) {
    if (!wishlist.find(item => item.name === productName)) {
        wishlist.push({ name: productName, price: productPrice });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayWishlist();
    }
}

function removeFromWishlist(productName) {
    wishlist = wishlist.filter(item => item.name !== productName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlist();
}

window.onload = displayWishlist;