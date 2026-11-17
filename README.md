# Tema Mobilemed para o Claude

Tema com a identidade visual da Mobilemed para o app do Claude (desktop e celular), nos modos escuro e claro.

## O que muda

- **Fundo animado:** preto com dois brilhos no ciano da marca, anéis finos girando devagar no canto e o logo da Mobilemed no meio, como marca d'água.
- **Cores:** cards `#0a242e`, painéis e menus `#232529`, links no ciano `#00bfff` e botão principal em `#006fd6` (`#0077e7` ao passar o mouse).
- **Suas mensagens:** balão com borda ciano `#00bbfe` e fundo de ciano escurecido, no estilo dos botões do site. Mensagens com imagem colada ficam no balão original do app, para a imagem continuar aparecendo.
- **Modo claro:** fundo azul-gelo `#eaf4f8`, cards quase brancos e o mesmo fundo animado em versão clara.

## Instalar

No prompt de uma sessão do Claude Code no terminal:

```
/plugin install tema-mobilemed --marketplace lucasentz-mobilemed/tema-mobilemed
```

Responda `y` para adicionar a loja e escolha o escopo (o de usuário vem primeiro; Enter confirma).

Direto do shell:

```
claude plugin install tema-mobilemed --marketplace lucasentz-mobilemed/tema-mobilemed
```

No app de desktop, onde `/plugin` não roda: clique no **+** ao lado da caixa de mensagem, depois **Plugins**, **Add marketplace** com `lucasentz-mobilemed/tema-mobilemed` e então **Add plugin**.

## Limitações

- O tema aparece só no app de desktop e no celular; terminal e editores não desenham temas.
- A fonte não muda: o tema do app aceita só cores e fundo.
- O fundo troca entre claro e escuro conforme o modo do sistema.
- O logo e as cores são da marca Mobilemed.
