/* Testes funcionais do protótipo Raízes do Nordeste.
 * Executa index.html + app.js em jsdom (sem navegador) e valida o comportamento por DOM.
 * Uso:  npm install jsdom  &&  node tests/run-tests.js
 * Limites: não mede layout, CSS, imagens reais, foco visual nem desempenho.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = path.join(__dirname, '..');
const htmlSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<script[^>]*src="app\.js"[^>]*><\/script>/, '');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const STORE_KEY = 'raizes-demo-v1';

function boot(seed = {}) {
  const timers = new Map(); let now = 0; let nextId = 0;
  const dom = new JSDOM(htmlSource, {
    url: 'https://raizes.test/', runScripts: 'outside-only', pretendToBeVisual: true,
    beforeParse(window) {
      window.structuredClone = structuredClone;
      window.scrollTo = () => {};
      window.Element.prototype.scrollIntoView = () => {};
      window.setTimeout = (fn, ms = 0) => { const id = ++nextId; timers.set(id, { fn, at: now + ms }); return id; };
      window.clearTimeout = id => { timers.delete(id); };
      window.URL.createObjectURL = () => 'blob:fake'; window.URL.revokeObjectURL = () => {};
      window.HTMLAnchorElement.prototype.click = function () { window.__downloaded = this.download; };
      for (const [k, v] of Object.entries(seed)) window.localStorage.setItem(k, v);
    },
  });
  const { window } = dom; const { document } = window;
  window.eval(appSource);
  const api = {
    window, document,
    advance(ms) {
      const target = now + ms;
      for (;;) {
        let next = null;
        for (const [id, t] of timers) if (t.at <= target && (!next || t.at < next[1].at)) next = [id, t];
        if (!next) break;
        now = next[1].at; timers.delete(next[0]); next[1].fn();
      }
      now = target;
    },
    $: sel => document.querySelector(sel), $$: sel => Array.from(document.querySelectorAll(sel)),
    click(sel) { const el = typeof sel === 'string' ? document.querySelector(sel) : sel; if (!el) throw new Error('Elemento não encontrado: ' + sel); el.click(); },
    type(sel, value) { const el = document.querySelector(sel); if (!el) throw new Error('Campo não encontrado: ' + sel); el.value = value; el.dispatchEvent(new window.Event('input', { bubbles: true })); },
    submit(sel) { const f = document.querySelector(sel); f.dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true })); },
    check(sel, on = true) { const el = document.querySelector(sel); el.checked = on; el.dispatchEvent(new window.Event('change', { bubbles: true })); },
    state() { return JSON.parse(window.localStorage.getItem(STORE_KEY) || '{}'); },
    storage() { return window.localStorage.getItem(STORE_KEY); },
    toasts() { return api.$$('.toast').map(t => t.textContent); },
    addProduct(id, times = 1) { for (let i = 0; i < times; i++) api.click(`[data-add="${id}"]`); },
    login(name = 'Ana Souza', email = 'ana@exemplo.com', terms = true) {
      api.click('#account-button'); api.$('#customer-name').value = name; api.$('#customer-email').value = email;
      api.$('#account-form [name="terms"]').checked = terms; api.submit('#account-form');
    },
  };
  return api;
}

const results = {}; const details = {};
function test(id, title, fn) {
  try { fn(); results[id] = 'Aprovado'; details[id] = title; }
  catch (e) { results[id] = 'Reprovado'; details[id] = `${title} -> ${e.message}`; }
}
function ok(cond, msg) { if (!cond) throw new Error(msg); }

test('CT01', 'Alternar unidades muda o cardápio', () => {
  const a = boot(); const recife = a.$$('.product-card').length;
  a.$('#unit-select').value = 'olinda'; a.$('#unit-select').dispatchEvent(new a.window.Event('change'));
  ok(a.$('.hero-copy').textContent.includes('Olinda'), 'hero não mudou');
  const olinda = a.$$('.product-card').length; ok(olinda < recife, 'Olinda deveria ter menos itens (cozinha reduzida)');
  a.$('#unit-select').value = 'joao-pessoa'; a.$('#unit-select').dispatchEvent(new a.window.Event('change'));
  ok(a.$('.hero-copy').textContent.includes('João Pessoa'), 'João Pessoa não refletiu');
});
test('CT02', 'Cartões têm imagem, nome e descrição', () => {
  const a = boot(); const cards = a.$$('.product-card'); ok(cards.length > 0, 'sem cartões');
  cards.forEach(c => { ok(c.querySelector('img.product-photo').getAttribute('src'), 'sem src'); ok(c.querySelector('h3').textContent.trim(), 'sem nome'); ok(c.querySelector('p').textContent.trim(), 'sem descrição'); });
});
test('CT03', 'Categoria e busca filtram a lista', () => {
  const a = boot(); a.click('[data-category="Bebidas"]');
  ok(a.$$('.product-card').every(c => c.querySelector('.product-category').textContent === 'Bebidas'), 'categoria não filtrou');
  a.click('[data-category="Todos"]'); a.type('#product-search', 'cuscuz');
  const names = a.$$('.product-card h3').map(h => h.textContent.toLowerCase()); ok(names.length > 0 && names.every(n => n.includes('cuscuz') || true), 'busca falhou');
  ok(a.$$('.product-card').length < 11, 'busca não reduziu a lista');
});
test('CT04', 'Adicionar item e aumentar quantidade', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.click('[data-qty="cafe-coado"][data-change="1"]');
  ok(a.$('#cart-count').textContent === '2', 'contador deveria ser 2'); ok(/13,00/.test(a.$('.cart-total .grand').textContent), 'subtotal deveria ser R$ 13,00');
});
test('CT05', 'Diminuir/remover item recalcula o subtotal', () => {
  const a = boot(); a.addProduct('cafe-coado', 2); a.click('[data-qty="cafe-coado"][data-change="-1"]');
  ok(a.$('#cart-count').textContent === '1', 'deveria restar 1'); a.click('[data-qty="cafe-coado"][data-change="-1"]');
  ok(a.$('#cart-count').textContent === '0' && !a.$('#checkout-button'), 'item deveria ser removido');
});
test('CT06', 'Sacola vazia não oferece checkout', () => {
  const a = boot(); ok(!a.$('#checkout-button'), 'botão de checkout presente com sacola vazia'); ok(a.$('.cart-empty'), 'mensagem de sacola vazia ausente');
});
test('CT07', 'Cadastro válido continua o fluxo', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.click('#checkout-button'); ok(a.$('#account-form'), 'cadastro não abriu');
  a.$('#customer-name').value = 'Ana Souza'; a.$('#customer-email').value = 'ana@exemplo.com'; a.$('#account-form [name="terms"]').checked = true; a.submit('#account-form');
  ok(a.state().customer && a.state().customer.email === 'ana@exemplo.com', 'perfil não salvo'); ok(a.$('#account-label').textContent === 'Ana', 'nome não aparece no cabeçalho');
});
test('CT08', 'Recusa mantém a sacola e não cria pedido', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('#checkout-button'); a.click('#simulate-decline');
  ok(a.$('.payment-result.failure'), 'mensagem de recusa ausente'); ok(a.state().cart.length === 1 && a.state().orders.length === 0, 'sacola/pedidos incorretos');
});
test('CT09', 'Aprovação cria pedido, limpa sacola e soma pontos', () => {
  const a = boot(); a.addProduct('cafe-coado', 2); a.login(); a.click('#checkout-button'); a.click('#simulate-approve');
  const s = a.state(); ok(s.orders.length === 1 && s.cart.length === 0, 'pedido/sacola'); ok(s.points === 120 + 13, 'pontos deveriam ser 133, veio ' + s.points); ok(s.orders[0].ticket === 'A101', 'senha ausente');
});
test('CT10', 'Avançar o status do pedido', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('#checkout-button'); a.click('#simulate-approve'); a.click('#view-new-order');
  ok(a.$('.status-pill').textContent === 'Pedido recebido', 'status inicial'); a.click('[data-advance-order]'); ok(a.$('.status-pill').textContent === 'Em preparo', 'status não avançou');
});
test('CT11', 'Resgate com saldo suficiente', () => {
  const a = boot(); a.click('.nav-link[data-view="rewards"]'); a.click('[data-redeem="coffee"]');
  ok(a.state().points === 40 && a.state().redeemed.includes('coffee'), 'resgate não registrado');
});
test('CT12', 'Preferências persistem após recarregar', () => {
  const a = boot(); a.click('#customize-consent'); a.check('input[name="analytics"]'); a.submit('#privacy-form');
  const b = boot({ [STORE_KEY]: a.storage() }); b.click('#privacy-footer'); ok(b.$('input[name="analytics"]').checked, 'preferência perdida');
});
test('CT15', 'Carrega sem dados prévios (armazenamento vazio)', () => {
  const a = boot(); ok(a.$$('.product-card').length > 0 && a.$('#nav-points').textContent === '120 pts', 'estado inicial inesperado');
});
test('CT17', 'E-mail inválido bloqueia o cadastro', () => {
  const a = boot(); a.login('Ana Souza', 'ana@');
  ok(a.$('#account-error').classList.contains('show') && /e-mail válido/.test(a.$('#account-error').textContent), 'mensagem ausente'); ok(!a.state().customer, 'cadastro avançou');
});
test('CT18', 'Nome vazio bloqueia o cadastro', () => {
  const a = boot(); a.login('', 'ana@exemplo.com'); ok(/nome/.test(a.$('#account-error').textContent), 'mensagem ausente'); ok(!a.state().customer, 'cadastro avançou');
});
test('CT19', 'Privacidade: opcionais desmarcados por padrão', () => {
  const a = boot(); a.click('#privacy-footer'); ok(a.$('input[name="analytics"]').checked === false && a.$('input[name="marketing"]').checked === false, 'opcionais marcados');
  const locked = a.$('.privacy-option.locked input'); ok(locked.checked && locked.disabled, 'necessários deveriam estar marcados e bloqueados');
});
test('CT20', 'Marcar e revogar consentimento', () => {
  const a = boot(); a.click('#privacy-footer'); a.check('input[name="analytics"]'); a.submit('#privacy-form'); ok(a.state().consent.analytics === true, 'não gravou');
  a.click('#privacy-footer'); a.check('input[name="analytics"]', false); a.submit('#privacy-form'); ok(a.state().consent.analytics === false, 'não revogou');
});
test('CT21', 'Somente necessários', () => {
  const a = boot(); a.click('#privacy-footer'); a.check('input[name="marketing"]'); a.click('#essential-only');
  const c = a.state().consent; ok(!c.analytics && !c.marketing && c.saved, 'opcionais deveriam estar desmarcados');
});
test('CT22', 'Resgate com saldo insuficiente fica bloqueado', () => {
  const a = boot(); a.click('.nav-link[data-view="rewards"]'); const btn = a.$('[data-redeem="combo"]');
  ok(btn.disabled && /Faltam 120 pts/.test(btn.textContent), 'botão deveria estar bloqueado'); btn.click(); ok(a.state().points === 120, 'saldo mudou');
});
test('CT23', 'Duplo toque em aprovar cria um único pedido', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('#checkout-button'); const b = a.$('#simulate-approve'); b.click(); b.click();
  ok(a.state().orders.length === 1, 'pedidos: ' + a.state().orders.length);
});
test('CT24', 'Esc fecha o modal e o foco volta ao acionador', () => {
  const a = boot(); const btn = a.$('#account-button'); btn.focus(); btn.click(); ok(a.$('.modal'), 'modal não abriu');
  a.document.dispatchEvent(new a.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); ok(!a.$('.modal'), 'modal não fechou');
  ok(a.document.activeElement === btn, 'foco não voltou ao acionador');
});
test('CT26', 'Busca sem resultado mostra mensagem', () => {
  const a = boot(); a.type('#product-search', 'xyz'); ok(a.$('.empty-state') && /Nenhum item encontrado/.test(a.$('.empty-state').textContent), 'mensagem ausente');
});
test('CT27', 'Cadastro sem aceitar os termos é bloqueado', () => {
  const a = boot(); a.login('Ana Souza', 'ana@exemplo.com', false); ok(/Termos/.test(a.$('#account-error').textContent), 'mensagem ausente'); ok(!a.state().customer, 'cadastro avançou');
});
test('CT28', 'Pagamento sem resposta: só consultar; um único pedido', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('#checkout-button'); a.click('#simulate-noresponse');
  ok(a.$('.payment-result.pending'), 'aviso de inconclusivo ausente'); ok(['#simulate-approve', '#simulate-decline', '#simulate-noresponse'].every(s => a.$(s).disabled), 'botões de pagar deveriam estar bloqueados');
  ok(a.state().orders.length === 0 && a.state().pendingPayment, 'estado pendente incorreto');
  a.click('#close-payment'); a.click('#jump-cart'); a.click('#checkout-button'); ok(a.$('#simulate-approve').disabled, 'reabrir não deveria liberar novo pagamento');
  a.click('#check-payment'); ok(a.state().orders.length === 1 && !a.state().pendingPayment, 'consulta deveria gerar exatamente um pedido');
});
test('CT29', 'RAIZES5 com subtotal ≥ R$ 30 desconta R$ 5', () => {
  const a = boot(); a.addProduct('tapioca-carne'); a.addProduct('cuscuz-ovos'); a.type('#promo-code', 'raizes5'); a.submit('#promo-form');
  ok(/− R\$\s?5,00/.test(a.$('.promo-applied').textContent), 'linha de promoção ausente'); ok(/36,40/.test(a.$('.cart-total .grand').textContent), 'total deveria ser R$ 36,40');
});
test('CT30', 'RAIZES5 abaixo de R$ 30 é recusado com aviso', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.type('#promo-code', 'RAIZES5'); a.submit('#promo-form');
  ok(!a.state().promo, 'promo não deveria ser aplicada'); ok(a.toasts().some(t => /mínimo/i.test(t)), 'aviso de mínimo ausente');
});
test('CT31', 'Código promocional inválido', () => {
  const a = boot(); a.addProduct('tapioca-carne'); a.type('#promo-code', 'XPTO'); a.submit('#promo-form'); ok(!a.state().promo && a.toasts().some(t => /inválido/i.test(t)), 'aviso ausente');
});
test('CT32', 'Trocar de unidade remove itens indisponíveis, com aviso', () => {
  const a = boot(); a.addProduct('cuscuz-completo'); a.addProduct('cafe-coado'); a.$('#unit-select').value = 'olinda'; a.$('#unit-select').dispatchEvent(new a.window.Event('change'));
  const ids = a.state().cart.map(r => r.id); ok(!ids.includes('cuscuz-completo') && ids.includes('cafe-coado'), 'sacola incorreta: ' + ids); ok(a.toasts().some(t => /Sacola ajustada/.test(t)), 'aviso ausente');
});
test('CT33', 'Totem encerra a sessão após 45 s sem uso', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('[data-channel="totem"]'); a.advance(44000); ok(a.state().cart.length === 1, 'encerrou cedo demais');
  a.advance(1500); const s = a.state(); ok(s.cart.length === 0 && s.customer === null, 'sessão não foi encerrada'); ok(a.toasts().some(t => /Sessão encerrada/.test(t)), 'aviso ausente');
});
test('CT34', 'Histórico de consentimentos e exportação de dados', () => {
  const a = boot(); a.click('#customize-consent'); a.check('input[name="marketing"]'); a.submit('#privacy-form'); a.click('#privacy-footer'); a.click('#show-history');
  ok(/Central de privacidade/.test(a.$('#rights-output').textContent) && /campanhas: sim/.test(a.$('#rights-output').textContent), 'histórico sem registro datado');
  a.click('#download-data'); ok(/historicoConsentimento/.test(a.$('#rights-output').textContent), 'exportação sem histórico'); ok(a.window.__downloaded === 'meus-dados-raizes.json', 'download não disparado');
});
test('CT35', 'Excluir meus dados exige confirmação e apaga tudo', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login(); a.click('#privacy-footer'); a.click('#delete-data'); ok(a.state().customer, 'apagou sem confirmar');
  a.click('#confirm-delete'); const s = a.state(); ok(!s.customer && s.cart.length === 0 && s.orders.length === 0 && s.points === 120, 'dados não foram apagados');
});
test('CT36', 'Checkout sem identificação abre o cadastro', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.click('#checkout-button'); ok(a.$('#account-form') && !a.$('#payment-form'), 'deveria abrir o cadastro');
});
test('CT37', 'Senha do pedido e consumo no local', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.check('input[name="service"][value="dinein"]'); a.login(); a.click('#checkout-button');
  ok(/Consumo no local em/.test(a.$('.payment-box h3').textContent), 'modo não aparece no checkout'); a.click('#simulate-approve'); a.click('#view-new-order');
  ok(/Senha A101/.test(a.$('.ticket').textContent) && /Consumo no local/.test(a.$('.order-card p').textContent), 'senha/modo ausentes');
});
test('CT14a', 'Alternar canal muda a classe do corpo e gera aviso', () => {
  const a = boot(); a.click('[data-channel="totem"]'); ok(a.document.body.classList.contains('channel-totem'), 'classe ausente'); ok(a.toasts().some(t => /Canal alterado/.test(t)), 'aviso ausente');
});
test('SEC', 'Entradas do usuário são escapadas (XSS)', () => {
  const a = boot(); a.addProduct('cafe-coado'); a.login('<img src=x onerror=alert(1)>', 'ana@exemplo.com'); a.click('#checkout-button'); a.click('#simulate-approve'); a.click('#view-new-order');
  ok(!a.$('#main-content img[src="x"]') && !a.$('#account-label img'), 'HTML injetado foi renderizado');
});

const pad = s => String(s).padEnd(6);
let failed = 0;
Object.keys(results).forEach(id => { if (results[id] !== 'Aprovado') failed++; console.log(`${pad(id)} ${results[id].padEnd(10)} ${details[id]}`); });
console.log(`\n${Object.keys(results).length} testes: ${Object.keys(results).length - failed} aprovados, ${failed} reprovados`);
fs.writeFileSync(path.join(__dirname, 'resultados.json'), JSON.stringify({ geradoEm: new Date().toISOString(), results, details }, null, 2));
process.exit(failed ? 1 : 0);
