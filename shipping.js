function calculateShipping() {
    const shippingMethod = document.getElementById('shipping-method').value;
    let cost;

    switch (shippingMethod) {
        case 'standard':
            cost = 5.00;
            break;
        case 'express':
            cost = 15.00;
            break;
        case 'overnight':
            cost = 25.00;
            break;
        default:
            cost = 0.00;
            break;
    }

    document.getElementById('shipping-cost').textContent = `Shipping Cost: $${cost.toFixed(2)}`;
}