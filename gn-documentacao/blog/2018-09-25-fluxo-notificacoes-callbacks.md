---
title: Entendendo o fluxo das notificações (callbacks) da API
author: Whinter Gonçalves
//authorURL: http://twitter.com/ericnakagawa
//authorFBID: 661277173
---

Esta página tem como objetivo apresentar o Histórico de Notificações. Este recurso está disponível na API de sua conta Gerencianet e permite visualizar os POSTs que a Gerencianet dispara para a URL de notificação definida pelo integrador. Este POST contém apenas uma informação: um token de notificação.

<!--truncate-->

Ao término da leitura deste conteúdo, espera-se que você consiga interpretar os cenários pertinentes a notificações (callbacks), como em situações em que uma cobrança em seu sistema não foi baixada, o callback foi disparado para uma URL que você definiu previamente mas que não é mais válida, etc.

Outras informações sobre o processo de definição da URL de notificação e a mecânica envolvendo a consulta de detalhes de uma notificação podem ser observadas na página [Recebendo as notificações](https://dev.gerencianet.com.br/docs/notificacoes-recebendo).

Vá direto ao ponto – utilize o índice abaixo para encontrar a resposta de maneira mais eficiente:

- [Conhecendo mais sobre o fluxo de notificações](https://dev.gerencianet.com.br/docs/entendendo-fluxo-notificacoes#section-conhecendo-mais-sobre-o-fluxo-de-notifica-es)<br>
- [Exemplo 1: Notificação com “Sucesso (200)”](https://dev.gerencianet.com.br/docs/entendendo-fluxo-notificacoes#section-exemplo-1-notifica-o-com-sucesso-200-)<br>
- [Exemplo 2: Notificação com “Falha (404)”](https://dev.gerencianet.com.br/docs/entendendo-fluxo-notificacoes#section-exemplo-2-notifica-o-com-falha-404-) <br>
- [Exemplo 3: Notificação com “Falha (301)” ou “Falha (302)”](https://dev.gerencianet.com.br/docs/<br>entendendo-fluxo-notificacoes#section-exemplo-3-notifica-o-com-falha-301-ou-falha-302-) <br>
- [Exemplo 4: Notificação com “Falha (500)”](https://dev.gerencianet.com.br/docs/entendendo-fluxo-notificacoes#section-exemplo-4-notifica-o-com-falha-500-)<br>
- [Códigos de status HTTP (2xx, 3xx, 4xx e 5xx)](https://dev.gerencianet.com.br/docs/entendendo-fluxo-notificacoes#section-c-digos-de-status-http-2xx-3xx-4xx-e-5xx-)<br>