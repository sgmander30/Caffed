(() => {
  // Sticky header + cart count stays fresh after AJAX cart changes.
  const header = document.querySelector("[data-header]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const updateCartCount = async () => {
    const el = document.querySelector("[data-cart-count]");
    if (!el) return;
    try {
      const res = await fetch("/cart.js", { headers: { "Accept": "application/json" } });
      if (!res.ok) return;
      const cart = await res.json();
      el.textContent = String(cart.item_count ?? 0);
    } catch (_) {
      // no-op
    }
  };

  document.addEventListener("cart:refresh", updateCartCount);
  // Best-effort refresh on page load too.
  updateCartCount();
})();

