---
id: doc4
title: PHP
---

<p>Nossa API é <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank" title="Link Externo">RESTful</a> e responde em <a href="http://www.json.org/" target="_blank" title="Link Externo">JSON</a>. A Gerencianet utiliza <a href="http://oauth.net/" target="_blank" title="Link Externo">OAuth</a> para fornecer acesso autorizado à <abbr title="Application Programming Interface">API</abbr>. Nossa SDK de PHP já está preparada para realizar essa autenticação automaticamente.</p>

A seguir, confira os procedimentos para instalação da SDK da Gerencianet em PHP:

### Instalando via <a href="https://packagist.org/packages/gerencianet/gerencianet-sdk-php" target="_blank" title="Link Externo">Packagist</a> com o <a href="https://getcomposer.org/" target="_blank" title="Link Externo">Composer</a>

<!--DOCUSAURUS_CODE_TABS-->
<!--Branch 2.x-->
```linux
$ composer require gerencianet/gerencianet-sdk-php
```

<!--Branch 1.x-->
```linux
$ composer require gerencianet/gerencianet-sdk-php:^1.0.0
```
<!--END_DOCUSAURUS_CODE_TABS-->

É importante frisar que as extensões <code>cURL</code>, <code>json</code> & <code>openssl</code> devem estar ativadas.

<blockquote class="alert-info">
<strong>IMPORTANTE</strong><br><br>
Atualmente, disponibilizamos duas versões da SDK. A versão 1.x é compatível com versões do PHP superiores à versão 5.4, no entanto, possui alguns componentes desatualizados, como o Guzzle. Caso você tenha uma versão do PHP superior à versão 5.5, sugerimos que instale a versão 2.x da nossa SDK.
</blockquote>

Vá direto ao ponto ­- utilize o índice abaixo e veja diretamente o que você precisa:

1. [Pré-requisitos](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-1-pr-requisitos)

2. [Instalação do Composer em Windows](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-2-instala-o-do-composer-em-windows)

3. [Instalação do Composer em Linux](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-3-instala-o-do-composer-em-linux)

4. [Instalação biblioteca PHP da Gerencianet sem o Composer](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-4-instala-o-biblioteca-php-da-gerencianet-sem-o-composer)

5. [Erros Comuns (cURL error 60 ou cURL error 77)](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-5-erros-comuns-curl-error-60-ou-curl-error-77-)

6. [Vídeo: Instalação do Composer (Windows e Linux)](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-6-v-deo-instala-o-do-composer-windows-e-linux-)

7. [Extra: timeout option](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-7-extra-timeout-option)

## 1. Pré-requisitos

Os seguintes pré-requisitos devem ser considerados, de acordo com a *branch* utilizada:

| Versão da branch     | Status      | Packagist                           | Repositório         | Versão do PHP
| :------------------- | -----------:|:-----------------------------------:|:-------------------:|:---------------:
| <a href="https://github.com/gerencianet/gn-api-sdk-php/tree/1.x" target="_blank">1.x</a>   | Mantido     | gerencianet/gerencianet-sdk-php     | <a href="https://github.com/gerencianet/gn-api-sdk-php/tree/1.x" target="_blank">v1</a>   | <code>> =</code> 5.4 (não é compatível com PHP 7.x)
| <a href="https://github.com/gerencianet/gn-api-sdk-php" target="_blank">2.x</a>  | Mantido     | gerencianet/gerencianet-sdk-php     | <a href="https://github.com/gerencianet/gn-api-sdk-php" target="_blank">v2</a>   | <code>> =</code> 5.5 (compatível com PHP 7.x)

<blockquote class="alert-info">
<strong>Nota:</strong><br><br>
Para a utilização da biblioteca em PHP, recomendamos a instalação através do <a href="https://getcomposer.org/" target="_blank" title="Link Externo">Composer</a> (gerenciador de dependências).

Caso prefira prosseguir sem o Composer, basta seguir os procedimentos descritos no título [4. Instalação biblioteca PHP da Gerencianet sem o Composer](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-4-instala-o-biblioteca-php-da-gerencianet-sem-o-composer).
</blockquote>

## 2. Instalação do Composer em Windows

Instalaremos o Composer no Windows para baixar as nossas bibliotecas. Se preferir, pode seguir <a href="https://getcomposer.org/doc/00-intro.md#installation-windows" target="_blank" title="[link externo]">neste link</a> o tutorial do próprio site oficial do Composer.

a) Primeiramente, vamos baixar o instalador do Composer para Windows <a href="https://getcomposer.org/Composer-Setup.exe" target="_blank" title="[link externo]">neste link</a> e, assim que o download for finalizado, execute-o;

b) Você precisará informar o caminho de instalação do seu PHP. Caso você esteja utilizando um servidor Wamp, por exemplo, e na instalação surgir uma mensagem relacionada ao arquivo "openssl", você precisará informar seu arquivo <code>.exe</code> do PHP contido no diretório raiz do Wamp.

c) Durante a instalação, após indicar o diretório do seu PHP, clique em <code>next</code>. A instalação *poderá* retornar uma mensagem de alerta relacionado à configuração do "openssl". Trata-se de uma mensagem comum que significa que o "openssl" está desabilitado, contudo, vamos resolver de forma rápida e fácil.

<blockquote class="alert-info">
<strong>Observação:</strong><br><br>
Caso não seja retornada nenhuma mensagem sobre o "openssl", apenas prossiga para o subtítulo [Baixando as dependências](https://dev.gerencianet.com.br/docs/instalacao-sdk-php#section-baixando-as-depend-ncias), localizado mais abaixo.
</blockquote>

Para habilitar seu "openssl", será necessário alterar o arquivo <code>php.ini</code>.

a) Abra o diretório de instalação do seu php e localize o arquivo <code>php.ini</code>;

b) Abra o arquivo <code>php.ini</code> em um editor de texto (p. ex: notepad++, sublime, etc) e pressione <code>CTRL + F</code> e pesquise pela palavra “openssl” (sem as aspas);

c) O sinal de ponto e vírgula ( ; ) desabilita o arquivo <code>php_openssl.dll</code>. Apague este sinal e ele habilitará o arquivo, ou seja:

  * Está assim: <code>;extension=php_openssl.dll</code>

  * Deve ficar assim: <code>extension=php_openssl.dll</code>

Agora, salve o documento (pressione <code>CTRL + S</code>) e feche o arquivo.

d) A extensão estará habilitada e você poderá continuar com a instalação. Para que a instalação seja atualizada em relação ao procedimento, é importante que você retorne uma tela e depois avance com a instalação normalmente.

### Baixando as dependências

a) Crie uma pasta chamada <code>composer</code> no seu diretório Wamp, dentro da pasta <code>www</code>, de forma que tenha essa estrutura: <code>\wamp\www\composer</code>

b) Agora, vamos realizar a instalação das dependências. Abra o *prompt* de comando do Windows (cmd) e navegue até o diretório raiz, em <code>\wamp\www\composer</code>

c) Vamos executar o comando de instalação das dependências (SDK PHP da Gerencianet) dentro desse diretório. Para tal, execute o comando abaixo:

<!--DOCUSAURUS_CODE_TABS-->
<!--Branch 2.x-->
```linux
$ composer require gerencianet/gerencianet-sdk-php
```

<!--Branch 1.x-->
```linux
$ composer require gerencianet/gerencianet-sdk-php:^1.0.0
```
<!--END_DOCUSAURUS_CODE_TABS-->

d) Após a execução do comando, todas as dependências serão instaladas em seu diretório, inclusive a pasta <code>vendor</code> com o arquivo <code>autoload.php</code>.

Pronto, agora é só começar a utilizar as soluções de integração da Gerencianet. Veja a tabela com os <a href="https://dev.gerencianet.com.br/docs/tipos-integracoes" title="Link Interno">tipos de integrações</a>.


## 3. Instalação do Composer em Linux

É possível instalar o Composer em cada projeto (instalação local) ou ter acesso a ele em qualquer parte do sistema (instalação global). Se preferir, pode seguir <a href="https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx" target="_blank" title="[link externo]">neste link</a> o tutorial do próprio site oficial do Composer. Aqui, vamos efetuar a instalação global. Para tal, execute no Terminal o seguinte comando:

```bash
$ curl -sS https://getcomposer.org/installer | php
```

```bash
$ sudo mv composer.phar /usr/local/bin/composer
```

### Arquivo *composer.json*

Um dos principais arquivos para se trabalhar com o Composer é o <code>composer.json</code>. É nele que as instruções sobre os pacotes que serão usados no projeto ficam contidas. Este é um arquivo de extensão <code>.json</code> comum que deve ficar na raiz de seu projeto.

A diretiva <code>require</code> no arquivo <code>composer.json</code> informa ao Composer quais os pacotes necessários para o projeto - neste caso, o repositório central é o Packagist.

Agora, vamos informar ao Composer que a Gerencianet fará parte do gerenciamento de dependências inserindo o conteúdo abaixo no final do arquivo <code>composer.json</code> (que deve ficar na raiz do projeto):

<!--DOCUSAURUS_CODE_TABS-->
<!--Branch 2.x-->
```json
{"require": 
	{
		"gerencianet/gerencianet-sdk-php": "2.*"
	}
}
```

<!--Branch 1.x-->
```json
{"require": 
	{
		"gerencianet/gerencianet-sdk-php": "1.*"
	}
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

É hora de instalar os pacotes. Vá até o diretório em que está seu projeto no Terminal e execute:

```bash
$ composer install
```

E pronto! O download das dependências irá acontecer automaticamente, estas serão armazenadas em suas respectivas pastas e o Composer continuará com o restante do trabalho ao gerar o arquivo <code>composer.lock</code>.

Cabe frisar que, caso você necessite, por exemplo, excluir um pacote, basta deletar sua referência do arquivo <code>composer.json</code> e atualizar o Composer através do seguinte comando:

```bash
$ composer update
```

Dessa forma, o Composer será atualizado e, como não há mais a presença do pacote na diretiva <code>require</code>, ele será imediatamente "desinstalado".

### Resumo:

- Instalar o Composer;
- Informar, no arquivo <code>composer.json</code>, a SDK da Gerencianet que será instalada;
- Executar o comando de instalação no diretório do projeto: <code>$ composer install</code>;
- Pronto!


## 4. Instalação biblioteca PHP da Gerencianet sem o Composer

O uso do Composer (gerenciador de dependências) é recomendável, mas não obrigatório. Caso seja de seu interesse prosseguir sem utilizá-lo, você pode baixar diretamente uma de nossas <em>branches</em>, descompactar e subir a pasta (inclusive o arquivo "autoload.php") para o diretório de seu projeto.

Atualmente, oferecemos duas <em>branches</em>, intituladas <code>master</code> e <code>1.x</code>, sendo:

- <code>master</code>: utiliza versão recente do guzzle (^6.0.0) e é compatível com versões recentes do PHP (5.5, 5.6, 7.0 e 7.1). Esta é a versão padrão quando se baixa pelo Composer, sendo indicada para todos os projetos. <a href="https://gerencianet.com.br/material/api/php/api_v2.zip" target="_blank" title="Link Externo">Baixe neste link</a>.

- <code>1.x</code>: versão anterior da SDK, compatível com PHP 5.4 e 5.5 e utiliza guzzle 5.3.0. <a href="https://gerencianet.com.br/material/api/php/api_v1.zip" target="_blank" title="Link Externo">Baixe neste link</a>.

A branch <code>master</code> é a <em>default</em>, porém, você pode instalar a branch <code>1.x</code>. No decorrer desta página você encontrará orientações para as duas versões.

Importante reforçar que o conteúdo presente neste .zip é apenas um requisito para que você possa começar a utilizar a SDK em PHP da Gerencianet. Esta pasta por si só não é um "exemplo pronto" de uso da API Gerencianet, mas a SDK em PHP da Gerencianet que permite a utilização da API.

## 5. Erros Comuns (cURL error 60 ou cURL error 77)

Os erros a seguir não são da API Gerencianet, mas relacionados à componentes de seu servidor. Confira abaixo os erros mais comuns durante a instalação de nossa API e veja as soluções:

<a href="https://gerencianet.com.br/artigo/curl-error-60-ou-curl-error-77-como-resolver/" target="_blank" title="Link Externo"><h2>cURL error 60</h2></a>

<a href="https://gerencianet.com.br/artigo/curl-error-60-ou-curl-error-77-como-resolver/" target="_blank" title="Link Externo"><h2>cURL error 77</h2></a>

## 6. Vídeo: Instalação do Composer (Windows e Linux)

Pensando em oferecer novos meios de transmitir informações, a Gerencianet disponibiliza os vídeos a seguir com o objetivo de explicar, de maneira clara e objetiva, como instalar o Composer no sistema operacional Windows e Linux.

### Instalando o Composer via Windows

<br>

<iframe width="800" height="420" src="https://www.youtube.com/embed/bu9tUI3dHwI" frameborder="0" allowfullscreen></iframe>

<br>

### Instalando o Composer via Linux

<br>

<iframe width="800" height="420" src="https://www.youtube.com/embed/uQFhNJhbzdg" frameborder="0" allowfullscreen></iframe>

<br>

<blockquote class="alert-info">
<strong>Dica:</strong><br><br>
Para acesso as demais aulas, de outros assuntos, acesse a página <a href="https://dev.gerencianet.com.br/docs/curso-online-gerencianet" title="Link Interno">Curso Online de Integrações</a>.
</blockquote>

<br>

<hr>

## 7. Extra: timeout option

Este atributo está presente na SDK de PHP e permite que você defina no *request* do Guzzle em quanto tempo você quer que a resposta seja retornada. Para detalhes de como utilizar, consulte <a href="https://github.com/gerencianet/gn-api-sdk-php#getting-started" target="_blank" title="Link Externo">nosso repositório do Github</a>.