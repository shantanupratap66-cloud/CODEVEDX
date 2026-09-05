(function () {
    const CART_KEY = 'lumacart_cart_v1';
    const fallbackImage = 'assets/images/image-fallback.svg';

    function getProducts() {
        return window.StoreData ? window.StoreData.products : [];
    }

    function getProduct(productId) {
        return window.StoreUtils.getProductById(productId);
    }

    function safeParseCart() {
        try {
            const stored = localStorage.getItem(CART_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function normalizeCart(items) {
        return items
            .map(item => {
                const product = getProduct(item.id);
                if (!product) {
                    return null;
                }

                const quantity = Math.min(Math.max(Number(item.quantity) || 1, 1), product.stock);
                return { id: product.id, quantity };
            })
            .filter(Boolean);
    }

    function getCart() {
        return normalizeCart(safeParseCart());
    }

    function saveCart(items) {
        const normalized = normalizeCart(items);
        localStorage.setItem(CART_KEY, JSON.stringify(normalized));
        updateCartCount();
        return normalized;
    }

    function getLineItems() {
        return getCart().map(item => {
            const product = getProduct(item.id);
            return {
                ...item,
                product,
                lineTotal: product.price * item.quantity
            };
        });
    }

    function getSummary() {
        const lineItems = getLineItems();
        const totalItems = lineItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
        const delivery = subtotal > 0 && subtotal < 150 ? 8.99 : 0;
        const total = subtotal + delivery;

        return {
            lineItems,
            totalItems,
            subtotal,
            delivery,
            total
        };
    }

    function addItem(productId, quantity = 1) {
        const product = getProduct(productId);
        if (!product || product.stock < 1) {
            showToast('This product is currently unavailable.');
            return getCart();
        }

        const currentCart = getCart();
        const existing = currentCart.find(item => item.id === productId);
        const requestedQuantity = Math.max(Number(quantity) || 1, 1);

        if (existing) {
            existing.quantity = Math.min(existing.quantity + requestedQuantity, product.stock);
        } else {
            currentCart.push({
                id: productId,
                quantity: Math.min(requestedQuantity, product.stock)
            });
        }

        const saved = saveCart(currentCart);
        showToast(`${product.name} added to cart.`);
        return saved;
    }

    function setQuantity(productId, quantity) {
        const product = getProduct(productId);
        if (!product) {
            return getCart();
        }

        const nextQuantity = Math.min(Math.max(Number(quantity) || 1, 1), product.stock);
        const nextCart = getCart().map(item => {
            if (item.id !== productId) {
                return item;
            }

            return {
                ...item,
                quantity: nextQuantity
            };
        });

        return saveCart(nextCart);
    }

    function increase(productId) {
        const item = getCart().find(cartItem => cartItem.id === productId);
        return setQuantity(productId, item ? item.quantity + 1 : 1);
    }

    function decrease(productId) {
        const item = getCart().find(cartItem => cartItem.id === productId);
        if (!item || item.quantity <= 1) {
            return setQuantity(productId, 1);
        }

        return setQuantity(productId, item.quantity - 1);
    }

    function removeItem(productId) {
        const nextCart = getCart().filter(item => item.id !== productId);
        const product = getProduct(productId);
        saveCart(nextCart);
        if (product) {
            showToast(`${product.name} removed from cart.`);
        }
        return nextCart;
    }

    function clearCart() {
        localStorage.removeItem(CART_KEY);
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('[data-cart-count]').forEach(counter => {
            counter.textContent = totalItems;
            counter.setAttribute('aria-label', `${totalItems} items in cart`);
        });
    }

    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    function setupNavigation() {
        const toggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (toggle && navMenu) {
            toggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(isOpen));
            });
        }

        const currentPage = document.body.dataset.page;
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            if (link.dataset.navLink === currentPage || (currentPage === 'details' && link.dataset.navLink === 'products')) {
                link.classList.add('active');
            }
        });

        const params = new URLSearchParams(window.location.search);
        const searchValue = params.get('search') || '';
        document.querySelectorAll('[data-nav-search]').forEach(input => {
            input.value = searchValue;
        });

        document.querySelectorAll('[data-nav-search-form]').forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                const input = form.querySelector('[data-nav-search]');
                const query = input ? input.value.trim() : '';
                const target = query ? `products.html?search=${encodeURIComponent(query)}` : 'products.html';
                window.location.href = target;
            });
        });
    }

    function imageTag(product, className = '') {
        const escapedName = window.StoreUtils.escapeHTML(product.name);
        return `<img class="${className}" src="${product.image}" alt="${escapedName}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}';">`;
    }

    function renderCartPage() {
        const container = document.getElementById('cartPage');
        if (!container) {
            return;
        }

        const { lineItems, totalItems, subtotal, delivery, total } = getSummary();
        const formatCurrency = window.StoreUtils.formatCurrency;

        if (lineItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state cart-empty">
                    <h2>Your cart is empty</h2>
                    <p>Add products you like and they will stay here after refreshing the page.</p>
                    <a class="btn btn-primary" href="products.html">Start Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="cart-layout">
                <div class="cart-items">
                    ${lineItems.map(item => `
                        <article class="cart-item" data-cart-product="${item.product.id}">
                            <a class="cart-item-image" href="product-details.html?id=${encodeURIComponent(item.product.id)}">
                                ${imageTag(item.product)}
                            </a>
                            <div class="cart-item-info">
                                <a class="cart-item-title" href="product-details.html?id=${encodeURIComponent(item.product.id)}">${window.StoreUtils.escapeHTML(item.product.name)}</a>
                                <p>${window.StoreUtils.escapeHTML(item.product.category)}</p>
                                <strong>${formatCurrency(item.product.price)}</strong>
                            </div>
                            <div class="quantity-control" aria-label="Quantity controls for ${window.StoreUtils.escapeHTML(item.product.name)}">
                                <button type="button" data-decrease="${item.product.id}" aria-label="Decrease quantity">-</button>
                                <input type="number" min="1" max="${item.product.stock}" value="${item.quantity}" data-cart-quantity="${item.product.id}" aria-label="Quantity">
                                <button type="button" data-increase="${item.product.id}" aria-label="Increase quantity">+</button>
                            </div>
                            <div class="cart-line-total">
                                <span>Line total</span>
                                <strong>${formatCurrency(item.lineTotal)}</strong>
                            </div>
                            <button class="icon-button remove-button" type="button" data-remove="${item.product.id}" aria-label="Remove ${window.StoreUtils.escapeHTML(item.product.name)}">
                                Remove
                            </button>
                        </article>
                    `).join('')}
                </div>

                <aside class="order-summary">
                    <h2>Order Summary</h2>
                    <div class="summary-row">
                        <span>Total items</span>
                        <strong>${totalItems}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <strong>${formatCurrency(subtotal)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Delivery</span>
                        <strong>${delivery === 0 ? 'Free' : formatCurrency(delivery)}</strong>
                    </div>
                    <div class="summary-row final">
                        <span>Final total</span>
                        <strong>${formatCurrency(total)}</strong>
                    </div>
                    <a class="btn btn-primary full-width" href="checkout.html">Proceed to Checkout</a>
                    <a class="btn btn-secondary full-width" href="products.html">Continue Shopping</a>
                </aside>
            </div>
        `;
    }

    function setupCartPageEvents() {
        const container = document.getElementById('cartPage');
        if (!container) {
            return;
        }

        container.addEventListener('click', event => {
            const increaseButton = event.target.closest('[data-increase]');
            const decreaseButton = event.target.closest('[data-decrease]');
            const removeButton = event.target.closest('[data-remove]');

            if (increaseButton) {
                increase(increaseButton.dataset.increase);
                renderCartPage();
            }

            if (decreaseButton) {
                decrease(decreaseButton.dataset.decrease);
                renderCartPage();
            }

            if (removeButton) {
                removeItem(removeButton.dataset.remove);
                renderCartPage();
            }
        });

        container.addEventListener('change', event => {
            const input = event.target.closest('[data-cart-quantity]');
            if (!input) {
                return;
            }

            setQuantity(input.dataset.cartQuantity, input.value);
            renderCartPage();
        });
    }

    window.CartStore = {
        getCart,
        saveCart,
        addItem,
        setQuantity,
        increase,
        decrease,
        removeItem,
        clearCart,
        getLineItems,
        getSummary,
        updateCartCount,
        showToast,
        imageTag
    };

    document.addEventListener('DOMContentLoaded', () => {
        setupNavigation();
        updateCartCount();

        if (document.body.dataset.page === 'cart') {
            renderCartPage();
            setupCartPageEvents();
        }
    });
})();
