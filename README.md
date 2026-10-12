# Raízes do Nordeste – Front-End (protótipo acadêmico)

Interface multicanal (Web, App e Totem) de uma rede de lanchonetes de culinária nordestina.
Projeto Multidisciplinar – Trilha Front-End (UNINTER). **Dados fictícios; nenhuma cobrança real.**

- Publicação: https://raphaellacostaa.github.io/raizes-do-nordeste-frontend/
- Tecnologia: HTML, CSS e JavaScript puros, sem etapa de build. Estado em `localStorage`.

## Escopo
**Implementado:** seleção de unidade (com remoção de itens incompatíveis), cardápio com busca e categorias, sacola com código RAIZES5 (mínimo R$ 30) e modo de atendimento, cadastro demonstrativo com aceite dos Termos, pagamento simulado (aprovado, recusado e sem resposta), pedidos com senha, fidelidade, aviso de privacidade e central de dados (histórico de consentimentos, ver/baixar e excluir dados), modo Totem com botões ≥ 68 px e encerramento por inatividade (45 s).

**Proposto (não codificado):** CPF no totem, login com senha e nascimento, níveis de fidelidade, painel de operação/estoque/auditoria, back-end e gateway reais, tema escuro.

## Como rodar
Abra `index.html` no navegador (ou use um servidor estático).

## Testes
```bash
npm install
npm test
```
A suíte `tests/run-tests.js` executa `index.html` + `app.js` em jsdom e confere o DOM e o armazenamento local. Não mede layout, CSS, imagens reais, foco visual nem desempenho.

## Imagens
As fotos ficam em `assets/img/` (WebP reduzido). Para gerá-las a partir das fotos originais:
```bash
npm install
npm run imagens
```
O script baixa cada foto, redimensiona e converte para WebP. Se algum download falhar, salve a foto em `assets/img-original/<id>.jpg` e rode o comando de novo. Se uma imagem faltar, o cartão mostra um emoji.

## Observações
- A fonte tipográfica vem do Google Fonts (carregada sem bloquear a renderização).
- Os recursos de privacidade são demonstrativos e não comprovam conformidade com a LGPD.
