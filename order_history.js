// Example order data, replace with your actual data source
const orders = [
    { orderId: '001', product: 'Smartphone', quantity: 1, total: 299.99, date: '2024-09-01' },
    { orderId: '002', product: 'T-Shirt', quantity: 2, total: 39.98, date: '2024-09-05' }
];

function displayOrderHistory() {
    const orderTableBody = document.querySelector('#order-history-table tbody');
    orderTableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
        `;
        orderTableBody.appendChild(row);
    });
}

window.onload = displayOrderHistory;
