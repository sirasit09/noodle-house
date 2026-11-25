const products = {
  SKU001: { name: 'บะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้ง', price: 15 },
  SKU002: { name: 'บะหมี่กึ่งสำเร็จรูปรสไก่ครีม', price: 15 }
};
const cart = {};
function addToCart(sku) {
  cart[sku] = (cart[sku] || 0) + 1;
  renderCart();
}
function renderCart() {
  const entries = Object.entries(cart);
  const area = document.getElementById('cart-items');
  if (!entries.length) area.textContent = 'ยังไม่มีสินค้าในตะกร้า';
  else area.innerHTML = entries.map(([sku, qty]) =>
    `<div>${products[sku].name} × ${qty} — ฿${products[sku].price * qty}</div>`
  ).join('');
  const total = entries.reduce((sum, [sku, qty]) => sum + products[sku].price * qty, 0);
  document.getElementById('total').textContent = `฿${total}`;
}
document.getElementById('order-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!Object.keys(cart).length) {
    document.getElementById('order-message').textContent = 'กรุณาเลือกสินค้าก่อนยืนยันคำสั่งซื้อ';
    return;
  }
  const form = new FormData(event.target);
  const order = {
    customer: form.get('customer'),
    phone: form.get('phone'),
    address: form.get('address'),
    items: Object.entries(cart).map(([sku, qty]) => ({ sku, name: products[sku].name, qty, price: products[sku].price })),
    total: Object.entries(cart).reduce((sum, [sku, qty]) => sum + products[sku].price * qty, 0)
  };
  // ขั้นต่อไปจะเชื่อมข้อมูลคำสั่งซื้อนี้เข้ากับ Google Sheets
  console.log('ตัวอย่างคำสั่งซื้อ:', order);
  document.getElementById('order-message').textContent = 'รับข้อมูลตัวอย่างแล้ว (ยังไม่ได้บันทึกลง Google Sheets)';
});
renderCart();
