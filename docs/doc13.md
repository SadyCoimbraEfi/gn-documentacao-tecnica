---
id: doc13
title: Emissão Boleto
---

Atualmente disponibilizamos dois procedimentos para a criação de uma transação do tipo Boleto bancário, na primeira delas o titulo é criado em um passo único, assim fora convencionado como *One Step*. A segunda opção de criação da transação se da em dois passos, sendo assim convencionada como *Two Steps*. A geração de um boleto não envolve transmissão de dados sensíveis como número de cartão de crédito. Por isso, basta consumir o respectivo endpoint de pagamento para gerar o boleto registrado. Ambos os fluxos estão detalhados a seguir:

1. [Criando a transação em *One Step* (Um passo)](https://dev.gerencianet.com.br/v1/docs/gerar-boleto-bancario#section-1-cria-o-de-boleto-em-one-step-um-passo-).

2. [Criando a transação em *Two Steps* (Dois passos)](https://dev.gerencianet.com.br/v1/docs/gerar-boleto-bancario#section-2-cria-o-de-boleto-em-two-steps-dois-passos-).

## 1. Criação de Boleto em *One Step* (Um passo)

Nesta opção é necessário que o *body* da requisição contenha todos os atributos mínimos obrigatórios para a emissão do titulo.
Abaixo temos os exemplos de implementação utilizando as SDK's disponíveis:

<blockquote class="alert-alert">
<strong>Importante</strong><br><br>
Para que a criação de transações via *One Step* ocorra normalmente é necessário atualizar sua SDK. Todos os arquivos necessários para tal estão disponíveis através dos nossos repositórios ou em nossa documentação.
</blockquote>

<!--DOCUSAURUS_CODE_TABS-->
<!--PHP-->
```php
<?php
   require __DIR__ . '/../../vendor/autoload.php'; // caminho relacionado a SDK

   use Gerencianet\Exception\GerencianetException;
   use Gerencianet\Gerencianet;

   $clientId = 'informe_seu_client_id';// insira seu Client_Id, conforme o ambiente (Des ou Prod)
   $clientSecret = 'informe_seu_client_secret'; // insira seu Client_Secret, conforme o ambiente (Des ou Prod)

    $options = [
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'sandbox' => true // altere conforme o ambiente (true = desenvolvimento e false = producao)
    ];
    
   $item_1 = [
       'name' => 'Item 1', // nome do item, produto ou serviço
       'amount' => 1, // quantidade
       'value' => 1000 // valor (1000 = R$ 10,00) (Obs: É possível a criação de itens com valores negativos. Porém, o valor total da fatura deve ser superior ao valor mínimo para geração de transações.)
   ];
   $items = [
       $item_1
   ];
   $metadata = array('notification_url'=>'sua_url_de_notificacao_.com.br'); //Url de notificações
   $customer = [
       'name' => 'Gorbadoc Oldbuck', // nome do cliente
       'cpf' => '94271564656', // cpf válido do cliente
       'phone_number' => '5144916523', // telefone do cliente
   ];
   $discount = [ // configuração de descontos
       'type' => 'currency', // tipo de desconto a ser aplicado
       'value' => 599 // valor de desconto 
   ];
   $configurations = [ // configurações de juros e mora
       'fine' => 200, // porcentagem de multa
       'interest' => 33 // porcentagem de juros
   ];
   $conditional_discount = [ // configurações de desconto condicional
       'type' => 'percentage', // seleção do tipo de desconto 
       'value' => 500, // porcentagem de desconto
       'until_date' => '2019-08-30' // data máxima para aplicação do desconto
   ];
   $bankingBillet = [
       'expire_at' => '2019-09-01', // data de vencimento do titulo
       'message' => 'teste\nteste\nteste\nteste', // mensagem a ser exibida no boleto
       'customer' => $customer,
       'discount' =>$discount,
       'conditional_discount' => $conditional_discount
   ];
   $payment = [
       'banking_billet' => $bankingBillet // forma de pagamento (banking_billet = boleto)
   ];
   $body = [
       'items' => $items,
       'metadata' =>$metadata,
       'payment' => $payment
   ];
   try {
     $api = new Gerencianet($options);
     $pay_charge = $api->oneStep([],$body);
     echo '<pre>';
     print_r($pay_charge);
     echo '<pre>';
     
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
using System;
​
namespace Gerencianet.SDK.Examples
{
    class OneStep
    {
        public static void Execute()
        {
            dynamic endpoints = new Endpoints(Credentials.Default.ClientId, Credentials.Default.ClientSecret,
                Credentials.Default.Sandbox);
​
            var body = new
            {
                items = new[]
                {
                    new
                    {
                        name = "Product 1",
                        value = 1000,
                        amount = 2
                    }
                },
                shippings = new[]
                {
                    new
                    {
                        name = "Default Shipping Cost",
                        value = 100
                    }
                },
                payment = new
                {
                    banking_billet = new
                    {
                        expire_at = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd"),
                        customer = new
                        {
                            name = "Gorbadoc Oldbuck",
                            email = "oldbuckaa@gerencianet.com.br",
                            cpf = "94271564656",
                            birth = "1977-01-15",
                            phone_number = "5144916523"
                        }
                    }
                }
            };
​
            try
            {
                var response = endpoints.OneStep(null, body);
                Console.WriteLine(response);
            }
            catch (GnException e)
            {
                Console.WriteLine(e.ErrorType);
                Console.WriteLine(e.Message);
            }
        }
    }
}
```

<!--Node.JS-->
```javascript
'use strict';

var moment = require('moment'); // pacote para uso de datas
var Gerencianet = require('gn-api-sdk-node'); // caminho relacionado a SDK
var credentials = require('./credentials'); // caminho relacionado as credenciais

var options = {
 client_id: credentials.client_id,
 client_secret: credentials.client_secret,
 sandbox: false // altere conforme o ambiente (true = desenvolvimento e false = producao)
}

var tomorrow = moment() //Função para atribuição de data válida automática
 .add(2, 'days')
 .format('YYYY-MM-DD');

var currentDate = moment() //Função para atribuição de data válida automática
 .add(1, 'days')
 .format('YYYY-MM-DD');

var paymentBody = {
 payment: {
   banking_billet: {
     expire_at: tomorrow,
     customer: {
       name: 'Gorbadoc Oldbuck', // nome do cliente
       cpf: '94271564656', // cpf válido do cliente
       phone_number: '5144916523' // telefone do cliente
     },
     configurations: { // configurações de juros e mora
       fine: 200, // porcentagem de multa
       interest: 33// porcentagem de juros
     },
     conditional_discount: { // configurações de desconto condicional
       type: 'percentage', // seleção do tipo de desconto 
       value: 500, // porcentagem de desconto
       until_date: currentDate // data máxima para aplicação do desconto
     },
     discount: { // configuração de descontos
       type: 'currency', // tipo de desconto a ser aplicado
       value: 599 // valor de desconto 
     }
   }
 },

 items: [{
   name: 'Product 1', // nome do item, produto ou serviço
   value: 1000, // valor (1000 = R$ 10,00) (Obs: É possível a criação de itens com valores negativos. Porém, o valor total da fatura deve ser superior ao valor mínimo para geração de transações.)
   amount: 2 // quantidade
 }],

 shippings: [{
   name: 'Default Shipping Cost', // descrição do frete(caso exista)
   value: 100 // valor do frete
 }]
}

var gerencianet = new Gerencianet(options);

gerencianet
 .oneStep({}, paymentBody)
 .then(console.log)
 .catch(console.log)
 .done();
```

<!--Java-->
```javascript
package br.com.gerencianet.charge.json;

import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;
import br.com.gerencianet.Credentials;
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class oneStep {
    public static void main(String[] args) {
        /* *********  Set credentials parameters ******** */
        Credentials credentials = new Credentials();
        JSONObject options = new JSONObject();
        options.put("client_id", credentials.getClientId());
        options.put("client_secret", credentials.getClientSecret());
        options.put("partner_token", credentials.getPartnerToken());
        options.put("sandbox", credentials.isSandbox());
        /* ************************************************* */         
        
        // items
        JSONArray items = new JSONArray();
        JSONObject item1 = new JSONObject();
        item1.put("name", "Item 1");
        item1.put("amount", 1);
        item1.put("value", 600);
        JSONObject item2 = new JSONObject("{\"name\":\"Item 2\", \"amount\":1, \"value\":1000}");
        items.put(item1);
        items.put(item2);
        
        //JSONObject body = new JSONObject();
        //body.put("items", items);
        
        //customer
        JSONObject customer = new JSONObject();
        customer.put("name", "Gorbadoc Oldbuck");
        customer.put("cpf", "94271564656");
        customer.put("phone_number", "5144916523");
        
        //URL de notificações
        JSONObject metadata = new JSONObject();
        metadata.put("notification_url", "https://requestb.in/16rpx6y1");
        metadata.put("custom_id", "sou_fera_0007");
        
        //desconto        
        JSONObject discount = new JSONObject();
        discount.put("type","currency");
        discount.put("value",599);
        
        //juros e mora
        JSONObject configurations = new JSONObject();
        configurations.put("fine", 200);
        configurations.put("interest", 33);
        
        //disconto condicional
        JSONObject conditional_discount = new JSONObject();
        conditional_discount.put("type","percentage");
        conditional_discount.put("value", 500);
        conditional_discount.put("until_date", "2019-08-30");
        
        
        JSONObject bankingBillet = new JSONObject();
        bankingBillet.put("expire_at", "2019-09-15");
        bankingBillet.put("customer", customer);
        bankingBillet.put("discount", discount);
        bankingBillet.put("configurations", configurations);
        bankingBillet.put("conditional_discount", conditional_discount);
        
        JSONObject payment = new JSONObject();
        payment.put("banking_billet", bankingBillet);
        JSONObject body = new JSONObject();
        body.put("payment", payment);
        body.put("items", items);
        body.put("metadata", metadata);
        
        try {
            Gerencianet gn = new Gerencianet(options);
            JSONObject response = gn.call("oneStep", new HashMap<String,String>(), body);
            System.out.println(response);
        }catch (GerencianetException e){
            System.out.println(e.getCode());
            System.out.println(e.getError());
            System.out.println(e.getErrorDescription());
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

<!--Go-->
```golang
package main
​
import (
	"fmt"
	"github.com/dmalberto/gn-api-sdk-go/gerencianet"
	"../configs"
)
​
func main(){
	
	credentials := configs.Credentials
	gn := gerencianet.NewGerencianet(credentials)
​
	customer := map[string]interface{}{
		"name": "Gorbadoc Oldbuck",
		"cpf": "04267484171",
		"phone_number": "51944916523",
		"email": "gorb.oldbuck@gerencianet.com.br",
	}
​
	body := map[string]interface{} {
		"payment": map[string]interface{} {
			"banking_billet": map[string]interface{} {
				"expire_at": "2020-12-12",
				"customer": customer,
			},
		},
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
​
	res, err := gn.CreateChargeOneStep(body) // no lugar do 1 coloque o charge_id certo
​
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(res)
	}
}
```

<!--Python-->
```python
# encoding: utf-8
​
from gerencianet import Gerencianet
from credentials import CREDENTIALS
​
gn = Gerencianet(CREDENTIALS)
​
body = {
    'items': [{
        'name': "Product 1",
        'value': 1000,
        'amount': 2
    }],
    'shippings': [{
        'name': "Default Shipping Cost",
        'value': 100
    }],
    'payment': {
        'banking_billet': {
            'expire_at': '2020-12-12',
            'customer': {
                'name': "Gorbadoc Oldbuck",
                'email': "gorb.oldbuck@gerencianet.com.br",
                'cpf': "14014603059",
                'birth': "1977-01-15",
                'phone_number': "62986070247"
            
            }
        }   
    }
}
​
response = gn.create_charge_onestep(params=None, body=body)
print(response)
```

<!--Ruby-->
```ruby
require "gerencianet"
require_relative "./credentials"
​
options = {
  client_id: CREDENTIALS::CLIENT_ID,
  client_secret: CREDENTIALS::CLIENT_SECRET,
  sandbox: true
}
​
body = {
  items: [{
    name: "Product 1",
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: "Default Shipping Cost",
    value: 100
  }],
  payment: {
    banking_billet: {
      expire_at: tomorrow.strftime,
      customer: {
        name: "Gorbadoc Oldbuck",
        email: "oldbuck@gerencianet.com.br",
        cpf: "04267484171",
        birth: "1977-01-15",
        phone_number: "5144916523"
      }
    }
  }
}
​
gerencianet = Gerencianet.new(options)
puts gerencianet.create_charge_onestep(body: body)
```

<!--Delphi-->
```javascript
interface

function PayOneStepWithBillet: String;

implementation
uses uGerenciaClient, uGerenciaNetClientUtilities;
{... your code ... }

var
   Body: String;
begin
 Body :=
 '{'+
  '"metadata": {'+
    '"custom_id": "id_0007",'+
    '"notification_url": "https://url-do-cliente.com.br/"'+
  '},'+
  '"payment": {'+
    '"banking_billet": {'+
      '"configurations": {'+
        '"fine": 200,'+
        '"interest": 33'+
      '},'+
      '"conditional_discount": {'+
        '"until_date": "2019-08-30",'+
        '"type": "percentage",'+
        '"value": 500'+
      '},'+
      '"discount": {'+
        '"type": "currency",'+
        '"value": 599'+
      '},'+
      '"expire_at": "2019-09-15",'+
      '"customer": {'+
        '"name": "Gorbadoc Oldbuck",'+
        '"cpf": "94271564656",'+
        '"phone_number": "5144916523"'+
      '}'+
    '}'+
  '},'+
  '"items": ['+
    '{'+
      '"amount": 1,'+
      '"name": "Item 1",'+
      '"value": 600'+
    '},'+
    '{'+
      '"amount": 1,'+
      '"name": "Item 2",'+
      '"value": 1000'+
    '}'+
  ']'+
 '}';
 Result := ExecuteGerenciaNetRequest( 'payOneStep','','',Body );
end;
```
<!--END_DOCUSAURUS_CODE_TABS-->

### a) Estrutura hierárquica dos atributos do Schema que podem ser utilizados:

<code>"OneStep": "/Charge/one-step"</code>
```schema
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
        "notification_url"
    "payment"
        "banking_billet"
            "customer"
                "name"
                "cpf"
                "email"
                "phone_number"
                "birth"
                "address"
                    "street"
                    "number"
                    "neighborhood"
                    "zipcode"
                    "city"
                    "complement"
                    "state"
                "juridical_person"
                    "corporate_name"
                    "cnpj"
            "expire_at"
            "discount"
                "type"
                    "percentage",
                    "currency"
                "value"
            "conditional_discount"
                "type"
                    "percentage",
                    "currency"
                "value"
                "until_date"
            "configurations"
                "fine"
                "interest"
            "message"
```            

### b) Atributos que podem ser utilizados para criar um titulo:

*Objeto **items***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>items</code>|Item que está sendo vendido. Uma mesma transação pode possuir ilimitados itens.<br><span><em><br>Atributos de items</em></span><br><div><code>name<strong>*</strong></code> // Nome do item, produto ou serviço. <strong><span class="atributo">Mínimo de 1 caractere e máximo de 255 caracteres (String).</span></strong></div><br><div><code>value<strong>*</strong></code> // Valor, em centavos. Ex: R$ 10,00 = 1000. <strong><span class="atributo">Integer.</span></strong></div><br><div><code>amount</code> // Quantidade. <strong><span class="atributo">Integer (padrão: 1)</span></strong></div><br><div><code>marketplace</code> // Referente às configurações de repasses. <span class="atributo">Atributos:</span></div> <div><br><code>*payee_code*</code> (código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. String.<br><code>*percentage*</code> (porcentagem de repasse, sendo que 9000 equivale a 90% - Integer).</span></div> |Sim | Array|
|<code>shippings</code>|Determina o(s) valor(es) de frete(s) de uma transação. Uma mesma transação pode possuir ilimitados valores de frete.<br><span><br><em>Atributos de shippings</em></span><br><div><code>name<strong class="atributo-obrigatorio">*</strong></code> // Rótulo do frete. <strong><span class="atributo">Máximo de 255 caracteres. String.</span></strong></div><br><div><code>value<strong>*</strong></code> // Valor do frete, em centavos (1990 equivale a R$19,90). <strong><span class="atributo">Integer.</span></strong></div><br><div><code>payee_code</code> // código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. <strong><span class="atributo">Padrão: Identificador da sua própria conta. String.</span></strong></div>|Não|Array|
|<code>metadata</code>|Define dados específicos da transação.<br><span><br><em>Atributos de metadata</em></span><br><div><code>custom_id</code> // Permite associar uma transação Gerencianet a uma ID específica de seu sistema ou aplicação, permitindo identificá-la caso você possua uma identificação específica e queira mantê-la. <strong><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div><br><div><code>notification_url</code> // Endereço de sua URL válida que receberá as notificações de mudanças de status das transações. <strong><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div>|Não|Object|

*Objeto **Payment***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>banking_billet</code>|Forma de pagamento através de "boleto bancário"|Sim|Objeto **Banking_Billet**|

*Objeto **Banking_Billet***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>name</code>|Nome do cliente.<br><strong><span class="atributo">Mínimo de 1 caractere e máximo de 255.</span></strong>|Sim<br>*Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente.*|String|
|<code>cpf</code>|CPF válido do cliente (sem pontos, vírgulas ou hífen).<br><strong><span class="atributo">Tamanho: 11 caracteres.</span></strong>|Sim<br>*Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente.*|String|
|<code>email</code>|Email do cliente.<br><strong><span class="atributo">Máximo de 255 caracteres. Ex.: email@email.com</span></strong>|Não|String|
|<code>phone_number</code>|Telefone do cliente.<br><strong><span class="atributo">Formato: sem pontos ou vírgulas, com DDD de 2 caracteres (9º dígito é opcional). Ex.: 11988887777</span></strong>|Sim|String|
|<code>birth</code>|Data de nascimento do cliente.<br><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong>|Não|String|
|<code>address</code>|Endereço do cliente.<br><span>*Atributos de address*</span><br><div><code>street<strong">*</strong></code> // nome da rua <strong><span class="atributo">(Object)</strong></span></div><br><div><code>number<strong>*</strong></code> // número <strong><span class="atributo">(String/Integer)</strong></span></div><br><div><code>neighborhood<strong>*</strong></code> // Bairro <strong><span class="atributo">(String)</strong></span></div><br><div><code>zipcode<strong>*</strong></code> // CEP (sem pontos ou hífen) <strong><span class="atributo">(String)</strong></span></div><br><div><code>city<strong>*</strong></code> // cidade <strong><span class="atributo">(String)</strong></span></div><br><div><code>complement</code> // complemento <strong ><span class="atributo">(String/null)</strong></span></div><br><div><code>state<strong>*</strong></code> // estado (2 caracteres) <strong><span class="atributo">(Object)</strong></span></div>|Não|Object|
|<code>juridical_person</code>|Dados de pessoa jurídica<br><br><span>*Atributos de juridical_person*</span><div><code>corporate_name<strong>*</strong></code> // Nome da razão social. <strong><span class="atributo">Mínimo de 1 caractere e máximo de 255. String.</strong></span></div><div><br><code>cnpj<strong>*</strong></code> // CNPJ da empresa. <strong><span class="atributo">Tamanho: 14 caracteres. String.</strong></span></div>|Não|Object|
|<code>expire_at</code>|Data de vencimento do boleto.<br><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong>|Sim|String|
|<code>discount</code>|Define desconto condicional que é válido até uma data específica. Se o pagamento não for efetuado até aquela data, o desconto é invalidado.<br><span>*Atributos de conditional_discount*</span><br><div><br><span class="atributo"><font color="orange">type\*</font></span>, // Tipo do desconto (String). Valores permitidos:<br><br><code>currency</code>: o desconto será informado em centavos;<br><code>percentage</code>: o desconto será informado em porcentagem.<br></div><div><br><span class="atributo"><font color="orange">value\*</font></span> //Valor do desconto (Integer). Se o tipo do desconto for <code>currency</code>, o valor desta tag deverá ser informada pelo integrador em centavos (ou seja, 500 equivale a R$ 5,00). Caso o tipo do desconto seja <code>percentage</code>, o valor deverá ser multiplicado por 100 (ou seja, 1500 equivale a 15%). Exemplos:<br><br>1) <code>currency</code> // deve ser informado em centavos, ou seja, se o desconto será de R$ 5,99, o integrador deve informar <code>599</code>;<br>2) <code>percentage</code> // deve ser informado em centavos, ou seja, se o desconto é de 15%, o integrador deve informar <code>1500</code>.</div><div><br><span class="atributo"><font color="orange">until_date\*</font></span>, // Data máxima que o desconto será concedido. (String). </strong><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong></div>|Não|Object|
|<code>configurations</code>|Permite incluir no boleto multa e juros caso seja pago após o vencimento.<br><span><br>Atributos de configurations<br><font color="orange">fine</font></span>, // valor cobrado de multa após o vencimento. Por exemplo: se você quiser 2%, você deve informar <code>200</code>.<span class="atributo">Mínimo de <code>0</code> e máximo de <code>1000</code>. Integer.<br>Caso você possua configurações de multa ativada na Gerencianet e queira gerar emissões na API sem multa, utilize <code>0</code> como valor do atributo <code>fine</code></span><br><br><span class="atributo"><font color="orange">interest</font></span>, // valor cobrado de juros por dia após a data de vencimento. Por exemplo: se você quiser 0,033%, você deve informar <code>33</code>.<span class="atributo">Mínimo de 0 e máximo de 330. Integer.<br>Caso você possua configurações de multa ativada na Gerencianet e queira gerar emissões na API sem juros, utilize <code>0</code> como valor do atributo <code>interest</code></span>|Não|Object|
|<code>message</code>|Permite incluir no boleto uma "observação", ou em outras palavras, uma mensagem para o cliente. Essa mensagem poderá ser vista nos e-mails relacionados à cobrança, no boleto ou carnê.<br><br><strong><span class="atributo">Até 4 linhas contendo 100 caracteres em cada linha. String.</span></strong><br><strong><span class="atributo">O operador <code>\n</code> é utilizado para efetuar a quebra de linha.</span></strong>|Não|String


<strong style="font-size:12px;color:#ea6e1c">* valor obrigatório</strong>

## 2. Criação de Boleto em *Two Steps* (Dois passos)

1. [Crie a transação](https://dev.gerencianet.com.br/docs/gerar-boleto-banc%C3%A1rio#section-1-criar-transa-o), informando o item/produto/serviço, valor, quantidade, etc;

2. [Associe à forma de pagamento via boleto](https://dev.gerencianet.com.br/docs/gerar-boleto-banc%C3%A1rio#section-2-associar-forma-de-pagamento-via-boleto), informando o <code>charge_id</code> da transação e os dados do cliente.

O restante desta página apresenta os procedimentos detalhados, mas você precisa instalar uma de nossas bibliotecas em seu servidor para executar os códigos de exemplo. [Certifique-se de que a SDK da Gerencianet foi instalada](https://dev.gerencianet.com.br/docs/instalacao-da-api).

<hr>

### 2.1. Criar transação

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
    'value' => 1000 // valor (1000 = R$ 10,00) (Obs: É possível a criação de itens com valores negativos. Porém, o valor total da fatura deve ser superior ao valor mínimo para geração de transações.)
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

// Exemplo para receber notificações da alteração do status da transação:
// $metadata = ['notification_url'=>'sua_url_de_notificacao_.com.br']
// Outros detalhes em: https://dev.gerencianet.com.br/docs/notificacoes

// Como enviar seu $body com o $metadata
// $body  =  [
//    'items' => $items,
//    'metadata' => $metadata
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
'use strict';
 
var Gerencianet = require('gn-api-sdk-node');
 
var clientId = 'informe_seu_client_id';
var clientSecret = 'informe_seu_client_secret';
 
var options = {
  client_id: clientId,
  client_secret: clientSecret,
  sandbox: true
}
 
var body = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }]
}
 
var gerencianet = new Gerencianet(options);
 
gerencianet
  .createCharge({}, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

<!--Java-->
```javascript
// Disponibilizamos duas formas diferentes de retorno: JSONObject e Map<String, Object>

//JSONObject
package br.com.gerencianet.charge.json;

import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;
import br.com.gerencianet.Credentials;
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class CreateCharge {
	public static void main(String[] args) {
		/* *********  Set credentials parameters ******** */

		Credentials credentials = new Credentials();

		JSONObject options = new JSONObject();
		options.put("client_id", credentials.getClientId());
		options.put("client_secret", credentials.getClientSecret());
		options.put("sandbox", credentials.isSandbox());

		/* ************************************************* */ 

		JSONArray items = new JSONArray();

		JSONObject item1 = new JSONObject();
		item1.put("name", "Item 1");
		item1.put("amount", 1);
		item1.put("value", 2000);

		JSONObject item2 = new JSONObject("{\"name\":\"Item 1\", \"amount\":1, \"value\":1000}");

		items.put(item1);
		items.put(item2);
		
		JSONObject body = new JSONObject();
		body.put("items", items);
		
		try {
		    Gerencianet gn = new Gerencianet(options);
		    JSONObject response = gn.call("createCharge", new HashMap<String,String>(), body);
		    System.out.println(response);
		}catch (GerencianetException e){
		    System.out.println(e.getCode());
		    System.out.println(e.getError());
		    System.out.println(e.getErrorDescription());
		}
		catch (Exception e) {
		    System.out.println(e.getMessage());
		}
	}
}


//Map<String, Object>

package br.com.gerencianet.charge.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import br.com.gerencianet.Credentials;
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class CreateCharge {
	public static void main(String[] args) {
		/* *********  Set credentials parameters ******** */

		Credentials credentials = new Credentials();

		HashMap<String, Object> options = new HashMap<String, Object>();
		options.put("client_id", credentials.getClientId());
		options.put("client_secret", credentials.getClientSecret());
		options.put("sandbox", credentials.isSandbox());

		/* ************************************************* */ 

		List<Object> items = new ArrayList<Object>();

		Map<String, Object> item1 = new HashMap<String, Object>();
		item1.put("name", "Item 1");
		item1.put("amount", 1);
		item1.put("value", 1000);

		Map<String, Object> item2 = new HashMap<String, Object>();
		item2.put("name", "Item 2");
		item2.put("amount", 1);
		item2.put("value", 2000);

		items.add(item1);
		items.add(item2);
		
		Map<String, Object> body = new HashMap<String, Object>();
		body.put("items", items);
		
		try {
		    Gerencianet gn = new Gerencianet(options);
		    Map<String, Object> response = gn.call("createCharge", new HashMap<String,String>(), body);
		    System.out.println(response);
		}catch (GerencianetException e){
		    System.out.println(e.getCode());
		    System.out.println(e.getError());
		    System.out.println(e.getErrorDescription());
		}
		catch (Exception e) {
		    System.out.println(e.getMessage());
		}
	}
}
```

<!--Go-->
```golang
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
require_relative "./credentials"

options = {
  client_id: CREDENTIALS::CLIENT_ID,
  client_secret: CREDENTIALS::CLIENT_SECRET,
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
puts gerencianet.create_charge(body: body)
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

### a) Estrutura hierárquica dos atributos do Schema que podem ser utilizados:

<code>"id": "/Charge"</code>
```schema
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
        "notification_url"
```

Para verificar mais detalhes, <a href="https://dev.gerencianet.com.br/docs/playground-transacoes#charge" target="_blank">acesse aqui</a> e explore em nosso Playground.

### b) Atributos que podem ser utilizados para criar uma transação:

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>items</code>|Item que está sendo vendido. Uma mesma transação pode possuir ilimitados itens.<br><br><span><em>Atributos de items</em></span><br><div><code>name<strong class="atributo-obrigatorio">*</strong></code> // Nome do item, produto ou serviço. <strong class="descricao-atributo"><span class="atributo">Mínimo de 1 caractere e máximo de 255 caracteres (String).</span></strong></div><br><div><code>value<strong>*</strong></code> // Valor, em centavos. Ex: R$ 10,00 = 1000. <strong class="descricao-atributo"><span class="atributo">Integer.</span></strong></div><br><div><code>amount</code> // Quantidade. <strong class="descricao-atributo"><span class="atributo">Integer (padrão: 1)</span></strong></div><br><div><code>marketplace</code> // Referente às configurações de repasses. <span class="atributo">Atributos:</span></div> <div><br><code>*payee_code*</code> (código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. String.<br><code>*percentage*</code> (porcentagem de repasse, sendo que 9000 equivale a 90% - Integer).</span></div>|Sim|Array|
|<code>shippings</code>|Determina o(s) valor(es) de frete(s) de uma transação. Uma mesma transação pode possuir ilimitados valores de frete.<br><br><span><em>Atributos de shippings</em></span><br><div><code>name<strong class="atributo-obrigatorio">*</strong></code> // Rótulo do frete. <strong><span class="atributo">Máximo de 255 caracteres. String.</span></strong></div><br><div><code>value<strong class="atributo-obrigatorio">*</strong></code> // Valor do frete, em centavos (1990 equivale a R$19,90). <strong><span class="atributo">Integer.</span></strong></div><br><div><code>payee_code</code> // código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. <strong><span class="atributo">Padrão: Identificador da sua própria conta. String.</span></strong></div>|Não|Array|
|<code>metadata</code>|Define dados específicos da transação.<br><br><span><em>Atributos de metadata</em></span><br><div><code>custom_id</code> // Permite associar uma transação Gerencianet a uma ID específica de seu sistema ou aplicação, permitindo identificá-la caso você possua uma identificação específica e queira mantê-la. <strong><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div><br><div><code>notification_url</code> // Endereço de sua URL válida que receberá as notificações de mudanças de status das transações. <strong class="descricao-atributo"><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div>|Não|Object|

<strong class="atributo-obrigatorio-texto">* valor obrigatório</strong>

<br>

<hr>

### 2.2. Associar à forma de pagamento via boleto

Com a transação gerada com sucesso, agora vamos associar com a forma de pagamento desejada - neste caso, será <code>banking_billet</code> (boleto bancário). Para tal, deverá ser informado o <code>charge_id</code> obtido ao criar a transação.

Neste momento, ao definir boleto bancário como forma de pagamento da transação, seu status será alterado de <code>new</code> para <code>waiting</code>. Isso significa que a forma de pagamento foi selecionada e está aguardando a confirmação do pagamento.

Para associar à forma de pagamento, você deve enviar uma requisição <code>POST</code> para a rota <code>/v1/charge/:id/pay</code>, onde <code>:id</code> é o <code>charge_id</code> da transação desejada.

Caso queira, pode explorar e conhecer mais sobre este recurso <a href="https://dev.gerencianet.com.br/docs/playground-transacoes#charge_id_pay" target="_blank">usando nosso Playground</a>.

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
 
// $charge_id refere-se ao ID da transação gerada anteriormente
$params = [
  'id' => $charge_id
];
 
$customer = [
  'name' => 'Gorbadoc Oldbuck', // nome do cliente
  'cpf' => '94271564656' , // cpf válido do cliente
  'phone_number' => '5144916523' // telefone do cliente
];
 
$bankingBillet = [
  'expire_at' => '2018-12-12', // data de vencimento do boleto (formato: YYYY-MM-DD)
  'customer' => $customer
];
 
$payment = [
  'banking_billet' => $bankingBillet // forma de pagamento (banking_billet = boleto)
];
 
$body = [
  'payment' => $payment
];
 
try {
    $api = new Gerencianet($options);
    $charge = $api->payCharge($params, $body);
 
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
 
var param = new {
    id = 1000
};
 
var body = new {
    payment = new {
        banking_billet = new {
            expire_at = "2016-12-12",
            customer = new {
                name = "Gorbadoc Oldbuck",
                email = "oldbuck@gerencianet.com.br",
                cpf = "94271564656",
                birth = "1977-01-15",
                phone_number = "5144916523"
            }
        }
    }
};
 
var response = endpoints.PayCharge(param, body);
```

<!--Node.JS-->
```javascript
'use strict';
 
var moment = require('moment');
var Gerencianet = require('gn-api-sdk-node');
 
var clientId = 'your_client_id';
var clientSecret = 'your_client_secret';
 
var options = {
  client_id: clientId,
  client_secret: clientSecret,
  sandbox: true
}
 
var params = {
  id: 1000
}
 
var expireAt = '2018-12-12';
 
var body = {
  payment: {
    banking_billet: {
      expire_at: expireAt,
      customer: {
        name: 'Gorbadoc Oldbuck',
        cpf: '94271564656',
        phone_number: '5144916523'
      }
    }
  }
}
 
var gerencianet = new Gerencianet(options);
 
gerencianet
  .payCharge(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

<!--Java-->
```javascript
// Disponibilizamos duas formas diferentes de retorno: JSONObject e Map<String, Object>

//JSONObject
package br.com.gerencianet.charge.json;

import java.util.HashMap;

import org.json.JSONObject;

import br.com.gerencianet.Credentials;
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class Billet {
  public static void main(String[] args) {
    /* *********  Set credentials parameters ******** */

    Credentials credentials = new Credentials();

    JSONObject options = new JSONObject();
    options.put("client_id", credentials.getClientId());
    options.put("client_secret", credentials.getClientSecret());
    options.put("sandbox", credentials.isSandbox());

    /* ************************************************* */ 
    
    HashMap<String, String> params = new HashMap<String, String>();
    params.put("id", "0");

    JSONObject customer = new JSONObject();
    customer.put("name", "Gorbadoc Oldbuck");
    customer.put("cpf", "04267484171");
    customer.put("phone_number", "5144916523");

    JSONObject bankingBillet = new JSONObject();
    bankingBillet.put("expire_at", "2018-12-12");
    bankingBillet.put("customer", customer);

    JSONObject payment = new JSONObject();
    payment.put("banking_billet", bankingBillet);

    JSONObject body = new JSONObject();
    body.put("payment", payment);

    try {
        Gerencianet gn = new Gerencianet(options);
        JSONObject response = gn.call("payCharge", params, body);
        System.out.println(response);
    }catch (GerencianetException e){
        System.out.println(e.getCode());
        System.out.println(e.getError());
        System.out.println(e.getErrorDescription());
    }
    catch (Exception e) {
        System.out.println(e.getMessage());
    }
  }
}

//Map<String, Object>
package br.com.gerencianet.charge.map;

import java.util.HashMap;
import java.util.Map;
import br.com.gerencianet.Credentials;
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class Billet {
  public static void main(String[] args) {
    /* *********  Set credentials parameters ******** */

    Credentials credentials = new Credentials();

    HashMap<String, Object> options = new HashMap<String, Object>();
    options.put("client_id", credentials.getClientId());
    options.put("client_secret", credentials.getClientSecret());
    options.put("sandbox", credentials.isSandbox());

    /* ************************************************* */ 
    
    HashMap<String, String> params = new HashMap<String, String>();
    params.put("id", "0");

    Map<String, Object> customer = new HashMap<String, Object>();
    customer.put("name", "Gorbadoc Oldbuck");
    customer.put("cpf", "04267484171");
    customer.put("phone_number", "5144916523");

    Map<String, Object> bankingBillet = new HashMap<String, Object>();
    bankingBillet.put("expire_at", "2018-12-12");
    bankingBillet.put("customer", customer);

    Map<String, Object> payment = new HashMap<String, Object>();
    payment.put("banking_billet", bankingBillet);

    Map<String, Object> body = new HashMap<String, Object>();
    body.put("payment", payment);

    try {
        Gerencianet gn = new Gerencianet(options);
        Map<String, Object> response = gn.call("payCharge", params, body);
        System.out.println(response);
    }catch (GerencianetException e){
        System.out.println(e.getCode());
        System.out.println(e.getError());
        System.out.println(e.getErrorDescription());
    }
    catch (Exception e) {
        System.out.println(e.getMessage());
    }
  }
}
```

<!--Go-->
```golang
package main

import (
  "fmt"
  "github.com/gerencianet/gn-api-sdk-go/gerencianet"
  "github.com/gerencianet/gn-api-sdk-go/_examples/configs"
)

func main(){
  
  credentials := configs.Credentials
  gn := gerencianet.NewGerencianet(credentials)

  customer := map[string]interface{}{
    "name": "Gorbadoc Oldbuck",
    "cpf": "04267484171",
    "phone_number": "5144916523",
  }

  body := map[string]interface{} {
    "payment": map[string]interface{} {
      "banking_billet": map[string]interface{} {
        "expire_at": "2018-12-12",
        "customer": customer,
      },
    },
  }

  res, err := gn.PayCharge(1, body) // no lugar do 1 coloque o charge_id certo

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
 
params = {
  'id': 1000
}
 
body = {
    'payment': {
        'banking_billet': {
            'expire_at': '2016-12-12',
            'customer': {
                'name': "Gorbadoc Oldbuck",
                'email': "oldbuck@gerencianet.com.br",
                'cpf': "94271564656",
                'birth': "1977-01-15",
                'phone_number': "5144916523"
            }
        }
    }
}
 
gn.pay_charge(params=params, body=body)
```

<!--Ruby-->
```ruby
require "gerencianet"
require "date"
 
options = {
  client_id: "client_id",
  client_secret: "client_secret",
  sandbox: true
}
 
tomorrow = Date.today + 1
 
params = {
  id: 1000
}
 
body = {
  payment: {
    banking_billet: {
      expire_at: tomorrow.strftime,
      customer: {
        name: "Gorbadoc Oldbuck",
        email: "oldbuck@gerencianet.com.br",
        cpf: "94271564656",
        birth: "1977-01-15",
        phone_number: "5144916523"
      }
    }
  }
}
 
gerencianet = Gerencianet.new(options)
gerencianet.pay_charge(params: params, body: body)
```

<!--Delphi-->
```javascript
interface
function PayChargeWithBillet(Id: String): String;

implementation
uses uGerenciaClient, uGerenciaNetClientUtilities;
{... your code ... }

function PayChargeWithBillet(Id: String): String;
var 
    Body : String;
    PaymentParams: String;
    
const 
    BodyText = 
    '{'+
      '"payment": {'+
        '"banking_billet": {'+
          '"customer": {'+
            '"email": "email_do_cliente@servidor.com.br",'+
            '"phone_number": "5144916523",'+
            '"birth": "1977-07-17",'+
            '"address": {'+
              '"street": "Av. JK",'+
              '"number": 909,'+
              '"neighborhood": "Bauxita",'+
              '"complement": "",'+
              '"city": "Ouro Preto",'+
              '"state": "MG",'+
              '"zipcode": "35400000"'+
            '},'+
            '"name": "Gorbadoc Oldbuck",'+
            '"cpf": "94271564656"'+
          '},'+
          '"message": "Test",'+
          '"expire_at": "2019-02-21"'+
        '}'+
      '}'+
    '}';

begin
  EnableService( 'GerenciaNet.dll' ); 
  ConfigureService( ToPAnsiChar( 'client_id' ),ToPAnsiChar( 'client_secret' ),'sandbox','config.json',''); 
  GerenciaNetAuthorize(); 

  PaymentParams := CreateRequestParams( [ 'id='+Id ] ).Text; // Passa o id da transação
  Body := BodyText;

  Result := ExecuteGerenciaNetRequest( 'payCharge',PaymentParams,'',Body );
end;
```
<!--END_DOCUSAURUS_CODE_TABS-->

### a) Estrutura hierárquica dos atributos do Schema que podem ser utilizados:

<code>"id": "/Pay"</code>

```schema
   "payment"
        "banking_billet"
            "customer"
                "name"
                "cpf"
                "email"
                "phone_number"
                "birth"
                "address"
                    "street"
                    "number"
                    "neighborhood"
                    "zipcode"
                    "city"
                    "complement"
                    "state"
                "juridical_person"
                    "corporate_name"
                    "cnpj"
            "expire_at"
            "discount"
                "type"
                    "percentage",
                    "currency"
                "value"
            "conditional_discount"
                "type"
                    "percentage",
                    "currency"
                "value"
                "until_date"
            "configurations"
                "fine"
                "interest"
            "message"
```

### b) Atributos que podem ser utilizados para criar um titulo:

*Objeto **items***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>items</code>|Item que está sendo vendido. Uma mesma transação pode possuir ilimitados itens.<br><span><em><br>Atributos de items</em></span><br><div><code>name<strong>*</strong></code> // Nome do item, produto ou serviço. <strong><span class="atributo">Mínimo de 1 caractere e máximo de 255 caracteres (String).</span></strong></div><br><div><code>value<strong>*</strong></code> // Valor, em centavos. Ex: R$ 10,00 = 1000. <strong><span class="atributo">Integer.</span></strong></div><br><div><code>amount</code> // Quantidade. <strong><span class="atributo">Integer (padrão: 1)</span></strong></div><br><div><code>marketplace</code> // Referente às configurações de repasses. <span class="atributo">Atributos:</span></div> <div><br><code>*payee_code*</code> (código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. String.<br><code>*percentage*</code> (porcentagem de repasse, sendo que 9000 equivale a 90% - Integer).</span></div> |Sim | Array|
|<code>shippings</code>|Determina o(s) valor(es) de frete(s) de uma transação. Uma mesma transação pode possuir ilimitados valores de frete.<br><span><br><em>Atributos de shippings</em></span><br><div><code>name<strong class="atributo-obrigatorio">*</strong></code> // Rótulo do frete. <strong><span class="atributo">Máximo de 255 caracteres. String.</span></strong></div><br><div><code>value<strong>*</strong></code> // Valor do frete, em centavos (1990 equivale a R$19,90). <strong><span class="atributo">Integer.</span></strong></div><br><div><code>payee_code</code> // código identificador da conta Gerencianet, único por conta - confira onde localizá-lo, de acordo com o layout de sua plataforma - <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_n.png" target="_blank">opção 1</a> ou <a href="https://gerencianet.com.br/wp-content/uploads/2017/10/payee_code_p.png" target="_blank">opção 2</a>. <strong><span class="atributo">Padrão: Identificador da sua própria conta. String.</span></strong></div>|Não|Array|
|<code>metadata</code>|Define dados específicos da transação.<br><span><br><em>Atributos de metadata</em></span><br><div><code>custom_id</code> // Permite associar uma transação Gerencianet a uma ID específica de seu sistema ou aplicação, permitindo identificá-la caso você possua uma identificação específica e queira mantê-la. <strong><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div><br><div><code>notification_url</code> // Endereço de sua URL válida que receberá as notificações de mudanças de status das transações. <strong><span class="atributo">Máximo de 255 caracteres. String/null.</span></strong></div>|Não|Object|

*Objeto **Payment***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>banking_billet</code>|Forma de pagamento através de "boleto bancário"|Sim|Objeto **Banking_Billet**|

*Objeto **Banking_Billet***

| Atributo   | Descrição   | Obrigatório  | Tipo  |
|:----------|:-------------|:-------------|:------|
|<code>name</code>|Nome do cliente.<br><strong><span class="atributo">Mínimo de 1 caractere e máximo de 255.</span></strong>|Sim<br>*Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente.*|String|
|<code>cpf</code>|CPF válido do cliente (sem pontos, vírgulas ou hífen).<br><strong><span class="atributo">Tamanho: 11 caracteres.</span></strong>|Sim<br>*Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente.*|String|
|<code>email</code>|Email do cliente.<br><strong><span class="atributo">Máximo de 255 caracteres. Ex.: email@email.com</span></strong>|Não|String|
|<code>phone_number</code>|Telefone do cliente.<br><strong><span class="atributo">Formato: sem pontos ou vírgulas, com DDD de 2 caracteres (9º dígito é opcional). Ex.: 11988887777</span></strong>|Sim|String|
|<code>birth</code>|Data de nascimento do cliente.<br><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong>|Não|String|
|<code>address</code>|Endereço do cliente.<br><span>*Atributos de address*</span><br><div><code>street<strong">*</strong></code> // nome da rua <strong><span class="atributo">(Object)</strong></span></div><br><div><code>number<strong>*</strong></code> // número <strong><span class="atributo">(String/Integer)</strong></span></div><br><div><code>neighborhood<strong>*</strong></code> // Bairro <strong><span class="atributo">(String)</strong></span></div><br><div><code>zipcode<strong>*</strong></code> // CEP (sem pontos ou hífen) <strong><span class="atributo">(String)</strong></span></div><br><div><code>city<strong>*</strong></code> // cidade <strong><span class="atributo">(String)</strong></span></div><br><div><code>complement</code> // complemento <strong ><span class="atributo">(String/null)</strong></span></div><br><div><code>state<strong>*</strong></code> // estado (2 caracteres) <strong><span class="atributo">(Object)</strong></span></div>|Não|Object|
|<code>juridical_person</code>|Dados de pessoa jurídica<br><br><span>*Atributos de juridical_person*</span><div><code>corporate_name<strong>*</strong></code> // Nome da razão social. <strong><span class="atributo">Mínimo de 1 caractere e máximo de 255. String.</strong></span></div><div><br><code>cnpj<strong>*</strong></code> // CNPJ da empresa. <strong><span class="atributo">Tamanho: 14 caracteres. String.</strong></span></div>|Não|Object|
|<code>expire_at</code>|Data de vencimento do boleto.<br><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong>|Sim|String|
|<code>discount</code>|Define desconto condicional que é válido até uma data específica. Se o pagamento não for efetuado até aquela data, o desconto é invalidado.<br><span>*Atributos de conditional_discount*</span><br><div><br><span class="atributo"><font color="orange">type\*</font></span>, // Tipo do desconto (String). Valores permitidos:<br><br><code>currency</code>: o desconto será informado em centavos;<br><code>percentage</code>: o desconto será informado em porcentagem.<br></div><div><br><span class="atributo"><font color="orange">value\*</font></span> //Valor do desconto (Integer). Se o tipo do desconto for <code>currency</code>, o valor desta tag deverá ser informada pelo integrador em centavos (ou seja, 500 equivale a R$ 5,00). Caso o tipo do desconto seja <code>percentage</code>, o valor deverá ser multiplicado por 100 (ou seja, 1500 equivale a 15%). Exemplos:<br><br>1) <code>currency</code> // deve ser informado em centavos, ou seja, se o desconto será de R$ 5,99, o integrador deve informar <code>599</code>;<br>2) <code>percentage</code> // deve ser informado em centavos, ou seja, se o desconto é de 15%, o integrador deve informar <code>1500</code>.</div><div><br><span class="atributo"><font color="orange">until_date\*</font></span>, // Data máxima que o desconto será concedido. (String). </strong><strong><span class="atributo">Formato: YYYY-MM-DD</span></strong></div>|Não|Object|
|<code>configurations</code>|Permite incluir no boleto multa e juros caso seja pago após o vencimento.<br><span><br>Atributos de configurations<br><font color="orange">fine</font></span>, // valor cobrado de multa após o vencimento. Por exemplo: se você quiser 2%, você deve informar <code>200</code>.<span class="atributo">Mínimo de <code>0</code> e máximo de <code>1000</code>. Integer.<br>Caso você possua configurações de multa ativada na Gerencianet e queira gerar emissões na API sem multa, utilize <code>0</code> como valor do atributo <code>fine</code></span><br><br><span class="atributo"><font color="orange">interest</font></span>, // valor cobrado de juros por dia após a data de vencimento. Por exemplo: se você quiser 0,033%, você deve informar <code>33</code>.<span class="atributo">Mínimo de 0 e máximo de 330. Integer.<br>Caso você possua configurações de multa ativada na Gerencianet e queira gerar emissões na API sem juros, utilize <code>0</code> como valor do atributo <code>interest</code></span>|Não|Object|
|<code>message</code>|Permite incluir no boleto uma "observação", ou em outras palavras, uma mensagem para o cliente. Essa mensagem poderá ser vista nos e-mails relacionados à cobrança, no boleto ou carnê.<br><br><strong><span class="atributo">Até 4 linhas contendo 100 caracteres em cada linha. String.</span></strong><br><strong><span class="atributo">O operador <code>\n</code> é utilizado para efetuar a quebra de linha.</span></strong>|Não|String


<strong style="font-size:12px;color:#ea6e1c">* valor obrigatório</strong>

<blockquote class="alert-info2">
<strong>Pagamento realizado como Pessoa Jurídica (PJ)</strong><br><br>
O cliente associado à transação pode ser uma Pessoa Jurídica. Nesse caso, devem ser informados a Razão Social e o CNPJ da empresa pagadora dentro do atributo <code>juridical_person</code>.

<a href="https://dev.gerencianet.com.br/docs/pagar-com-pessoa-juridica" target="_blank" title="Link Interno">Veja detalhes neste link</a> sobre como gerar um pagamento cuja forma de pagamento seja "boleto bancário" para um cliente que seja Pessoa Jurídica (PJ).
</blockquote>

<blockquote class="alert-info2">
<strong>Relação de todos os possíveis status de uma transação</strong><br><br>
Todas as transações possuem status, que representa a "situação" dessa transação. Portanto, é importante conhecer os possíveis status de uma transação na API para fornecer as devidas tratativas em seu sistema.

Confira <a href="https://dev.gerencianet.com.br/docs/transacoes" target="_blank" title="Link Interno">neste link</a> todos os detalhes dos possíveis status das transações.
</blockquote>

<blockquote class="alert-alert">
<strong>Callbacks (notificações) das transações da API para seu sistema</strong><br><br>
As notificações permitem que você seja informado quando uma transação tiver seu status alterado. Dessa forma, você poderá identificar quando um boleto for pago, por exemplo.

Confira <a href="https://dev.gerencianet.com.br/docs/notificacoes-recebendo" target="_blank" title="Link Interno">neste link</a> todos os detalhes sobre como implementar a sua URL de notificação.
</blockquote>

<hr>

# 3. Outros endpoints

Existem outros endpoints e métodos relacionados a pagamento via boleto bancário que estão disponíveis na API e podem ser explorados pelo integrador. Confira a relação completa:

- [Alterar data de vencimento de boleto bancário](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-1-alterar-data-de-vencimento-de-boleto-banc-rio)

- [Cancelar determinada transação](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-2-cancelar-determinada-transa-o)

- [Alterar URL de notificação (notification_url) e/ou custom_id de transação](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-3-alterar-url-de-notifica-o-notification_url-e-ou-custom_id-de-transa-o)

- [Reenviar boleto bancário por e-mail](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-4-reenviar-boleto-banc-rio-por-e-mail)

- [Acrescentar informações ao histórico da transação](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-5-acrescentar-informa-es-ao-hist-rico-da-transa-o)

- [Retornar informações sobre transação](https://dev.gerencianet.com.br/docs/pagar-boleto-outros-endpoints#section-6-retornar-informa-es-sobre-transa-o)

<hr>

## 4. Vídeos: Criando transação e gerando boleto bancário

Pensando em oferecer novos meios de transmitir informações, a Gerencianet disponibiliza os vídeos a seguir com o objetivo de explicar, de maneira clara e objetiva, como criar uma transação via integração e associá-la à forma de pagamento por "boleto bancário".

### 4.1. Criando transação via Playground (ambiente de testes/sandbox)

<iframe width="800" height="420" src="https://www.youtube.com/embed/ylqJUpHqwfY" frameborder="0" allowfullscreen></iframe>

### 4.2. Definindo método de pagamento por Boleto Bancário (via Playground)

<iframe width="800" height="420" src="https://www.youtube.com/embed/TNAl8ogvfGQ" frameborder="0" allowfullscreen></iframe>

### 4.3. Criando uma transação por integração - Pagamento por Boleto Bancário

<iframe width="800" height="420" src="https://www.youtube.com/embed/A6p1thz6Pe8" frameborder="0" allowfullscreen></iframe>

<blockquote class="alert-info2">
<strong>Curso Completo de Integração com a API Gerencianet</strong><br><br>
Para acesso as demais aulas, de outros assuntos, acesse a página <a href="https://dev.gerencianet.com.br/docs/curso-online-gerencianet" target="_blank" title="Link Interno">Curso Online de Integrações</a>.
</blockquote>

## 5. Próximos Passos

Existem outras soluções da API que permitem a utilização de pagamento por boleto bancário, quer conhecê-las?

- <a href="https://dev.gerencianet.com.br/docs/criando-assinaturas" title="Link Interno">Assinaturas (cobrança recorrente)</a>
- <a href="https://dev.gerencianet.com.br/docs/carnes-criando" title="Link Interno">Carnês</a>
- <a href="https://dev.gerencianet.com.br/docs/marketplace-recebimentos" title="Link Interno">Marketplace (split)</a>
- <a href="https://dev.gerencianet.com.br/docs/link-pagamento-criando" title="Link Interno">Link de Pagamento</a>
- <a href="https://gerencianet.com.br/artigo/sistemas-integrados/" title="Link Interno">Módulos e Plugins Gerencianet</a>