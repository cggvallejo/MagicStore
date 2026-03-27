/**
 * MAGIC WORLD CHATBOT - "EL MAGUITO"
 * A sleek, luxury-focused AI assistant for Berakah Magic World.
 */

const maguitoBot = {
    state: 'GREETING',
    userData: {
        name: '',
        location: '',
        paymentMethod: '',
        coords: null
    },
    phoneNumber: '+521234567890',

    injectStyles() {
        if (document.getElementById('maguito-styles')) return;
        const style = document.createElement('style');
        style.id = 'maguito-styles';
        style.innerHTML = `
            @keyframes maguito-slide-up { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes maguito-msg-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes maguito-pulse- gold { 0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
            @keyframes maguito-pulse-vibrant { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(139, 92, 246, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
            
            .maguito-glass {
                background: rgba(8, 8, 8, 0.92);
                backdrop-filter: blur(30px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
            }
            
            #maguito-messages::-webkit-scrollbar { width: 2px; }
            #maguito-messages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
            
            .bot-msg { 
                background: rgba(255, 255, 255, 0.03); 
                border: 1px solid rgba(255, 255, 255, 0.05);
                animation: maguito-msg-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                line-height: 1.7;
                letter-spacing: 0.01em;
            }
            
            .user-msg { 
                background: linear-gradient(135deg, #8B5CF6, #6D28D9); 
                color: white; 
                margin-left: auto;
                animation: maguito-msg-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
            }

            .maguito-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
                padding: 12px 20px;
                border-radius: 16px;
                font-size: 13px;
                font-weight: 600;
                transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                cursor: pointer;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .maguito-btn:hover {
                background: white;
                color: black;
                transform: translateY(-3px);
                border-color: white;
                box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
            }

            .product-card-mini {
                background: rgba(255,255,255,0.015);
                border-radius: 24px;
                padding: 14px;
                display: flex;
                gap: 16px;
                margin-bottom: 12px;
                border: 1px solid rgba(255,255,255,0.05);
                transition: all 0.3s ease;
            }
            .product-card-mini:hover { 
                border-color: rgba(139, 92, 246, 0.3);
                background: rgba(255,255,255,0.03);
            }

            .maguito-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                width: fit-content;
            }
            .maguito-dot {
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                animation: maguito-dot-blink 1.4s infinite both;
            }
            @keyframes maguito-dot-blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
            .maguito-dot:nth-child(2) { animation-delay: 0.2s; }
            .maguito-dot:nth-child(3) { animation-delay: 0.4s; }

            /* Mobile Optimizations */
            @media (max-width: 768px) {
                #maguito-chat {
                    width: 100% !important;
                    height: 100% !important;
                    bottom: 0 !important;
                    right: 0 !important;
                    border-radius: 0 !important;
                    z-index: 5000 !important;
                }
                #maguito-toggle {
                    bottom: 20px !important;
                    right: 20px !important;
                }
                .maguito-glass { backdrop-filter: blur(40px); }
            }

            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    },

    init() {
        this.injectStyles();
        this.createWidget();
        this.setupListeners();
        
        // Inicializar interacciones aleatorias del Maguito Viajero
        if (window.innerWidth > 768) {
            setTimeout(() => {
                this.curator = new MagicCurator();
            }, 5000);
        }
        
        // Auto-open chatbot after 1.5s
        setTimeout(() => {
            if (this.state === 'GREETING' && !this.isOpen) {
                this.openChat();
            }
        }, 1500);
    },

    createWidget() {
        if (document.getElementById('maguito-bot')) return;
        
        const widget = document.createElement('div');
        widget.id = 'maguito-bot';
        widget.innerHTML = `
            <div id="maguito-chat" class="fixed bottom-28 right-8 w-[420px] h-[650px] maguito-glass rounded-[48px] overflow-hidden transition-all duration-700 transform translate-y-20 opacity-0 pointer-events-none z-[2000] flex flex-col">
                <!-- Header -->
                <div class="p-8 flex items-center justify-between bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                    <div class="flex items-center gap-5">
                        <div class="relative">
                            <div class="w-16 h-16 rounded-[24px] border border-white/10 overflow-hidden bg-black/60 flex items-center justify-center rotate-6 transition-transform hover:rotate-0 duration-500">
                                <img src="assets/maguito.png" alt="Maguito" class="w-full h-full object-cover">
                            </div>
                            <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#080808] animate-pulse"></span>
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-2xl" style="font-family: 'Playfair Display', serif; letter-spacing: 0.04em;">Maguito</h4>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 bg-primary rounded-full"></span>
                                <span class="text-white/40 text-[11px] font-black uppercase tracking-[0.25em]">Asesoría Mágica de Tesoros</span>
                            </div>
                        </div>
                    </div>
                    <button id="maguito-close-x" class="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <!-- Messages container -->
                <div id="maguito-messages" class="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth no-scrollbar">
                </div>

                <!-- Quick Replies (Advanced Sub-menus) -->
                <div class="px-8 py-2 relative">
                    <div id="maguito-quick-replies" class="flex gap-3 overflow-x-auto no-scrollbar pb-6">
                        <!-- Buttons injected here -->
                    </div>
                    <div class="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                </div>

                <!-- Input area -->
                <div class="p-8 bg-black/60 border-t border-white/5">
                    <div class="relative flex items-center">
                        <input type="text" id="maguito-input" placeholder="Pregúntale al Maguito..." 
                            class="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-medium pr-16 placeholder:text-white/20">
                        <button id="maguito-send" class="absolute right-2.5 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                            <span class="material-symbols-outlined text-2xl font-bold">arrow_upward</span>
                        </button>
                    </div>
                </div>
            </div>

            <button id="maguito-toggle" class="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-tr from-[#8B5CF6] to-[#6D28D9] text-white rounded-[32px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[2001] border border-white/20 overflow-hidden group p-5" style="animation: maguito-pulse-vibrant 2.5s infinite ease-in-out;">
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src="assets/maguito.png" alt="Toggle Chat" class="w-full h-full object-cover rounded-2xl transition-all group-hover:scale-110">
                <div class="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-black group-hover:border-white transition-colors"></div>
            </button>
        `;
        document.body.appendChild(widget);
        this.renderQuickReplies(['Colección Mágica ✨', 'Ayuda con mi Orden 🏛️']);
        this.addMessage("¡Hola! Bienvenido al universo de <b>Magic World</b>. Soy el <b>Maguito</b>, tu asesor personal entre reliquias y tesoros excepcionales.<br><br>He preparado una selección encantada para ti hoy. ¿Qué deseas descubrir?", 'bot', 800);
    },

    renderQuickReplies(options) {
        const container = document.getElementById('maguito-quick-replies');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'maguito-btn';
            btn.innerHTML = `<span>${opt}</span>`;
            btn.onclick = () => this.processInput(opt.replace(/[💎✨🏛️]/g, '').trim());
            container.appendChild(btn);
        });
    },

    setupListeners() {
        const toggle = document.getElementById('maguito-toggle');
        const closeX = document.getElementById('maguito-close-x');
        const chat = document.getElementById('maguito-chat');
        const input = document.getElementById('maguito-input');
        const send = document.getElementById('maguito-send');

        const toggleChat = () => {
            const isOpen = !chat.classList.contains('opacity-0');
            if (isOpen) {
                chat.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
                toggle.style.animation = 'maguito-pulse-vibrant 2.5s infinite ease-in-out';
                toggle.innerHTML = `<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><img src="assets/maguito.png" class="w-full h-full object-cover rounded-2xl z-10"><div class="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-black group-hover:border-white transition-colors"></div>`;
                this.isOpen = false;
            } else {
                chat.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
                toggle.style.animation = 'none';
                toggle.innerHTML = `<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><span class="material-symbols-outlined text-4xl relative z-10">expand_more</span>`;
                this.isOpen = true;
            }
        };

        toggle.onclick = toggleChat;
        closeX.onclick = toggleChat;

        const handleSend = () => {
            const val = input.value.trim();
            if (!val) return;
            this.processInput(val);
            input.value = '';
        };

        send.onclick = handleSend;
        input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
    },

    openChat() {
        const chat = document.getElementById('maguito-chat');
        if (chat && chat.classList.contains('opacity-0')) {
            const toggle = document.getElementById('maguito-toggle');
            if (toggle) toggle.click();
        }
    },

    addMessage(text, side, delay = 0) {
        const container = document.getElementById('maguito-messages');
        
        if (side === 'bot' && delay > 0) {
            const typing = document.createElement('div');
            typing.className = 'maguito-typing';
            typing.innerHTML = '<div class="maguito-dot"></div><div class="maguito-dot"></div><div class="maguito-dot"></div>';
            container.appendChild(typing);
            container.scrollTop = container.scrollHeight;
            
            setTimeout(() => {
                typing.remove();
                this.renderMessage(text, side);
            }, delay);
        } else {
            this.renderMessage(text, side);
        }
    },

    renderMessage(text, side) {
        const container = document.getElementById('maguito-messages');
        const msg = document.createElement('div');
        msg.className = `max-w-[85%] p-5 rounded-[24px] text-sm font-medium ${side === 'bot' ? 'bot-msg text-white/90' : 'user-msg shadow-xl'}`;
        msg.innerHTML = text;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    },

    async processInput(input) {
        this.addMessage(input, 'user');
        
        const lower = input.toLowerCase();
        
        if (this.state === 'GREETING') {
            if (lower.includes('colección') || lower.includes('magic')) {
                this.addMessage("Excelente elección. ¿Qué tipo de tesoro busca hoy? Tenemos varias categorías en nuestra colección principal:", 'bot', 600);
                this.renderQuickReplies(['Tazas ☕', 'Vasos y Termos 🥤', 'Loncheras 🍱', 'Ver Todo 🏛️', 'Regresar ↩️']);
                this.state = 'SELECT_SUB_CATEGORY';
            } else if (lower.includes('ayuda') || lower.includes('orden')) {
                this.promptName();
            } else if (lower.includes('regresar') || lower.includes('inicio')) {
                this.resetToGreeting();
            } else {
                this.addMessage("Dígame, ¿en qué área de nuestro tesoro desea sumergirse? Tenemos nuestras <b>Reliquias Históricas (Colección Mágica)</b> y soporte para pedidos.", 'bot', 600);
            }
        } else if (this.state === 'SELECT_SUB_CATEGORY') {
            if (lower.includes('regresar')) {
                this.resetToGreeting();
            } else if (lower.includes('todo')) {
                this.showCategory('reliquias');
                this.state = 'GREETING';
            } else if (lower.includes('taza')) {
                this.showSubCategory('Tazas');
                this.state = 'GREETING';
            } else if (lower.includes('vaso') || lower.includes('termo')) {
                this.showSubCategory('Vasos y Termos');
                this.state = 'GREETING';
            } else if (lower.includes('lonchera')) {
                this.showSubCategory('Loncheras');
                this.state = 'GREETING';
            } else {
                this.addMessage("Por favor, seleccione una de las categorías mágicas o diga 'Regresar'.", 'bot', 400);
            }
        } else if (this.state === 'AWAIT_NAME') {
            this.userData.name = input;
            this.addMessage(`Un placer conocerle, ${input}. ¿Desde qué rincón del mundo nos contacta para su entrega?`, 'bot', 500);
            this.state = 'AWAIT_LOCATION';
        } else if (this.state === 'AWAIT_LOCATION') {
            this.userData.location = input;
            this.askPayment();
        } else if (this.state === 'AWAIT_PAYMENT') {
            this.userData.paymentMethod = input;
            this.showSummary();
        }
    },

    resetToGreeting() {
        this.state = 'GREETING';
        this.addMessage("¿En qué más puedo ayudarle hoy? ¿Desea explorar más la <b>Colección Mágica ✨</b> o necesita ayuda con su orden?", 'bot', 500);
        this.renderQuickReplies(['Colección Mágica ✨', 'Ayuda con mi Orden 🏛️']);
    },

    showCategory(cat) {
        const products = (window.products || []).filter(p => p.category === cat);
        this.renderProductCards(products, cat.toUpperCase());
    },

    showSubCategory(subCat) {
        const products = (window.products || []).filter(p => p.itemSubCategory === subCat);
        this.renderProductCards(products, subCat.toUpperCase());
    },

    renderProductCards(products, title) {
        this.addMessage(`He seleccionado estas piezas de <b>${title}</b> para usted:`, 'bot', 600);
        
        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card-mini group';
            card.innerHTML = `
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <img src="${p.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <div class="text-[11px] text-primary font-bold uppercase tracking-wider mb-1">Disponible</div>
                    <div class="text-white text-xs font-bold mb-1 group-hover:text-primary transition-colors">${p.name}</div>
                    <div class="text-white/40 text-[10px]">$${p.price.toFixed(2)}</div>
                </div>
                <button class="self-center p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all">
                    <span class="material-symbols-outlined text-sm">add</span>
                </button>
            `;
            card.onclick = () => {
                window.engine.addToCart(p);
                this.addMessage(`He añadido <b>${p.name}</b> a su selección personal.`, 'bot', 400);
                this.renderQuickReplies(['Proceder al Pago 💎', 'Seguir Explorando ✨']);
                this.state = 'GREETING'; // Reset state after adding to cart
            };
            document.getElementById('maguito-messages').appendChild(card);
        });
        document.getElementById('maguito-messages').scrollTop = document.getElementById('maguito-messages').scrollHeight;
    },

    promptName() {
        this.addMessage("Por supuesto. Para personalizar su pedido, ¿podría indicarme su nombre?", 'bot', 500);
        this.state = 'AWAIT_NAME';
    },

    askPayment() {
        this.addMessage("Perfecto. ¿Cuál es su modalidad transaccional preferida?", 'bot', 500);
        this.renderQuickReplies(['Transferencia ✨', 'PayPal 🔮', 'Cripto 💎']);
        this.state = 'AWAIT_PAYMENT';
    },

    showSummary() {
        const cart = window.engine.cart;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const method = this.userData.paymentMethod;
        
        let summary = `<div class="bg-white/5 rounded-3xl p-6 border border-white/10">`;
        summary += `<h5 class="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 text-center">Resumen de Pedido</h5>`;
        
        summary += `<div class="space-y-3 text-white/60 text-xs border-y border-white/5 py-6">`;
        summary += `<div class="flex justify-between"><span>Asesor Mágico</span><span class="text-white">Maguito Digital</span></div>`;
        summary += `<div class="flex justify-between"><span>Cliente</span><span class="text-white">${this.userData.name}</span></div>`;
        summary += `<div class="flex justify-between"><span>Destino de Entrega</span><span class="text-white">${this.userData.location}</span></div>`;
        summary += `<div class="flex justify-between"><span>Método Transaccional</span><span class="text-white">${method}</span></div>`;
        summary += `</div>`;
        
        summary += `<div class="space-y-2 mt-4">`;
        cart.forEach(item => {
            summary += `<div class="flex justify-between text-[11px]"><span class="text-white/80">${item.name}</span><b class="text-white">$${item.price.toFixed(2)}</b></div>`;
        });
        summary += `</div>`;
        
        summary += `<div class="flex justify-between text-xl mt-8 font-black border-t border-white/10 pt-6"><span>Inversión Total</span><span class="text-primary">$${total.toFixed(2)}</span></div>`;
        summary += `</div>`;
        
        this.addMessage(summary, 'bot');
        this.addMessage("¿Certifica que los datos son correctos para proceder con la transmisión formal a nuestra central logística?", 'bot', 800);
        
        const container = document.getElementById('maguito-messages');
        const btnSend = document.createElement('button');
        btnSend.className = 'w-full bg-white text-black rounded-[24px] p-5 font-black flex items-center justify-center gap-4 mt-6 hover:bg-primary hover:text-white transition-all uppercase tracking-[0.2em] text-[11px] shadow-2xl';
        btnSend.innerHTML = `Confirmar y Transmitir <span class="material-symbols-outlined font-bold">verified</span>`;
        btnSend.onclick = () => this.sendWhatsApp();
        container.appendChild(btnSend);
        container.scrollTop = container.scrollHeight;
    },

    sendWhatsApp() {
        const cart = window.engine.cart;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        let text = `🏛️ *ORDEN DE COMPRA*\n`;
        text += `_Magic World Atelier Central_\n\n`;
        text += `👤 *Cliente:* ${this.userData.name}\n`;
        text += `📍 *Destino:* ${this.userData.location}\n`;
        if (this.userData.coords) text += `🔗 *Maps:* https://www.google.com/maps?q=${this.userData.coords}\n`;
        text += `💳 *Método:* ${this.userData.paymentMethod}\n\n`;
        text += `💎 *Tesoros Seleccionados:*\n`;
        
        cart.forEach((item, i) => {
            text += `> ${i+1}. ${item.name} ($${item.price.toFixed(2)})\n`;
        });
        
        text += `\n✨ *INVERSIÓN FINAL:* $${total.toFixed(2)}`;
        
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/${this.phoneNumber}?text=${encoded}`, '_blank');
        
        this.addMessage("Su solicitud ha sido transmitida exitosamente. Nuestro personal de soporte premium contactará con usted a la brevedad para los toques finales de la logística. <br><br>Ha sido un placer elevar su experiencia de compra.", 'bot');
        this.state = 'GREETING';
        this.renderQuickReplies(['Nueva Consulta 💎', 'Volver al Inicio 🏛️']);
    }
};

/**
 * MAGIC CURATOR - THE WANDERING WIZARD
 * Handles random appearances around the site
 */
class MagicCurator {
    constructor() {
        this.phrases = [
            "¿Sabías que nuestras piezas de mármol se extraen de canteras exclusivas? ✨",
            "¡Psst! Usa el código <b>MAGIC10</b> para un descuento especial en tu primera compra. 🪄",
            "Esa pieza que miras es de las favoritas de la temporada. 🔮",
            "¿Buscas un regalo? El set de portavasos premium nunca falla. 🏛️",
            "¡Qué buen gusto tienes! Esa combinación es exquisita. ✨"
        ];
        this.active = false;
        this.createCuratorElement();
    }

    createCuratorElement() {
        const el = document.createElement('div');
        el.id = 'magic-curator-wanderer';
        el.className = 'fixed transition-all duration-1000 transform scale-0 opacity-0 z-[1500] pointer-events-none';
        el.innerHTML = `
            <div class="relative group pointer-events-auto cursor-pointer">
                <div class="absolute -top-24 -left-10 w-48 bg-white text-black p-4 rounded-2xl text-xs font-medium shadow-2xl opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 border border-primary/20">
                    <div id="curator-bubble-text">¿Necesitas un toque de magia?</div>
                    <div class="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 border-r border-b border-primary/10"></div>
                </div>
                <div class="w-16 h-16 rounded-full border-2 border-primary/30 shadow-2xl overflow-hidden bg-black/80 hover:scale-110 transition-transform p-1">
                    <img src="assets/maguito.png" class="w-full h-full object-cover rounded-full">
                </div>
            </div>
        `;
        document.body.appendChild(el);
        this.element = el;
        
        this.element.onclick = () => {
            maguitoBot.openChat();
            this.disappear();
        };

        this.scheduleAppearance();
    }

    scheduleAppearance() {
        const nextIn = 30000 + Math.random() * 60000; // 30-90 segundos
        setTimeout(() => this.appear(), nextIn);
    }

    appear() {
        if (this.active || (maguitoBot.isOpen)) return;
        
        const positions = [
            { bottom: '10%', left: '5%' },
            { top: '20%', right: '5%' },
            { bottom: '25%', left: '2%' }
        ];
        const pos = positions[Math.floor(Math.random() * positions.length)];
        const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        
        const textEl = document.getElementById('curator-bubble-text');
        if (textEl) textEl.innerHTML = phrase;
        
        this.element.style.top = pos.top || 'auto';
        this.element.style.bottom = pos.bottom || 'auto';
        this.element.style.left = pos.left || 'auto';
        this.element.style.right = pos.right || 'auto';
        
        this.element.classList.remove('scale-0', 'opacity-0');
        this.element.classList.add('scale-100', 'opacity-100');
        
        this.active = true;
        setTimeout(() => this.disappear(), 12000);
    }

    disappear() {
        this.element.classList.add('scale-0', 'opacity-0');
        this.element.classList.remove('scale-100', 'opacity-100');
        this.active = false;
        this.scheduleAppearance();
    }
}

document.addEventListener('DOMContentLoaded', () => maguitoBot.init());
export default maguitoBot;
