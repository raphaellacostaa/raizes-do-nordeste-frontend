'use strict';

const STORE_KEY = 'raizes-demo-v1';
const statuses = ['Pedido recebido', 'Em preparo', 'Pronto para retirada', 'Retirado'];
const units = {
  recife: { name: 'Recife Antigo', address: 'Rua do Bom Jesus, Recife - PE', kitchen: 'Completa', note: 'Cardápio completo disponível.' },
  olinda: { name: 'Olinda · Bairro Novo', address: 'Av. Carlos de Lima Cavalcanti, Olinda - PE', kitchen: 'Reduzida', note: 'Alguns itens não estão disponíveis nesta unidade.' },
  'joao-pessoa': { name: 'João Pessoa · Centro', address: 'Av. Duque de Caxias, João Pessoa - PB', kitchen: 'Completa', note: 'Receitas regionais podem variar nesta unidade.' }
};
const products = [
  { id: 'tapioca-carne', name: 'Tapioca de carne de sol', category: 'Tapiocas', description: 'Carne de sol desfiada, queijo coalho e cheiro-verde.', price: 22.9, emoji: '🌮', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0a/67/35/c2/tapioca-de-carne-de-sol.jpg', imagePosition: 'center 54%', tone: '#f1d4a4', tag: 'Favorito', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'cuscuz-ovos', name: 'Cuscuz com ovos', category: 'Cuscuz', description: 'Cuscuz amarelinho, ovos mexidos e manteiga de garrafa.', price: 18.5, emoji: '🍳', image: 'https://media.licdn.com/dms/image/v2/D4D12AQFOaws7jAOYug/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1705430491841?e=2147483647&t=UQyUPDyHIikt9i2d7BJbioBdeH1Deuimz6nfI54asN8&v=beta', imagePosition: 'center 50%', tone: '#f6e5b9', tag: 'Clássico', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'bolo-macaxeira', name: 'Bolo de macaxeira', category: 'Doces', description: 'Fatia cremosa, feita com coco e receita de família.', price: 9.5, emoji: '🍰', image: 'https://uploads.folhavitoria.com.br/2025/09/Como-fazer-bolo-de-mandioca-molhadinho-que-nunca-seca-e-dura-dias-sem-perder-sabor.webp', imagePosition: 'center 58%', tone: '#eddbc8', tag: 'Da casa', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'cafe-coado', name: 'Café coado na hora', category: 'Bebidas', description: 'Café brasileiro, passado lentamente e servido quentinho.', price: 6.5, emoji: '☕', image: 'https://lavaive.com/wp-content/uploads/2022/06/Color-del-cafe-filtrado-y-su-parecido-con-el-color-de-un-vino-tinto.-scaled.jpg', imagePosition: 'center 55%', tone: '#d7c8b4', tag: '', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'suco-caja', name: 'Suco de cajá', category: 'Bebidas', description: 'Fruta regional, refrescante e preparada na hora.', price: 8.9, emoji: '🥭', image: 'https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/fe774d96-08e9-4d6d-b12c-ac00649f6e84/61b0eff9-1b38-45b9-8689-660bac1e09ff.jpg', imagePosition: 'center 50%', tone: '#f4d7a1', tag: 'Regional', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'tapioca-queijo', name: 'Tapioca de queijo coalho', category: 'Tapiocas', description: 'Queijo coalho douradinho e toque de orégano.', price: 16.9, emoji: '🫓', image: 'https://media-cdn.tripadvisor.com/media/photo-s/14/79/77/ed/tapioca-com-queijo-coalho.jpg', imagePosition: 'center 46%', tone: '#e9dfc8', tag: '', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'cuscuz-completo', name: 'Cuscuz nordestino completo', category: 'Cuscuz', description: 'Cuscuz, queijo coalho, ovo e carne de sol.', price: 25.9, emoji: '🍲', image: 'https://www.tnh1.com.br/media/_versions/2022/05/carroc%CC%A7a2-1024x576-1_widexl.jpeg', imagePosition: 'center 50%', tone: '#efcf8c', tag: 'Mais pedido', units: ['recife', 'joao-pessoa'] },
  { id: 'combo-manha', name: 'Combo bom dia', category: 'Combos', description: 'Cuscuz com ovos + café coado. Um começo cheio de afeto.', price: 21.9, emoji: '🥣', image: 'https://lirp.cdn-website.com/686c7aa5/dms3rep/multi/opt/cafe%2B%283%29-762h.jpg', imagePosition: 'center 55%', tone: '#dbd9ae', tag: 'Combo', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'cartola', name: 'Cartola pernambucana', category: 'Doces', description: 'Banana, queijo manteiga, canela e açúcar.', price: 14.5, emoji: '🍌', image: 'https://irp.cdn-website.com/33406c6e/dms3rep/multi/cartola.jpg', imagePosition: 'center 58%', tone: '#f4dfb4', tag: '', units: ['recife', 'joao-pessoa'] },
  { id: 'bolo-rolo', name: 'Bolo de rolo', category: 'Doces', description: 'Camadas fininhas com goiabada, um clássico de Pernambuco.', price: 8.5, emoji: '🍥', image: 'https://www.dicasonline.com/wp-content/uploads/bolo-de-rolo-pernambucano.jpg', imagePosition: 'center 58%', tone: '#efc5ae', tag: 'Tradição', units: ['recife', 'olinda'] },
  { id: 'agua-coco', name: 'Água de coco', category: 'Bebidas', description: 'Geladinha, natural e sem adição de açúcar.', price: 7.0, emoji: '🥥', image: 'https://imagenes.eltiempo.com/files/image_600_455/uploads/2023/09/26/65138729482a3.jpeg', imagePosition: 'center 50%', tone: '#d7dfb8', tag: '', units: ['recife', 'olinda', 'joao-pessoa'] },
  { id: 'tapioca-banana', name: 'Tapioca de banana', category: 'Tapiocas', description: 'Banana, canela e um fio de mel.', price: 15.9, emoji: '🍯', image: 'https://static.wixstatic.com/media/e015d9_32d50cf5ab264885a7e491f9c90e59ef~mv2.jpg/v1/fill/w_980%2Ch_654%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/mel.jpg', imagePosition: 'center 54%', tone: '#edcf97', tag: 'Vegetariano', units: ['recife', 'olinda'] }
];
const rewards = [
  { id: 'coffee', title: 'Café coado por nossa conta', description: 'Uma pausa gostosa para acompanhar seu próximo pedido.', points: 80, emoji: '☕' },
  { id: 'discount', title: 'R$ 10 de desconto', description: 'Use seus pontos para reduzir o valor de uma compra.', points: 150, emoji: '🪙' },
  { id: 'combo', title: 'Combo bom dia grátis', description: 'Um combo clássico para começar o dia com sabor.', points: 240, emoji: '🥣' }
];
const initialState = {
  unit: 'recife', channel: 'web', view: 'menu', category: 'Todos', search: '',
  cart: [], customer: null, orders: [], points: 120,
  consent: { essential: true, analytics: false, marketing: false, saved: false },
  redeemed: [], selectedPayment: 'pix',
  consentHistory: [], promo: '', pendingPayment: null, serviceMode: 'pickup', orderSeq: 100
};
let state = loadState();
let toastCounter = 0;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!saved) return structuredClone(initialState);
    return { ...structuredClone(initialState), ...saved, consent: { ...initialState.consent, ...(saved.consent || {}) } };
  } catch (error) { return structuredClone(initialState); }
}
function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ unit: state.unit, channel: state.channel, view: state.view, cart: state.cart, customer: state.customer, orders: state.orders, points: state.points, consent: state.consent, redeemed: state.redeemed, selectedPayment: state.selectedPayment, consentHistory: state.consentHistory, promo: state.promo, pendingPayment: state.pendingPayment, serviceMode: state.serviceMode, orderSeq: state.orderSeq }));
  } catch (error) { /* The demo remains usable when browser storage is unavailable. */ }
}
function money(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }
function productById(id) { return products.find(item => item.id === id); }
function cartQuantity() { return state.cart.reduce((sum, row) => sum + row.qty, 0); }
function cartSubtotal() { return state.cart.reduce((sum, row) => { const product = productById(row.id); return sum + (product ? product.price * row.qty : 0); }, 0); }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PROMO = { code: 'RAIZES5', min: 30, discount: 5 };
const IDLE_MS = 45000;
let idleTimer = null;
let paymentLock = false;
let lastFocus = null;
function serviceLabel() { return state.serviceMode === 'dinein' ? 'Consumo no local' : 'Retirada'; }
function promoDiscount() { return state.promo === PROMO.code && cartSubtotal() >= PROMO.min ? PROMO.discount : 0; }
function cartTotal() { return Math.max(0, cartSubtotal() - promoDiscount()); }
function applyPromo(raw) {
  const code = String(raw || '').trim().toUpperCase();
  if (!code) { notify('Informe um código', 'Digite o código promocional.', 'error'); return; }
  if (code !== PROMO.code) { notify('Código inválido', 'Confira o código e tente novamente.', 'error'); return; }
  if (cartSubtotal() < PROMO.min) { notify('Pedido mínimo não atingido', `${PROMO.code} exige pedido de ${money(PROMO.min)}.`, 'error'); return; }
  state.promo = PROMO.code; persist(); render(); notify('Código aplicado', `${PROMO.code}: − ${money(PROMO.discount)}.`);
}
function logConsent(origin) {
  state.consentHistory.push({ at: new Date().toISOString(), origin, analytics: !!state.consent.analytics, marketing: !!state.consent.marketing });
}
function resetIdleTimer() {
  window.clearTimeout(idleTimer);
  if (state.channel !== 'totem') return;
  idleTimer = window.setTimeout(endTotemSession, IDLE_MS);
}
function endTotemSession() {
  if (state.channel !== 'totem') return;
  state.cart = []; state.customer = null; state.promo = ''; state.pendingPayment = null; state.serviceMode = 'pickup';
  state.view = 'menu'; state.category = 'Todos'; state.search = '';
  closeModal(); persist(); render();
  notify('Sessão encerrada', 'Por inatividade (45 s), a sacola e a identificação foram apagadas.');
}
function exportData() {
  return { exportadoEm: new Date().toISOString(), aviso: 'Dados fictícios guardados apenas neste navegador.', perfil: state.customer, preferencias: { metricas: state.consent.analytics, campanhas: state.consent.marketing }, historicoConsentimento: state.consentHistory, pontos: state.points, resgates: state.redeemed, pedidos: state.orders };
}
function rightsBlock() {
  return `<section class="rights" aria-labelledby="rights-title"><h3 id="rights-title">Seus direitos</h3><div class="rights-actions"><button type="button" class="button button-quiet" id="download-data">Ver/baixar meus dados</button><button type="button" class="button button-quiet" id="show-history">Histórico de consentimentos</button><button type="button" class="button button-line" id="delete-data">Excluir meus dados</button></div><div id="rights-output" aria-live="polite"></div></section>`;
}
function bindRights() {
  const out = document.getElementById('rights-output');
  document.getElementById('download-data').addEventListener('click', () => {
    const json = JSON.stringify(exportData(), null, 2);
    out.innerHTML = '<pre class="data-preview" tabindex="0"></pre>';
    out.querySelector('pre').textContent = json;
    try { const url = URL.createObjectURL(new Blob([json], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'meus-dados-raizes.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); } catch (error) { /* a visualização acima continua disponível */ }
    notify('Dados exportados', 'Arquivo gerado apenas neste navegador.');
  });
  document.getElementById('show-history').addEventListener('click', () => {
    const items = state.consentHistory.slice().reverse().map(h => `<li>${escapeHTML(new Date(h.at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }))} · ${escapeHTML(h.origin)} · métricas: ${h.analytics ? 'sim' : 'não'} · campanhas: ${h.marketing ? 'sim' : 'não'}</li>`).join('');
    out.innerHTML = items ? `<ul class="consent-history">${items}</ul>` : '<p>Nenhuma escolha registrada ainda.</p>';
  });
  document.getElementById('delete-data').addEventListener('click', () => {
    out.innerHTML = '<p><strong>Esta ação apaga perfil, pedidos, pontos e preferências deste navegador.</strong></p><div class="modal-actions"><button type="button" class="button button-primary" id="confirm-delete">Confirmar exclusão</button></div>';
    document.getElementById('confirm-delete').addEventListener('click', deleteAllData);
  });
}
function deleteAllData() {
  try { localStorage.removeItem(STORE_KEY); } catch (error) { /* sem armazenamento */ }
  state = structuredClone(initialState); paymentLock = false;
  closeModal(); render();
  notify('Dados excluídos', 'Perfil, pedidos, pontos e preferências foram apagados deste navegador.');
}
function setView(view) { state.view = view; state.category = 'Todos'; state.search = ''; persist(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function notify(title, message = '', type = 'success') {
  const region = document.getElementById('toast-region');
  const node = document.createElement('div');
  node.className = `toast ${type === 'error' ? 'error' : ''}`;
  node.innerHTML = `<strong>${escapeHTML(title)}</strong>${escapeHTML(message)}`;
  node.dataset.toast = String(++toastCounter);
  region.appendChild(node);
  window.setTimeout(() => node.remove(), 4200);
}
function showModal(title, kicker, body, options = {}) {
  const root = document.getElementById('modal-root');
  if (!root.querySelector('.modal')) lastFocus = document.activeElement;
  root.innerHTML = `<div class="modal-backdrop" data-backdrop><section class="modal ${options.wide ? 'modal-wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><span class="modal-kicker">${escapeHTML(kicker)}</span><h2 id="modal-title">${escapeHTML(title)}</h2></div><button class="close-modal" type="button" aria-label="Fechar janela" data-close-modal>×</button></header><div class="modal-body">${body}</div></section></div>`;
  root.querySelector('[data-close-modal]').focus();
  root.querySelector('[data-close-modal]').addEventListener('click', closeModal);
  root.querySelector('[data-backdrop]').addEventListener('click', event => { if (event.target === event.currentTarget) closeModal(); });
}
function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
  if (lastFocus && document.contains(lastFocus) && typeof lastFocus.focus === 'function') lastFocus.focus();
  lastFocus = null;
}
function updateHeader() {
  document.getElementById('unit-select').value = state.unit;
  document.getElementById('account-label').textContent = state.customer ? state.customer.name.split(' ')[0] : 'Entrar';
  document.getElementById('cart-count').textContent = cartQuantity();
  document.getElementById('nav-points').textContent = `${state.points} pts`;
  document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('is-active', button.dataset.view === state.view));
  document.querySelectorAll('[data-channel]').forEach(button => button.classList.toggle('is-selected', button.dataset.channel === state.channel));
  document.body.classList.remove('channel-web', 'channel-app', 'channel-totem');
  document.body.classList.add(`channel-${state.channel}`);
}
function render() {
  updateHeader();
  const main = document.getElementById('main-content');
  if (state.view === 'orders') main.innerHTML = renderOrders();
  else if (state.view === 'rewards') main.innerHTML = renderRewards();
  else main.innerHTML = renderMenu();
  bindMainEvents();
  document.getElementById('consent-banner').hidden = state.consent.saved;
  persist();
}
function renderMenu() {
  const unit = units[state.unit];
  const categories = ['Todos', 'Tapiocas', 'Cuscuz', 'Combos', 'Doces', 'Bebidas'];
  const visible = products.filter(product => product.units.includes(state.unit) && (state.category === 'Todos' || product.category === state.category) && `${product.name} ${product.description}`.toLowerCase().includes(state.search.toLowerCase()));
  const cards = visible.map(product => `<article class="product-card"><div class="product-visual" style="--tone:${product.tone};--image-position:${product.imagePosition || 'center'}">${product.tag ? `<span class="food-tag">${escapeHTML(product.tag)}</span>` : ''}<img class="product-photo" src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove();this.parentElement.classList.add('image-failed')"><span class="food-emoji" aria-hidden="true">${product.emoji}</span></div><div class="product-body"><span class="product-category">${escapeHTML(product.category)}</span><h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.description)}</p><div class="product-meta"><span class="price">${money(product.price)}<small>preço desta unidade</small></span><button class="add-button" type="button" data-add="${product.id}" aria-label="Adicionar ${escapeHTML(product.name)} à sacola"><span aria-hidden="true">+</span></button></div></div></article>`).join('');
  return `<div class="page-shell">
    <section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span> SABOR DE ORIGEM · ${escapeHTML(unit.name)}</span><h1 id="hero-title">O Nordeste à mesa. <em>Do nosso jeito.</em></h1><p>Receitas regionais, ingredientes de verdade e aquele cuidado que transforma uma pausa em memória boa.</p><button class="button button-primary" type="button" id="explore-menu">Conheça o cardápio <span aria-hidden="true">↗</span></button><div class="hero-note"><span aria-hidden="true">✦</span> Retirada rápida · Cardápio atualizado por unidade</div><div class="hero-signature"><span class="signature-line"></span><span>Comida com memória, feita com afeto.</span></div></div><div class="hero-art"><img class="hero-photo" src="https://revistadeguste.com/wp-content/uploads/2025/12/Rico-em-sabores-regionais-o-Cafe-Nordestino-e-servido-com-cuscuz-carne-de-sol-na-nata-ovos-mexidos-tapioca-queijo-coalho-e-bolo-de-coco-scaled-e1766579979303.jpg" alt="Café nordestino com cuscuz, carne de sol na nata, ovos mexidos e tapioca com queijo coalho" fetchpriority="high" onerror="this.style.display='none'"><div class="hero-image-shade"></div><div class="floating-stamp"><span>feito</span><strong>com<br>afeto</strong></div></div></section>

    <section aria-labelledby="menu-title"><div class="section-heading"><div><span class="eyebrow">Da nossa cozinha para você</span><h2 id="menu-title">O que vai ser hoje?</h2><p>${escapeHTML(unit.note)} Valores ilustrativos para demonstração.</p></div><label class="search-wrap"><span aria-hidden="true">⌕</span><input id="product-search" type="search" placeholder="Buscar no cardápio" value="${escapeHTML(state.search)}" aria-label="Buscar produtos"></label></div>
    <div class="category-row" role="group" aria-label="Filtrar categorias">${categories.map(category => `<button type="button" class="category-chip ${state.category === category ? 'is-active' : ''}" data-category="${category}">${category}</button>`).join('')}</div>
    <div class="order-layout"><div class="product-grid">${cards || `<div class="empty-state"><span aria-hidden="true">⌕</span><h3>Nenhum item encontrado</h3><p>Experimente outra busca ou escolha uma categoria diferente.</p><button class="button button-quiet" type="button" id="clear-filters">Limpar filtros</button></div>`}</div>${renderCartPanel()}</div></section>
  </div>`;
}
function renderCartPanel() {
  const rows = state.cart.map(row => { const product = productById(row.id); if (!product) return ''; return `<div class="cart-item"><div><h4>${escapeHTML(product.name)}</h4><small>${money(product.price)} por unidade</small><div class="quantity-control"><button type="button" data-qty="${product.id}" data-change="-1" aria-label="Remover uma unidade de ${escapeHTML(product.name)}">−</button><span>${row.qty}</span><button type="button" data-qty="${product.id}" data-change="1" aria-label="Adicionar uma unidade de ${escapeHTML(product.name)}">+</button></div></div><span class="line-price">${money(product.price * row.qty)}</span></div>`; }).join('');
  const subtotal = cartSubtotal(); const discount = promoDiscount(); const total = cartTotal();
  const promoRow = state.promo ? (discount ? `<div class="total-row promo-applied"><span>Promoção ${escapeHTML(state.promo)} <button type="button" class="link-button" data-remove-promo>remover</button></span><strong>− ${money(discount)}</strong></div>` : `<div class="total-row promo-pending"><span>${escapeHTML(state.promo)} vale a partir de ${money(PROMO.min)} <button type="button" class="link-button" data-remove-promo>remover</button></span><strong>—</strong></div>`) : '';
  const serviceBlock = `<fieldset class="service-mode"><legend>Como vai ser?</legend><label><input type="radio" name="service" value="pickup" ${state.serviceMode !== 'dinein' ? 'checked' : ''}> Retirada</label><label><input type="radio" name="service" value="dinein" ${state.serviceMode === 'dinein' ? 'checked' : ''}> Consumir no local</label></fieldset>`;
  const promoForm = `<form class="promo-form" id="promo-form"><label for="promo-code">Código promocional</label><div class="promo-row"><input id="promo-code" name="code" autocomplete="off" maxlength="20" placeholder="Ex.: RAIZES5"><button type="submit" class="button button-quiet button-small">Aplicar</button></div></form>`;
  return `<aside class="cart-panel" id="cart-panel" aria-labelledby="cart-title"><div class="cart-heading"><h2 id="cart-title">Sua sacola</h2><span class="cart-counter">${cartQuantity()} ${cartQuantity() === 1 ? 'item' : 'itens'}</span></div>${rows ? `<div class="cart-items">${rows}</div><div class="cart-total"><div class="total-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>${promoRow}<div class="total-row"><span>${state.serviceMode === 'dinein' ? 'Consumo no local' : 'Retirada na unidade'}</span><strong>Grátis</strong></div><div class="total-row grand"><span>Total</span><strong>${money(total)}</strong></div>${serviceBlock}${promoForm}<button class="button button-primary" type="button" id="checkout-button">Continuar pedido <span aria-hidden="true">→</span></button></div>` : `<div class="cart-empty"><span aria-hidden="true">🛍️</span><strong>Sua próxima delícia começa aqui.</strong><p>Adicione seus favoritos para montar o pedido.</p></div>`}<p class="cart-footnote">Pagamento demonstrativo. Nenhuma cobrança real será feita.</p><div class="side-promo"><span aria-hidden="true">✦</span><div><strong>Clube Raízes</strong><p>Você tem ${state.points} pontos disponíveis para trocar por benefícios.</p></div></div></aside>`;
}
function renderOrders() {
  const orders = state.orders;
  const rows = orders.map((order, index) => { const stage = statuses.indexOf(order.status); return `<article class="order-card"><div><div class="order-top"><h3>Pedido #${escapeHTML(order.id)}</h3><span class="status-pill">${escapeHTML(order.status)}</span>${order.ticket ? `<span class="ticket">Senha ${escapeHTML(order.ticket)}</span>` : ''}</div><p>${escapeHTML(order.unitName)} · ${escapeHTML(order.serviceLabel || 'Retirada')} · ${escapeHTML(order.date)} · ${escapeHTML(order.paymentLabel)}</p><div class="order-items-text">${escapeHTML(order.items.map(item => `${item.qty}× ${item.name}`).join(' · '))}</div><div class="progress-line" aria-label="Etapa ${stage + 1} de 4">${statuses.map((status, i) => `<span class="${i <= stage ? 'done' : ''}" title="${status}"></span>`).join('')}</div></div><div><div class="order-price">${money(order.total)}</div><button class="button button-line button-small" style="margin-top:12px" type="button" data-advance-order="${order.id}" ${stage >= 3 ? 'disabled' : ''}>${stage >= 3 ? 'Pedido retirado' : 'Avançar status (demo)'}</button></div></article>`; }).join('');
  return `<div class="page-shell"><header class="content-heading"><div><span class="eyebrow">Sua jornada</span><h1>Meus pedidos</h1><p>Acompanhe cada etapa até a retirada na unidade selecionada.</p></div><button class="button button-forest" type="button" data-view="menu">+ Novo pedido</button></header>${orders.length ? `<div class="orders-stack">${rows}</div><div class="notice">Os status são fictícios e servem apenas para demonstrar a interface. Em produção, viriam do sistema de pedidos da unidade.</div>` : `<div class="empty-state"><span aria-hidden="true">🧾</span><h3>Ainda não há pedidos por aqui</h3><p>Quando você concluir um pedido de demonstração, poderá acompanhar o status nesta área.</p><button class="button button-primary" type="button" data-view="menu">Ver cardápio</button></div>`}</div>`;
}
function renderRewards() {
  const cards = rewards.map(reward => { const owned = state.redeemed.includes(reward.id); const enough = state.points >= reward.points; return `<article class="reward-card"><span class="reward-emoji" aria-hidden="true">${reward.emoji}</span><h3>${escapeHTML(reward.title)}</h3><p>${escapeHTML(reward.description)}</p><div class="reward-points">${reward.points} pontos</div><button type="button" class="button ${enough && !owned ? 'button-primary' : 'button-quiet'}" data-redeem="${reward.id}" ${!enough || owned ? 'disabled' : ''}>${owned ? 'Resgatado nesta demonstração' : enough ? 'Resgatar benefício' : `Faltam ${reward.points - state.points} pts`}</button></article>`; }).join('');
  return `<div class="page-shell"><header class="content-heading"><div><span class="eyebrow">Clube Raízes</span><h1>Fidelidade com sabor</h1><p>Seu carinho pela nossa cozinha vira pontos e pequenos benefícios.</p></div><button class="button button-line" type="button" id="privacy-from-rewards">Preferências de dados</button></header><section class="rewards-hero"><div><span class="eyebrow">Saldo de demonstração</span><h2>O bom de voltar é ser lembrado.</h2><p>Ganhe 1 ponto por real em pedidos aprovados. A pontuação e os resgates deste protótipo são locais e fictícios.</p></div><div class="points-big"><strong>${state.points}</strong><span>pontos disponíveis</span></div></section><div class="rewards-grid">${cards}</div><div class="notice"><strong>Privacidade em primeiro lugar.</strong> Campanhas personalizadas são opcionais. Dados de perfil não são usados para segmentação neste protótipo; preferências podem ser alteradas no painel de privacidade.</div></div>`;
}
function addToCart(id) {
  if (state.pendingPayment) { notify('Pagamento em análise', 'Consulte o status do pagamento antes de alterar a sacola.', 'error'); return; }
  const product = productById(id);
  if (!product || !product.units.includes(state.unit)) { notify('Item indisponível', 'Escolha outra unidade para continuar.', 'error'); return; }
  const existing = state.cart.find(row => row.id === id);
  if (existing) existing.qty += 1; else state.cart.push({ id, qty: 1 });
  persist(); render(); notify('Adicionado à sacola', product.name);
}
function changeQuantity(id, change) {
  if (state.pendingPayment) { notify('Pagamento em análise', 'Consulte o status do pagamento antes de alterar a sacola.', 'error'); return; }
  const row = state.cart.find(item => item.id === id);
  if (!row) return;
  row.qty += change;
  if (row.qty <= 0) state.cart = state.cart.filter(item => item.id !== id);
  persist(); render();
}
function bindMainEvents() {
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addToCart(button.dataset.add)));
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { state.category = button.dataset.category; persist(); render(); }));
  document.querySelectorAll('[data-qty]').forEach(button => button.addEventListener('click', () => changeQuantity(button.dataset.qty, Number(button.dataset.change))));
  document.querySelectorAll('#main-content [data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  document.querySelectorAll('[data-advance-order]').forEach(button => button.addEventListener('click', () => advanceOrder(button.dataset.advanceOrder)));
  document.querySelectorAll('[data-redeem]').forEach(button => button.addEventListener('click', () => redeemReward(button.dataset.redeem)));
  const search = document.getElementById('product-search');
  if (search) search.addEventListener('input', event => { state.search = event.target.value; const start = event.target.selectionStart; const end = event.target.selectionEnd; const caret = start; render(); const newInput = document.getElementById('product-search'); newInput.focus(); newInput.setSelectionRange(caret, end); });
  const clear = document.getElementById('clear-filters');
  if (clear) clear.addEventListener('click', () => { state.category = 'Todos'; state.search = ''; render(); });
  const explore = document.getElementById('explore-menu');
  if (explore) explore.addEventListener('click', () => document.getElementById('menu-title').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  const checkout = document.getElementById('checkout-button');
  if (checkout) checkout.addEventListener('click', openCheckout);
  const privacyRewards = document.getElementById('privacy-from-rewards');
  if (privacyRewards) privacyRewards.addEventListener('click', openPrivacy);
  const promoForm = document.getElementById('promo-form');
  if (promoForm) promoForm.addEventListener('submit', event => { event.preventDefault(); applyPromo(document.getElementById('promo-code').value); });
  document.querySelectorAll('[data-remove-promo]').forEach(button => button.addEventListener('click', () => { state.promo = ''; persist(); render(); notify('Código removido', 'A promoção foi retirada do pedido.'); }));
  document.querySelectorAll('input[name="service"]').forEach(radio => radio.addEventListener('change', () => { state.serviceMode = radio.value; persist(); render(); }));
}
function openAccount() {
  const customer = state.customer || { name: '', email: '' };
  showModal(state.customer ? 'Sua conta de demonstração' : 'Entre para continuar', 'Clube Raízes', `<p>Este formulário simula um cadastro simples. Não use senha real nem informações sensíveis. Os dados ficam apenas neste navegador durante a demonstração.</p><form id="account-form" class="form-grid" novalidate><div class="field"><label for="customer-name">Como podemos chamar você?</label><input id="customer-name" name="name" autocomplete="name" required minlength="2" maxlength="70" value="${escapeHTML(customer.name)}" placeholder="Seu nome"></div><div class="field"><label for="customer-email">E-mail</label><input id="customer-email" type="email" name="email" autocomplete="email" required maxlength="120" value="${escapeHTML(customer.email)}" placeholder="voce@exemplo.com"><span class="field-hint">Usado neste protótipo para vincular seus pedidos ao perfil local.</span></div><label class="check-row"><input type="checkbox" name="terms" ${state.customer ? 'checked' : ''}> Li e aceito os Termos de Uso e a Política de Privacidade (textos demonstrativos). (obrigatório)</label><label class="check-row"><input type="checkbox" name="marketing" ${state.consent.marketing ? 'checked' : ''}> Quero receber novidades e campanhas por e-mail. (opcional)</label><div class="form-error" id="account-error" role="alert"></div><div class="modal-actions"><button type="submit" class="button button-primary">${state.customer ? 'Salvar dados' : 'Entrar na demonstração'}</button>${state.customer ? '<button type="button" class="button button-quiet" id="logout-button">Sair da conta</button>' : ''}</div></form>`);
  document.getElementById('account-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget; const data = new FormData(form); const name = String(data.get('name') || '').trim(); const email = String(data.get('email') || '').trim();
    const errors = [];
    if (name.length < 2) errors.push('Informe seu nome (mínimo de 2 letras).');
    if (!EMAIL_RE.test(email)) errors.push('Informe um e-mail válido.');
    if (data.get('terms') !== 'on') errors.push('Aceite os Termos de Uso e a Política de Privacidade para continuar.');
    const errorBox = document.getElementById('account-error');
    if (errors.length) { errorBox.textContent = errors.join(' '); errorBox.classList.add('show'); return; }
    state.customer = { name, email, termsAcceptedAt: new Date().toISOString() }; state.consent.marketing = data.get('marketing') === 'on'; logConsent('Cadastro'); persist(); closeModal(); render(); notify('Perfil salvo', `Olá, ${name.split(' ')[0]}! Você já pode concluir o pedido.`);
  });
  const logout = document.getElementById('logout-button');
  if (logout) logout.addEventListener('click', () => { state.customer = null; persist(); closeModal(); render(); notify('Você saiu da conta', 'Seu histórico local de demonstração foi mantido.'); });
}
function openCheckout() {
  if (!state.cart.length) { notify('Sua sacola está vazia', 'Adicione ao menos um produto antes de continuar.', 'error'); return; }
  if (!state.customer) { openAccount(); notify('Só mais uma etapa', 'Entre na demonstração para vincular seu pedido ao perfil.'); return; }
  paymentLock = false;
  const total = cartTotal();
  showModal('Revise e escolha como pagar', 'Finalização do pedido', `<div class="payment-box"><h3>${escapeHTML(serviceLabel())} em ${escapeHTML(units[state.unit].name)}</h3><p>Itens: ${escapeHTML(state.cart.map(row => `${row.qty}× ${productById(row.id).name}`).join(', '))}</p><div class="total-row grand"><span>Total a pagar</span><strong>${money(total)}</strong></div></div><form id="payment-form"><p>Selecione um método para simular o encaminhamento a um provedor externo. Nenhum dado financeiro será solicitado ou cobrado.</p><div class="payment-methods" role="group" aria-label="Método de pagamento"><button type="button" class="payment-method ${state.selectedPayment === 'pix' ? 'is-selected' : ''}" data-payment="pix">◇ Pix</button><button type="button" class="payment-method ${state.selectedPayment === 'card' ? 'is-selected' : ''}" data-payment="card">▤ Cartão</button></div><div class="privacy-footer-note">Ao confirmar, o sistema enviaria apenas o identificador do pedido e o valor ao serviço de pagamento. O retorno de aprovação ou recusa atualizaria o status. Esta etapa é simulada localmente.</div><div class="modal-actions"><button type="button" class="button button-primary" id="simulate-approve">Simular pagamento aprovado</button><button type="button" class="button button-quiet" id="simulate-decline">Simular recusa</button><button type="button" class="button button-quiet" id="simulate-noresponse">Simular sem resposta</button></div><div id="payment-response" aria-live="polite"></div></form>`, { wide: true });
  document.querySelectorAll('[data-payment]').forEach(button => button.addEventListener('click', () => { state.selectedPayment = button.dataset.payment; document.querySelectorAll('[data-payment]').forEach(option => option.classList.toggle('is-selected', option === button)); persist(); }));
  document.getElementById('simulate-decline').addEventListener('click', () => {
    document.getElementById('payment-response').innerHTML = `<div class="payment-result failure"><strong>Pagamento não aprovado (simulação)</strong><br>Nenhuma cobrança foi realizada. Sua sacola continua disponível para tentar novamente ou escolher outro método.</div>`;
    notify('Pagamento não aprovado', 'O pedido não foi criado; a sacola foi preservada.', 'error');
  });
  document.getElementById('simulate-approve').addEventListener('click', completeOrder);
  document.getElementById('simulate-noresponse').addEventListener('click', startNoResponse);
  if (state.pendingPayment) lockForPending();
}
function lockForPending() {
  ['simulate-approve', 'simulate-decline', 'simulate-noresponse'].forEach(id => { const button = document.getElementById(id); if (button) button.disabled = true; });
  document.querySelectorAll('[data-payment]').forEach(button => button.disabled = true);
  const ref = state.pendingPayment ? state.pendingPayment.ref : '';
  document.getElementById('payment-response').innerHTML = `<div class="payment-result pending"><strong>Resultado inconclusivo (simulação)</strong><br>Não recebemos resposta do provedor para a referência <span class="order-code">${escapeHTML(ref)}</span>. Para evitar cobrança em duplicidade, não é possível pagar de novo: consulte o status do pagamento.</div><div class="modal-actions"><button type="button" class="button button-primary" id="check-payment">Consultar status do pagamento</button><button type="button" class="button button-quiet" id="close-payment">Fechar</button></div>`;
  document.getElementById('check-payment').addEventListener('click', checkPending);
  document.getElementById('close-payment').addEventListener('click', () => { closeModal(); render(); });
}
function startNoResponse() {
  if (state.pendingPayment || !state.cart.length) return;
  state.pendingPayment = { ref: String(Date.now()).slice(-6), key: `idem-${Date.now().toString(36)}`, at: new Date().toISOString() };
  persist(); lockForPending();
  notify('Pagamento sem resposta', 'Nenhuma nova cobrança será iniciada.', 'error');
}
function checkPending() {
  if (!state.pendingPayment) return;
  const button = document.getElementById('check-payment'); if (button) button.disabled = true;
  completeOrder();
}
function completeOrder() {
  if (paymentLock) return;
  const total = cartTotal();
  if (!state.cart.length || !total) { closeModal(); notify('Não foi possível concluir', 'A sacola está vazia. Revise o pedido.', 'error'); return; }
  paymentLock = true;
  state.orderSeq += 1;
  const discount = promoDiscount();
  const order = {
    id: String(Date.now()).slice(-7), unit: state.unit, unitName: units[state.unit].name,
    date: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    payment: state.selectedPayment, paymentLabel: ({ pix: 'Pix simulado', card: 'Cartão simulado' })[state.selectedPayment],
    status: statuses[0], total, discount, promo: discount ? state.promo : '', serviceLabel: serviceLabel(), ticket: `A${state.orderSeq}`,
    items: state.cart.map(row => ({ id: row.id, name: productById(row.id).name, qty: row.qty }))
  };
  state.orders.unshift(order);
  state.points += Math.floor(total);
  state.cart = []; state.promo = ''; state.pendingPayment = null; persist();
  const response = document.getElementById('payment-response');
  if (response) {
    response.innerHTML = `<div class="payment-result"><strong>Retorno positivo do provedor externo (simulação)</strong><br>Referência <span class="order-code">${escapeHTML(order.id)}</span> · senha <span class="order-code">${escapeHTML(order.ticket)}</span>. O pedido foi atualizado para “${escapeHTML(order.status)}”.</div><div class="modal-actions"><button type="button" class="button button-primary" id="view-new-order">Acompanhar pedido</button><button type="button" class="button button-quiet" id="close-payment">Fechar</button></div>`;
    document.getElementById('view-new-order').addEventListener('click', () => { closeModal(); setView('orders'); notify('Pedido criado', `Pedido #${order.id} registrado nesta demonstração.`); });
    document.getElementById('close-payment').addEventListener('click', () => { closeModal(); render(); notify('Pedido criado', `Pedido #${order.id} está ${order.status.toLowerCase()}.`); });
  }
  ['simulate-approve', 'simulate-decline', 'simulate-noresponse'].forEach(id => { const button = document.getElementById(id); if (button) button.disabled = true; });
  document.querySelectorAll('[data-payment]').forEach(button => button.disabled = true);
  render();
}
function advanceOrder(id) {
  const order = state.orders.find(item => item.id === id);
  if (!order) return;
  const next = statuses.indexOf(order.status) + 1;
  if (next > 0 && next < statuses.length) { order.status = statuses[next]; persist(); render(); notify('Status atualizado (demo)', `Agora: ${order.status}.`); }
}
function redeemReward(id) {
  const reward = rewards.find(item => item.id === id);
  if (!reward) return;
  if (state.redeemed.includes(id)) { notify('Benefício já resgatado', 'Este resgate fica marcado apenas nesta demonstração.', 'error'); return; }
  if (state.points < reward.points) { notify('Pontos insuficientes', `Você precisa de ${reward.points - state.points} pontos a mais.`, 'error'); return; }
  state.points -= reward.points; state.redeemed.push(id); persist(); render(); notify('Benefício resgatado', reward.title);
}
function openPrivacy() {
  showModal('Você escolhe seus dados', 'Privacidade e LGPD', `<p>Este protótipo demonstra escolhas separadas. O armazenamento é local e fictício; não há integração com servidor ou compartilhamento real.</p><form id="privacy-form"><div class="privacy-option locked"><div><strong>Dados necessários</strong><p>Preferências básicas e dados mínimos para manter a demonstração funcionando. Sempre ativos neste protótipo.</p></div><input type="checkbox" checked disabled aria-label="Dados necessários sempre ativos"></div><div class="privacy-option"><div><strong>Métricas de uso</strong><p>Ajudariam a entender o uso das telas. Não são necessárias para pedir.</p></div><input type="checkbox" name="analytics" ${state.consent.analytics ? 'checked' : ''} aria-label="Permitir métricas de uso"></div><div class="privacy-option"><div><strong>Campanhas e novidades</strong><p>Permitem receber comunicações promocionais. Consentimento opcional.</p></div><input type="checkbox" name="marketing" ${state.consent.marketing ? 'checked' : ''} aria-label="Permitir campanhas e novidades"></div><div class="privacy-footer-note">Você pode alterar esta escolha depois. Em uma versão real, também seriam implementados canal para exercer direitos, política de retenção, controles de acesso e registro de consentimento no backend.</div><div class="modal-actions"><button type="submit" class="button button-primary">Salvar preferências</button><button type="button" class="button button-quiet" id="essential-only">Somente necessários</button></div></form>${rightsBlock()}`);
  bindRights();
  document.getElementById('privacy-form').addEventListener('submit', event => {
    event.preventDefault(); const data = new FormData(event.currentTarget); state.consent.analytics = data.get('analytics') === 'on'; state.consent.marketing = data.get('marketing') === 'on'; state.consent.saved = true; logConsent('Central de privacidade'); persist(); closeModal(); render(); notify('Preferências salvas', 'Suas escolhas foram atualizadas neste navegador.');
  });
  document.getElementById('essential-only').addEventListener('click', () => { state.consent.analytics = false; state.consent.marketing = false; state.consent.saved = true; logConsent('Central de privacidade'); persist(); closeModal(); render(); notify('Preferências atualizadas', 'Somente os dados necessários permanecem ativos.'); });
}
function acceptEssential() { state.consent.analytics = false; state.consent.marketing = false; state.consent.saved = true; logConsent('Aviso de privacidade'); persist(); render(); notify('Preferências salvas', 'A demonstração seguirá somente com o necessário.'); }

// Global events

document.querySelector('.main-nav').addEventListener('click', event => { const button = event.target.closest('[data-view]'); if (button) setView(button.dataset.view); });
document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); setView('menu'); });
document.getElementById('unit-select').addEventListener('change', event => {
  const oldUnit = state.unit; state.unit = event.target.value;
  const removed = state.cart.filter(row => !productById(row.id).units.includes(state.unit));
  if (removed.length) { const removedIds = new Set(removed.map(row => row.id)); state.cart = state.cart.filter(row => !removedIds.has(row.id)); notify('Sacola ajustada', `Itens indisponíveis em ${units[state.unit].name} foram removidos.`, 'error'); }
  state.category = 'Todos'; state.search = ''; persist(); render();
  if (oldUnit !== state.unit) notify('Unidade alterada', `${units[state.unit].name}: ${units[state.unit].kitchen.toLowerCase()}.`);
});
document.querySelectorAll('[data-channel]').forEach(button => button.addEventListener('click', () => { state.channel = button.dataset.channel; persist(); updateHeader(); resetIdleTimer(); notify('Canal alterado', ({ web: 'Experiência Web responsiva.', app: 'Visão compacta para experiência App.', totem: 'Controles ampliados para autoatendimento.' })[state.channel]); }));
document.getElementById('account-button').addEventListener('click', openAccount);
document.getElementById('jump-cart').addEventListener('click', () => {
  if (state.view !== 'menu') setView('menu');
  window.setTimeout(() => { const cart = document.getElementById('cart-panel'); if (cart) cart.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 20);
});
document.getElementById('privacy-footer').addEventListener('click', openPrivacy);
document.getElementById('customize-consent').addEventListener('click', openPrivacy);
document.getElementById('accept-essential').addEventListener('click', acceptEssential);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.getElementById('modal-root').innerHTML) closeModal();
  if (event.key === 'Tab') {
    const modal = document.querySelector('#modal-root .modal');
    if (!modal) return;
    const focusable = Array.from(modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select, a[href], [tabindex="0"]'));
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
['click', 'keydown', 'touchstart', 'pointerdown', 'input'].forEach(name => document.addEventListener(name, resetIdleTimer, true));

render();
resetIdleTimer();
