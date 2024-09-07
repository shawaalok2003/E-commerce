let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function displayProductDetails(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    displayReviews();
}

function displayReviews() {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = '';

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <p>${review.text}</p>
            <p>Rating: ${review.rating}</p>
        `;
        reviewsDiv.appendChild(reviewDiv);
    });
}

function submitReview() {
    const reviewText = document.getElementById('review-text').value;
    const rating = prompt("Enter rating (1-5):");
    if (rating < 1 || rating > 5) {
        alert("Rating must be between 1 and 5.");
        return;
    }

    reviews.push({ text: reviewText, rating: parseInt(rating) });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
}

const product = { name: 'Smartphone', price: 299.99 }; // Example product data
window.onload = () => displayProductDetails(product);