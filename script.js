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

// Error logging utility
function logError(error, context) {
  console.error(`Error in ${context}:`, error);
  // In production, you might want to send this to an error tracking service
}

// Safe DOM element retrieval
function getElementSafely(selector, context = 'unknown') {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  } catch (error) {
    logError(error, context);
    return null;
  }
}

// Safe data validation
function validateProductData(product, context) {
  try {
    if (!product || typeof product !== 'object') {
      throw new Error('Invalid product data: product is null or not an object');
    }
    if (!product.name || typeof product.name !== 'string') {
      throw new Error('Invalid product data: missing or invalid name');
    }
    if (!product.img || typeof product.img !== 'string') {
      throw new Error('Invalid product data: missing or invalid image path');
    }
    return true;
  } catch (error) {
    logError(error, context);
    return false;
  }
}

function renderCategories() {
  try {
    const container = getElementSafely('#category-cards', 'renderCategories');
    if (!container) return;
    
    container.innerHTML = '';
    categories.forEach((cat, index) => {
      try {
        if (!validateProductData(cat, `renderCategories - category ${index}`)) {
          return;
        }
        
        const card = document.createElement('div');
        card.className = 'category-card';
        card.tabIndex = 0;
        card.innerHTML = `<img src="${cat.img}" alt="${cat.alt || cat.label}"><h3>${cat.label}</h3>`;
        container.appendChild(card);
      } catch (error) {
        logError(error, `renderCategories - category ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'renderCategories');
  }
}

function renderDeals() {
  try {
    const container = getElementSafely('#deal-cards', 'renderDeals');
    if (!container) return;
    
    container.innerHTML = '';
    deals.forEach((deal, index) => {
      try {
        if (!validateProductData(deal, `renderDeals - deal ${index}`)) {
          return;
        }
        
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.tabIndex = 0;
        
        let starsHTML = '';
        try {
          const fullStars = Math.floor(deal.stars || 0);
          const halfStar = (deal.stars || 0) % 1 >= 0.5;
          for (let i = 0; i < fullStars; i++) starsHTML += '★';
          if (halfStar) starsHTML += '<span aria-hidden="true" style="color:#946C00;">⯨</span>';
          for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starsHTML += '☆';
        } catch (error) {
          logError(error, `renderDeals - stars calculation for deal ${index}`);
          starsHTML = '☆☆☆☆☆';
        }
        
        card.innerHTML = `
          <img src="${deal.img}" alt="${deal.alt || deal.name}">
          <h3>${deal.name}</h3>
          <p><span class="stars" aria-label="${deal.stars || 0} stars">${starsHTML}</span> <span class="reviews">${deal.reviews || 0} Review(s)</span></p>
          <p><s>$${deal.old || 0}</s> <strong>$${deal.price || 0}</strong></p>
          <p class="discount">-${deal.discount || 0}%</p>
          <button class="deal-btn" aria-label="Buy ${deal.name}">Buy Now</button>
        `;
        
        const button = card.querySelector('.deal-btn');
        if (button) {
          button.addEventListener('click', function(e) {
            try {
              openProductModal(deal);
              e.stopPropagation();
            } catch (error) {
              logError(error, `renderDeals - button click for deal ${index}`);
            }
          });
        }
        
        container.appendChild(card);
      } catch (error) {
        logError(error, `renderDeals - deal ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'renderDeals');
  }
}

function renderTopSellers() {
  try {
    const container = getElementSafely('#top-seller-cards', 'renderTopSellers');
    if (!container) return;
    
    container.innerHTML = '';
    topSellers.forEach((item, index) => {
      try {
        if (!validateProductData(item, `renderTopSellers - item ${index}`)) {
          return;
        }
        
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.tabIndex = 0;
        
        let starsHTML = '';
        try {
          const fullStars = Math.floor(item.stars || 0);
          const halfStar = (item.stars || 0) % 1 >= 0.5;
          for (let i = 0; i < fullStars; i++) starsHTML += '★';
          if (halfStar) starsHTML += '<span aria-hidden="true" style="color:#ffb300;">⯨</span>';
          for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starsHTML += '☆';
        } catch (error) {
          logError(error, `renderTopSellers - stars calculation for item ${index}`);
          starsHTML = '☆☆☆☆☆';
        }
        
        card.innerHTML = `
          <img src="${item.img}" alt="${item.alt || item.name}">
          <h3>${item.name}</h3>
          <p><span class="stars" aria-label="${item.stars || 0} stars">${starsHTML}</span> <span class="reviews">${item.reviews || 0} Review(s)</span></p>
          <p><s>$${item.old || 0}</s> <strong>$${item.price || 0}</strong></p>
          <p class="discount">-${item.discount || 0}%</p>
          <button class="deal-btn" aria-label="Buy ${item.name}">Buy Now</button>
        `;
        
        const button = card.querySelector('.deal-btn');
        if (button) {
          button.addEventListener('click', function(e) {
            try {
              openProductModal(item);
              e.stopPropagation();
            } catch (error) {
              logError(error, `renderTopSellers - button click for item ${index}`);
            }
          });
        }
        
        container.appendChild(card);
      } catch (error) {
        logError(error, `renderTopSellers - item ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'renderTopSellers');
  }
}

function renderFeatured() {
  try {
    const container = getElementSafely('#featured-grid', 'renderFeatured');
    if (!container) return;
    
    container.innerHTML = '';
    featured.forEach((prod, index) => {
      try {
        if (!validateProductData(prod, `renderFeatured - product ${index}`)) {
          return;
        }
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.tabIndex = 0;
        card.innerHTML = `
          <img src="${prod.img}" alt="${prod.alt || prod.name}">
          <h3>${prod.name}</h3>
          <p>$${prod.price || 0}</p>
          <button class="btn" aria-label="Buy ${prod.name}">Buy Now</button>
        `;
        
        const button = card.querySelector('.btn');
        if (button) {
          button.addEventListener('click', function(e) {
            try {
              openProductModal(prod);
              e.stopPropagation();
            } catch (error) {
              logError(error, `renderFeatured - button click for product ${index}`);
            }
          });
        }
        
        container.appendChild(card);
      } catch (error) {
        logError(error, `renderFeatured - product ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'renderFeatured');
  }
}

// Keyboard navigation for cards
function enableCardKeyboardNav() {
  try {
    document.querySelectorAll('.category-card, .deal-card, .product-card').forEach((card, index) => {
      try {
        card.addEventListener('keydown', e => {
          try {
            if (e.key === 'Enter' || e.key === ' ') {
              const btn = card.querySelector('button');
              if (btn) btn.focus();
            }
          } catch (error) {
            logError(error, `enableCardKeyboardNav - keydown for card ${index}`);
          }
        });
      } catch (error) {
        logError(error, `enableCardKeyboardNav - card ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'enableCardKeyboardNav');
  }
}

// Highlight active nav link
function enableNavHighlight() {
  try {
    document.querySelectorAll('.navbar a').forEach((link, index) => {
      try {
        link.addEventListener('click', () => {
          try {
            document.querySelectorAll('.navbar a').forEach(l => l.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'page');
          } catch (error) {
            logError(error, `enableNavHighlight - click handler for link ${index}`);
          }
        });
      } catch (error) {
        logError(error, `enableNavHighlight - link ${index}`);
      }
    });
  } catch (error) {
    logError(error, 'enableNavHighlight');
  }
}

function enableNewsletterForm() {
  try {
    const form = document.querySelector('.subscribe-form');
    if (form) {
      form.addEventListener('submit', e => {
        try {
          e.preventDefault();
          form.reset();
          const input = form.querySelector('input');
          if (input) {
            input.setAttribute('aria-invalid', 'false');
          }
          alert('Thank you for subscribing!');
        } catch (error) {
          logError(error, 'enableNewsletterForm - submit handler');
        }
      });
    }
  } catch (error) {
    logError(error, 'enableNewsletterForm');
  }
}

// Modal logic for product page
const productModal = getElementSafely('#product-modal', 'modal initialization');
const modalImg = getElementSafely('#modal-product-img', 'modal initialization');
const modalName = getElementSafely('#modal-product-name', 'modal initialization');
const modalPrice = getElementSafely('#modal-product-price', 'modal initialization');
const modalForm = getElementSafely('#modal-purchase-form', 'modal initialization');
const modalQuantity = getElementSafely('#modal-quantity', 'modal initialization');
const modalClose = getElementSafely('.modal-close', 'modal initialization');
let lastFocusedElement = null;
let currentModalProduct = null;

function openProductModal(product) {
  try {
    if (!validateProductData(product, 'openProductModal')) {
      return;
    }
    
    if (!productModal || !modalImg || !modalName || !modalPrice || !modalQuantity) {
      throw new Error('Required modal elements not found');
    }
    
    currentModalProduct = product;
    modalImg.src = product.img;
    modalImg.alt = product.alt || product.name;
    modalName.textContent = product.name;
    modalPrice.textContent = `$${product.price || 0}`;
    modalQuantity.value = 1;
    modalQuantity.max = 10;
    productModal.classList.add('active');
    productModal.style.display = 'flex';
    lastFocusedElement = document.activeElement;
    
    if (modalClose) {
      modalClose.focus();
    }
    document.body.style.overflow = 'hidden';
  } catch (error) {
    logError(error, 'openProductModal');
  }
}

function closeProductModal() {
  try {
    if (!productModal) return;
    
    productModal.classList.remove('active');
    productModal.style.display = 'none';
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  } catch (error) {
    logError(error, 'closeProductModal');
  }
}

// Modal event listeners
if (modalClose) {
  modalClose.addEventListener('click', closeProductModal);
}

window.addEventListener('keydown', e => {
  try {
    if (productModal && productModal.classList.contains('active') && e.key === 'Escape') {
      closeProductModal();
    }
  } catch (error) {
    logError(error, 'modal escape key handler');
  }
});

if (productModal) {
  productModal.addEventListener('click', e => {
    try {
      if (e.target === productModal) {
        closeProductModal();
      }
    } catch (error) {
      logError(error, 'modal click outside handler');
    }
  });
}

if (modalForm) {
  modalForm.addEventListener('submit', e => {
    try {
      e.preventDefault();
      if (!modalQuantity) return;
      
      const qty = parseInt(modalQuantity.value, 10);
      if (isNaN(qty) || qty < 1) {
        throw new Error('Invalid quantity');
      }
      
      const name = currentModalProduct ? currentModalProduct.name : (modalName ? modalName.textContent : 'Product');
      alert(`Thank you for purchasing ${qty} x ${name}!`);
      closeProductModal();
    } catch (error) {
      logError(error, 'modal form submit');
      alert('There was an error processing your purchase. Please try again.');
    }
  });
}

if (productModal) {
  productModal.addEventListener('keydown', function(e) {
    try {
      if (!productModal.classList.contains('active')) return;
      
      const focusable = productModal.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), input');
      if (focusable.length === 0) return;
      
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    } catch (error) {
      logError(error, 'modal keyboard navigation');
    }
  });
}

// Home section navigation buttons
function initializeHomeButtons() {
  try {
    const homeShopAllBtn = document.querySelector('.hero-actions .btn.secondary');
    const homeShopNowBtn = document.querySelector('.hero-actions .btn.primary');
    
    if (homeShopAllBtn) {
      homeShopAllBtn.addEventListener('click', function(e) {
        try {
          e.preventDefault();
          const categoriesSection = document.getElementById('categories');
          if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          logError(error, 'homeShopAllBtn click');
        }
      });
    }
    
    if (homeShopNowBtn) {
      homeShopNowBtn.addEventListener('click', function(e) {
        try {
          e.preventDefault();
          const featuredSection = document.getElementById('featured');
          if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          logError(error, 'homeShopNowBtn click');
        }
      });
    }
  } catch (error) {
    logError(error, 'initializeHomeButtons');
  }
}

// Initialize everything when DOM is ready
function initializeApp() {
  try {
    renderCategories();
    renderDeals();
    renderTopSellers();
    renderFeatured();
    enableCardKeyboardNav();
    enableNavHighlight();
    enableNewsletterForm();
    initializeHomeButtons();
  } catch (error) {
    logError(error, 'initializeApp');
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
} 