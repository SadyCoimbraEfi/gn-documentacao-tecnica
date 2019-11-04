const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_monitor_iqpq.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="https://gerencianet.com.br" target="_blank">ABRA SUA CONTA</Button>
            <Button href="https://gerencianet.com.br/login" target="_blank">ACESSAR MINHA CONTA</Button>
            <Button href={docUrl('doc1.html')}>PRIMEIROS PASSOS</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <br/><br/><h2>SIMPLIFIQUE AS SUAS COBRANÇAS COM A GERENCIANET</h2>
        <MarkdownBlock>### As soluções que você precisa para facilitar a sua gestão financeira</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: '<p align="justify">Se você é um desenvolvedor e pretende integrar seu site ou aplicação a um sistema completo de gestão de cobranças, você está no lugar certo! Esta documentação é destinada a desenvolvedores que desejam integrar com a API da Gerencianet. A Gerencianet é uma empresa Intermediadora de Pagamentos. Por meio dela, você pode emitir cobranças para seus clientes (por boleto, cartão, carnê ou assinaturas) sem ter que realizar convênios específicos com bancos ou operadoras de cartão de crédito. Atendendo a determinação da Febraban, os boletos e carnês gerados pela Gerencianet são registrados.</P>',
            image: `${baseUrl}img/undraw_programming_2svr.svg`,
            imageAlign: 'left',
            title: '<h1>Introdução à API Gerencianet</h1>',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="light">
        {[
          {
            content: '<p align="justify"><strong>Utilize seu saldo para compras e saques</strong> Com o cartão, você pode utilizar seu saldo para pagamentos em qualquer estabelecimento, físico ou online, nacional ou internacional, que aceite os cartões Visa e para saques em qualquer caixa eletrônico da Rede Plus.<br/><br/><strong>Mais agilidade e economia</strong> As transações de recarga de saldo no cartão e resgate de valores para a conta Gerencianet são imediatas e sem custo. Além disso, você não paga mensalidade ou anuidade.</p>',
            image: `${baseUrl}img/cartoes-frente-verso.png`,
            imageAlign: 'right',
            title: '<h1>Cartão pré-pago sem anuidade Gerencianet</h1>',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: '<p align="justify">Pensando em oferecer novos meios de transmitir informações, a Gerencianet lançou o Curso EAD da Universidade Gerencianet, que são vídeos em formato de aulas com o objetivo de explicar, de maneira clara e objetiva, como utilizar nossas soluções em pagamentos online e integrar o seu sistema ou aplicação com a API Gerencianet. O curso está disponível pela plataforma da Udemy. Após a realização de 100% do curso iremos disponibilizar um certificado digital em seu nome certificando-o da conclusão deste. O curso é gratuito e carga horária estimada de 6 horas.</p>',
            image: `${baseUrl}img/undraw_youtube_tutorial_2gn3.svg`,
            imageAlign: 'right',
            title: '<h1>Curso Integrações Gerencianet</h1>',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'A Gerencianet é especialista em boletos e foi o primeiro intermediador a emitir boletos registrados no Brasil. Por isso, ela é a melhor escolha para gerar boletos e carnês, sem as burocracias bancárias, sem tarifas de emissão, baixa ou cancelamento.',
            image: `${baseUrl}img/undraw_web_developer_p3e5.svg`,
            imageAlign: 'top',
            title: 'Boletos e Carnês',
          },
          {
            content: 'Essa solução simplifica o envio de links de pagamento, tanto à vista no boleto quanto parcelado no cartão de crédito. A configuração é realizada pelo emissor da cobrança e o comprador pode pagar em uma tela segura.',
            image: `${baseUrl}img/undraw_done_a34v.svg`,
            imageAlign: 'top',
            title: 'Links de pagamento',
          },
          {
            content: 'A solução de assinaturas é indicada para empresas, prestadores de serviços e pessoas físicas ou jurídicas que realizam vendas parceladas ou recebem pagamentos recorrentes. Assim, é possível receber de forma automática.',
            image: `${baseUrl}img/undraw_subscriber_vabu.svg`,
            imageAlign: 'top',
            title: 'Assinaturas',
          },
          {
            content: 'O marketplace é utilizado quando o valor pago deve ser dividido entre dois ou mais vendedores, que compartilham a mesma plataforma de vendas. A divisão é realizada de forma automática a cada novo recebimento.',
            image: `${baseUrl}img/undraw_share_opinion_jpw0.svg`,
            imageAlign: 'top',
            title: 'Marketplace',
          }
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <br/><br/><h2>FACILITE A SUA INTEGRAÇÃO COM AS NOSSAS SDKS</h2>
          <MarkdownBlock>### Confira nossa documentação e integre de forma facilitada</MarkdownBlock><br/>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-dotnet" target="_blank" title="C# .NET" ><img src="img/c-sharp-logo.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-go" target="_blank" title="Golang"><img src="img/golang.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-java" target="_blank" title="Java"><img src="img/java-coffee-cup-logo.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-python" target="_blank" title="Python"><img src="img/python.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-ruby" target="_blank" title="Ruby"><img src="img/ruby-programming-language.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-php" target="_blank" title="PHP"><img src="img/php-logo.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-node" target="_blank" title="NodeJS"><img src="img/nodejs.png"/></a>
          <a className="productShowcaseSection paddingBottom" href="https://github.com/gerencianet/gn-api-sdk-delphi" target="_blank" title="Delphi"><img src="img/delphi-ide.png"/></a>
        </div>

      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <TryOut />
          <LearnHow />
          <FeatureCallout />
          <Features />
          <Description />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
