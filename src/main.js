import { getProducts } from './storage.js';

window.products = getProducts();

// Cargar preferencias globales
const storedPreferences = localStorage.getItem('bmw_preferences');
if (storedPreferences) {
    const prefs = JSON.parse(storedPreferences);
    if (prefs.siteName) document.title = prefs.siteName;
    if (prefs.accentColor) {
        document.documentElement.style.setProperty('--accent', prefs.accentColor);
    }
}

/**
 * MAGIC WORLD - CORE ENGINE
 * Spec: El Atelier de Magia
 */

class DigitalCuratorEngine {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('magicworld-cart')) || [];
        // Pagination State
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentCategory = 'All';
        this.currentType = 'All';
        this.currentStyle = 'All';
        this.currentSubCategory = 'All';
        this.filteredProducts = [...window.products];
        
        this.init();
    }

    init() {
        console.log("[Atelier] Engine iniciado.");
        
        const start = () => {
            this.updateCartBadge();
            this.setupEventListeners();
            this.renderCheckout();
            this.setupSearch();
            this.updateView();
            this.renderHeroCarousel();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', start);
        } else {
            start();
        }

        // Exponer función para el modal
        window.openProductModal = (id) => this.openProductModal(id);
    }

    renderHeroCarousel() {
        const carouselInner = document.getElementById('carousel-inner');
        const indicators = document.getElementById('carousel-indicators');
        if (!carouselInner || !indicators) return;

        const basePath = window.BASE_IMG_PATH || '';

        // Top 5 products by sales
        const topProducts = [...window.products]
            .filter(p => p.sales !== undefined)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        // Custom Hero Slide First
        const slidesData = [
            {
                isHero: true,
                title: "Nueva Colección 2026",
                subtitle: "La magia de lo exclusivo en tus manos.",
                image: "hero_main.png",
                link: "#products"
            },
            ...topProducts
        ];

        carouselInner.innerHTML = "";
        indicators.innerHTML = "";

        slidesData.forEach((product, index) => {
            const slide = document.createElement('div');
            slide.className = "min-w-full h-full relative flex items-center px-8 md:px-24";
            
            // Determinar la ruta de la imagen
            const isExternal = product.image && (product.image.startsWith('http') || product.image.startsWith('data:'));
            const imgPath = product.isHero ? `${basePath}banners/${product.image}` : (isExternal ? product.image : `${basePath}products/${product.image}`);

            if (product.isHero) {
                slide.innerHTML = `
                    <div class="relative z-10 max-w-2xl glass-card p-12 animate-fade-in ml-12">
                        <span class="badge mb-6">Lanzamiento Exclusivo</span>
                        <h2 class="text-6xl font-black text-white leading-tight mb-6 tracking-tighter uppercase italic">The Infinite <span class="text-accent">Collection</span></h2>
                        <p class="text-xl text-white/80 mb-10 font-medium">La asesoría digital personalizada. <br/>Moda de lujo para mentes vanguardistas.</p>
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
                            <button class="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all" onclick="window.openProductModal('${product.id}')">Ver Pieza</button>
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

    updateView() {
        this.filterProducts();
        this.renderCatalog();
        this.renderPagination();
    }

    filterProducts(query = '') {
        this.filteredProducts = window.products.filter(p => {
            const matchesCategory = this.currentCategory === 'All' || p.category === this.currentCategory;
            const matchesType = this.currentType === 'All' || p.type === this.currentType;
            const matchesStyle = this.currentStyle === 'All' || 
                                (this.currentStyle === 'Edición Especial' && p.name.includes('Exclusive')) ||
                                (this.currentStyle === 'Lujo' && p.price > 1000) ||
                                (this.currentStyle === 'Casual' && p.price <= 1000);
            
            const matchesSubCategory = this.currentSubCategory === 'All' || p.itemSubCategory === this.currentSubCategory;
            const matchesSearch = !query || 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query);
            
            // Heuristic for Digital/Physical since data doesn't have it explicitly
            let productType = 'Físico'; 
            if (p.name.toLowerCase().includes('digital') || p.id.includes('dig')) productType = 'Digital';
            
            const matchesTypeFinal = this.currentType === 'All' || productType === this.currentType;

            return matchesCategory && matchesTypeFinal && matchesStyle && matchesSubCategory && matchesSearch;
        });
    }

    renderCatalog() {
        const catalogGrid = document.getElementById('product-grid');
        if (!catalogGrid) return;

        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = this.filteredProducts.slice(start, end);

        const basePath = window.BASE_IMG_PATH || '';
        
        catalogGrid.innerHTML = paginatedItems.map(item => {
            const isExternal = item.image && (item.image.startsWith('http') || item.image.startsWith('data:'));
            const imagePath = isExternal ? item.image : `${basePath}products/${item.image}`;
            return `
                <div class="glass-card group flex flex-col p-0 overflow-hidden animate-fade-in">
                    <div class="neon-beam-container card-beam cursor-pointer" onclick="window.openProductModal('${item.id}')">
                        <div class="neon-beam-inner relative h-80 overflow-hidden">
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${imagePath}" loading="lazy"/>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span class="absolute top-4 left-4 badge">${item.brand}</span>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">${item.name}</h4>
                            <span class="text-accent font-black text-xl">MXN$${item.price.toFixed(2)}</span>
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

        if (paginatedItems.length === 0) {
            catalogGrid.innerHTML = `
                <div class="col-span-full py-20 text-center">
                    <span class="material-symbols-outlined text-6xl text-white/10 mb-4">inventory_2</span>
                    <p class="text-white/40 font-medium">No encontramos productos con estos filtros.</p>
                </div>
            `;
        }
    }

    renderPagination() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageNumbers = document.getElementById('page-numbers');
        const paginationInfo = document.getElementById('pagination-info');

        if (!prevBtn || !nextBtn || !pageNumbers || !paginationInfo) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
        
        // Update text
        paginationInfo.textContent = `Página ${this.currentPage} de ${totalPages}`;

        // Update buttons
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages;

        // Render numbers
        pageNumbers.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 5) {
                // Simplified pagination for many pages
                if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                    this.addPageButton(pageNumbers, i);
                } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                    const dot = document.createElement('span');
                    dot.textContent = "...";
                    dot.className = "text-white/20 px-2";
                    pageNumbers.appendChild(dot);
                }
            } else {
                this.addPageButton(pageNumbers, i);
            }
        }
    }

    addPageButton(container, page) {
        const btn = document.createElement('button');
        btn.textContent = page;
        btn.className = `w-10 h-10 rounded-full text-xs font-bold transition-all ${this.currentPage === page ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`;
        btn.onclick = () => {
            this.currentPage = page;
            this.updateView();
            document.getElementById('colecciones').scrollIntoView({ behavior: 'smooth' });
        };
        container.appendChild(btn);
    }

    openProductModal(id) {
        const product = window.products.find(p => p.id === id);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const img = document.getElementById('modal-img');
        const brand = document.getElementById('modal-brand');
        const title = document.getElementById('modal-title');
        const price = document.getElementById('modal-price');
        const desc = document.getElementById('modal-desc');
        const addBtn = document.getElementById('modal-add-btn');

        const basePath = window.BASE_IMG_PATH || '';
        const isExternal = product.image && (product.image.startsWith('http') || product.image.startsWith('data:'));
        img.src = isExternal ? product.image : `${basePath}products/${product.image}`;
        brand.textContent = product.brand;
        title.textContent = product.name;
        price.textContent = `MXN$ ${product.price.toFixed(2)}`;
        desc.textContent = product.description.substring(0, 150) + (product.description.length > 150 ? '...' : '');
        
        addBtn.onclick = () => {
            this.addToCart(product);
            this.closeModal();
        };

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    setupEventListeners() {
        const closeModalBtn = document.getElementById('close-modal');
        const modal = document.getElementById('product-modal');
        
        if (closeModalBtn) closeModalBtn.onclick = () => this.closeModal();
        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) this.closeModal();
            };
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Pagination buttons
        const prevPage = document.getElementById('prev-page');
        const nextPage = document.getElementById('next-page');
        if (prevPage) prevPage.onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateView();
                document.getElementById('colecciones').scrollIntoView({ behavior: 'smooth' });
            }
        };
        if (nextPage) nextPage.onclick = () => {
            const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateView();
                document.getElementById('colecciones').scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart');
            if (btn) {
                const product = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: parseFloat(btn.dataset.price),
                    image: btn.closest('.glass-card')?.querySelector('img')?.src || ''
                };
                this.addToCart(product);
            }
        });

        // Filter Buttons Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.onclick = () => {
                const type = btn.dataset.type;
                const style = btn.dataset.style;
                const sub = btn.dataset.sub;
                
                if (type) {
                    this.currentType = type;
                    // Deactivate others in the same group (Format)
                    btn.closest('.flex').querySelectorAll('[data-type]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                
                if (style) {
                    this.currentStyle = style;
                    // Deactivate others in the same group (Style)
                    btn.closest('.flex').querySelectorAll('[data-style]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                
                if (sub) {
                    this.currentSubCategory = sub;
                    // Deactivate others in the same group (Categories)
                    btn.closest('.filter-bar').querySelectorAll('[data-sub]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                
                this.currentPage = 1;
                this.updateView();
            };
        });
    }


    setupSearch() {
        const searchInput = document.getElementById('main-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.filterProducts(query);
                this.renderCatalog();
                this.renderPagination();
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
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none";
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = "bg-gray-900 border border-white/10 text-white px-8 py-4 rounded-full font-bold shadow-2xl animate-bounce-in pointer-events-auto backdrop-blur-xl";
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
            toast.style.transition = 'all 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
}

window.engine = new DigitalCuratorEngine();
