const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `**Fique tranquilo!** Você receberá a resposta do ticket <br>via e-mail em até 1 dia útil. <a href="https://gerencianet.com.br/fale-conosco/" title="ticket-suporte">**ABRIR TICKET**</a><br><br><img src="/img/icon-fale-conosco-2.svg" class="modulos" width="140" style="float:none;">`,
      title: 'COMO PODEMOS AJUDAR VOCÊ?',
      //image: `${baseUrl}img/icon-fale-conosco-2.svg`,
      imageAlign: 'top',
    },
    {
      content: '<p>Ligações originadas de telefone fixo:<br><strong><font color="#f37021">0800 941 2343</font></strong></p><p>Capitais e regiões metropolitanas:<br><font color="#f37021"><strong>4000-1234</strong></font></p><p>São Paulo e região:<br><font color="#f37021"><strong>(11) 2394-2208</strong></font></p>',
      title: 'ATENDIMENTO',
    },
    {
      content: '<img src="/img/icone-contato.svg" class="modulos" width="140" style="float:rigth;"><br><a href="https://play.google.com/store/apps/details?id=br.com.gerencianet.app&amp;hl=pt-BR" class="google-play" target="_blank"><span></span><img src="/img/badge-google-play-badge.png" class="modulos" width="140" style="float:left;"></a><a href="https://apps.apple.com/br/app/gerencianet/id1443363326" class="apple-store" target="_blank"><img src="/img/badge-apple-store.png" class="modulos" width="140" style="float:rigth;"></a><br>',
      title: 'ABRA SUA CONTA',
      //image: '${baseUrl}img/icone-contato.svg'
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1><font color="#f37021" size="10" >FALE CONOSCO</font></h1>           
          </header>
          <p>Veja como entrar em contato com a especialista!</p><br/>
          <GridBlock contents={supportLinks} layout="threeColumn"/>
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;


