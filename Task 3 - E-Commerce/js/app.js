(function () {
    const { products, categories } = window.StoreData;
    const {
        formatCurrency,
        escapeHTML,
        getUrlParams
    } = window.StoreUtils;

    const fallbackImage = 'assets/images/image-fallback.svg';

    function productCard(product) {
        return `
            <article class="product-card" data-product-id="${product.id}" tabindex="0" aria-label="Open ${escapeHTML(product.name)} details">
                <a class="product-image-link" href="product-details.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)} details">
                    <img src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}';">
                </a>
                <div class="product-card-body">
                    <div class="product-meta-row">
                        <span class="category-pill">${escapeHTML(product.category)}</span>
                        <span class="rating">Rating ${product.rating.toFixed(1)}</span>
                    </div>
                    <h3>${escapeHTML(product.name)}</h3>
                    <div class="price-row">
                        <strong>${formatCurrency(product.price)}</strong>
                        <span>${formatCurrency(product.originalPrice)}</span>
                        <em>${product.discount}% off</em>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
                        <a class="btn btn-secondary" href="product-details.html?id=${encodeURIComponent(product.id)}">View Details</a>
                    </div>
                </div>
            </article>
        `;
    }

    function setupProductInteractions(container) {
        if (!container) {
            return;
        }

        container.addEventListener('click', event => {
            const addButton = event.target.closest('[data-add-to-cart]');
            if (addButton) {
                event.preventDefault();
                event.stopPropagation();
                window.CartStore.addItem(addButton.dataset.addToCart, 1);
                addButton.textContent = 'Added';
                window.setTimeout(() => {
                    addButton.textContent = 'Add to Cart';
                }, 1200);
                return;
            }

            if (event.target.closest('a, button, input, select')) {
                return;
            }

            const card = event.target.closest('[data-product-id]');
            if (card) {
                window.location.href = `product-details.html?id=${encodeURIComponent(card.dataset.productId)}`;
            }
        });

        container.addEventListener('keydown', event => {
            const card = event.target.closest('[data-product-id]');
            if (card && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                window.location.href = `product-details.html?id=${encodeURIComponent(card.dataset.productId)}`;
            }
        });
    }

    function renderHomePage() {
        const featuredContainer = document.getElementById('featuredProducts');
        const bestSellerContainer = document.getElementById('bestSellerProducts');
        const categoryGrid = document.getElementById('categoryGrid');

        if (featuredContainer) {
            featuredContainer.innerHTML = products
                .filter(product => product.isFeatured)
                .slice(0, 4)
                .map(productCard)
                .join('');
            setupProductInteractions(featuredContainer);
        }

        if (bestSellerContainer) {
            bestSellerContainer.innerHTML = products
                .filter(product => product.isBestSeller)
                .slice(0, 4)
                .map(productCard)
                .join('');
            setupProductInteractions(bestSellerContainer);
        }

        if (categoryGrid) {
            categoryGrid.innerHTML = categories.map(category => {
                const productCount = products.filter(product => product.category === category).length;
                const sampleProduct = products.find(product => product.category === category);

                return `
                    <a class="category-card" href="products.html?category=${encodeURIComponent(category)}">
                        <img src="${sampleProduct.image}" alt="${escapeHTML(category)} category" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}';">
                        <div>
                            <h3>${escapeHTML(category)}</h3>
                            <p>${productCount} products</p>
                        </div>
                    </a>
                `;
            }).join('');
        }
    }

    function initProductsPage() {
        const grid = document.getElementById('productsGrid');
        const searchInput = document.getElementById('productSearch');
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const priceValue = document.getElementById('priceValue');
        const ratingFilter = document.getElementById('ratingFilter');
        const sortSelect = document.getElementById('sortSelect');
        const resultCount = document.getElementById('resultCount');
        const noProducts = document.getElementById('noProducts');
        const clearFilters = document.getElementById('clearFilters');

        if (!grid || !searchInput || !categoryFilter || !priceFilter || !ratingFilter || !sortSelect) {
            return;
        }

        const params = getUrlParams();
        const highestPrice = Math.ceil(Math.max(...products.map(product => product.price)));

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        priceFilter.max = String(highestPrice);
        priceFilter.value = params.get('maxPrice') || String(highestPrice);
        searchInput.value = params.get('search') || '';
        categoryFilter.value = params.get('category') || 'all';
        ratingFilter.value = params.get('rating') || '0';
        sortSelect.value = params.get('sort') || 'newest';

        function applyFilters() {
            const query = searchInput.value.trim().toLowerCase();
            const category = categoryFilter.value;
            const maxPrice = Number(priceFilter.value) || highestPrice;
            const minRating = Number(ratingFilter.value) || 0;
            const sortValue = sortSelect.value;

            if (priceValue) {
                priceValue.textContent = formatCurrency(maxPrice);
            }

            let filteredProducts = products.filter(product => {
                const matchesSearch = !query ||
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query);
                const matchesCategory = category === 'all' || product.category === category;
                const matchesPrice = product.price <= maxPrice;
                const matchesRating = product.rating >= minRating;

                return matchesSearch && matchesCategory && matchesPrice && matchesRating;
            });

            filteredProducts = filteredProducts.sort((first, second) => {
                if (sortValue === 'price-asc') {
                    return first.price - second.price;
                }
                if (sortValue === 'price-desc') {
                    return second.price - first.price;
                }
                if (sortValue === 'rating-desc') {
                    return second.rating - first.rating;
                }
                return new Date(second.createdAt) - new Date(first.createdAt);
            });

            grid.innerHTML = filteredProducts.map(productCard).join('');
            noProducts.classList.toggle('hidden', filteredProducts.length !== 0);
            resultCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
        }

        [searchInput, categoryFilter, priceFilter, ratingFilter, sortSelect].forEach(control => {
            control.addEventListener('input', applyFilters);
            control.addEventListener('change', applyFilters);
        });

        clearFilters.addEventListener('click', () => {
            searchInput.value = '';
            categoryFilter.value = 'all';
            priceFilter.value = String(highestPrice);
            ratingFilter.value = '0';
            sortSelect.value = 'newest';
            applyFilters();
        });

        document.querySelectorAll('[data-reset-products]').forEach(button => {
            button.addEventListener('click', () => clearFilters.click());
        });

        setupProductInteractions(grid);
        applyFilters();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const page = document.body.dataset.page;

        if (page === 'home') {
            renderHomePage();
        }

        if (page === 'products') {
            initProductsPage();
        }
    });
})();
