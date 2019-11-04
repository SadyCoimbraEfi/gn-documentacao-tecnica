---
id: doc6
title: Ruby
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de Ruby já está preparada para realizar essa autenticação automaticamente.</p>


A seguir, confira os procedimentos para instalação da SDK da Gerencianet em Ruby:

## Instalando via RubyGems

Adicione esta linha ao Gemfile da sua aplicação:

```bash
gem 'gerencianet'
```

E então execute:

```bash
$ bundle
```

Ou instale-o como:

```bash
$ gem install gerencianet
```

## Testado com

- Ruby <code>2.1.0</code>

## Uso básico

<!--DOCUSAURUS_CODE_TABS-->
<!--Ruby-->
```ruby
require "gerencianet"

options = {
  client_id: "client_id",
  client_secret: "client_secret",
  sandbox: true
}

gerencianet = Gerencianet.new(options)

charge = {
  items: [{
    name: "Product A",
    value: 1000,
    amount: 2
  }]
}

response = gerencianet.create_charge(body: charge)
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Exemplos

Você pode executar os exemplos dentro do diretório <code>examples</code> com:

```bash
$ ruby examples/create_charge.rb
```

Lembre-se de definir as credenciais corretas dentro de <code>examples/credentials.rb</code> antes de executar.

## Testes

Para executar os testes, basta executar rspec:

```bash
$ rspec
```

Ou usar <code>guard</code> para monitorar arquivos e executar automaticamente rspec:

```bash
$ guard -n false -c
```