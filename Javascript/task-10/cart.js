let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const item = cart.find(i => i.id === product.id);
  if (item) item.qty++;
  else cart.push({ ...product, qty: 1 });
  save();
}

export function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);

  save();
}

export function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  save();
}

export function getCart() {
  return cart;
}

export function getTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const discount = subtotal > 20000 ? subtotal * 0.1 : 0;

  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount
  };
}