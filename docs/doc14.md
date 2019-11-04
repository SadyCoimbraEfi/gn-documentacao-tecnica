---
id: doc14
title: Emissão Boleto Balancete
---

Este modelo de boleto é muito utilizado por condomínios e contabilidades e tem como objetivo proporcionar a demonstração prévia das movimentações financeiras do mês para condôminos e clientes. São disponibilizados dados como receitas, despesas e contas a receber. <a href="https://s3-sa-east-1.amazonaws.com/pe85007/portal/wp-content/uploads/2018/07/27194840/boleto-balancete-legenda.jpg" target="_blank">Veja aqui</a> como é um boleto balancete.

Para gerar um boleto bancário do tipo balancete é bem simples e requer apenas três passos:

1. [Crie a transação](https://dev.gerencianet.com.br/docs/boleto-balancete#section-1-criar-transa-o);

2. [Defina a transação gerada como do tipo boleto balancete](https://dev.gerencianet.com.br/docs/boleto-balancete#section-2-defina-a-transa-o-gerada-como-do-tipo-boleto-balancete);

3. [Por fim, associe à forma de pagamento via boleto](https://dev.gerencianet.com.br/docs/boleto-balancete#section-3-associar-forma-de-pagamento-via-boleto), informando o <code>charge_id</code> da transação.

O restante desta página apresenta os procedimentos detalhados, mas você precisa instalar uma de nossas bibliotecas em seu servidor para executar os códigos de exemplo. [Certifique-se de que a SDK da Gerencianet foi instalada](https://dev.gerencianet.com.br/docs#section-2-bibliotecas).

<hr>

## 1. Criar transação

Primeiramente, precisamos gerar a transação (também chamada de "cobrança"). É neste momento que será informado o nome do item/produto/serviço, valor da transação, quantidade, dentre outras informações possíveis.

Após criá-la, será retornado o <code>charge_id</code>, que é o identificador único da transação e que será utilizado para associar à forma de pagamento.

Assim que essa transação é criada, ela recebe o status <code>new</code>, que significa que a cobrança foi gerada e está aguardando definição da forma de pagamento. Essa cobrança somente terá seu status alterado quando o integrador definir sua forma de pagamento.

Para gerar uma transação, você deve enviar uma requisição <code>POST</code> para a rota <code>/v1/charge</code>.

Caso queira, pode explorar e conhecer mais sobre este recurso <a href="https://dev.gerencianet.com.br/docs/playground-transacoes#charge" target="_blank">usando nosso Playground</a>.

O exemplo abaixo mostra como isto pode ser feito, utilizando as SDK's disponíveis:

<!--DOCUSAURUS_CODE_TABS-->
<!--PHP-->

```php
<?php

require __DIR__.'/../../vendor/autoload.php'; // caminho relacionado a SDK

use Gerencianet\Exception\GerencianetException;
use Gerencianet\Gerencianet;

$clientId = 'informe_seu_client_id'; // insira seu Client_Id, conforme o ambiente (Des ou Prod)
$clientSecret = 'informe_seu_client_secret'; // insira seu Client_Secret, conforme o ambiente (Des ou Prod)

$options = [
  'client_id' => $clientId,
  'client_secret' => $clientSecret,
  'sandbox' => true // altere conforme o ambiente (true = desenvolvimento e false = producao)
];

$item_1 = [
    'name' => 'Item 1', // nome do item, produto ou serviço
    'amount' => 1, // quantidade
    'value' => 1000 // valor (1000 = R$ 10,00)
];

$item_2 = [
    'name' => 'Item 2', // nome do item, produto ou serviço
    'amount' => 2, // quantidade
    'value' => 2000 // valor (2000 = R$ 20,00)
];

$items =  [
    $item_1,
    $item_2
];

// Exemplo para receber notificações da alteração do status da transação.
// $metadata = ['notification_url'=>'sua_url_de_notificacao_.com.br']
// Outros detalhes em: https://dev.gerencianet.com.br/docs/notificacoes

// Como enviar seu $body com o $metadata
// $body  =  [
//    'items' => $items,
//		'metadata' => $metadata
// ];

$body  =  [
    'items' => $items
];

try {
    $api = new Gerencianet($options);
    $charge = $api->createCharge([], $body);

    print_r($charge);
} catch (GerencianetException $e) {
    print_r($e->code);
    print_r($e->error);
    print_r($e->errorDescription);
} catch (Exception $e) {
    print_r($e->getMessage());
}
```

<!--.Net-->

```csharp
dynamic endpoints = new Endpoints("client_id", "client_secret", true);

var body = new
{
    items = new[] {
        new {
            name = "Product 1",
            value = 1000,
            amount = 2
        }
    },
    shippings = new[] {
        new {
            name = "Default Shipping Cost",
            value = 100
        }
    }
};

var response = endpoints.CreateCharge(null, body);
Console.WriteLine(response);
```

<!--Node.JS-->

```javascript
"use strict";

var Gerencianet = require("gn-api-sdk-node");

var clientId = "informe_seu_client_id";
var clientSecret = "informe_seu_client_secret";

var options = {
  client_id: clientId,
  client_secret: clientSecret,
  sandbox: true
};

var body = {
  items: [
    {
      name: "Product 1",
      value: 1000,
      amount: 2
    }
  ],
  shippings: [
    {
      name: "Default Shipping Cost",
      value: 100
    }
  ]
};

var gerencianet = new Gerencianet(options);

gerencianet
  .createCharge({}, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

<!--Java-->

```javascript
/* Para que a SDK Java funcione corretamente, é necessário que a instanciação do módulo seja feita através da criação de um objeto do tipo Gerencianet.

Sempre que quisermos chamar uma função da API, basta invocar o método call do objeto Gerencianet, passando como parâmetro o nome do método, os parâmetros da requisição (sempre será um HashMap<String, String>), e o "body", que consiste nas propriedades a serem passadas como argumento na chamada de um função da SDK. O "body" pode ser declarado de duas formas: um JSONObject ou um Map<String, Object>.

Esta estrutura é necessária para representar o corpo da requisição http que é enviada à um determinado endpoint. Se o "body" for um JSONObject, o retorno do método call será um JSONObject, se for um Map<String, Object>, o retorno do método call será um Map<String, Object>

A seguir, disponibilizamos links de nosso Github mostrando duas formas diferentes de retorno: JSONObject
e Map<String, Object>


JSONObject

https://github.com/gerencianet/gn-api-sdk-java-examples/blob/master/src/main/java/br/com/gerencianet/charge/json/CreateCharge.java


Map<String, Object>

https://github.com/gerencianet/gn-api-sdk-java-examples/blob/master/src/main/java/br/com/gerencianet/charge/map/CreateCharge.java

*/
```

<!--Go-->

```golang
// No código de exemplo de uso da SDK de Go, definimos as credenciais de acesso à API (Client_Id e Client_Secret) e o ambiente a ser usado (sandbox como 'true' ou 'false') dentro de um arquivo específico (configs.go), que está localizado no diretório "_examples/configs". Essas credenciais são exportadas através da variável 'Credentials'.

package main

import (
	"fmt"
	"github.com/gerencianet/gn-api-sdk-go/gerencianet"
	"github.com/gerencianet/gn-api-sdk-go/_examples/configs"
)

func main(){

	credentials := configs.Credentials
	gn := gerencianet.NewGerencianet(credentials)

	body := map[string]interface{} {
		"items": []map[string]interface{}{
			{
				"name": "Product 1",
				"value": 1000,
				"amount": 2,
			},
		},
		"shippings": []map[string]interface{} {
			{
				"name": "Default Shipping Cost",
				"value": 100,
			},
		},
	}

	res, err := gn.CreateCharge(body)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(res)
	}
}
```

<!--Python-->

```python
from gerencianet import Gerencianet

options = {
    'client_id': 'client_id',
    'client_secret': 'client_secret',
    'sandbox': True
}

gn = Gerencianet(options)

body = {
    'items': [{
        'name': "Product 1",
        'value': 1000,
        'amount': 2
    }],
    'shippings': [{
        'name': "Default Shipping Cost",
        'value': 100
    }]
}

gn.create_charge(body=body)
```

<!--Ruby-->

```ruby
require "gerencianet"

options = {
  client_id: "client_id",
  client_secret: "client_secret",
  sandbox: true
}

body = {
  items: [{
    name: "Product 1",
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: "Default Shipping Cost",
    value: 100
  }]
}

gerencianet = Gerencianet.new(options)
gerencianet.create_charge(body: body)
```

<!--Delphi-->

```javascript
interface
function CreateCharge: String;

implementation
uses uGerenciaClient, uGerenciaNetClientUtilities;
{... your code ... }

function CreateCharge: String;
var
Body :  String;

begin
  EnableService( 'GerenciaNet.dll' );
  ConfigureService( ToPAnsiChar( 'client_id' ),ToPAnsiChar( 'client_secret' ),'sandbox','config.json','');
  GerenciaNetAuthorize();

  Body :=
  '{'+
    '"items":'+
      '['+
        '{'+
          '"name":"test article",'+
          '"value":1900,'+
          '"amount":2'+
        '},'+
        '{'+
          '"name":"test article 2",'+
          '"value":3000,'+
          '"amount":1'+
        '}'+
      ']'+
  '}';

  Result := ExecuteGerenciaNetRequest( 'createCharge','','',Body );
end;
```

<!--END_DOCUSAURUS_CODE_TABS-->

### a) Estrutura hierárquica dos atributos que podem ser utilizados:

<pre>"id": "/Charge"
    "items"
        "name"
        "value"
        "amount"
        "marketplace"
            "payee_code"
            "percentage"
    "shippings"
        "name"
        "value"
        "payee_code"
    "metadata"
        "custom_id"
        "notification_url"</pre>

Para verificar mais detalhes, <a href="https://dev.gerencianet.com.br/docs/playground-transacoes#charge" target="_blank">acesse aqui</a> e explore em nosso Playground.

<br>

### b) Atributos que podem ser utilizados:

<table>
  <tr>
    <th>Atributo</th>
    <th>Descrição</th>
    <th>Obrigatório</th>
    <th>Tipo</th>

  </tr>
  <tr>
    <td><code>items</code></td>
    <td>Item que está sendo vendido. Uma mesma transação pode possuir ilimitados itens.

<span class="tab1"><em>Atributos de items</em></span>

<div class="tab2"><code>name<strong class="atributo-obrigatorio">*</strong></code> // Nome do item, produto ou serviço. <strong class="descricao-atributo"><span class="atributo">Mínimo de 1 caractere e máximo de 255 caracteres (String).</span></strong></div>

<div class="tab2"><code>value<strong class="atributo-obrigatorio">*</strong></code> // Valor, em centavos. Ex: R$ 10,00 = 1000. <strong class="descricao-atributo"><span class="atributo">Integer.</span></strong></div>

<div class="tab2"><code>amount</code> // Quantidade. <strong class="descricao-atributo"><span class="atributo">Integer (padrão: 1)</span></strong></div>

<div class="tab2"><code>marketplace</code> // Referente às configurações de repasses. <span class="atributo">Atributos:</span></div> <div class="tab2">
<code>*payee_code*</code> (<a href="http://image.prntscr.com/image/cabe13e1e5b64449b942cf31139150ba.png" target="_blank">código identificador da conta Gerencianet</a> - String).
<code>*percentage*</code> (porcentagem de repasse, sendo que 9000 equivale a 90% - Integer).</span></div></td>
    <td>Sim</td>
    <td>Array</td>
  </tr>

  <tr>
    <td><code>shippings</code></td>
    <td>Determina o(s) valor(es) de frete(s) de uma transação. Uma mesma transação pode possuir ilimitados valores de frete.

<span class="tab1"><em>Atributos de shippings</em></span>

<div class="tab2"><code>name<strong class="atributo-obrigatorio">*</strong></code> // Rótulo do frete. <strong class="descricao-atributo"><span class="atributo">Máximo de 255 caracteres. String.</span></strong></div>

<div class="tab2"><code>value<strong class="atributo-obrigatorio">*</strong></code> // Valor do frete, em centavos (1990 equivale a R$19,90). <strong class="descricao-atributo"><span class="atributo">Integer.</span></strong></div>

<div class="tab2"><code>payeeCode</code> // <a href="http://image.prntscr.com/image/cabe13e1e5b64449b942cf31139150ba.png" target="_blank">Código identificador da conta Gerencianet</a>, único por conta. <strong class="descricao-atributo"><span class="atributo">Padrão: Identificador da sua própria conta. String.</span></strong></div></td>
    <td>Não</td>
    <td>Array</td>
  </tr>

  <tr>
    <td><code>metadata</code></td>
    <td>Define dados específicos da transação.

<span class="tab1"><em>Atributos de metadata</em></span>

<div class="tab2"><code>custom_id</code> // Permite associar uma transação Gerencianet a uma ID específica de seu sistema ou aplicação, permitindo identificá-la caso você possua uma identificação específica e queira mantê-la. <strong class="descricao-atributo"><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div>

<div class="tab2"><code>notification_url</code> // Endereço de sua URL válida que receberá as notificações de mudanças de status das transações. <strong class="descricao-atributo"><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div></td>
    <td>Não</td>
    <td>Object</td>
  </tr>

</table>

<strong class="atributo-obrigatorio-texto">* valor obrigatório</strong>

<br>
<hr>

# 2. Defina a transação gerada como do tipo boleto balancete

Após a criação da transação, será o momento de definirmos que o boleto a ser gerado será do tipo balancete.

Para isso, você deve enviar uma requisição <code>POST</code> para a rota <code>/v1/charge/:id/balance-sheet</code>, onde <code>:id</code> é o <code>charge_id</code> da transação desejada.

Caso queira, você pode explorar e conhecer mais sobre este recurso [usando nosso Playground](https://dev.gerencianet.com.br/docs/playground-transacoes#balance) e utilizar como base o JSON abaixo:

<blockquote class="alert-info">
<strong>Nota</strong><br><br>
Cabe frisar que não há um padrão nos itens que serão exibidos, no sentido que o próprio integrador irá definir, através dos atributos devidos, a quantidade de colunas (até 4), linhas, textos e valores a serem exibidos no boleto do tipo balancete.


Em suma, é como se o integrador estivesse trabalhando com uma tabela construída em HTML, mas em formato JSON.
</blockquote>

A seguir, um JSON de exemplo que pode ser utilizado para criar um boleto do tipo balancete:
