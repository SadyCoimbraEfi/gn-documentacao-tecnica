---
id: doc12
title: Introdução
---

A geração de um boleto não envolve transmissão de dados sensíveis como número de cartão de crédito. Por isso, basta consumir o endpoint de pagamento para gerar o boleto registrado.

Para gerar um boleto bancário via integração, é bem simples e requer apenas dois passos:

1. **Crie a transação**, informando o item/produto/serviço, valor, quantidade, etc;

2. **Associe à forma de pagamento via boleto**, informando o <code>charge_id</code> da transação criada e os dados do cliente.

Cada transação possui um <code>charge_id</code>, que é um identificador próprio e é usado para associar à forma de pagamento via boleto bancário. O status da cobrança será alterado conforme sua situação, por exemplo:

- Ao gerar uma cobrança (também chamada de transação), esta possui o status inicial de <code>new</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-null-para-new.png" alt="Exemplo de status new" target="_blank">exemplo</a>), ou seja, a cobrança foi gerada e está aguardando a definição da forma de pagamento;

- Assim que essa transação tem sua forma de pagamento definida, seu status é alterado de <code>new</code> para <code>waiting</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-new-para-waiting.png" target="_blank" alt="Exemplo de new para waiting">exemplo</a>), ou seja, a forma de pagamento foi selecionada e está aguardando a confirmação do pagamento;

- Quando a transação tem o pagamento confirmado, o status é alterado de <code>waiting</code> para <code>paid</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-waiting-para-paid.png" alt="Exemplo de waiting para paid" target="_blank">exemplo</a>), ou seja, o pagamento da transação foi confirmado;

- Caso o boleto não tenha seu pagamento confirmado, em 1 (um) dia corrido após sua data de vencimento seu status será alterado de <code>waiting</code> para <code>unpaid</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-waiting-para-unpaid.png" alt="Exemplo de waiting para unpaid" target="_blank">exemplo</a>);

- Se o boleto tiver o pagamento confirmado posteriormente à notificação enviada de <code>unpaid</code>, enviaremos uma nova notificação com tal confirmação, ou seja, alterado do status <code>unpaid</code> para <code>paid</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-unpaid-para-paid.png" alt="Exemplo de unpaid para paid" target="_blank">exemplo</a>);

- Caso o integrador confirme manualmente o pagamento de uma transação pelo painel de sua conta Gerencianet, enviaremos uma notificação pela API com o status <code>settled</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/exemplo-waiting-para-settled.png" alt="Exemplo de status waiting para settled" target="_blank">exemplo</a>).

## Próximos Passos

Agora que você conhece sobre o processo de pagamento com boleto bancário, [que tal criar seu primeiro boleto](https://dev.gerencianet.com.br/docs/gerar-boleto)?