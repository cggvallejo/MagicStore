/**
 * MAGIC WORLD & BERAKAH - CORE ENGINE
 * Spec: The Digital Curator
 */

class DigitalCuratorEngine {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('magicworld-cart')) || [];
        this.init();
    }

    init() {
        console.log("[Digital Curator] Engine iniciado.");
        
        const start = () => {
            this.updateCartBadge();
            this.setupEventListeners();
            this.renderCheckout();
            this.setupSearch();
            this.renderAllProducts();
            this.renderPromoProducts();
            this.renderHeroCarousel();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', start);
        } else {
            start();
        }
    }

    renderHeroCarousel() {
        const carouselInner = document.getElementById('carousel-inner');
        const indicators = document.getElementById('carousel-indicators');
        if (!carouselInner || !indicators) return;

        const basePath = window.BASE_IMG_PATH || '';

        // Custom Hero Slide First
        const slidesData = [
            {
                isHero: true, // Keep isHero for the rendering logic
                title: "Nueva Colección 2026",
                subtitle: "La magia de lo exclusivo en tus manos.",
                image: "hero_main.png", // Path relative to basePath + banners/
                link: "#products"
            },
            ...window.products.filter(p => p.brand === "Magic World").slice(0, 2),
            ...window.products.filter(p => p.brand === "Berakah").slice(0, 2)
        ];

        carouselInner.innerHTML = "";
        indicators.innerHTML = "";

        slidesData.forEach((product, index) => {
            const slide = document.createElement('div');
            slide.className = "min-w-full h-full relative flex items-center px-8 md:px-24";
            
            // Determinar la ruta de la imagen
            const imgPath = product.isHero ? `${basePath}banners/${product.image}` : `${basePath}products/${product.image}`;

            if (product.isHero) {
                slide.innerHTML = `
                    <div class="relative z-10 max-w-2xl glass-card p-12 animate-fade-in ml-12">
                        <span class="badge mb-6">Lanzamiento Exclusivo</span>
                        <h2 class="text-6xl font-black text-white leading-tight mb-6 tracking-tighter uppercase italic">The Infinite <span class="text-accent">Collection</span></h2>
                        <p class="text-xl text-white/80 mb-10 font-medium">La curaduría digital definitiva. <br/>Moda de lujo para mentes vanguardistas.</p>
                        <div class="flex gap-6">
                            <button class="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Explorar Ahora</button>
                        </div>
                    </div>
                    <!-- Blurred background for depth -->
                    <div class="absolute inset-0 bg-black/40 z-0 backdrop-blur-sm"></div>
                    <img class="absolute inset-0 w-full h-full object-cover opacity-30 -z-20 blur-xl" src="${imgPath}" />
                    
                    <!-- Main contained image -->
                    <div class="absolute inset-0 flex items-center justify-end p-20 z-0">
                        <img class="h-full max-w-[50%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] animate-float" src="${imgPath}" alt="Hero Flash"/>
                    </div>
                `;
            } else {
                slide.innerHTML = `
                    <div class="relative z-10 max-w-lg glass-card p-10 animate-fade-in ml-12">
                        <span class="badge mb-4">${product.brand} | Destacado</span>
                        <h2 class="text-4xl font-black text-white leading-tight mb-4 tracking-tighter">${product.name}</h2>
                        <p class="text-lg text-white/70 mb-8 font-medium line-clamp-2">${product.description}</p>
                        <div class="flex gap-4 items-center">
                            <button class="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all" onclick="window.location.href='src/product_detail.html?id=${product.id}'">Ver Pieza</button>
                            <span class="text-white text-2xl font-black">$${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <!-- Blurred background for depth -->
                    <div class="absolute inset-0 bg-black/40 z-0 backdrop-blur-sm"></div>
                    <img class="absolute inset-0 w-full h-full object-cover opacity-20 -z-20 blur-lg" src="${imgPath}" />

                    <!-- Main contained image -->
                    <div class="absolute inset-0 flex items-center justify-end p-24 z-0">
                        <img class="h-full max-w-[45%] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] animate-float" src="${imgPath}" alt="${product.name}"/>
                    </div>
                `;
            }
            carouselInner.appendChild(slide);

            const dot = document.createElement('div');
            dot.className = `carousel-indicator w-2 h-2 rounded-full bg-white/20 cursor-pointer transition-all ${index === 0 ? 'bg-primary w-8' : ''}`;
            dot.onclick = () => this.goToSlide(index);
            indicators.appendChild(dot);
        });

        this.currentSlide = 0;
        this.totalSlides = slidesData.length;

        if (this.totalSlides > 1) {
            if (this.carouselInterval) clearInterval(this.carouselInterval);
            this.carouselInterval = setInterval(() => {
                this.nextSlide();
            }, 6000);
        }

        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        if (prevBtn) prevBtn.onclick = () => this.prevSlide();
        if (nextBtn) nextBtn.onclick = () => this.nextSlide();
    }

    goToSlide(index) {
        if (isNaN(index) || !this.totalSlides || this.totalSlides === 0) return;
        
        const carouselInner = document.getElementById('carousel-inner');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (!carouselInner) return;
        
        this.currentSlide = index;
        carouselInner.style.transform = `translateX(-${index * 100}%)`;

        // Update indicators
        if (indicators.length > 0) {
            indicators.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-primary', 'w-8');
                    dot.classList.remove('bg-white/20');
                } else {
                    dot.classList.remove('bg-primary', 'w-8');
                    dot.classList.add('bg-white/20');
                }
            });
        }
    }

    nextSlide() {
        if (!this.totalSlides || this.totalSlides <= 1) return;
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }

    prevSlide() {
        if (!this.totalSlides || this.totalSlides <= 1) return;
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }

    renderAllProducts() {
        const homeGrid = document.getElementById('home-products');
        const catalogGrid = document.getElementById('product-grid');
        const brandGrid = document.getElementById('brand-grid');
        
        if (homeGrid) this.renderTo(homeGrid, window.products.slice(0, 12));
        if (catalogGrid) this.renderTo(catalogGrid, window.products);
        
        if (brandGrid && window.BRAND_FILTER) {
            const filtered = window.products.filter(p => p.brand === window.BRAND_FILTER);
            this.renderTo(brandGrid, filtered);
        }
    }

    renderPromoProducts() {
        const bkContainer = document.getElementById('promo-bk-products');
        const mwContainer = document.getElementById('promo-mw-products');
        const basePath = window.BASE_IMG_PATH || '';

        if (bkContainer) {
            const bkProducts = window.products.filter(p => p.brand === "Berakah").slice(0, 3);
            bkContainer.innerHTML = bkProducts.map(p => `
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 hover:border-white transition-all cursor-pointer shadow-lg" 
                     onclick="window.location.href='src/product_detail.html?id=${p.id}'" title="${p.name}">
                    <img src="${basePath}products/${p.image}" class="w-full h-full object-cover">
                </div>
            `).join('');
        }

        if (mwContainer) {
            const mwProducts = window.products.filter(p => p.brand === "Magic World").slice(0, 3);
            mwContainer.innerHTML = mwProducts.map(p => `
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/40 hover:border-primary transition-all cursor-pointer shadow-lg" 
                     onclick="window.location.href='src/product_detail.html?id=${p.id}'" title="${p.name}">
                    <img src="${basePath}products/${p.image}" class="w-full h-full object-cover">
                </div>
            `).join('');
        }
    }

    renderTo(container, items) {
        const basePath = window.BASE_IMG_PATH || '';
        
        container.innerHTML = items.map(item => {
            const imagePath = `${basePath}products/${item.image}`;
            return `
                <div class="glass-card group flex flex-col p-0 overflow-hidden">
                    <div class="relative h-80 overflow-hidden cursor-pointer" onclick="window.location.href='${basePath.includes('src') ? '' : 'src/'}product_detail.html?id=${item.id}'">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${imagePath}" loading="lazy"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span class="absolute top-4 left-4 badge">${item.brand}</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">${item.name}</h4>
                            <span class="text-accent font-black text-xl">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="text-white/60 text-sm mb-6 line-clamp-2 flex-1">${item.description}</p>
                        <button class="btn-primary w-full add-to-cart flex items-center justify-center gap-2" 
                            data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                            <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
                            Añadir
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart');
            if (btn) {
                const product = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: parseFloat(btn.dataset.price),
                    image: btn.closest('.group')?.querySelector('img')?.src || ''
                };
                this.addToCart(product);
            }

            if (e.target.classList.contains('category-filter') || e.target.classList.contains('category-tab') || e.target.classList.contains('type-filter')) {
                const category = e.target.dataset.category;
                const type = e.target.dataset.type;
                const container = document.getElementById('product-grid') || document.getElementById('home-products');
                
                if (container) {
                    let filtered = products;
                    if (category && category !== 'All') {
                        filtered = products.filter(p => p.brand === category || p.category === category);
                    }
                    if (type && type !== 'All') {
                        filtered = products.filter(p => p.type === type);
                    }
                    
                    this.renderTo(container, filtered);
                    
                    const groupClass = e.target.classList.contains('type-filter') ? '.type-filter' : '.category-tab, .category-filter';
                    document.querySelectorAll(groupClass).forEach(el => el.classList.remove('active', 'bg-primary', 'text-white'));
                    e.target.classList.add('active', 'bg-primary', 'text-white');
                }
            }
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('main-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const container = document.getElementById('product-grid') || document.getElementById('home-products') || document.getElementById('brand-grid');
                if (!container) return;

                if (query.trim() === "") {
                    // Restaurar vista original según el contenedor
                    this.renderAllProducts();
                    return;
                }

                const filtered = window.products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.description.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query)
                );
                
                this.renderTo(container, filtered);
            });
        }
    }

    addToCart(product) {
        this.cart.push(product);
        this.saveCart();
        this.updateCartBadge();
        this.showToast(`¡${product.name} añadido!`);
    }

    saveCart() {
        localStorage.setItem('magicworld-cart', JSON.stringify(this.cart));
    }

    updateCartBadge() {
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.textContent = this.cart.length;
            badge.classList.toggle('hidden', this.cart.length === 0);
        }
    }

    renderCheckout() {
        const container = document.getElementById('cart-items-container');
        if (!container) return;

        const emptyMsg = document.getElementById('empty-cart-msg');
        
        if (this.cart.length === 0) {
            if (emptyMsg) emptyMsg.classList.remove('hidden');
            container.innerHTML = "";
            this.updateTotals();
            return;
        }

        if (emptyMsg) emptyMsg.classList.add('hidden');

        container.innerHTML = this.cart.map((item, index) => `
            <div class="glass-card flex items-center gap-6 p-4 border-white/5 mb-4 group hover:border-primary/30 transition-all animate-fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="w-24 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                    <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex-1">
                    <h3 class="font-black text-xl text-white tracking-tight italic uppercase">${item.name}</h3>
                    <p class="text-primary font-black text-lg">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="window.engine.removeItem(${index})" class="material-symbols-outlined text-white/20 hover:text-primary transition-colors p-2 cursor-pointer text-3xl">delete_sweep</button>
            </div>
        `).join('');

        this.updateTotals();
    }

    updateTotals() {
        const subtotalElem = document.getElementById('subtotal-val');
        const totalElem = document.getElementById('total-val');
        const subtotal = this.cart.reduce((sum, item) => sum + item.price, 0);
        if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        if (totalElem) totalElem.textContent = `$${subtotal.toFixed(2)}`;
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartBadge();
        this.renderCheckout();
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-[100] animate-bounce-in";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

window.engine = new DigitalCuratorEngine();
