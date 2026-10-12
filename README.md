# Raízes do Nordeste — Projeto Front-End

Protótipo acadêmico responsivo para a rede fictícia de lanchonetes Raízes do Nordeste. O projeto atende ao recorte Front-End do Projeto Multidisciplinar 2026 e usa **HTML, CSS e JavaScript puros**, com dados simulados no navegador.

## Como executar

1. Extraia a pasta do projeto.
2. Abra um terminal nesta pasta e execute `python -m http.server 8000`.
3. Acesse `http://localhost:8000` no navegador.
4. Para encerrar, use `Ctrl + C` no terminal.

Não há dependências npm, chaves ou banco de dados necessários para executar os fluxos simulados. As fotografias gastronômicas são fotografias reais referenciadas em fontes públicas e carregadas remotamente; é necessária conexão com a internet. Se uma fonte bloquear o carregamento ou mudar o endereço, o card mantém um recurso visual de fallback. Para publicação comercial, substitua as referências por fotos próprias ou imagens licenciadas para esse uso. Recomenda-se executar por servidor HTTP local, pois o comportamento de armazenamento para arquivos abertos diretamente por `file://` pode variar entre navegadores.

## Direção visual da versão 2.0

A interface foi refinada com uma linguagem visual editorial para gastronomia: verde profundo e terracota mais contidos, tipografia com hierarquia clara, fotografia de alimentos, cards com proporções consistentes, botão de ação destacado, sacola mais legível e ajustes de espaçamento para telas grandes e pequenas. A fotografia é complementar; os fluxos principais continuam sendo simulados no próprio navegador.

## O que está implementado

- Cardápio mockado com busca, categorias, preços e disponibilidade por unidade.
- Alternância entre três unidades fictícias, cada uma com diferenças de disponibilidade.
- Sacola com inclusão, remoção, ajuste de quantidade e subtotal.
- Cadastro/entrada demonstrativa com nome e e-mail; nenhum campo de senha real é utilizado.
- Fluxo de checkout com três formas ilustrativas e simulação explícita de aprovação/recusa por provedor externo.
- Registro local do pedido e acompanhamento de status com progressão demonstrativa.
- Programa de fidelidade com saldo inicial de demonstração, acúmulo fictício e resgate de recompensas.
- Aviso e central de preferências de privacidade, com categorias opcionais separadas.
- Três apresentações de canal (Web, App e Totem), além de layout responsivo Mobile-first.
- Mensagens de retorno, estados vazios e validação básica de formulários.

## Limites importantes

Este é um **protótipo Front-End**, não um sistema pronto para operação comercial. Cadastro, pedidos, pontos, disponibilidade e pagamentos são simulados e ficam no navegador. Nenhum pagamento real é processado; não insira dados bancários reais. Uma versão de produção precisaria de API e banco de dados, autenticação segura, autorização por perfil, integração verdadeira com gateway de pagamento, controle de estoque sincronizado, logging/auditoria, proteção contra abuso, política de retenção e revisão de segurança e privacidade.

O `localStorage` é usado apenas para tornar a experiência de demonstração persistente no mesmo navegador. Ele não é um substituto para banco de dados nem deve armazenar credenciais, dados financeiros ou informações sensíveis.

## Estrutura

```text
raizes-do-nordeste-frontend/
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── logo.svg
│   └── images/ (reservado para fotos locais licenciadas)
├── docs/
│   ├── Projeto_Front_End_Raizes_do_Nordeste.docx
│   ├── Projeto_Front_End_Raizes_do_Nordeste.pdf
│   ├── diagrama_casos_de_uso.png
│   ├── jornada_usuario.png
│   ├── wireframe_desktop.png
│   └── wireframe_mobile.png
└── README.md
```

## Passo a passo para demonstrar

1. Escolha uma unidade e mude de canal entre Web, App e Totem.
2. Adicione produtos à sacola e ajuste as quantidades.
3. Clique em **Continuar pedido**; entre na demonstração com nome e e-mail.
4. Escolha um método e teste **Simular recusa**. A sacola deve ser mantida.
5. Abra novamente o checkout e selecione **Simular pagamento aprovado**.
6. Vá a **Meus pedidos** e use **Avançar status (demo)** para demonstrar o acompanhamento.
7. Visite **Fidelidade**, resgate benefícios dentro do saldo demonstrativo e abra **Preferências de dados**.

## Personalização e entrega

Antes da entrega acadêmica, revise as decisões, ajuste os textos com suas próprias palavras, registre as evidências de execução e declare qualquer uso de ferramentas de IA conforme as regras da instituição. Preencha nome, RU, polo e demais dados acadêmicos na documentação. Ainda é necessário publicar o site e o repositório em URLs públicas; este pacote local não cria automaticamente links de GitHub, Vercel ou Netlify.


## Fotografias do cardápio e da página inicial

As imagens foram individualizadas para que cada produto use uma fotografia coerente com o prato descrito, em vez de reutilizar a mesma imagem para vários itens. As imagens são carregadas de endereços públicos de terceiros e, por isso, dependem de conexão e da disponibilidade desses endereços. Os créditos abaixo identificam as páginas/fontes consultadas; confirme a licença e solicite autorização quando necessário antes de usar em produção.

- **Tapioca de carne de sol:** [fotografia da tapioca de carne de sol com queijo coalho — Tripadvisor / Casa do Cangaço](https://www.tripadvisor.com.br/LocationPhotoDirectLink-g303518-d6008441-i174536130-Casa_Do_Cangaco-Natal_State_of_Rio_Grande_do_Norte.html).
- **Cuscuz com ovos:** [fotografia de cuscuz com ovos — Prática](https://pt.linkedin.com/pulse/cuscuz-conhe%C3%A7a-suas-varia%C3%A7%C3%B5es-na-culin%C3%A1ria-praticabr-tsbzf).
- **Bolo de macaxeira:** [fotografia de bolo de mandioca — Folha Vitória](https://www.folhavitoria.com.br/curiosidades/como-fazer-bolo-de-mandioca-molhadinho-que-nunca-seca-e-dura-dias-sem-perder-sabor/).
- **Café coado:** [fotografia de café filtrado — Lavaive](https://lavaive.com/tinto-chemex-y-americano-cuales-son-sus-diferencias/).
- **Suco de cajá:** [fotografia de suco de cajá — Solutudo](https://www.solutudo.com.br/classificados/sp/atibaia/suco-de-caja-497007).
- **Tapioca de queijo coalho:** [fotografia de tapioca com queijo coalho — Tripadvisor / Dom Churrasco](https://www.tripadvisor.com.br/LocationPhotoDirectLink-g303293-d3536146-i343504877-Dom_Churrasco-Fortaleza_State_of_Ceara.html).
- **Cuscuz completo:** [fotografia de cuscuz com queijo e carne — TNH1](https://www.tnh1.com.br/noticia/nid/cuscuz-de-arroz-uma-paixao/).
- **Combo bom dia:** [fotografia de café da manhã regional — Pousada Porto Navegantes](https://www.pousadaportonavegantes.com.br/).
- **Cartola pernambucana:** [fotografia de cartola — Prática](https://blog.praticabr.com/cartola-receita-patrimonio-de-pernambuco).
- **Bolo de rolo:** [fotografia de bolo de rolo — Dicas Online](https://www.dicasonline.com/comidas-tipicas-do-nordeste/).
- **Água de coco:** [fotografia de água de coco — El Tiempo](https://www.eltiempo.com/salud/agua-de-coco-beneficios-de-esta-bebida-tropical-rica-en-potasio-809614).
- **Tapioca de banana:** [fotografia de tapioca com banana e mel — Da Terrinha](https://www.daterrinhaalimentos.com/en/receitas/banana-com--mel-e-coco-ralado).
- **Imagem principal (hero):** [fotografia de café nordestino — Revista Deguste](https://revistadeguste.com/noticia/conheca-o-emporio-restaurante-em-joao-pessoa/).

Antes de publicar o site, confirme os direitos de uso de cada imagem e prefira fotografias próprias ou arquivos com licença compatível com o uso pretendido. As imagens são externas, não foram incorporadas ao pacote e podem deixar de carregar se o site de origem mudar o endereço ou bloquear o acesso.


## Ajustes de interface (10/10/2026)
- Corrigido o posicionamento das notificações: elas aparecem como pequenos avisos no canto inferior direito, sem ocupar toda a altura da janela.
- Removida da página inicial a faixa de três cartões numerados (01, 02 e 03) abaixo do banner principal.
