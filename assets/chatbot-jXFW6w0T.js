(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext(`2d`),this.particles=[],this.mouseX=0,this.mouseY=0,this.init(),this.animate(),window.addEventListener(`resize`,()=>this.init()),document.addEventListener(`mousemove`,e=>{this.mouseX=e.clientX,this.mouseY=e.clientY}))}init(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.particles=[];let e=Math.floor(this.canvas.width*this.canvas.height/8e3);for(let t=0;t<e;t++)this.particles.push(this.createParticle())}createParticle(){let e=[`#FF2DCD`,`#8B5CF6`,`#ffffff`];return{x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,size:Math.random()*2+.5,speedX:(Math.random()-.5)*.5,speedY:(Math.random()-.5)*.5,color:e[Math.floor(Math.random()*e.length)],opacity:Math.random()*.5+.2,growth:Math.random()*.01}}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,Math.PI*2),this.ctx.fillStyle=e.color,this.ctx.globalAlpha=e.opacity,this.ctx.fill(),e.x+=e.speedX,e.y+=e.speedY;let t=this.mouseX-e.x,n=this.mouseY-e.y;Math.sqrt(t*t+n*n)<200&&(e.x+=t*.001,e.y+=n*.001),e.x<0&&(e.x=this.canvas.width),e.x>this.canvas.width&&(e.x=0),e.y<0&&(e.y=this.canvas.height),e.y>this.canvas.height&&(e.y=0),e.opacity+=(Math.random()-.5)*.02,e.opacity=Math.max(.1,Math.min(.7,e.opacity))})}animate(){this.draw(),requestAnimationFrame(()=>this.animate())}};document.addEventListener(`DOMContentLoaded`,()=>{new e(`fairydust-canvas`)});var t={state:`GREETING`,userData:{name:``,location:``,paymentMethod:``,coords:null},phoneNumber:`+521234567890`,injectStyles(){if(document.getElementById(`maguito-styles`))return;let e=document.createElement(`style`);e.id=`maguito-styles`,e.innerHTML=`
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
        `,document.head.appendChild(e)},init(){this.injectStyles(),this.createWidget(),this.setupListeners(),window.innerWidth>768&&setTimeout(()=>{this.curator=new n},5e3),setTimeout(()=>{this.state===`GREETING`&&!this.isOpen&&this.openChat()},1500)},createWidget(){if(document.getElementById(`maguito-bot`))return;let e=document.createElement(`div`);e.id=`maguito-bot`,e.innerHTML=`
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
        `,document.body.appendChild(e),this.renderQuickReplies([`Colección Mágica ✨`,`Ayuda con mi Orden 🏛️`]),this.addMessage(`¡Hola! Bienvenido al universo de <b>Magic World</b>. Soy el <b>Maguito</b>, tu asesor personal entre reliquias y tesoros excepcionales.<br><br>He preparado una selección encantada para ti hoy. ¿Qué deseas descubrir?`,`bot`,800)},renderQuickReplies(e){let t=document.getElementById(`maguito-quick-replies`);t.innerHTML=``,e.forEach(e=>{let n=document.createElement(`button`);n.className=`maguito-btn`,n.innerHTML=`<span>${e}</span>`,n.onclick=()=>this.processInput(e.replace(/[💎✨🏛️]/g,``).trim()),t.appendChild(n)})},setupListeners(){let e=document.getElementById(`maguito-toggle`),t=document.getElementById(`maguito-close-x`),n=document.getElementById(`maguito-chat`),r=document.getElementById(`maguito-input`),i=document.getElementById(`maguito-send`),a=()=>{n.classList.contains(`opacity-0`)?(n.classList.remove(`opacity-0`,`translate-y-20`,`pointer-events-none`),e.style.animation=`none`,e.innerHTML=`<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><span class="material-symbols-outlined text-4xl relative z-10">expand_more</span>`,this.isOpen=!0):(n.classList.add(`opacity-0`,`translate-y-20`,`pointer-events-none`),e.style.animation=`maguito-pulse-vibrant 2.5s infinite ease-in-out`,e.innerHTML=`<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><img src="assets/maguito.png" class="w-full h-full object-cover rounded-2xl z-10"><div class="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-black group-hover:border-white transition-colors"></div>`,this.isOpen=!1)};e.onclick=a,t.onclick=a;let o=()=>{let e=r.value.trim();e&&(this.processInput(e),r.value=``)};i.onclick=o,r.onkeypress=e=>{e.key===`Enter`&&o()}},openChat(){let e=document.getElementById(`maguito-chat`);if(e&&e.classList.contains(`opacity-0`)){let e=document.getElementById(`maguito-toggle`);e&&e.click()}},addMessage(e,t,n=0){let r=document.getElementById(`maguito-messages`);if(t===`bot`&&n>0){let i=document.createElement(`div`);i.className=`maguito-typing`,i.innerHTML=`<div class="maguito-dot"></div><div class="maguito-dot"></div><div class="maguito-dot"></div>`,r.appendChild(i),r.scrollTop=r.scrollHeight,setTimeout(()=>{i.remove(),this.renderMessage(e,t)},n)}else this.renderMessage(e,t)},renderMessage(e,t){let n=document.getElementById(`maguito-messages`),r=document.createElement(`div`);r.className=`max-w-[85%] p-5 rounded-[24px] text-sm font-medium ${t===`bot`?`bot-msg text-white/90`:`user-msg shadow-xl`}`,r.innerHTML=e,n.appendChild(r),n.scrollTop=n.scrollHeight},async processInput(e){this.addMessage(e,`user`);let t=e.toLowerCase();this.state===`GREETING`?t.includes(`colección`)||t.includes(`magic`)?(this.addMessage(`Excelente elección. ¿Qué tipo de tesoro busca hoy? Tenemos varias categorías en nuestra colección principal:`,`bot`,600),this.renderQuickReplies([`Tazas ☕`,`Vasos y Termos 🥤`,`Loncheras 🍱`,`Ver Todo 🏛️`,`Regresar ↩️`]),this.state=`SELECT_SUB_CATEGORY`):t.includes(`ayuda`)||t.includes(`orden`)?this.promptName():t.includes(`regresar`)||t.includes(`inicio`)?this.resetToGreeting():this.addMessage(`Dígame, ¿en qué área de nuestro tesoro desea sumergirse? Tenemos nuestras <b>Reliquias Históricas (Colección Mágica)</b> y soporte para pedidos.`,`bot`,600):this.state===`SELECT_SUB_CATEGORY`?t.includes(`regresar`)?this.resetToGreeting():t.includes(`todo`)?(this.showCategory(`reliquias`),this.state=`GREETING`):t.includes(`taza`)?(this.showSubCategory(`Tazas`),this.state=`GREETING`):t.includes(`vaso`)||t.includes(`termo`)?(this.showSubCategory(`Vasos y Termos`),this.state=`GREETING`):t.includes(`lonchera`)?(this.showSubCategory(`Loncheras`),this.state=`GREETING`):this.addMessage(`Por favor, seleccione una de las categorías mágicas o diga 'Regresar'.`,`bot`,400):this.state===`AWAIT_NAME`?(this.userData.name=e,this.addMessage(`Un placer conocerle, ${e}. ¿Desde qué rincón del mundo nos contacta para su entrega?`,`bot`,500),this.state=`AWAIT_LOCATION`):this.state===`AWAIT_LOCATION`?(this.userData.location=e,this.askPayment()):this.state===`AWAIT_PAYMENT`&&(this.userData.paymentMethod=e,this.showSummary())},resetToGreeting(){this.state=`GREETING`,this.addMessage(`¿En qué más puedo ayudarle hoy? ¿Desea explorar más la <b>Colección Mágica ✨</b> o necesita ayuda con su orden?`,`bot`,500),this.renderQuickReplies([`Colección Mágica ✨`,`Ayuda con mi Orden 🏛️`])},showCategory(e){let t=(window.products||[]).filter(t=>t.category===e);this.renderProductCards(t,e.toUpperCase())},showSubCategory(e){let t=(window.products||[]).filter(t=>t.itemSubCategory===e);this.renderProductCards(t,e.toUpperCase())},renderProductCards(e,t){this.addMessage(`He seleccionado estas piezas de <b>${t}</b> para usted:`,`bot`,600),e.forEach(e=>{let t=document.createElement(`div`);t.className=`product-card-mini group`,t.innerHTML=`
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <img src="${e.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <div class="text-[11px] text-primary font-bold uppercase tracking-wider mb-1">Disponible</div>
                    <div class="text-white text-xs font-bold mb-1 group-hover:text-primary transition-colors">${e.name}</div>
                    <div class="text-white/40 text-[10px]">$${e.price.toFixed(2)}</div>
                </div>
                <button class="self-center p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all">
                    <span class="material-symbols-outlined text-sm">add</span>
                </button>
            `,t.onclick=()=>{window.engine.addToCart(e),this.addMessage(`He añadido <b>${e.name}</b> a su selección personal.`,`bot`,400),this.renderQuickReplies([`Proceder al Pago 💎`,`Seguir Explorando ✨`]),this.state=`GREETING`},document.getElementById(`maguito-messages`).appendChild(t)}),document.getElementById(`maguito-messages`).scrollTop=document.getElementById(`maguito-messages`).scrollHeight},promptName(){this.addMessage(`Por supuesto. Para personalizar su pedido, ¿podría indicarme su nombre?`,`bot`,500),this.state=`AWAIT_NAME`},askPayment(){this.addMessage(`Perfecto. ¿Cuál es su modalidad transaccional preferida?`,`bot`,500),this.renderQuickReplies([`Transferencia ✨`,`PayPal 🔮`,`Cripto 💎`]),this.state=`AWAIT_PAYMENT`},showSummary(){let e=window.engine.cart,t=e.reduce((e,t)=>e+t.price,0),n=this.userData.paymentMethod,r=`<div class="bg-white/5 rounded-3xl p-6 border border-white/10">`;r+=`<h5 class="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 text-center">Resumen de Pedido</h5>`,r+=`<div class="space-y-3 text-white/60 text-xs border-y border-white/5 py-6">`,r+=`<div class="flex justify-between"><span>Asesor Mágico</span><span class="text-white">Maguito Digital</span></div>`,r+=`<div class="flex justify-between"><span>Cliente</span><span class="text-white">${this.userData.name}</span></div>`,r+=`<div class="flex justify-between"><span>Destino de Entrega</span><span class="text-white">${this.userData.location}</span></div>`,r+=`<div class="flex justify-between"><span>Método Transaccional</span><span class="text-white">${n}</span></div>`,r+=`</div>`,r+=`<div class="space-y-2 mt-4">`,e.forEach(e=>{r+=`<div class="flex justify-between text-[11px]"><span class="text-white/80">${e.name}</span><b class="text-white">$${e.price.toFixed(2)}</b></div>`}),r+=`</div>`,r+=`<div class="flex justify-between text-xl mt-8 font-black border-t border-white/10 pt-6"><span>Inversión Total</span><span class="text-primary">$${t.toFixed(2)}</span></div>`,r+=`</div>`,this.addMessage(r,`bot`),this.addMessage(`¿Certifica que los datos son correctos para proceder con la transmisión formal a nuestra central logística?`,`bot`,800);let i=document.getElementById(`maguito-messages`),a=document.createElement(`button`);a.className=`w-full bg-white text-black rounded-[24px] p-5 font-black flex items-center justify-center gap-4 mt-6 hover:bg-primary hover:text-white transition-all uppercase tracking-[0.2em] text-[11px] shadow-2xl`,a.innerHTML=`Confirmar y Transmitir <span class="material-symbols-outlined font-bold">verified</span>`,a.onclick=()=>this.sendWhatsApp(),i.appendChild(a),i.scrollTop=i.scrollHeight},sendWhatsApp(){let e=window.engine.cart,t=e.reduce((e,t)=>e+t.price,0),n=`🏛️ *ORDEN DE COMPRA*
`;n+=`_Magic World Atelier Central_

`,n+=`👤 *Cliente:* ${this.userData.name}\n`,n+=`📍 *Destino:* ${this.userData.location}\n`,this.userData.coords&&(n+=`🔗 *Maps:* https://www.google.com/maps?q=${this.userData.coords}\n`),n+=`💳 *Método:* ${this.userData.paymentMethod}\n\n`,n+=`💎 *Tesoros Seleccionados:*
`,e.forEach((e,t)=>{n+=`> ${t+1}. ${e.name} ($${e.price.toFixed(2)})\n`}),n+=`\n✨ *INVERSIÓN FINAL:* $${t.toFixed(2)}`;let r=encodeURIComponent(n);window.open(`https://wa.me/${this.phoneNumber}?text=${r}`,`_blank`),this.addMessage(`Su solicitud ha sido transmitida exitosamente. Nuestro personal de soporte premium contactará con usted a la brevedad para los toques finales de la logística. <br><br>Ha sido un placer elevar su experiencia de compra.`,`bot`),this.state=`GREETING`,this.renderQuickReplies([`Nueva Consulta 💎`,`Volver al Inicio 🏛️`])}},n=class{constructor(){this.phrases=[`¿Sabías que nuestras piezas de mármol se extraen de canteras exclusivas? ✨`,`¡Psst! Usa el código <b>MAGIC10</b> para un descuento especial en tu primera compra. 🪄`,`Esa pieza que miras es de las favoritas de la temporada. 🔮`,`¿Buscas un regalo? El set de portavasos premium nunca falla. 🏛️`,`¡Qué buen gusto tienes! Esa combinación es exquisita. ✨`],this.active=!1,this.createCuratorElement()}createCuratorElement(){let e=document.createElement(`div`);e.id=`magic-curator-wanderer`,e.className=`fixed transition-all duration-1000 transform scale-0 opacity-0 z-[1500] pointer-events-none`,e.innerHTML=`
            <div class="relative group pointer-events-auto cursor-pointer">
                <div class="absolute -top-24 -left-10 w-48 bg-white text-black p-4 rounded-2xl text-xs font-medium shadow-2xl opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 border border-primary/20">
                    <div id="curator-bubble-text">¿Necesitas un toque de magia?</div>
                    <div class="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 border-r border-b border-primary/10"></div>
                </div>
                <div class="w-16 h-16 rounded-full border-2 border-primary/30 shadow-2xl overflow-hidden bg-black/80 hover:scale-110 transition-transform p-1">
                    <img src="assets/maguito.png" class="w-full h-full object-cover rounded-full">
                </div>
            </div>
        `,document.body.appendChild(e),this.element=e,this.element.onclick=()=>{t.openChat(),this.disappear()},this.scheduleAppearance()}scheduleAppearance(){let e=3e4+Math.random()*6e4;setTimeout(()=>this.appear(),e)}appear(){if(this.active||t.isOpen)return;let e=[{bottom:`10%`,left:`5%`},{top:`20%`,right:`5%`},{bottom:`25%`,left:`2%`}],n=e[Math.floor(Math.random()*e.length)],r=this.phrases[Math.floor(Math.random()*this.phrases.length)],i=document.getElementById(`curator-bubble-text`);i&&(i.innerHTML=r),this.element.style.top=n.top||`auto`,this.element.style.bottom=n.bottom||`auto`,this.element.style.left=n.left||`auto`,this.element.style.right=n.right||`auto`,this.element.classList.remove(`scale-0`,`opacity-0`),this.element.classList.add(`scale-100`,`opacity-100`),this.active=!0,setTimeout(()=>this.disappear(),12e3)}disappear(){this.element.classList.add(`scale-0`,`opacity-0`),this.element.classList.remove(`scale-100`,`opacity-100`),this.active=!1,this.scheduleAppearance()}};document.addEventListener(`DOMContentLoaded`,()=>t.init());