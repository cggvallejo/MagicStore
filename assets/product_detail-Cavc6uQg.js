import"./chatbot-jXFW6w0T.js";/* empty css                      */import"./main-QdxWOJdM.js";window.BASE_IMG_PATH=`assets/`,document.addEventListener(`DOMContentLoaded`,()=>{let e=new URLSearchParams(window.location.search).get(`id`),t=(()=>{let e=localStorage.getItem(`bmw_products`);return e?JSON.parse(e):window.products||[]})().find(t=>t.id==e),n=document.getElementById(`product-detail-container`);if(t){document.title=`${t.name} | Premium Edition`,n.innerHTML=`
                    <div class="relative group animate-fade-in">
                        <div class="aspect-square glass-card p-0 overflow-hidden shadow-glow">
                            <img src="assets/products/${t.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="${t.name}">
                        </div>
                        <div class="mt-8 grid grid-cols-4 gap-4">
                            ${[1,2,3,4].map(()=>`<div class="aspect-square glass-card p-0 overflow-hidden cursor-pointer hover:border-primary transition-all opacity-80"><img src="assets/products/${t.image}" class="w-full h-full object-cover"></div>`).join(``)}
                        </div>
                    </div>
                    <div class="flex flex-col justify-center animate-fade-in" style="animation-delay: 0.2s">
                        <span class="badge mb-6">${t.brand} | High Fashion</span>
                        <h1 class="text-6xl font-black text-white leading-tight mb-6 tracking-tighter uppercase italic">${t.name}</h1>
                        <div class="flex items-center gap-8 mb-10 pb-8 border-b border-white/10">
                            <span class="text-5xl font-black text-accent">$${t.price.toFixed(2)}</span>
                            <span class="px-5 py-2 bg-white/10 text-white text-xs font-black rounded-full tracking-widest uppercase italic">New Season</span>
                        </div>
                        <p class="text-2xl text-white/70 mb-12 leading-relaxed font-light">${t.description}</p>
                        
                        <div class="space-y-6">
                            <button id="add-to-cart-btn"
                                class="btn-primary w-full py-6 text-xl flex items-center justify-center gap-4">
                                <span class="material-symbols-outlined text-3xl">shopping_bag</span>
                                Añadir a la Colección
                            </button>
                            <p class="text-center text-sm text-white/40 font-medium tracking-wide">Exclusividad garantizada | Edición Limitada</p>
                        </div>
                    </div>
                `;let e=()=>{window.engine?window.engine.addToCart(t):setTimeout(e,100)};document.getElementById(`add-to-cart-btn`).onclick=e}else n.innerHTML=`<div class="col-span-full py-20 text-center"><p class="text-2xl font-bold opacity-50">Producto no encontrado</p><a href="index.html" class="text-primary underline mt-4 inline-block">Volver al inicio</a></div>`});