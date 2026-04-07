let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Add */

export function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    save();
}

/* Remove */

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    save();
}

/* Update quantity */

export function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
        removeFromCart(id);
    }

    save();
}

/* Get */

export function getCart() {
    return cart;
}

/* Total */

export function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* Save */

function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
}