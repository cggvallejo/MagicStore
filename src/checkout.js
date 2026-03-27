/**
 * Magic World Checkout Engine
 * Handles order summary, payment methods, and submission.
 */

class CheckoutManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('magicworld-cart')) || [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderSummary();
            this.setupPaymentSelectors();
            this.setupDeliverySelectors();
            this.setupForm();
        });
    }

    renderSummary() {
        const container = document.getElementById('checkout-items');
        const subtotalEl = document.getElementById('checkout-subtotal');
        const totalEl = document.getElementById('checkout-total');
        
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="text-white/20 text-center py-10">Su carrito está vacío</p>';
            return;
        }

        const subtotal = this.cart.reduce((sum, item) => sum + item.price, 0);
        
        container.innerHTML = this.cart.map((item, index) => {
            const imgSrc = item.image && item.image !== '' ? item.image : 'assets/products/placeholder.png';
            return `
                <div class="flex items-center gap-4 py-4 border-b border-white/5 animate-fade-in" style="animation-delay: ${index * 0.1}s">
                    <div class="w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                        <img src="${imgSrc}" class="w-full h-full object-cover" onerror="this.src='assets/products/placeholder.png'">
                    </div>
                    <div class="flex-1">
                        <h4 class="text-white text-[10px] font-bold uppercase tracking-wider">${item.name}</h4>
                        <p class="text-primary text-[10px] font-black mt-1">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
        }).join('');

        const total = subtotal; // Simplified for now
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    setupDeliverySelectors() {
        const shippingFields = document.getElementById('shipping-fields');
        const radios = document.querySelectorAll('input[name="delivery"]');

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'shipping') {
                    shippingFields.classList.remove('hidden');
                    gsap.from(shippingFields, { 
                        height: 0, 
                        opacity: 0, 
                        duration: 0.5, 
                        ease: "power2.out" 
                    });
                } else {
                    gsap.to(shippingFields, { 
                        height: 0, 
                        opacity: 0, 
                        duration: 0.3, 
                        onComplete: () => shippingFields.classList.add('hidden') 
                    });
                }
            });
        });
    }

    setupPaymentSelectors() {
        const methods = document.querySelectorAll('.payment-method-card');
        const details = document.querySelectorAll('.payment-details');

        methods.forEach(method => {
            method.addEventListener('click', () => {
                const target = method.dataset.method;
                
                // Toggle active class on cards
                methods.forEach(m => m.classList.remove('active', 'border-primary', 'bg-primary/10'));
                method.classList.add('active', 'border-primary', 'bg-primary/10');

                // Show corresponding details
                details.forEach(d => {
                    if (d.id === `${target}-details`) {
                        d.classList.remove('hidden');
                        gsap.from(d, { opacity: 0, y: 10, duration: 0.4 });
                    } else {
                        d.classList.add('hidden');
                    }
                });
            });
        });

        // Select first method by default
        if (methods.length > 0) methods[0].click();
    }

    setupForm() {
        const form = document.getElementById('checkout-form');
        const successView = document.getElementById('success-view');
        const mainCheckout = document.getElementById('main-checkout');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const delivery = formData.get('delivery');
            
            if (name.length < 3 || !email.includes('@')) {
                this.showFeedback('Por favor complete su información correctamente.');
                return;
            }

            if (delivery === 'shipping') {
                const address = formData.get('address');
                if (!address || address.length < 5) {
                    this.showFeedback('Por favor indique una dirección de envío válida.');
                    return;
                }
            }

            const activeMethod = document.querySelector('.payment-method-card.active')?.dataset.method;
            
            // Simulate processing
            const submitBtn = form.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.style.pointerEvents = 'none';
            
            // Visual feedback of "Processing"
            gsap.to(submitBtn, { scale: 0.98, duration: 0.2 });
            
            const btnText = activeMethod === 'mercadopago' ? 'CONECTANDO CON MERCADO PAGO...' : 
                           activeMethod === 'card' ? 'SOLICITANDO TERMINAL...' : 'PROCESANDO COMPRA...';
            
            submitBtn.innerHTML = `
                <div class="flex items-center justify-center gap-3">
                    <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>${btnText}</span>
                </div>
            `;

            setTimeout(() => {
                // Generate WhatsApp message before clearing cart
                const waLink = this.generateWhatsAppLink(formData, activeMethod);
                
                // Clear cart
                localStorage.removeItem('magicworld-cart');
                
                // Show specific message in success view
                const successMsg = document.querySelector('#success-view p');
                let successTitle = "Compra recibida <span class='not-italic font-normal text-primary'>correctamente</span>";
                
                if (activeMethod === 'mercadopago') {
                    successTitle = "Portal de Pago <span class='not-italic font-normal text-primary'>Iniciado</span>";
                    successMsg.innerHTML = 'Se ha generado un enlace de pago seguro en Mercado Pago (Pruebas). <br/>Haga clic abajo para proceder o contactar por WhatsApp.';
                } else if (activeMethod === 'card') {
                    successMsg.innerHTML = 'Compra recibida. <br/>Nuestro equipo llevará la terminal bancaria para su pago al momento de la entrega o en su visita.';
                } else if (activeMethod === 'cash') {
                    successMsg.innerHTML = 'Se ha enviado la ficha de pago a su correo. <br/>Tiene 48 horas para completar el depósito.';
                } else if (activeMethod === 'transfer') {
                    successMsg.innerHTML = 'Su compra quedará pendiente hasta confirmar la transferencia bancaria.';
                }

                document.querySelector('#success-view h2').innerHTML = successTitle;

                // Update WhatsApp button in success view or add it
                const container = document.querySelector('#success-view .mt-12');
                const waBtn = document.createElement('a');
                waBtn.href = waLink;
                waBtn.target = "_blank";
                waBtn.className = "px-10 py-4 rounded-full bg-[#25D366] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all flex items-center gap-2 shadow-lg";
                waBtn.innerHTML = `
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.406.836 3.111 1.282 4.847 1.283 5.397 0 9.79-4.393 9.792-9.791.001-2.615-1.017-5.074-2.868-6.925-1.854-1.854-4.316-2.873-6.932-2.873-5.399 0-9.791 4.394-9.794 9.793 0 1.739.458 3.434 1.328 4.839l-1.037 3.78 3.864-1.016zm9.518-12.636c-.193-.433-.398-.442-.583-.45l-.493-.005c-.17 0-.447.064-.68.323-.233.258-.891.871-.891 2.126 0 1.254.912 2.467 1.038 2.636.127.17 1.777 2.72 4.315 3.816 2.112.91 2.542.728 3.01.684.467-.043 1.508-.617 1.72-.1.213-.617.213-1.148.149-1.254-.064-.106-.233-.17-.493-.3-.258-.127-1.508-.744-1.741-.828t-.383-.127c-.149 0-.276.064-.383.213-.106.149-.404.53-.493.637-.09.106-.17.127-.433 0-.17-.09-.705-.26-1.344-.829-.481-.43-.807-.961-.901-1.127-.09-.17-.01-.26.076-.345.076-.076.17-.193.258-.297.043-.053.076-.106.127-.17l.086-.149c.043-.09.021-.17-.011-.234-.031-.053-.276-.665-.379-.915z"/></svg>
                    Detalles vía WhatsApp
                `;
                container.prepend(waBtn);

                // Final Magic Transition
                const tl = gsap.timeline();
                
                tl.to(mainCheckout, { 
                    opacity: 0, 
                    filter: "blur(20px)",
                    scale: 1.05,
                    duration: 0.8, 
                    ease: "power2.inOut",
                    onComplete: () => {
                        mainCheckout.classList.add('hidden');
                        successView.classList.remove('hidden');
                        
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        
                        gsap.fromTo(successView, 
                            { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
                            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
                        );

                        gsap.from(".success-icon", {
                            scale: 0,
                            rotation: -45,
                            duration: 1,
                            ease: "elastic.out(1, 0.5)",
                            delay: 0.2
                        });
                    }
                });
            }, 2500);
        });
    }

    generateWhatsAppLink(formData, activeMethod) {
        const name = formData.get('name');
        const delivery = formData.get('delivery');
        const address = formData.get('address');
        const city = formData.get('city');
        const zip = formData.get('zip');
        
        const items = this.cart.map(item => `   ✨ ${item.name} ($${item.price.toFixed(2)})`).join('\n');
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        
        const deliveryText = delivery === 'shipping' 
            ? `🚚 Envío: ${address}, ${city} (CP ${zip})` 
            : `🏪 Recoger en Tienda`;

        const methodNames = {
            'card': '📟 Terminal Física (En domicilio/local)',
            'cash': '💵 Efectivo (OXXO/7-11)',
            'transfer': '🏦 Transferencia',
            'mercadopago': '🌀 Mercado Pago (Pago Online)'
        };

        const message = `🧙‍♂️ *¡Nueva Compra de Tesoros!*
--------------------------
👤 *Cliente:* ${name}
📦 *Compra:* 
${items}

💰 *Total:* $${total.toFixed(2)}
🚚 *Entrega:* ${deliveryText}
💳 *Método:* ${methodNames[activeMethod] || activeMethod}
--------------------------
_Enviado desde Magic World_`;

        return `https://wa.me/521234567890?text=${encodeURIComponent(message)}`;
    }

    showFeedback(msg) {
        const alert = document.createElement('div');
        alert.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl z-[100]";
        alert.textContent = msg;
        document.body.appendChild(alert);

        gsap.from(alert, { y: -20, opacity: 0, duration: 0.4 });
        setTimeout(() => {
            gsap.to(alert, { y: -20, opacity: 0, duration: 0.4, onComplete: () => alert.remove() });
        }, 3000);
    }
}

window.checkout = new CheckoutManager();
