---
id: doc5
title: Node.Js
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de NodeJS já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em NodeJS:

## Instalando via NPM

```bash
$ npm install gn-api-sdk-node
```
## Testado com

- Node <code>0.12.7</code>, <code>4.4.0</code> e <code>4.4.4</code>

## Uso Básico

Referencie o módulo:

<!--DOCUSAURUS_CODE_TABS-->
<!--Node.JS-->
```nodejs
var Gerencianet = require('gn-api-sdk-node');
```
<!--END_DOCUSAURUS_CODE_TABS-->

Defina suas credenciais e se você deseja usar sandbox ou não:

<!--DOCUSAURUS_CODE_TABS-->
<!--Node.JS-->
```nodejs
var options = {
  client_id: 'informe_seu_client_id',
  client_secret: 'informe_seu_client_secret',
  sandbox: true
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

<br>
Instancie o módulo passando suas opções:

<!--DOCUSAURUS_CODE_TABS-->
<!--Node.JS-->
```nodejs
var gerencianet = new Gerencianet(options);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Crie a *charge* (transação):

<!--DOCUSAURUS_CODE_TABS-->
<!--Node.JS-->
```nodejs
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }]
}

gerencianet
  .createCharge({}, chargeInput)
  .then(console.log)
  .catch(console.log)
  .done();
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Exemplos

Para executar os exemplos, clone este repositório e instale as dependências:

```bash
$ git clone git@github.com:gerencianet/gn-api-sdk-node.git
$ cd gn-api-sdk-node/examples
$ npm install
```

Defina suas chaves oauth no arquivo <code>credentials.js</code>:

<!--DOCUSAURUS_CODE_TABS-->
<!--Node.JS-->
```nodejs
module.exports = {
  client_id: 'your_client_id',
  client_secret: 'your_client_secret'
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Em seguida, execute o exemplo desejado:

```bash
$ node createCharge.js
```

## Testes

Para executar o conjunto de testes, primeiro instale as dependências e, em seguida, execute o teste npm:

```bash
$ cd gn-api-sdk-node/
$ npm install
$ npm test
```