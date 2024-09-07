function calculateShipping() {
    const shippingMethod = document.getElementById('shipping-method').value;
    let shippingCost = 0;

    if (shippingMethod === 'express') {
        shippingCost = 20;
    } else if (shippingMethod === 'standard') {
        shippingCost = 5;
    }

    document.getElementById('shipping-cost').textContent = `Shipping Cost: $${shippingCost.toFixed(2)}`;
}