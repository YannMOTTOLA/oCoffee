// public/js/details.js
window.addToCart = async function (btn) {
  const id = btn.dataset.id;

  await fetch(`/panier/add/${id}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  });

  const r = await fetch('/panier/count', { headers: { 'Accept': 'application/json' } });
  const { count = 0 } = await r.json();
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count ? `(${count})` : '';
};
