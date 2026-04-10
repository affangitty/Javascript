import { addToCart, getCart, updateQty, removeItem, getTotals } from "./cart.js";

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const totalsEl = document.getElementById("totals");

/* PRODUCTS */

export function renderProducts(products) {
  productsEl.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <span>₹${p.price}</span>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").onclick = () => {
      addToCart(p);
      renderCart();
    };

    productsEl.appendChild(card);
  });
}

/* CART */

export function renderCart() {
  const cart = getCart();
  cartEl.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>₹${item.price}</p>
      </div>

      <div class="qty">
        <button class="dec">-</button>
        ${item.qty}
        <button class="inc">+</button>
      </div>

      <div>
        ₹${item.price * item.qty}
        <button class="remove">X</button>
      </div>
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
      removeItem(item.id);
      renderCart();
    };

    cartEl.appendChild(div);
  });

  renderTotals();
}

/* TOTALS */

function renderTotals() {
  const { subtotal, tax, discount, total } = getTotals();

  totalsEl.innerHTML = `
    <p>Subtotal: ₹${subtotal}</p>
    <p>Tax (10%): ₹${tax}</p>
    <p>Discount: ₹${discount}</p>
    <h3>Total: ₹${total}</h3>
  `;
}