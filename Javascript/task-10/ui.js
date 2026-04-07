import { addToCart, getCart, removeFromCart, updateQty, getTotal } from "./cart.js";

const productList = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalEl = document.getElementById("total");

/* Render products */

export function renderProducts(products) {
    productList.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button>Add to Cart</button>
        `;

        div.querySelector("button").onclick = () => {
            addToCart(p);
            renderCart();
        };

        productList.appendChild(div);
    });
}

/* Render cart */

export function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="dec">-</button>
                ${item.qty}
                <button class="inc">+</button>
            </div>
            <span>₹${item.price * item.qty}</span>
            <button class="remove">X</button>
        `;

        div.querySelector(".inc").onclick = () => {
            updateQty(item.id, 1);
            renderCart();
        };

        div.querySelector(".dec").onclick = () => {
            updateQty(item.id, -1);
            renderCart();
        };

        div.querySelector(".remove").onclick = () => {
            removeFromCart(item.id);
            renderCart();
        };

        cartList.appendChild(div);
    });

    totalEl.textContent = `Total: ₹${getTotal()}`;
}