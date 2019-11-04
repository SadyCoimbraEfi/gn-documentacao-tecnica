---
id: doc2
title: Introdução ao Playground
---

Para acessar o ambiente de testes você precisa de uma conta Gerencianet. <a href="https://gerencianet.com.br/#abrirconta" title="Cadastro ao nosso sistema, seja nosso cliente" target="_blank">Crie sua conta</a>.

Antes de colocar uma aplicação em produção, é muito importante certificar-se que sua implementação está correta e suas integrações estão comunicando da forma como deveriam.

Para evitar que os integradores tenham que fazer testes em produção, a Gerencianet oferece um ambiente de desenvolvimento/testes (sandbox), no qual chamamos de *“Playground”*. Este é um local no qual o integrador pode utilizar para conhecer o mecanismo e o fluxo de pagamento em um ambiente 100% de teste e descomplicado. 

Neste ambiente, por oferecer uma semelhança com os recursos suportados pela API no ambiente de produção, é possível efetuar testes de integração antes de ir para produção, podendo assim fazer uma experiência com nossa API sem fazer alterações em sua conta Gerencianet.

<blockquote class="alert-info">
<strong>Playground... Sandbox... Ambiente de Desenvolvimento, o que significa?</strong><br><br>
É importante saber que as palavras **Playground, Sandbox e Ambiente de Desenvolvimento**, no contexto da Gerencianet, são sinônimos no sentido de fazerem referência ao local de testes que oferecemos em que você pode testar à vontade sua integração com a API.

Especificamente no caso do Playground, trata-se de um *sandbox online* que a Gerencianet disponibiliza, de forma que o integrador possa testar, de forma rápida e fácil, se os dados que pretende enviar para a API estão corretos e seguem o padrão exigido.

Usando o Playground, o integrador não precisa sequer escrever linhas de códigos, basta estar conectado à Internet e logado em sua conta Gerencianet, copiando e colando os códigos que disponibilizamos nos links a seguir: [Transações](https://dev.gerencianet.com.br/docs/playground-transacoes), [Carnês](https://dev.gerencianet.com.br/docs/playground-carnes), [Notificações](http://google.com), [Assinaturas](https://dev.gerencianet.com.br/docs/playground-assinaturas) e [Outros](https://dev.gerencianet.com.br/docs/playground-outros).
</blockquote>


<blockquote class="alert-danger">
<strong>ATENÇÃO</strong><br><br>
Importante salientar que **os boletos gerados em sandbox não são válidos e não podem ser pagos**, possuem a linha digitável "zerada" e uma marca d'água ao fundo informando ser um boleto de teste.

**Os pagamentos de cobranças de sandbox utilizando cartão de crédito são fictícios, mesmo se utilizar um cartão "real".** Todos os pagamentos de cartão neste ambiente terão o pagamento confirmado automaticamente, mas é apenas uma alteração de status para "Pago". Este recurso permite que você teste a notificação do status <code>paid</code>.

**Isso significa que todos os pagamentos realizados em sandbox não são reais e, portanto, não há cobrança de nenhuma importância financeira.** 
</blockquote>

<p>Para iniciar a utilização do Playground, siga as instruções:</p>
<ol>
  <li><p>Acesse <a href="http://www.gerencianet.com.br" target="_blank" title="Link Externo">nosso site</a>, clique em <a href="https://gerencianet.com.br/#login" target="_blank" title="Link Externo">Entrar</a> (menu superior) e efetue login em sua conta;</p></li>
  
  <li><p>Clique em <code>API</code>, depois <code>Minhas Aplicações > Nova aplicação</code> (<a href="http://image.prntscr.com/image/80b55642a21c4837b6fee00e7ed0758a.png" target="_blank" title="Link Externo">?</a>), definindo um nome para a sua aplicação.</p></li>
</ol>
<p>Estando dentro da aplicação criada, é possível observar todos os endpoints disponibilizados pela API, ou seja, tudo que é possível fazer via integração. Através do Playground, o integrador pode conhecer as informações que podem ser enviadas em cada situação, quais são obrigatórias, em quais formatos devem ser enviadas, etc.</p>

<p>Para acompanhar os procedimentos realizados no Playground, utilize a aba <code>Desenvolvimento</code>, especificamente nas subabas <abbr title="Toda cobrança que for criada poderá ser vista nesta aba">Transações</abbr>, <abbr title="Lista todas as assinaturas criadas">Assinaturas</abbr>, <abbr title="Lista todos os carnês criados">Carnês</abbr>, <abbr title="Mostra todas as requisições do seu sistema, tenha tido sucesso ou falha">Histórico de Requisições</abbr> e <abbr title="Mostra toda notificação enviada pelo sistema Gerencianet e a resposta da URL que recebeu o POST">Histórico de Notificações</abbr>.</p>

<p>Cada <em>endpoint</em> possui um campo editável para informar os <abbr title="JSON com as informações que o endpoint deve receber para realizar a ação">dados de entrada</abbr> e um campo não-editável para mostrar o <abbr title="JSON que descreve a estrutura dos dados, incluindo todas as informações que podem ser enviadas e as especificidades de cada uma">Schema</abbr>. Os <em>endpoints</em> estão divididos em 5 (cinco) grupos principais: <code>Transações</code>, <code>Carnês</code>, <code>Notificações</code>, <code>Assinaturas</code> e <code>Outros</code>.</p>

## Explore nosso ambiente de testes

A Gerencianet oferece duas formas de utilizar o ambiente de testes (sandbox): (a) dentro de sua conta Gerencianet através do Playground ou (b) utilizando suas chaves <code>Client_Id</code> e <code>Client_Secret</code> de desenvolvimento:

- (a) O Playground é um ambiente isolado, semelhante ao ambiente de produção - é o local dentro de sua conta Gerencianet que você pode testar os recursos da API de forma online, sem precisar programar. Veja:

  - <a href="https://gerencianet.com.br/#login" target="_blank" title="Link Externo">Faça login</a> em sua conta Gerencianet, acesse o menu <code>API</code>, depois <code>Minhas Aplicações > Nova aplicação</code> (<a href="http://image.prntscr.com/image/80b55642a21c4837b6fee00e7ed0758a.png" target="_blank" title="Link Externo">?</a>), definindo um nome para a sua aplicação; e

  - A partir de agora, veja como usar nosso <a href="https://dev.gerencianet.com.br/docs/playground" target="_blank" title="Link Interno">Playground</a> e copie os códigos disponibilizados na seção <a href="https://dev.gerencianet.com.br/v1/docs/ambiente-de-testes" target="_blank" title="Link Interno">Ambiente de Testes</a> da documentação e explore o Playground.

- (b) Você também pode realizar testes de integração direto em sua aplicação/sistema antes de ir para ambiente de produção. Para isso, utilize suas chaves <code>Client_Id</code> e <code>Client_Secret</code> da aba <code>Desenvolvimento</code> (<a href="http://image.prntscr.com/image/447be4bc64644a35bcf5eaecd1125f5d.png" target="_blank" title="Link Externo">?</a>), além de definir <code>sandbox => true</code>.

Adicionalmente, oferecemos vídeos ensinando mais sobre a API e nosso Playground:

- Vídeo: <a href="https://www.youtube.com/watch?v=oy4aydoLUZA&index=5&list=PLRqvcUTH2VsWKL03a0dUMaPobAKUSXyxt" target="_blank" title="Link Externo">API Gerencianet</a>

- Vídeo: <a href="https://www.youtube.com/watch?v=nKPb0rU8j4Q&index=6&list=PLRqvcUTH2VsWKL03a0dUMaPobAKUSXyxt" target="_blank" title="Link Externo">Métodos do Playground (ambiente de testes/sandbox da Gerencianet)</a>

- Vídeo: <a href="https://www.youtube.com/watch?v=ylqJUpHqwfY&index=7&list=PLRqvcUTH2VsWKL03a0dUMaPobAKUSXyxt" target="_blank" title="Link Externo">Criando uma transação via Playground (ambiente de testes/sandbox da Gerencianet)</a>



## GET, POST, PUT e DELETE

A API é RESTful, isso significa que os *endpoints* criados seguem práticas específicas para que sejam intuitivos para os integradores que a utilizam. Essas opções (GET, POST, PUT e DELETE) são "métodos" (verbo) que você usará para interagir com o recurso.

Todo *endpoint* do tipo **GET** é um *endpoint* de consulta, ou seja, o integrador nunca estará criando ou alterando um registro quando fizer um consumo desse tipo.

Os *endpoints* do tipo **POST** sempre estão relacionados à criação de algum registro. O <code>POST /v1/charge</code> cria uma cobrança; o <code>POST /v1/charge/:id/pay</code> cria um pagamento para uma determinada cobrança, e assim por diante.

Os *endpoints* do tipo **PUT** realizam a alteração de algum registro já existente. Quando o integrador utiliza <code>PUT /v1/charge/:id/cancel</code>, por exemplo, ele está alterando o status de uma cobrança para <code>canceled</code>.

Por fim, os *endpoints* do tipo **DELETE** são responsáveis por deletar um registro. Esse tipo de consumo sempre vai solicitar um identificador para deleção. Na API, apenas planos de assinaturas podem ser deletados.

## Interpretando as Respostas da API

A Gerencianet utiliza respostas HTTP para indicar sucesso ou falha nas requisições. Comumente, quando retornamos respostas com status <code>2xx</code> significa que houve sucesso na requisição; status <code>4xx</code> indicam falhas no envio de dados por parte do cliente; status <code>5xx</code> indicam erros internos de servidor.

Para mais detalhes, preparamos uma seção especial mostrando <a href="https://dev.gerencianet.com.br/docs/interpretando-erros-api" title="Link Interno">como interpretar as respostas da nossa API</a>, com exemplos reais e práticos. Para facilitar ainda mais, também gravamos um vídeo bem curto e objetivo. <a href="https://dev.gerencianet.com.br/docs/interpretando-erros-api" title="Link Interno">Não deixe de acessar e conferir</a>.


## Vídeos Explicativos: Playground

Pensando em oferecer novos meios de transmitir informações, a Gerencianet disponibiliza os vídeos a seguir com o objetivo de explicar, de maneira clara e objetiva, como utilizar o nosso Playground (sandbox).

### Métodos do Playground (ambiente de testes/sandbox da Gerencianet)
<br>
<iframe width="800" height="420" src="https://www.youtube.com/embed/nKPb0rU8j4Q" frameborder="0" allowfullscreen></iframe>
<br><br>

### Criando uma transação via Playground (ambiente de testes/sandbox da Gerencianet)
<br>
<iframe width="800" height="420" src="https://www.youtube.com/embed/ylqJUpHqwfY" frameborder="0" allowfullscreen></iframe>
<br><br>

Para acesso às demais aulas, de outros assuntos, acesse a seção "[Curso Online de Integrações](https://dev.gerencianet.com.br/docs/curso-online-gerencianet)".

## Próximos Passos

<p>Agora que você conheceu sobre nosso Playground, é interessante que conheça mais sobre os 5 (cinco) endpoints disponíveis em nossa área de testes:</p>

<div>
	<a href="https://dev.gerencianet.com.br/docs/playground-transacoes" target="_blank"><button type="button" class="button">Transações</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-carnes" target="_blank"><button type="button" class="button">Carnês</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-notificacoes" target="_blank"><button type="button" class="button">Notificações</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-assinaturas" target="_blank"><button type="button" class="button">Assinaturas</button></a>
	<a href="https://dev.gerencianet.com.br/docs/playground-outros" target="_blank"><button type="button" class="button">Outros</button></a>
</div>

<br><br>