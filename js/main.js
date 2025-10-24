// Format price to Nigerian Naira

import { products } from './data.js';

function formatPrice(price) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(price);
}

// Functions for product display and filtering
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error('Products container not found!');
        return;
    }
    
    productsContainer.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">No products match your filters. Please try different criteria.</div>';
        return;
    }
    
    productsToShow.forEach(product => {
        if (product.sold) return; // Skip sold products
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="mama-approved">
                    <i class="fas fa-check-circle"></i>
                    <span>Tech Mama Approved</span>
                </div>
                <button class="whatsapp-btn" onclick="openWhatsApp('${product.name}')">
                    <i class="fab fa-whatsapp"></i> Buy on WhatsApp
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

function filterProducts() {
    const selectedBrand = document.querySelector('.brand-btn.active').dataset.brand;
    const priceRange = document.getElementById('price-range');
    const maxPrice = parseInt(priceRange.value) * 1000;
    
    let filteredProducts = [...products];
    
    // Filter by brand
    if (selectedBrand !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
    }
    
    // Filter by price
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Display filtered products
    displayProducts(filteredProducts);
}

function openWhatsApp(productName) {
    const message = `Hello Tech Mama Concepts, I'm interested in the ${productName} you listed on your website.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2348012345678?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Initialize the page
function initializePage() {
    console.log('Initializing page...');
    try {
        // Initialize products display
        console.log('Displaying products:', products);
        displayProducts(products);

        // Set up event listeners for filters
        const brandButtons = document.querySelectorAll('.brand-btn');
        console.log('Brand buttons found:', brandButtons.length);
        
        const priceRange = document.getElementById('price-range');
        console.log('Price range input:', priceRange);
        
        const maxPriceDisplay = document.getElementById('max-price');
        console.log('Max price display:', maxPriceDisplay);

        if (!brandButtons.length) {
            console.error('No brand buttons found!');
            return;
        }

        if (!priceRange) {
            console.error('Price range input not found!');
            return;
        }

        if (!maxPriceDisplay) {
            console.error('Max price display element not found!');
            return;
        }

        brandButtons.forEach(button => {
            button.addEventListener('click', () => {
                brandButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterProducts();
            });
        });

        priceRange.addEventListener('input', () => {
            maxPriceDisplay.textContent = formatPrice(priceRange.value * 1000);
            filterProducts();
        });

        console.log('Page initialization complete!');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);