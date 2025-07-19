// Dynamic data for categories, deals, top sellers, and featured products
const categories = [
  { img: 'images/smartphone.png', alt: 'Category Smart Phones', label: 'SMART PHONES' },
  { img: 'images/headphones2.png', alt: 'Category Accessories', label: 'ACCESSORIES' },
  { img: 'images/appliances.png', alt: 'Category Smart Appliances', label: 'SMART APPLIANCES' },
  { img: 'images/smartwatch1.png', alt: 'Category Smart Watches', label: 'SMART WATCHES' },
  { img: 'images/drone.png', alt: 'Category Miscellaneous Items', label: 'MISCELLANEOUS ITEMS' },
];
const deals = [
  { img: 'images/headphones2.png', alt: 'DealBlue Headphone', name: 'Headphone', stars: 4.5, reviews: 45, old: 45, price: 35, discount: 22 },
  { img: 'images/smartwatch2.png', alt: 'DealBBlue Smart Watch', name: 'Smart Watch', stars: 4.5, reviews: 24, old: 149, price: 99, discount: 34 },
  { img: 'images/neckband.png', alt: 'DealB Red Neckband', name: 'Neckband', stars: 4.5, reviews: 67, old: 35, price: 25, discount: 29 },
];
const topSellers = [
  { img: 'images/headphones2.png', alt: 'Top Seller Headphone', name: 'Headphone', stars: 5, reviews: 45, old: 45, price: 35, discount: 22 },
  { img: 'images/smartwatch2.png', alt: 'Top Seller Smart Watch', name: 'Smart Watch', stars: 4, reviews: 24, old: 149, price: 99, discount: 34 },
  { img: 'images/neckband.png', alt: 'Top Seller Neckband', name: 'Neckband', stars: 4, reviews: 67, old: 35, price: 25, discount: 29 },
];
const featured = [
  { img: 'images/headphone4.jpg', alt: 'Featured Wireless Headphones', name: 'Wireless Headphones', price: 99.99 },
  { img: 'images/smartwatch4.jpg', alt: 'Featured Smartwatch', name: 'Smartwatch', price: 149.99 },
  { img: 'images/neckband4.jpg', alt: 'Featured Neckband Earphones', name: 'Neckband Earphones', price: 59.99 },
  { img: 'images/earbuds4.jpg', alt: 'Featured Bluetooth Earbuds', name: 'Bluetooth Earbuds', price: 89.99 },
  { img: 'images/gamingheadset4.jpg', alt: 'Featured Gaming Headset', name: 'Gaming Headset', price: 129.99 },
  { img: 'images/airpods4.jpg', alt: 'Featured AirPods Pro', name: 'AirPods Pro', price: 199.99 },
  { img: 'images/noisecancelling4.jpg', alt: 'Featured Noise Cancelling Headphones', name: 'Noise Cancelling Headphones', price: 179.99 },
  { img: 'images/speaker4.jpg', alt: 'Featured Bluetooth Speaker', name: 'Bluetooth Speaker', price: 39.99 }
];

function renderCategories() {
  const container = document.getElementById('category-cards');
  container.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.tabIndex = 0;
    card.innerHTML = `<img src="${cat.img}" alt="${cat.alt}"><h3>${cat.label}</h3>`;
    container.appendChild(card);
  });
}
function renderDeals() {
  const container = document.getElementById('deal-cards');
  container.innerHTML = '';
  deals.forEach(deal => {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.tabIndex = 0;
    let starsHTML = '';
    let fullStars = Math.floor(deal.stars);
    let halfStar = deal.stars % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '<span aria-hidden="true" style="color:#946C00;">⯨</span>';
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starsHTML += '☆';
    card.innerHTML = `
      <img src="${deal.img}" alt="${deal.alt}">
      <h3>${deal.name}</h3>
      <p><span class="stars" aria-label="${deal.stars} stars">${starsHTML}</span> <span class="reviews">${deal.reviews} Review(s)</span></p>
      <p><s>$${deal.old}</s> <strong>$${deal.price}</strong></p>
      <p class="discount">-${deal.discount}%</p>
      <button class="deal-btn" aria-label="Buy ${deal.name}">Buy Now</button>
    `;
    card.querySelector('.deal-btn').addEventListener('click', function(e) {
      openProductModal(deal);
      e.stopPropagation();
    });
    container.appendChild(card);
  });
}
function renderTopSellers() {
  const container = document.getElementById('top-seller-cards');
  container.innerHTML = '';
  topSellers.forEach(item => {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.tabIndex = 0;
    let starsHTML = '';
    let fullStars = Math.floor(item.stars);
    let halfStar = item.stars % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '<span aria-hidden="true" style="color:#ffb300;">⯨</span>';
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starsHTML += '☆';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.alt}">
      <h3>${item.name}</h3>
      <p><span class="stars" aria-label="${item.stars} stars">${starsHTML}</span> <span class="reviews">${item.reviews} Review(s)</span></p>
      <p><s>$${item.old}</s> <strong>$${item.price}</strong></p>
      <p class="discount">-${item.discount}%</p>
      <button class="deal-btn" aria-label="Buy ${item.name}">Buy Now</button>
    `;
    card.querySelector('.deal-btn').addEventListener('click', function(e) {
      openProductModal(item);
      e.stopPropagation();
    });
    container.appendChild(card);
  });
}
function renderFeatured() {
  const container = document.getElementById('featured-grid');
  container.innerHTML = '';
  featured.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.alt}">
      <h3>${prod.name}</h3>
      <p>$${prod.price}</p>
      <button class="btn" aria-label="Buy ${prod.name}">Buy Now</button>
    `;
    card.querySelector('.btn').addEventListener('click', function(e) {
      openProductModal(prod);
      e.stopPropagation();
    });
    container.appendChild(card);
  });
}

// Keyboard navigation for cards
function enableCardKeyboardNav() {
  document.querySelectorAll('.category-card, .deal-card, .product-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const btn = card.querySelector('button');
        if (btn) btn.focus();
      }
    });
  });
}

// Highlight active nav link
function enableNavHighlight() {
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.navbar a').forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    });
  });
}

function enableNewsletterForm() {
  const form = document.querySelector('.subscribe-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.reset();
      form.querySelector('input').setAttribute('aria-invalid', 'false');
      alert('Thank you for subscribing!');
    });
  }
}

// Modal logic for product page
const productModal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-product-img');
const modalName = document.getElementById('modal-product-name');
const modalPrice = document.getElementById('modal-product-price');
const modalForm = document.getElementById('modal-purchase-form');
const modalQuantity = document.getElementById('modal-quantity');
const modalClose = document.querySelector('.modal-close');
let lastFocusedElement = null;
let currentModalProduct = null;

function openProductModal(product) {
  currentModalProduct = product;
  modalImg.src = product.img;
  modalImg.alt = product.alt || product.name;
  modalName.textContent = product.name;
  modalPrice.textContent = `$${product.price}`;
  modalQuantity.value = 1;
  modalQuantity.max = 10;
  productModal.classList.add('active');
  productModal.style.display = 'flex';
  lastFocusedElement = document.activeElement;
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}
function closeProductModal() {
  productModal.classList.remove('active');
  productModal.style.display = 'none';
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}
modalClose.addEventListener('click', closeProductModal);
window.addEventListener('keydown', e => {
  if (productModal.classList.contains('active') && e.key === 'Escape') closeProductModal();
});
productModal.addEventListener('click', e => {
  if (e.target === productModal) closeProductModal();
});
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const qty = parseInt(modalQuantity.value, 10);
  const name = currentModalProduct ? currentModalProduct.name : modalName.textContent;
  alert(`Thank you for purchasing ${qty} x ${name}!`);
  closeProductModal();
});

productModal.addEventListener('keydown', function(e) {
  if (!productModal.classList.contains('active')) return;
  const focusable = productModal.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), input');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  }
});

// Home section navigation buttons
const homeShopAllBtn = document.querySelector('.hero-actions .btn.secondary');
const homeShopNowBtn = document.querySelector('.hero-actions .btn.primary');
if (homeShopAllBtn) {
  homeShopAllBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
  });
}
if (homeShopNowBtn) {
  homeShopNowBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  });
}

// Initial render
renderCategories();
renderDeals();
renderTopSellers();
renderFeatured();
enableCardKeyboardNav();
enableNavHighlight();
enableNewsletterForm(); 