---
id: doc10
title: Delphi
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de Delphi já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em Delphi:

## Pré Requisitos

- Aplicações que usarão a SDK devem ser compiladas na plataforma Windows 32-bit;
- Apenas aplicações Desktop.

## Download da SDK Delphi

A SDK Delphi disponibilizada pela Gerencianet é composta de uma DLL e duas unidades que fazem a comunicação da sua aplicação com a DLL. Para fazer o download de todo o código fonte da SDK e do projeto de demonstração, <a href="https://github.com/gerencianet/gn-api-sdk-delphi" target="_blank">clique neste link</a>. Após concluir o download, descompacte o arquivo em um diretório/pasta de sua preferência.

## Como gerar a DLL

Estes passos são opcionais, desde que você baixe a DLL já compilada da Gerencianet através <a href="https://gerencianet-pub-prod-1.s3.amazonaws.com/public/suporte/gn-api-sdk-delphi-src-dll-compilada.zip" target="_blank">deste link</a>. Caso você queira compilar o código da DLL, siga as seguintes instruções:

1. Acesse o diretório que efetuou o download e descompactou o arquivo zip contendo o código fonte da DLL;

2. Dentro do seu Delphi, abra o projeto localizado no diretório <code>src/dll-src/</code>;

3. Dentro do diretório <code>src/dll-src/</code>, crie uma pasta chamada <code>output</code> e, dentro desta pasta, crie duas subpastas (uma chamada <code>release</code> e outra chamada <code>debug</code>);

4. No gerenciador de projetos do seu Delphi (no Delphi Berlin, a janela se chama *Project Manager*, localizada no canto superior direito - <a href="https://files.readme.io/b962a07-delphi_01.png" target="_blank">veja onde</a>), selecione a edição das configurações de *build* do seu projeto (botão direito em <code>Build Configurations</code> e opção <code>Edit</code>). Configure os ambientes de compilação da seguinte forma:

   - No menu à esquerda, em <code>Delphi Compiler</code>, clique no menu <code>Target</code> e em <code>Debug Configuration</code>, selecione <code>32-bit Windows platform</code>. Agora, clique em <code>Output directory</code> e selecione o diretório <code>output/debug</code> criado no passo 3. Caso tenha dúvidas, veja <a href="https://files.readme.io/5bdd819-delphi_02.png" target="_blank">esta imagem</a>;

   - No menu à esquerda, em <code>Delphi Compiler</code>, clique no menu <code>Target</code> e em <code>Release configuration</code>, selecione <code>32-bit Windows platform</code>. Agora, clique em <code>Output directory</code> e selecione o diretório <code>output/release</code> criado no passo 3. Caso tenha dúvidas, veja <a href="https://files.readme.io/e109660-delphi_03.png" target="_blank">esta imagem</a>;

   - Clique em <code>OK</code>.

5. Faça download do arquivo .zip referente ao projeto <a href="https://github.com/onryldz/x-superobject" target="_blank">x-superobject</a> e descompacte-o em uma pasta de sua preferência;

6. Adicione no *library path* do Delphi o caminho da pasta que você escolheu para armazenar os arquivos da x-superobject, da seguinte forma:

   - No Delphi, clique em <code>Tools > Options</code> e, na janela que abrir, selecione a opção <code>Delphi Options > Library</code> (<a href="https://files.readme.io/18555f5-delphi_04.png" target="_blank">veja onde</a>);

   - Agora, selecione a edição do campo <code>Library path</code> clicando no botão <code>...</code> e, em seguida, clique no ícone de uma pasta *(Browser for folder...)* (<a href="https://files.readme.io/91c2b40-delphi_05.png" target="_blank">veja onde</a>) e selecione o diretório que você baixou e descompactou o projeto x-superobject;

   - Clique no botão <code>Add</code> e feche a janela de opções.

7. Selecione o ambiente que você deseja compilar a DLL (se é *Release* ou *Debug*) e, logo em seguida, clique em <code>Run > Run Without Debugging</code>. A DLL Gerencianet será gerada em um dos diretórios criados no passo 3, conforme o ambiente que você escolheu.

<blockquote class="alert-info">
<strong>Observação:</strong><br><br>
Originalmente, estes passos foram executados no Delphi Berlin 10.1
</blockquote>

## Como importar a SDK no seu projeto

1. Você precisa copiar a DLL da Gerencianet (arquivo <code>GerenciaNet.dll</code>) e o arquivo <code>config.json</code> para o mesmo diretório que você definiu como diretório de destino da sua aplicação, por exemplo, <code>output/debug</code> ou <code>output/release</code>;

2. Você deverá copiar os arquivos <code>src/uGerenciaClient.pas</code> e <code>src/uGerenciaNetClientUtilities.pas</code>, disponíveis no arquivo .zip da SDK que você baixou, para o diretório raiz de seu projeto. Ou seja, no mesmo local em que seus arquivos de extensão <code>.pas</code> estão localizados;

3. Adicione ao seu projeto os arquivos copiados no passo anterior. Isto pode ser feito clicando em <code>Project > Add to Project...</code>.

## Usando a SDK Gerencianet

Importe as unidades principais:

```bash
uses uGerenciaClient, uGerenciaNetClientUtilities;
```

<blockquote class="alert-danger">
<strong>IMPORTANTE:</strong><br><br>
Nos exemplos que fornecemos, você poderá notar que as strings JSON que passamos para a SDK são geradas através de concatenação, ou seja, sem nenhum uso de bibliotecas para manipulação de objetos JSON. No entanto, você pode escolher a biblioteca que melhor se adapte ao seu projeto e a sua versão do Delphi, como por exemplo, a biblioteca <a href="https://github.com/onryldz/x-superobject" target="_blank" title="Link Externo">x-superobject</a>.

Desta forma, após gerar o objeto JSON, basta convertê-lo em uma *string* e repassá-lo para a SDK como é apresentado nos exemplos desta documentação.
</blockquote>

A API sempre irá retornar uma string JSON, portanto, qualquer tipo de argumento passado para as funções da SDK devem ser do tipo *String*. Antes de consumir qualquer endpoint da API, é necessário:

- Carregar a DLL;

- Autenticar na API usando a SDK. Nesta autenticação, você irá fornecer o seu <code>Client_Id</code>, <code>Client_Secret</code> e o ambiente (sandbox ou produção).

<blockquote class="alert-info">
<strong>Observação:</strong><br><br>
O ambiente "sandbox" (ou "desenvolvimento") é o local que a Gerencianet disponibiliza ao integrador para testar sua integração.

Já o ambiente de "produção" é o ambiente "real" que sua aplicação deverá estar para gerar cobranças (ou "transações") "reais".

**LEMBRE-SE:** caso você ativar o "sandbox", utilize *Client_Id* e *Client_Secret* de "desenvolvimento" (<a href="http://image.prntscr.com/image/447be4bc64644a35bcf5eaecd1125f5d.png" target="_blank">veja onde localizar</a>), assim como, se estiver usando ambiente de "produção", use *Client_Id* e *Client_Secret* do referido ambiente (<a href="http://image.prntscr.com/image/7dc272063bb74dccba91739701a0478b.png" target="_blank">veja onde localizar</a>).
</blockquote>

### Configurando Proxy

A DLL permite a configuração de saída por proxy em sua aplicação Delphi:

<!--DOCUSAURUS_CODE_TABS-->
<!--Delphi-->
```delphi
ConfigureProxy( ToPAnsiChar( ProxyServer ), ToPAnsiChar( ProxyUsername ), ToPAnsiChar( ProxyPassword ), ProxyPort );
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Autenticando em Sandbox

<!--DOCUSAURUS_CODE_TABS-->
<!--Delphi-->
```delphi
EnableService( 'GerenciaNet.dll' ); // carregando a DLL
ConfigureService( ToPAnsiChar( ClientID ),ToPAnsiChar( ClientSecret ),'sandbox','config.json',ToPAnsiChar(PartnerToken) ); //passando as credenciais para a DLL
GerenciaNetAuthorize(); //autenticando na API Gerencianet
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Autenticando em Produção

<!--DOCUSAURUS_CODE_TABS-->
<!--Delphi-->
```delphi
EnableService( 'GerenciaNet.dll' ); // carregando a DLL
ConfigureService( ToPAnsiChar( ClientID ),ToPAnsiChar( ClientSecret ),'api','config.json',ToPAnsiChar(PartnerToken) ); //passando as credenciais para a DLL
GerenciaNetAuthorize(); //autenticando na API Gerencianet
```
<!--END_DOCUSAURUS_CODE_TABS-->

<blockquote class="alert-danger">
<strong>IMPORTANTE:</strong><br><br>
Esta DLL foi desenvolvida para ser retrocompatível, ou seja, compatível tanto com as versões mais recentes do Delphi quanto as versões mais antigas, no entanto, **a Gerencianet somente irá dar suporte à aplicações desktop win-32 desenvolvidas no Delphi Berlin 10.x**, visto que esta é a versão mais recente do Delphi e é a única versão que é oficial e que ainda está sob suporte da Embarcadero, empresa que distribui o Delphi.
</blockquote>

## Rodando a aplicação Demo

1. No Delphi, abra o projeto <code>GerenciaDemo</code>, localizado na pasta <code>demo</code>;

2. Dentro do diretório <code>demo/</code>, crie uma pasta chamada <code>output</code> e, dentro desta pasta, crie duas subpastas (uma chamada <code>release</code> e outra chamada <code>debug</code>);

3. Copie os arquivos <code>GerenciaNet.dll</code> e <code>config.json</code> para dentro das pastas <code>demo/output/debug</code> e <code>demo/output/release</code> criadas anteriormente;

4. No gerenciador de projetos do seu Delphi (no Delphi Berlin, a janela se chama *Project Manager*, localizada no canto superior direito - <a href="https://files.readme.io/b962a07-delphi_01.png" target="_blank">veja onde</a>), selecione a edição das configurações de *build* do seu projeto (botão direito em <code>Build Configurations</code> e opção <code>Edit</code>). Configure os ambientes de compilação da seguinte forma:

   - No menu à esquerda, em <code>Delphi Compiler</code>, clique no menu <code>Target</code> e em <code>Debug Configuration</code>, selecione <code>32-bit Windows platform</code>. Agora, clique em <code>Output directory</code> e selecione o diretório <code>output/debug</code> criado no passo 2. Caso tenha dúvidas, veja <a href="https://files.readme.io/5bdd819-delphi_02.png" target="_blank">esta imagem</a>;

   - No menu à esquerda, em <code>Delphi Compiler</code>, clique no menu <code>Target</code> e em <code>Release configuration</code>, selecione <code>32-bit Windows platform</code>. Agora, clique em <code>Output directory</code> e selecione o diretório <code>output/release</code> criado no passo 2. Caso tenha dúvidas, veja <a href="https://files.readme.io/e109660-delphi_03.png" target="_blank">esta imagem</a>;

   - Cique em <code>OK</code>.

5. Faça download do zip referente ao projeto <a href="https://github.com/onryldz/x-superobject" target="_blank">x-superobject</a> e descompacte-o em alguma pasta de sua preferência (*) ;

6. Adicione no *library path* do Delphi o caminho da pasta que você escolheu para armazenar os arquivos da x-superobject:

   - No Delphi, clique em <code>Tools > Options</code> e, na janela que abrir, selecione a opção <code>Delphi Options > Library</code> (<a href="https://files.readme.io/18555f5-delphi_04.png" target="_blank">veja onde</a>);

   - Agora, selecione a edição do campo <code>Library path</code> clicando no botão <code>...</code> e, em seguida, clique no ícone de uma pasta *(Browser for folder...)* (<a href="https://files.readme.io/91c2b40-delphi_05.png" target="_blank">veja onde</a>) e selecione o diretório que você baixou e descompactou o projeto x-superobject;

   - Clique no botão <code>Add</code> e feche a janela de opções.

7. Copie os arquivos <code>src/uGerenciaClient.pas</code> e <code>src/uGerenciaNetClientUtilities.pas</code>, disponíveis no arquivo .zip da SDK que você baixou, para dentro da pasta <code>demo/</code>. Ou seja, no mesmo local em que os arquivos de extensão <code>.pas</code> estão localizados;

8. Selecione o ambiente que você deseja compilar a aplicação GerenciaDemo (se é *Release* ou *Debug*), e logo em seguida clique em <code>Run > Run Without Debugging</code>. O arquivo executável será gerado em um dos diretórios que você criou no passo 2, dependendo do ambiente que escolhido.

<blockquote class="alert-info">
<strong>Observação:</strong><br><br>
(*) Se você deseja criar uma aplicação de teste do zero você só precisará importar a biblioteca x-superobject se você for usar as funções de manipulação de objecto JSON da mesma. A biblioteca x-superobject será necessária, também, caso você queira compilar o código fonte da DLL.
</blockquote>