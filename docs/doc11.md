---
id: doc11
title: Go
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de Go já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em Go:

```bash
$ go get github.com/gerencianet/gn-api-sdk-go/gerencianet
```

## Testado com

- <code>Go 1.8</code>

## Uso básico

<!--DOCUSAURUS_CODE_TABS-->
<!--Go-->
```go
import (
    "github.com/gerencianet/gn-api-sdk-go/gerencianet"
)

credentials := map[string]interface{} {
    "client_id": "client_id",
    "client_secret": "client_secret",
    "sandbox": true,
    "timeout": 10,
}

gn := gerencianet.NewGerencianet(credentials)

body = {
    "items": [{
        "name": "Product 1",
        "value": 1000,
        "amount": 2,
    }],
    "shippings": [{
        "name": "Default Shipping Cost",
        "value": 100,
    }]
}

res, err := gn.CreateCharge(body)
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Exemplos

Você pode rodar os exemplos dentro de <code>_examples</code> com <code>$ go run example.go</code>:

```bash
$ go run charge/create_charge.go
```

Basta lembrar de definir as credenciais corretas dentro de <code>_examples/configs.go</code> antes de serem executadas.

## Testes

Para executar os testes, basta executar:

```bash
$ go test
```