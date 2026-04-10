import { products } from "./data.js";
import { renderProducts, renderCart } from "./ui.js";

const search = document.getElementById("search");
const filter = document.getElementById("filter");

function updateView() {
  let filtered = [...products];

  const query = search.value.toLowerCase();
  const category = filter.value;

  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  renderProducts(filtered);
}

search.addEventListener("input", updateView);
filter.addEventListener("change", updateView);

renderProducts(products);
renderCart();