import { products } from "./data.js";
import { renderProducts, renderCart } from "./ui.js";

/* Init */

renderProducts(products);
renderCart();

/* Search */

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    renderProducts(filtered);
});