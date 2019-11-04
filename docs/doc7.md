---
id: doc7
title: Python
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de Python já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em Python:

## Instalando via <a href="https://pypi.python.org/pypi/pip" target="_blank">Pip</a>

```bash
$ pip install gerencianet
```

## Testado com

- Python <code>2.7</code>, <code>3.3</code>, <code>3.4</code> e <code>3.5</code>

## Uso Básico

<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```python
# encoding: utf-8

from gerencianet import Gerencianet

credentials = {
    'client_id': 'client_id',
    'client_secret': 'client_secret',
    'sandbox': True
}

gn = Gerencianet(credentials)

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

print gn.create_charge(body=body)
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Exemplos

Você pode executar os exemplos dentro de <code>examples</code> com <code>$ python examples/example.py</code>:

```bash
$ python examples/create_charge.py
```

Lembre-se de definir as credenciais corretas dentro de <code>examples/credentials.py</code> antes de executar.

## Testes

Para executar os testes, basta executar *pytest*:

```bash
$ py.test
```
