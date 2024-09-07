// order-history.js

// Example function to simulate retrieving order history from local storage
function getOrderHistory() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders;
}

// Function to display order history in the table
function displayOrderHistory() {
    const orders = getOrderHistory();
    const tableBody = document.getElementById('order-history-table').getElementsByTagName('tbody')[0];

    // Clear existing rows
    tableBody.innerHTML = '';

    // Populate table with order history
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize the page by displaying the order history
window.onload = displayOrderHistory;