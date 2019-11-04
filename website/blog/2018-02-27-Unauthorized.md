---
title: Mensagem de “Unauthorized” (sem autorização), por que?
author: Whinter Gonçalves
//authorURL: http://twitter.com/
//authorFBID: 100002976521003
---

Essa mensagem de erro está relacionada em decorrência do envio incorreto das credenciais “Client_Id”, “Client_Secret” e/ou “sandbox”. Ou seja, quando se migra do ambiente de desenvolvimento para produção, não basta alterar o par de chaves, mas também é necessário alterar o valor do atributo “sandbox”.

<!--truncate-->

Em suma, de acordo com o ambiente que você está utilizando, deve proceder da seguinte forma:

- **Para usar o ambiente de Produção:**
	- Utilize o “Client_Id” e “Client_Secret” da aba “Produção” e sandbox => false

- **Para usar o ambiente de Desenvolvimento:**
	- Utilize o “Client_Id” e “Client_Secret” da aba “Desenvolvimento” e sandbox => true