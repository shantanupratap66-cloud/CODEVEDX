(function () {
    const {
        getProductById,
        formatCurrency,
        escapeHTML,
        getUrlParams
    } = window.StoreUtils;

    const fallbackImage = 'assets/images/image-fallback.svg';

    function renderNotFound(container) {
        container.innerHTML = `
            <div class="empty-state">
                <h1>Product not found</h1>
                <p>The product link may be invalid or the item is no longer available.</p>
                <a class="btn btn-primary" href="products.html">Back to Products</a>
            </div>
        `;
    }

    function renderProduct(container, product) {
        document.title = `${product.name} - LumaCart`;

        container.innerHTML = `
            <a class="back-link" href="products.html">Back to Products</a>
            <section class="details-layout">
                <div class="details-image-panel">
                    <img src="${product.image}" alt="${escapeHTML(product.name)}" onerror="this.onerror=null;this.src='${fallbackImage}';">
                </div>
                <article class="details-info">
                    <p class="eyebrow">${escapeHTML(product.category)}</p>
                    <h1>${escapeHTML(product.name)}</h1>
                    <div class="details-rating">Rating ${product.rating.toFixed(1)} / 5</div>
                    <div class="details-price">
                        <strong>${formatCurrency(product.price)}</strong>
                        <span>${formatCurrency(product.originalPrice)}</span>
                        <em>${product.discount}% off</em>
                    </div>
                    <p class="details-description">${escapeHTML(product.description)}</p>
                    <dl class="product-facts">
                        <div>
                            <dt>Category</dt>
                            <dd>${escapeHTML(product.category)}</dd>
                        </div>
                        <div>
                            <dt>Availability</dt>
                            <dd>${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</dd>
                        </div>
                    </dl>
                    <div class="details-quantity">
                        <label for="detailQuantity">Quantity</label>
                        <div class="quantity-control">
                            <button type="button" id="detailDecrease" aria-label="Decrease quantity">-</button>
                            <input id="detailQuantity" type="number" min="1" max="${product.stock}" value="1">
                            <button type="button" id="detailIncrease" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                    <div class="details-actions">
                        <button class="btn btn-primary" type="button" id="detailAddToCart" ${product.stock < 1 ? 'disabled' : ''}>Add to Cart</button>
                        <button class="btn btn-dark" type="button" id="buyNow" ${product.stock < 1 ? 'disabled' : ''}>Buy Now</button>
                    </div>
                </article>
            </section>
        `;

        const quantityInput = document.getElementById('detailQuantity');
        const decreaseButton = document.getElementById('detailDecrease');
        const increaseButton = document.getElementById('detailIncrease');
        const addButton = document.getElementById('detailAddToCart');
        const buyButton = document.getElementById('buyNow');

        function clampQuantity(value) {
            return Math.min(Math.max(Number(value) || 1, 1), product.stock);
        }

        function updateQuantity(value) {
            quantityInput.value = String(clampQuantity(value));
        }

        decreaseButton.addEventListener('click', () => updateQuantity(Number(quantityInput.value) - 1));
        increaseButton.addEventListener('click', () => updateQuantity(Number(quantityInput.value) + 1));
        quantityInput.addEventListener('input', () => updateQuantity(quantityInput.value));

        addButton.addEventListener('click', () => {
            window.CartStore.addItem(product.id, Number(quantityInput.value));
        });

        buyButton.addEventListener('click', () => {
            window.CartStore.addItem(product.id, Number(quantityInput.value));
            window.location.href = 'checkout.html';
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('productDetails');
        if (!container) {
            return;
        }

        const productId = getUrlParams().get('id');
        const product = productId ? getProductById(productId) : null;

        if (!product) {
            renderNotFound(container);
            return;
        }

        renderProduct(container, product);
    });
})();
