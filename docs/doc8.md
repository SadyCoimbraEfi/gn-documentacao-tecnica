---
id: doc8
title: .Net
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de .NET já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em .NET:

## Instalando via <a href="https://www.nuget.org/packages/Gerencianet.SDK/" target="_blank">NuGet</a>

**Package Manager**

```bash
PM> Install-Package Gerencianet.SDK -Version 1.0.8
```

**.NET Cli**

```bash
dotnet add package Gerencianet.SDK --version 1.0.8
```

**PackageReference**

```bash
PackageReference Include="Gerencianet.SDK" Version="1.0.8" />
```
**Paket CLI**

```bash
paket add Gerencianet.SDK --version 1.0.8
```

## Instalando via Git</a>
Nossa SDK também está disponível em nosso <a href="https://github.com/gerencianet/gn-api-sdk-dotnet" target="_blank">repositório no GitHub</a>.

```bash
$ git clone https://github.com/gerencianet/gn-api-sdk-dotnet.git</pre>
```

## Uso Básico

<!--DOCUSAURUS_CODE_TABS-->
<!--.Net-->
```csharp-interactive
using Gerencianet.SDK;
...
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
<!--END_DOCUSAURUS_CODE_TABS-->