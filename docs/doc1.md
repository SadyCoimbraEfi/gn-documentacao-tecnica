---
id: doc1
title: Introdução
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

<p>Se você é um desenvolvedor e pretende integrar seu site ou aplicação a um <strong>sistema completo de gestão de cobranças e pagamentos online</strong>, você está no lugar certo!</p>

<p>Esta documentação é destinada a desenvolvedores que desejam <strong>integrar seu site ou aplicação com a API da Gerencianet</strong>. São descritas as funcionalidades da API, módulos, parâmetros técnicos, vídeos em formato de aulas sobre integrações com nossa API e disponibilização de códigos prontos de exemplos para facilitar suas atividades de desenvolvimento.</p>

<p>A <strong>Gerencianet</strong> é uma empresa <strong>Intermediadora de Pagamentos</strong>. Por meio dela, você pode emitir cobranças para seus clientes (por boleto, cartão, carnê ou assinaturas) sem ter que realizar convênios específicos com bancos ou operadoras de cartão de crédito. Atendendo a determinação da <abbr title="Federação Brasileira de Bancos">Febraban</abbr>, <strong>os boletos e carnês gerados pela Gerencianet são registrados.</strong></p>

## 1. Conheça nosso curso

Pensando em oferecer novos meios de transmitir informações, a Gerencianet lançou o <a href="http://udemy.com/eadgerencianet/" target="_blank">**Curso EAD da Universidade Gerencianet**</a>, que são **vídeos em formato de aulas** com o objetivo de explicar, de maneira clara e objetiva, como utilizar nossas soluções em pagamentos online e integrar o seu sistema ou aplicação com a API Gerencianet.

O curso está disponível pela <a href="http://udemy.com/eadgerencianet/" target="_blank">plataforma da Udemy</a>. Após a realização de 100% do curso **iremos disponibilizar um certificado digital em seu nome** certificando-o da conclusão deste. O curso é gratuito e carga horária estimada de 6 horas.

<a href="https://www.udemy.com/eadgerencianet/" target="_blank">
      <img ng-src="https://files.readme.io/dea461e-885230_66bc_3.jpg" align="center" src="https://files.readme.io/dea461e-885230_66bc_3.jpg">
</a>

## 2. Começando...

<p>Antes de iniciar, <a href="https://gerencianet.com.br/#abrirconta" target="_blank" title="Link Externo">crie sua conta</a> na Gerencianet.</p>

<p>Um integrador pode criar quantas aplicações desejar. Para cada aplicação, são gerados 2 pares de chaves <code>Client_Id</code> e <code>Client_Secret</code>, sendo um par para utilização em ambiente de <abbr title="Ambiente de produção (usar após testar sua integração)">Produção</abbr> (<a href="https://s3-sa-east-1.amazonaws.com/pe85007/portal/wp-content/uploads/2019/01/28172637/chaves-producao.png" target="_blank" title="Link Externo">?</a>) e outro para <abbr title="Ambiente de testes (sandbox) da Gerencianet">Desenvolvimento</abbr> (<a href="https://s3-sa-east-1.amazonaws.com/pe85007/portal/wp-content/uploads/2019/01/28172624/chaves-desenvolvimento.png" target="_blank" title="Link Externo">?</a>).

<p>Utilizando a API da Gerencianet, o integrador pode gerar transações (pagamento via <a href="https://dev.gerencianet.com.br/docs/gerar-boleto" title="Link Interno">boleto</a> ou <a href="https://dev.gerencianet.com.br/docs/pagamento-cartao" title="Link Interno">cartão</a>), <a href="https://dev.gerencianet.com.br/docs/criando-assinaturas" title="Link Interno">cobranças recorrentes</a>, <a href="https://dev.gerencianet.com.br/docs/carnes-criando" title="Link Interno">carnês</a> e <a href="https://dev.gerencianet.com.br/docs/notificacoes-recebendo" title="Link Interno">receber notificações</a> <em>(callbacks)</em> sempre que houver alterações de status nas transações.</p>

<p>Para criar sua primeira aplicação, <a href="https://gerencianet.com.br/#login" target="_blank" title="Link Externo">faça login</a> em sua conta Gerencianet, acesse <code>API > Minhas Aplicações > Nova Aplicação</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/api-nova-aplicacao.png" target="_blank" title="Link Externo">?</a>), informe um nome para sua aplicação e clique em <code>Criar nova aplicação</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/api-nova-aplicacao-02.png" target="_blank" title="Link Externo">?</a>). Você visualizará as chaves <code>Client_Id</code> e <code>Client_Secret</code> de Produção e Desenvolvimento. Recomendamos que comece explorando nosso <a href="https://dev.gerencianet.com.br/docs/playground" title="Link Interno">Playground</a> para conhecer o mecanismo e o fluxo de pagamento em um ambiente 100% de teste e descomplicado. Neste local, estarão todos os <em>endpoints</em> disponibilizados pela API, ou seja, tudo que é possível realizar via integração.</p>

<p>Através da sub-aba <code>Histórico de Requisições</code> (<a href="https://gerencianet.com.br/wp-content/uploads/2018/07/historico-requisicoes-api.png" target="_blank" title="Link Externo">?</a>) é possível visualizar todas as requisições realizadas por seu sistema de gestão ou integração à API Gerencianet. Saiba mais na página <a href="https://dev.gerencianet.com.br/docs/interpretando-erros-api" title="Link Interno">Interpretando Erros na API</a>.</p>

<p>Tendo em vista a variedade de integrações com a Gerencianet, reunimos <a href="https://dev.gerencianet.com.br/docs/tipos-integracoes" title="Link Interno">nesta tabela</a> informações para facilitar sua escolha. Por isso, escolha a melhor integração, de acordo com suas necessidades.</p>

## 3. Bibliotecas

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e as requisições/respostas são em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Todas as bibliotecas disponibilizadas aqui já estão preparadas para realizar essa autenticação automaticamente.</p>

<p>Clique na aba referente à linguagem de sua preferência para baixar a biblioteca:</p>

<!--DOCUSAURUS_CODE_TABS-->
<!--PHP-->
```php
// Instalando via Packagist com o Composer:
// Packagist: https://packagist.org/packages/gerencianet/gerencianet-sdk-php
// Composer: https://getcomposer.org/

$ composer require gerencianet/gerencianet-sdk-php

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-php

// extensões cURL, json & openssl devem estar ativadas
```

<!--JavaScript-->
```javascript
// Instalando via NPM (https://www.npmjs.com/package/gn-api-sdk-node):

$ npm install gn-api-sdk-node

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-nodejs
```

<!--Ruby-->
```ruby

// Instalando via RubyGems (https://rubygems.org/gems/gerencianet):

$ gem install gerencianet

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-ruby
```

<!--Python-->
```python
// Instalando via Pip (https://pypi.python.org/pypi/pip):

$ pip install gerencianet

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-python
```

<!--.NET-->
```csharp-interactive
// Instalando via NuGet (https://www.nuget.org/):

$ nuget install Gerencianet.SDK

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-dotnet
```

<!--Java-->
```xml
// Instalando via gradle:
compile 'br.com.gerencianet.gnsdk:gn-api-sdk-java:0.2.2'

// Instalando via maven:
<dependency>
    <groupId>br.com.gerencianet.gnsdk</groupId>
    <artifactId>gn-api-sdk-java</artifactId>
    <version>0.2.2</version>
</dependency>
// O Maven automaticamente instalará a SDK e todas as suas dependências.

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-java
```

<!--Delphi-->
```html
// Confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-delphi
```

<!--Go-->
```go
$ go get github.com/gerencianet/gn-api-sdk-go/gerencianet

// Ou, se preferir, confira a documentação completa:
// https://dev.gerencianet.com.br/docs/instalacao-sdk-go
```

<!--END_DOCUSAURUS_CODE_TABS-->

## 4. Recursos oferecidos pela API da Gerencianet

### Aprenda a instalar nossa API


<p>Veja como é fácil instalar nossa SDK e integrar em seu site ou sistema. Disponibilizamos em 8 (oito) linguagens:</p><br/>

<div>
	<a href="https://github.com/gerencianet/gn-api-sdk-php" target="_blank"><img src="/img/php-logo.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-go" target="_blank"><img src="/img/golang.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-java" target="_blank"><img src="/img/java-coffee-cup-logo.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-python" target="_blank"><img src="/img/python.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-ruby" target="_blank"><img src="/img/ruby-programming-language.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-php" target="_blank"><img src="/img/c-sharp-logo.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-node" target="_blank"><img src="/img/nodejs.png" class="sdks"></a>
    <a href="https://github.com/gerencianet/gn-api-sdk-delphi" target="_blank"><img src="/img/delphi-ide.png" class="sdks"></a>
</div>


### Criar transação e pagar com boleto ou cartão

<p>Receba de seus clientes sem burocracias bancárias. Todos os boletos e carnês gerados pela Gerencianet são registrados. Saiba mais:</p>

<div>
	<a href="https://dev.gerencianet.com.br/docs/gerar-boleto-bancario" title="Link Interno"><button type="button" class="button">Gerar boleto bancário</button></a>
	<a href="https://dev.gerencianet.com.br/docs/pagamento-com-cartao" title="Link Interno"><button type="button" class="button">Pagamento com cartão</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-transacoes" title="Link Interno"><button type="button" class="button">Ambiente de testes</button></a>
<div>

### Cobranças recorrentes (assinaturas)

<p>Cobre seus clientes de forma recorrente. Assim que ele autoriza os débitos, você não precisa se preocupar em enviar a cobrança todo mês e seu cliente não corre o risco de esquecer de realizar o pagamento. É possível utilizar tanto via cartão de crédito quanto boleto bancário. Saiba mais:</p>

<div>
	<a href="https://dev.gerencianet.com.br/docs/assinaturas-como-funcionam" title="Link Interno"><button type="button" class="button">Como funciona</button></a>
	<a href="https://dev.gerencianet.com.br/docs/criando-assinaturas" title="Link Interno"><button type="button" class="button">Criando assinaturas</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-assinaturas" title="Link Interno"><button type="button" class="button">Ambiente de testes</button></a>
<div>

### Gere carnês para seus clientes

<p>O carnê é ideal para quem realiza vendas parceladas e também para quem trabalha com mensalidades. Você pode emitir carnês com até 12 parcelas. As parcelas vencem mensalmente, de acordo com a data definida pelo integrador. Saiba mais:</p>


<a href="https://dev.gerencianet.com.br/docs/carnes-criando" title="Link Interno"><button type="button" class="button">Criando carnês</button></a>
<a href="https://dev.gerencianet.com.br/docs/carnes-outros-endpoints" title="Link Interno"><button type="button" class="button">Outros endpoints e métodos</button></a>
<a href="https://dev.gerencianet.com.br/docs/playground-carnes" title="Link Interno"><button type="button" class="button">Ambiente de testes</button></a>

### Ambiente de testes (sandbox) da API

<p>Antes de colocar uma aplicação em produção, é muito importante certificar-se que sua implementação está correta e suas integrações estão comunicando da forma como deveriam.</p>

<p>Para evitar que os integradores tenham que fazer testes em produção, a Gerencianet oferece um ambiente de desenvolvimento/testes (sandbox), no qual chamamos de "Playground". Este é um local no qual o integrador pode utilizar para conhecer o mecanismo e o fluxo de pagamento em um ambiente 100% de teste e descomplicado. Saiba mais:</p>

<a href="https://dev.gerencianet.com.br/docs/playground" title="Link Interno"><button type="button" class="button">Introdução ao Playground</button></a>

### Marketplace Gerencianet

<p>O conceito de marketplace é simples. Trata-se de um ambiente virtual no qual vários vendedores distintos se reúnem para oferecer diferentes produtos e serviços, tudo em um único local, como um <em>shopping center</em>. Ao final da venda em um marketplace, o repasse automático do valor será destinado a todos os envolvidos, de acordo com as regras definidas previamente pelo integrador. Saiba mais:</p>

<div>
	<a href="https://dev.gerencianet.com.br/docs/dividindo-recebimentos" title="Link Interno"><button type="button" class="button">Dividindo recebimentos</button></a>
	<a href="https://dev.gerencianet.com.br/docs/marketplace-como-funciona" title="Link Interno"><button type="button" class="button">Como funciona</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-transacoes" title="Link Interno"><button type="button" class="button">Ambiente de testes</button></a>
</div>

### Sistemas Integrados de Parceiros

<p>Sistemas parceiros oficiais da Gerencianet cuja integração com nossa API é nativa. Assim, você pode utilizar os serviços oferecidos pela Gerencianet de uma maneira simples e rápida, apenas preenchendo algumas configurações em seu sistema, de acordo com o manual da empresa proprietária do software.</p>

<a href="https://gerencianet.com.br/artigo/sistemas-integrados/" title="Link Externo" target="_blank"><button type="button" class="button">(+) Saiba Mais</button></a>

### Módulos e Plugins para diversas plataformas

<p>Possuímos módulos integrados para inúmeras plataformas - ideal também para <em>não desenvolvedores</em>. Confira os passos para instalação e configuração:</p>

<br/>
<div>
	<a href="https://dev.gerencianet.com.br/docs/wordpress-woocommerce" title="Woocommerce"><img src="/img/woocommerce.png" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/magento" title="Magento"><img src="/img/magento.png" width="50" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/opencart" title="OpenCart"><img src="/img/opencart.png" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/prestashop" title="PrestaShop"><img src="/img/prestashop.png" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/whmcs" title="WHMCS"><img src="/img/whmcs.png" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/box-billing" title="Box Billing"><img src="/img/boxbilling.png" class="modulos"></a>
	<a href="https://dev.gerencianet.com.br/docs/joomla-virtuemart" title="Joomla (VirtueMart)"><img src="/img/joomla.png" class="modulos"></a>
</div>

### Link de Pagamento

<p>Este recurso permite criar um link para uma tela de pagamento da Gerencianet. Com isso, o integrador não precisa implementar sua própria tela de pagamento, podendo definir as formas de pagamento que deseja permitir (boleto e/ou cartão) e, com o link gerado, o pagador será redirecionado para a tela de pagamento da Gerencianet. Saiba mais:</p>

<a href="https://dev.gerencianet.com.br/docs/link-pagamento-criando"><button type="button" class="button">Criando link de pagamento</button></a>
<a href="https://dev.gerencianet.com.br/docs/playground-transacoes"><button type="button" class="button">Ambiente de testes</button></a>

### Seja notificado quando uma transação for paga

<p>As notificações <em>(callbacks)</em> permitem que você seja informado quando uma transação tiver seu status alterado. Dessa forma, você poderá identificar quando um boleto foi pago ou permanece em aberto, por exemplo. Saiba mais:</p>

<div>
<a href="https://dev.gerencianet.com.br/docs/notificacoes-recebendo"><button type="button" class="button">Recebendo as notificações</button></a>
<a href="https://dev.gerencianet.com.br/docs/playground-notificacoes"><button type="button" class="button">Ambiente de testes</button></a>
</div>

### Exemplos de integrações API Gerencianet

<p>Disponibilizamos exemplos prontos de integrações com a API da Gerencianet para você ver como é fácil adaptar nossas soluções ao seu negócio. Você pode conferir online e efetuar o download, confira:</p>

<div>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-assinaturas" target="_blank"><button type="button" class="button">Assinaturas</button></a>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-boleto" target="_blank"><button type="button" class="button">Boleto Bancário</button></a>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-cartao" target="_blank"><button type="button" class="button">Cartão de Crédito</button></a>
</div><br><div>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-carnes" target="_blank"><button type="button" class="button">Carnês</button></a>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-link" target="_blank"><button type="button" class="button">Link de Pagamento</button></a>
	<a href="https://dev.gerencianet.com.br/docs/exemplo-integracao-marketplace" target="_blank"><button type="button" class="button">Marketplace</button></a>
</div>

### Vídeos sobre integrações com a API Gerencianet

<p>Assista os vídeos explicativos em formato de aulas sobre como utilizar nossas soluções em pagamentos online e integrar seu sistema ou aplicação com a API Gerencianet.</p>

<a href="https://dev.gerencianet.com.br/docs/curso-online-gerencianet"><button type="button" class="button">Curso Online de Integrações</button></a>

<br>
<blockquote class="alert-info">
	<strong>PRÓXIMOS PASSOS</strong><br><br>
	Neste momento, você já conheceu um pouco sobre a Gerencianet e as soluções em geral da nossa API. Agora, você pode conferir a <a href="https://dev.gerencianet.com.br/docs/tipos-integracoes" title="Link Interno">tabela com os tipos de integrações</a>, explorar o nosso <a href="https://dev.gerencianet.com.br/docs/playground" title="Link Interno">ambiente de testes</a>, visualizar o <a href="https://dev.gerencianet.com.br/docs/visao-geral-fluxo-integracao" title="Link Interno">fluxo geral de integração com a Gerencianet</a>, além de ver como criar sua primeira cobrança (pagamento por <a href="https://dev.gerencianet.com.br/docs/gerar-boleto" title="Link Interno">boleto</a> ou <a href="https://dev.gerencianet.com.br/docs/pagamento-cartao" title="Link Interno">cartão</a>).
</blockquote>
