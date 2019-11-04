---
id: doc9
title: Java
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de Java já está preparada para realizar essa autenticação automaticamente.</p>

## Pré Requisitos

- Java >= 7.0

## Testado com

- Java <code>7.0</code> e <code>8.0</code>

## Instalando via gradle

```bash
compile 'br.com.gerencianet.gnsdk:gn-api-sdk-java:0.2.2'
```

## Instalando via maven

<!--DOCUSAURUS_CODE_TABS-->
<!--Java-->
```xml
<pre><dependency>
    <groupId>br.com.gerencianet.gnsdk</groupId>
    <artifactId>gn-api-sdk-java</artifactId>
    <version>0.2.2</version>
</dependency></pre>
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Começando

Requer o módulo e os pacotes:

```bash
import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;
```

Embora as respostas dos serviços da Web estejam no formato json, a SDK converterá qualquer resposta do servidor para um *JSONObject* ou um *Map <String, Object>*. O código deve estar dentro de um *try-catch* e as exceções podem ser tratadas da seguinte forma:

<!--DOCUSAURUS_CODE_TABS-->
<!--Java-->
```java
try {
  /* code */
} catch(GerencianetException e) {
  /* Gerencianet's api errors will come here */
} catch(Exception ex) {
  /* Other errors will come here */
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Para ambiente de desenvolvimento

Instanciar o módulo passando seu *Client_Id*, *Client_Secret* e *sandbox* sendo igual a <code>true</code>:

<!--DOCUSAURUS_CODE_TABS-->
<!--JSONObject-->
```java
JSONObject options = new JSONObject();
options.put("client_id", "client_id");
options.put("client_secret", "client_secret");
options.put("sandbox", true);

Gerencianet gn = new Gerencianet($options);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Ou então:

<!--DOCUSAURUS_CODE_TABS-->
<!--Map-->
```java
Map<String, Object> options = new HashMap<String, Object>();
options.put("client_id", "client_id");
options.put("client_secret", "client_secret");
options.put("sandbox", false);

Gerencianet gn = new Gerencianet($options);
```
<!--END_DOCUSAURUS_CODE_TABS-->

# Executando testes

Para executar o conjunto de testes com *coverage:*

```bash
mvn clean test jacoco:report</pre>
```
# Executando exemplos

Para executar alguns exemplos existentes siga as etapas descritas em nosso Github (<a href="https://github.com/gerencianet/gn-api-sdk-java-examples" target="_blank">gn-api-sdk-java-examples</a>).