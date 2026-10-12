# Raízes do Nordeste – Interface Multicanal

Protótipo front-end de uma rede de lanchonetes de culinária nordestina, com experiências **Web**, **App** e **Totem** na mesma aplicação. O cliente escolhe a unidade, monta o pedido, paga (simulado), acompanha o status e controla seus dados pessoais.

> **Projeto acadêmico.** Todos os dados são fictícios e nenhuma cobrança real é feita. Os recursos de privacidade são demonstrativos e não comprovam conformidade com a LGPD.

**Demonstração:** https://raphaellacostaa.github.io/raizes-do-nordeste-frontend/

## O que o protótipo faz

**Pedido**
- Seleção de unidade (Recife Antigo, Olinda, João Pessoa). O cardápio muda por unidade e, ao trocar, os itens indisponíveis saem da sacola com aviso.
- Cardápio com busca e categorias; sacola com quantidades, subtotal e total.
- Retirada ou consumo no local.
- Código promocional `RAIZES5`: R$ 5 de desconto em pedidos a partir de R$ 30.
- Cadastro demonstrativo (nome, e-mail e aceite dos Termos).

**Pagamento (simulado)**
- Três retornos: **aprovado**, **recusado** e **sem resposta**.
- Em "sem resposta", o novo pagamento fica bloqueado e só é possível consultar o status, o que evita cobrança duplicada.
- Recusa preserva a sacola; aprovação cria o pedido com **senha** e credita pontos.

**Pedidos e fidelidade**
- Meus pedidos com senha e avanço de status (recebido, em preparo, pronto, retirado).
- Clube Raízes: 1 ponto por R$ 1 em pedido aprovado, saldo e resgate de recompensas.

**Privacidade (LGPD)**
- Aviso de privacidade no primeiro acesso: "Continuar só com o necessário" ou "Personalizar".
- Consentimentos opcionais (métricas e campanhas) desmarcados por padrão e revogáveis.
- Seus direitos: ver e baixar os dados (JSON), histórico datado de consentimentos e exclusão com confirmação.

**Canais e acessibilidade**
- Alternância entre **Web**, **App** e **Totem** no seletor superior.
- Totem com botões de pelo menos 68 px e encerramento da sessão após 45 s sem interação.
- Navegação por teclado, foco visível, foco preso nas janelas, `aria-live` nos avisos e ajustes de contraste de texto (Lighthouse de acessibilidade: 98).

## O que não está implementado

CPF opcional no totem · login com senha e data de nascimento (bloqueio de menores) · níveis de fidelidade e abatimento de pontos no total · itens esgotados e sazonais · painel de operação, estoque e auditoria · tema escuro · back-end e gateway de pagamento reais.

## Como executar

Não há etapa de build. Abra o `index.html` no navegador ou sirva a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## Testes

Requer [Node.js](https://nodejs.org/) (testado com a versão 22).

```bash
npm install
npm test
```

A suíte `tests/run-tests.js` carrega o `index.html` e o `app.js` em [jsdom](https://github.com/jsdom/jsdom) e confere o DOM e o armazenamento local. São 35 verificações, entre elas: filtros e busca, sacola, promoção, pagamento (aprovado, recusado e sem resposta), cadastro e validações, consentimento, direitos do titular, troca de unidade, sessão do totem e escape de HTML. Os resultados da última execução ficam em `tests/resultados.json`.

A suíte **não** mede layout, CSS, imagens reais, leitor de tela nem desempenho. A responsividade, a navegação por teclado e o Lighthouse foram verificados manualmente.

## Imagens

As fotos do cardápio ficam em `assets/img/` (WebP reduzido). Para gerá-las novamente a partir das fotos originais:

```bash
npm run imagens
```

O script baixa cada foto, redimensiona e converte para WebP. Se algum download falhar, salve a foto em `assets/img-original/<id>.jpg` e rode o comando de novo.

## Qualidade medida

Lighthouse (Chrome DevTools), URL pública, janela anônima, em 12/10/2026:

| Desempenho | Acessibilidade | Boas práticas | SEO |
|:-:|:-:|:-:|:-:|
| 73 | 98 | 100 | 100 |

LCP 2,3 s · FCP 0,9 s · CLS 0,002 · TBT 1.390 ms. A meta de LCP (≤ 2,5 s) foi atendida; a nota de desempenho ficou abaixo de 90 por causa do tempo de bloqueio (TBT).

## Estrutura

```
index.html                  Estrutura das telas
styles.css                  Estilos responsivos (mobile-first) e variações Web, App e Totem
app.js                      Regras e interações (estado em localStorage)
assets/                     Logo e imagens (img/)
scripts/                    Otimização das imagens
tests/                      Suíte de testes automatizados
docs/                       Fontes dos diagramas da documentação
```

## Créditos e observações

- As fotos dos produtos foram obtidas de sites de terceiros (como TripAdvisor, Folha Vitória, TNH1, Dicas Online, El Tiempo e Revista de Guste), apenas para fins acadêmicos e ilustrativos. Os direitos pertencem aos respectivos autores.
- A fonte tipográfica (DM Sans e Fraunces) vem do Google Fonts.
- Durante o projeto foram usadas ferramentas de inteligência artificial (ChatGPT e Claude), conforme declarado no Apêndice A do relatório.

## Autoria

**Raphaella Patrícia Monteiro Costa** 
Análise e Desenvolvimento de Sistemas 
Disciplina: Projeto Multidisciplinar – Trilha Front-End
2026
