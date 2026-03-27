import './main.js';
/**
 * VITORIA V2.1 - ELITE LUXURY CONCIERGE
 * Berakah Magic World Digital Curator & Aesthetic Guide
 */

const vitoriaBot = {
    state: 'GREETING',
    userData: {
        name: '',
        location: '',
        paymentMethod: '',
        coords: null
    },
    phoneNumber: '+521234567890',

    injectStyles() {
        if (document.getElementById('vitoria-styles')) return;
        const style = document.createElement('style');
        style.id = 'vitoria-styles';
        style.innerHTML = `
            @keyframes vitoria-slide-up { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes vitoria-msg-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes vitoria-pulse-gold { 0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
            @keyframes vitoria-pulse-vibrant { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(139, 92, 246, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
            
            .vitoria-glass {
                background: rgba(8, 8, 8, 0.92);
                backdrop-filter: blur(30px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
            }
            
            #vitoria-messages::-webkit-scrollbar { width: 2px; }
            #vitoria-messages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
            
            .bot-msg { 
                background: rgba(255, 255, 255, 0.03); 
                border: 1px solid rgba(255, 255, 255, 0.05);
                animation: vitoria-msg-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                line-height: 1.7;
                letter-spacing: 0.01em;
            }
            
            .user-msg { 
                background: linear-gradient(135deg, #8B5CF6, #6D28D9); 
                color: white; 
                margin-left: auto;
                animation: vitoria-msg-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
            }

            .vitoria-btn {
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
            .vitoria-btn:hover {
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

            .vitoria-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                width: fit-content;
            }
            .vitoria-dot {
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                animation: vitoria-dot-blink 1.4s infinite both;
            }
            @keyframes vitoria-dot-blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
            .vitoria-dot:nth-child(2) { animation-delay: 0.2s; }
            .vitoria-dot:nth-child(3) { animation-delay: 0.4s; }

            /* Mobile Optimizations */
            @media (max-width: 768px) {
                #vitoria-chat {
                    width: 100% !important;
                    height: 100% !important;
                    bottom: 0 !important;
                    right: 0 !important;
                    border-radius: 0 !important;
                    z-index: 5000 !important;
                }
                #vitoria-toggle {
                    bottom: 20px !important;
                    right: 20px !important;
                }
                .vitoria-glass { backdrop-filter: blur(40px); }
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
        
        // Auto-open chatbot after 1.5s
        setTimeout(() => {
            if (this.state === 'GREETING' && !this.isOpen) {
                this.openChat();
            }
        }, 1500);
    },

    createWidget() {
        if (document.getElementById('vitoria-bot')) return;
        
        const widget = document.createElement('div');
        widget.id = 'vitoria-bot';
        widget.innerHTML = `
            <div id="vitoria-chat" class="fixed bottom-28 right-8 w-[420px] h-[650px] vitoria-glass rounded-[48px] overflow-hidden transition-all duration-700 transform translate-y-20 opacity-0 pointer-events-none z-[2000] flex flex-col">
                <!-- Header -->
                <div class="p-8 flex items-center justify-between bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                    <div class="flex items-center gap-5">
                        <div class="relative">
                            <div class="w-16 h-16 rounded-[24px] border border-white/10 overflow-hidden bg-black/60 flex items-center justify-center rotate-6 transition-transform hover:rotate-0 duration-500">
                                <span class="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
                            </div>
                            <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#080808] animate-pulse"></span>
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-2xl" style="font-family: 'Playfair Display', serif; letter-spacing: 0.04em;">Vitoria</h4>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 bg-primary rounded-full"></span>
                                <span class="text-white/40 text-[11px] font-black uppercase tracking-[0.25em]">Concierge Digital de Lujo</span>
                            </div>
                        </div>
                    </div>
                    <button id="vitoria-close-x" class="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <!-- Messages container -->
                <div id="vitoria-messages" class="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth no-scrollbar">
                </div>

                <!-- Quick Replies (Advanced Sub-menus) -->
                <div class="px-8 py-2 relative">
                    <div id="vitoria-quick-replies" class="flex gap-3 overflow-x-auto no-scrollbar pb-6">
                        <!-- Buttons injected here -->
                    </div>
                    <div class="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                </div>

                <!-- Input area -->
                <div class="p-8 bg-black/60 border-t border-white/5">
                    <div class="relative flex items-center">
                        <input type="text" id="vitoria-input" placeholder="Consulte con su curadora..." 
                            class="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-medium pr-16 placeholder:text-white/20">
                        <button id="vitoria-send" class="absolute right-2.5 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                            <span class="material-symbols-outlined text-2xl font-bold">arrow_upward</span>
                        </button>
                    </div>
                </div>
            </div>

            <button id="vitoria-toggle" class="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-tr from-[#8B5CF6] to-[#6D28D9] text-white rounded-[32px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[2001] border border-white/20 overflow-hidden group p-5" style="animation: vitoria-pulse-vibrant 2.5s infinite ease-in-out;">
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span class="material-symbols-outlined text-4xl relative z-10 transition-all group-hover:rotate-12 group-hover:scale-110">spa</span>
                <div class="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-black group-hover:border-white transition-colors"></div>
            </button>
        `;
        document.body.appendChild(widget);
        this.renderQuickReplies(['Colección Berakah 💎', 'Magic World Shop ✨', 'Asistencia de Pedido 🏛️']);
        this.addMessage("Bienvenido al universo <b>Berakah Magic World</b>. Soy Vitoria, su Concierge Digital y guía en esta curaduría de excelencia.<br><br>Es un privilegio asistirle. ¿Qué faceta de nuestro mundo desea explorar hoy: la elegancia de <b>Berakah</b> o el estilo vibrante de <b>Magic World</b>?", 'bot', 1000);
    },

    renderQuickReplies(options) {
        const container = document.getElementById('vitoria-quick-replies');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'vitoria-btn';
            btn.innerHTML = `<span>${opt}</span>`;
            btn.onclick = () => this.processInput(opt.replace(/[💎✨🏛️]/g, '').trim());
            container.appendChild(btn);
        });
    },

    setupListeners() {
        const toggle = document.getElementById('vitoria-toggle');
        const closeX = document.getElementById('vitoria-close-x');
        const chat = document.getElementById('vitoria-chat');
        const input = document.getElementById('vitoria-input');
        const send = document.getElementById('vitoria-send');

        const toggleChat = () => {
            const isOpen = !chat.classList.contains('opacity-0');
            if (isOpen) {
                chat.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
                toggle.style.animation = 'vitoria-pulse-vibrant 2.5s infinite ease-in-out';
                toggle.innerHTML = `<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><span class="material-symbols-outlined text-4xl relative z-10 transition-transform group-hover:rotate-12">spa</span><div class="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-black group-hover:border-white transition-colors"></div>`;
            } else {
                chat.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
                toggle.style.animation = 'none';
                toggle.innerHTML = `<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><span class="material-symbols-outlined text-4xl relative z-10">expand_more</span>`;
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
        input.onkeypress = (e) => e.key === 'Enter' && handleSend();
    },

    showTyping() {
        const container = document.getElementById('vitoria-messages');
        const typing = document.createElement('div');
        typing.id = 'vitoria-typing-indicator';
        typing.className = 'vitoria-typing';
        typing.innerHTML = '<div class="vitoria-dot"></div><div class="vitoria-dot"></div><div class="vitoria-dot"></div>';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
        return typing;
    },

    addMessage(html, type, delay = 0) {
        const container = document.getElementById('vitoria-messages');
        
        setTimeout(() => {
            const typing = this.showTyping();
            
            setTimeout(() => {
                typing.remove();
                const msg = document.createElement('div');
                msg.className = `max-w-[85%] p-6 rounded-[32px] text-sm font-medium ${type === 'user' ? 'user-msg' : 'bot-msg text-white/95'}`;
                msg.innerHTML = html;
                
                if (type === 'bot') {
                    msg.style.borderBottomLeftRadius = '6px';
                } else {
                    msg.style.borderBottomRightRadius = '6px';
                }
                
                container.appendChild(msg);
                container.scrollTop = container.scrollHeight;
            }, 1000);
        }, delay);
    },

    processInput(input) {
        this.addMessage(input, 'user');
        const text = input.toLowerCase();

        setTimeout(() => {
            if (text.includes('explorar atelier') || text.includes('colecciones')) {
                this.addMessage("Nuestras colecciones representan la cúspide del diseño artesanal y la sofisticación contemporánea.<br><br>¿Cuál de nuestras líneas exclusivas despierta su interés hoy?", 'bot');
                this.renderQuickReplies(['Joyas Berakah 💎', 'Tendencias Magic ✨', 'Ver Atelier Completo 🏛️']);
                return;
            }

            if (text.includes('Berakah') || text.includes('colección Berakah')) {
                this.suggestProducts('Berakah');
                return;
            }

            if (text.includes('Magic World') || text.includes('shop magic')) {
                this.suggestProducts('Magic World');
                return;
            }

            if (text.includes('asistencia de pedido') || text.includes('finalizar') || text.includes('pago') || text.includes('comprar')) {
                this.startCheckout();
                return;
            }

            if (this.state === 'GREETING') {
                if (text.includes('hola')) {
                    this.addMessage("Es un honor saludarle. ¿Desea sumergirse en la elegancia atemporal de <b>Berakah</b> o prefiere el dinamismo urbano de <b>Magic World</b>?", 'bot');
                    this.renderQuickReplies(['Colección Berakah 💎', 'Magic World Shop ✨', 'Asistencia 🏛️']);
                } else if (text.includes('envio') || text.includes('donde están')) {
                    this.addMessage("Ofrecemos un servicio de entrega logística de cortesía, diseñado bajo estándares de alta prioridad para nuestras piezas exclusivas. Nuestra sede operativa se encuentra en el Atelier Digital Central.", 'bot');
                    this.renderQuickReplies(['Tiempos de Entrega 🚚', 'Cobertura Global 🌍']);
                } else {
                    this.addMessage("Comprendo su consulta. Permítame ofrecerle una guía personalizada a través de nuestra selección curada.", 'bot');
                    this.renderQuickReplies(['Selección del Día ✨', 'Consultoría Personal 👥']);
                }
            } else if (this.state === 'CAPTURE_NAME') {
                this.userData.name = input;
                this.state = 'CAPTURE_LOCATION';
                this.addMessage(`Un placer saludarle formalmente, <b>${input}</b>. <br><br>Para coordinar una entrega de excelencia, ¿podría indicarnos la dirección de su residencia u oficina principal?`, 'bot');
                this.renderLocationButtons();
            } else if (this.state === 'CAPTURE_LOCATION') {
                this.userData.location = input;
                this.askPaymentMethod();
            }
        }, 600);
    },

    suggestProducts(brand = null) {
        let filtered = window.products || [];
        if (brand) {
            filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
        }
        
        const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
        const brandName = brand ? `de <b>${brand}</b>` : 'nuestra selección curada';
        this.addMessage(`He seleccionado personalmente estas piezas ${brandName} que, bajo mi criterio, definen la excelencia estética de esta temporada:`, 'bot');
        
        let productsHtml = '<div class="space-y-3 mt-4">';
        selected.forEach(p => {
            productsHtml += `
                <div class="product-card-mini group/card">
                    <div class="w-24 h-24 shrink-0 bg-black/40 rounded-2xl overflow-hidden border border-white/5 p-1.5 transition-all group-hover/card:border-primary/40">
                        <img src="${window.BASE_IMG_PATH || ''}products/${p.image}" class="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-700 group-hover/card:scale-110">
                    </div>
                    <div class="flex-1 flex flex-col justify-center">
                        <div class="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1.5 opacity-60">${p.brand}</div>
                        <div class="text-[15px] font-bold text-white line-clamp-1 mb-1.5" style="font-family: 'Playfair Display', serif;">${p.name}</div>
                        <div class="text-sm text-white/40 font-bold tracking-tight">$${p.price.toFixed(2)}</div>
                    </div>
                    <button class="w-12 h-12 bg-white/5 hover:bg-white hover:text-black rounded-2xl flex items-center justify-center transition-all self-center border border-white/10 group-active/card:scale-90" onclick="window.engine.addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                        <span class="material-symbols-outlined text-xl">add_shopping_cart</span>
                    </button>
                </div>
            `;
        });
        productsHtml += '</div>';
        
        setTimeout(() => {
            this.addMessage(productsHtml, 'bot');
            setTimeout(() => {
                this.renderQuickReplies(['Más Selecciones ✨', 'Procesar Adquisición 🏛️']);
            }, 1000);
        }, 500);
    },

    startCheckout() {
        const cart = window.engine ? window.engine.cart : [];
        if (cart.length === 0) {
            this.addMessage("He notado que su selección personal aún se encuentra vacía. Permítame presentarle nuestras piezas más distinguidas para inspirarle.", 'bot');
            this.renderQuickReplies(['Explorar Joyas 💎', 'Línea de Lujo ✨']);
            return;
        }

        this.state = 'CAPTURE_NAME';
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        this.addMessage(`Una elección magistral. Hemos registrado piezas con un valor curado de <b>$${total.toFixed(2)}</b>.<br><br>¿Bajo qué nombre debemos registrar esta adquisición para brindarle el trato preferencial que merece?`, 'bot');
        this.renderQuickReplies([]);
    },

    renderLocationButtons() {
        const container = document.getElementById('vitoria-messages');
        const btnRow = document.createElement('div');
        btnRow.className = 'flex gap-3 flex-wrap mt-4';
        btnRow.innerHTML = `
            <button class="vitoria-btn" onclick="vitoriaBot.handleGeolocation()">📍 Geolocalización Satelital</button>
        `;
        container.appendChild(btnRow);
        container.scrollTop = container.scrollHeight;
    },

    handleGeolocation() {
        if (!navigator.geolocation) {
            this.addMessage("Lamentablemente, su terminal no permite la sincronización geográfica automática. Por favor, indíquenos su ubicación manualmente.", 'bot');
            return;
        }

        this.addMessage("Estableciendo conexión con el servicio de geolocalización...", 'bot');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.userData.coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
                this.userData.location = "Coordenadas geográficas validadas";
                this.addMessage("Ubicación registrada con precisión técnica. Su privacidad es primordial en nuestro proceso.", 'bot');
                this.askPaymentMethod();
            },
            () => {
                this.addMessage("La conexión geográfica ha sido declinada. Por favor, proporcione su dirección de entrega para continuar.", 'bot');
            }
        );
    },

    askPaymentMethod() {
        this.state = 'SELECT_PAYMENT';
        this.addMessage("Excelente gestión. Para finalizar los detalles de su adquisición, ¿podría indicarnos su modalidad de pago predilecta?", 'bot');
        const container = document.getElementById('vitoria-messages');
        const btnRow = document.createElement('div');
        btnRow.className = 'flex gap-3 flex-wrap mt-4';
        
        const methods = ['Tarjeta Débito/Crédito', 'Transferencia Directa', 'Mercado Pago Premium'];
        methods.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'vitoria-btn';
            btn.textContent = m;
            btn.onclick = () => this.confirmPayment(m);
            btnRow.appendChild(btn);
        });
        
        container.appendChild(btnRow);
        container.scrollTop = container.scrollHeight;
    },

    confirmPayment(method) {
        this.userData.paymentMethod = method;
        this.state = 'ORDER_SUMMARY';
        const cart = window.engine.cart;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        let summary = `<div class="p-4 space-y-4">`;
        summary += `<div class="text-[12px] text-primary font-black uppercase tracking-[0.3em] mb-6 text-center">Protocolo de Adquisición</div>`;
        summary += `<div class="space-y-3 text-white/60 text-xs border-y border-white/5 py-6">`;
        summary += `<div class="flex justify-between"><span>Curadora de Cuenta</span><span class="text-white">Vitoria Digital</span></div>`;
        summary += `<div class="flex justify-between"><span>Adquiriente</span><span class="text-white">${this.userData.name}</span></div>`;
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
        
        const container = document.getElementById('vitoria-messages');
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
        
        let text = `🏛️ *PROTOCOLO DE ADQUISICIÓN*\n`;
        text += `_Berakah Magic World Atelier Central_\n\n`;
        text += `👤 *Adquiriente:* ${this.userData.name}\n`;
        text += `📍 *Destino:* ${this.userData.location}\n`;
        if (this.userData.coords) text += `🔗 *Maps:* https://www.google.com/maps?q=${this.userData.coords}\n`;
        text += `💳 *Método:* ${this.userData.paymentMethod}\n\n`;
        text += `💎 *Piezas Curadas:*\n`;
        
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

vitoriaBot.init();
