(function () {
    const { formatCurrency, escapeHTML } = window.StoreUtils;

    function checkoutFormTemplate(summary) {
        return `
            <div class="checkout-layout">
                <form class="checkout-form" id="checkoutForm" novalidate>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input id="fullName" name="fullName" type="text" autocomplete="name">
                            <span class="field-error" data-error-for="fullName"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" autocomplete="email">
                            <span class="field-error" data-error-for="email"></span>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input id="phone" name="phone" type="tel" autocomplete="tel">
                            <span class="field-error" data-error-for="phone"></span>
                        </div>
                        <div class="form-group full-field">
                            <label for="address">Address</label>
                            <textarea id="address" name="address" rows="3" autocomplete="street-address"></textarea>
                            <span class="field-error" data-error-for="address"></span>
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <input id="city" name="city" type="text" autocomplete="address-level2">
                            <span class="field-error" data-error-for="city"></span>
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <input id="state" name="state" type="text" autocomplete="address-level1">
                            <span class="field-error" data-error-for="state"></span>
                        </div>
                        <div class="form-group">
                            <label for="pincode">Pincode</label>
                            <input id="pincode" name="pincode" type="text" inputmode="numeric" autocomplete="postal-code">
                            <span class="field-error" data-error-for="pincode"></span>
                        </div>
                        <div class="form-group">
                            <label for="paymentMethod">Payment Method</label>
                            <select id="paymentMethod" name="paymentMethod">
                                <option value="">Select payment method</option>
                                <option value="cash">Cash on Delivery</option>
                                <option value="card">Card - Demo Only</option>
                                <option value="upi">UPI - Demo Only</option>
                            </select>
                            <span class="field-error" data-error-for="paymentMethod"></span>
                        </div>
                    </div>
                    <button class="btn btn-primary full-width" type="submit">Place Demo Order</button>
                </form>

                <aside class="order-summary">
                    <h2>Order Summary</h2>
                    <div class="checkout-items">
                        ${summary.lineItems.map(item => `
                            <div class="checkout-item">
                                <span>${escapeHTML(item.product.name)} x ${item.quantity}</span>
                                <strong>${formatCurrency(item.lineTotal)}</strong>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-row">
                        <span>Total items</span>
                        <strong>${summary.totalItems}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <strong>${formatCurrency(summary.subtotal)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Delivery</span>
                        <strong>${summary.delivery === 0 ? 'Free' : formatCurrency(summary.delivery)}</strong>
                    </div>
                    <div class="summary-row final">
                        <span>Final total</span>
                        <strong>${formatCurrency(summary.total)}</strong>
                    </div>
                    <p class="checkout-note">This checkout is for internship demonstration only.</p>
                </aside>
            </div>
        `;
    }

    function emptyCheckoutTemplate() {
        return `
            <div class="empty-state">
                <h2>Your cart is empty</h2>
                <p>Add at least one product before opening checkout.</p>
                <a class="btn btn-primary" href="products.html">Browse Products</a>
            </div>
        `;
    }

    function successTemplate(formData, total) {
        const orderCode = `LC-${Date.now().toString().slice(-6)}`;

        return `
            <div class="success-screen">
                <div class="success-mark" aria-hidden="true">OK</div>
                <h1>Demo order submitted</h1>
                <p>Thank you, ${escapeHTML(formData.fullName)}. Your frontend order flow was completed successfully.</p>
                <div class="success-details">
                    <div>
                        <span>Order ID</span>
                        <strong>${orderCode}</strong>
                    </div>
                    <div>
                        <span>Email</span>
                        <strong>${escapeHTML(formData.email)}</strong>
                    </div>
                    <div>
                        <span>Total</span>
                        <strong>${formatCurrency(total)}</strong>
                    </div>
                </div>
                <a class="btn btn-primary" href="products.html">Continue Shopping</a>
            </div>
        `;
    }

    function setFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const error = document.querySelector(`[data-error-for="${fieldName}"]`);

        if (field) {
            field.classList.toggle('invalid', Boolean(message));
            field.setAttribute('aria-invalid', String(Boolean(message)));
        }

        if (error) {
            error.textContent = message;
        }
    }

    function getFormData(form) {
        return Object.fromEntries(new FormData(form).entries());
    }

    function validate(formData) {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const digitsOnly = formData.phone.replace(/\D/g, '');

        if (formData.fullName.trim().length < 2) {
            errors.fullName = 'Enter your full name.';
        }
        if (!emailPattern.test(formData.email.trim())) {
            errors.email = 'Enter a valid email address.';
        }
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            errors.phone = 'Enter a valid phone number.';
        }
        if (formData.address.trim().length < 10) {
            errors.address = 'Enter a complete address.';
        }
        if (formData.city.trim().length < 2) {
            errors.city = 'Enter your city.';
        }
        if (formData.state.trim().length < 2) {
            errors.state = 'Enter your state.';
        }
        if (!/^\d{5,6}$/.test(formData.pincode.trim())) {
            errors.pincode = 'Enter a valid 5 or 6 digit pincode.';
        }
        if (!formData.paymentMethod) {
            errors.paymentMethod = 'Select a payment method.';
        }

        return errors;
    }

    function setupCheckoutForm(container, summary) {
        const form = document.getElementById('checkoutForm');
        if (!form) {
            return;
        }

        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => {
                const formData = getFormData(form);
                const errors = validate(formData);
                setFieldError(field.name, errors[field.name] || '');
            });
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = getFormData(form);
            const errors = validate(formData);

            form.querySelectorAll('[name]').forEach(field => {
                setFieldError(field.name, errors[field.name] || '');
            });

            if (Object.keys(errors).length > 0) {
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                return;
            }

            window.CartStore.clearCart();
            container.innerHTML = successTemplate(formData, summary.total);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('checkoutPage');
        if (!container) {
            return;
        }

        const summary = window.CartStore.getSummary();

        if (summary.lineItems.length === 0) {
            container.innerHTML = emptyCheckoutTemplate();
            return;
        }

        container.innerHTML = checkoutFormTemplate(summary);
        setupCheckoutForm(container, summary);
    });
})();
