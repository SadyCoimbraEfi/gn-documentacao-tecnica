---
title: Como obter as chaves Client Id e Client Secret na API?
author: Whinter Gonçalves
---

As chaves Client_Id e Client_Secret da API permitem identificar a aplicação que está enviando a requisição e podem ser localizadas no seguinte local:

<!--truncate-->

1. Efetue login na conta Gerencianet e acesse o menu API > Minhas Aplicações > Sua Aplicação;
2. Suas chaves estarão disponíveis nas abas Produção e Desenvolvimento, de acordo com o ambiente a ser utilizado, bastando copiar e colar em seu sistema.
- Caso for utilizar o ambiente de testes/sandbox (aba Desenvolvimento), informe seu Client_Id e Client_Secret disponíveis na aba Desenvolvimento (veja onde localizar);
- Agora, caso for utilizar o ambiente real (aba Produção), informe seu Client_Id e Client_Secret disponíveis na aba Produção (veja onde localizar).

Dependendo do seu cenário, como por exemplo, se você estiver desenvolvendo um sistema, a configuração abaixo deverá ser atendida:

- **Ambiente de Desenvolvimento:** chaves Client_Id e Client_Secret de Desenvolvimento e atributo sandbox como true
- **Ambiente de Produção:** chaves Client_Id e Client_Secret de Produção e atributo sandbox como false

**OBSERVAÇÃO:** É importante que suas chaves não sejam compartilhadas nem visíveis na sua aplicação. O acesso indevido a essas credenciais podem viabilizar ações maliciosas e comprometer o não repúdio no que diz respeito a identidade da sua aplicação.