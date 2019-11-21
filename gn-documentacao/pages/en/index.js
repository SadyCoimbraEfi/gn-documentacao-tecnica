const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const translate = require('../../server/translate.js').translate;

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
      <div class="projectLogo">
        <br/><img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h1 class="titulo" className="projectTitle">
        <br/>{siteConfig.tagline}
      </h1>
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
            <Button href={docUrl('doc1')}>PRIMEIROS PASSOS</Button>
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

    const Apresentacao = () => (
      <Block background="light">
        {[
          {
            content: '<p align="left" class="corpo">Tudo o que você precisa em serviços de <strong>pagamentos</strong>. Aqui você encontra as documentações necessárias para integrar com as APIs, Bibliotecas e Módulos da <strong>API de Integrações Gerencianet</strong>.<br/></p>',
            image: `${baseUrl}img/code.png`,
            imageAlign: 'left',
            title: '<h1 class="titulo">Gerencianet Developers</h1>',
          },  
        ]}
      </Block>
    );    

    const TryOut = () => (
      <Block>
        {[
          {
            title: '<div class="sub-titulo"><b>Simplifique</b> as suas cobranças com a API Gerencianet<br/><br/></div>',
            content:'<div class="container"><div class="row"><div class="col-lg-10 col-12 mx-md-auto "><div class="embed-responsive embed-responsive-16by9 aos-animate" data-aos="fadeInUp"><iframe width="560" height="315" data-lazy="" data-src="https://www.youtube.com/embed/VrCmvnqZ0S4?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="https://www.youtube.com/embed/VrCmvnqZ0S4?rel=0" data-loaded="true"></iframe></div></div></div></div><br/><br/>',
            imageAlign: 'center'
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: '<p align="left" class="corpo2" style="max-width: 700px;">Pensando em oferecer novos meios de transmitir informações, a Gerencianet oferece o Curso <strong>EAD da Universidade Gerencianet</strong>, que são vídeos em formato de aulas com o objetivo de explicar, de maneira clara e objetiva, como utilizar nossas soluções em pagamentos online e integrar o seu sistema ou aplicação com a API Gerencianet. <br/><br/>O curso está disponível pela plataforma da <a href="https://www.udemy.com/course/eadgerencianet/" style="color: #008996"><strong>Udemy</strong></a>. Após a realização de 100% do curso iremos disponibilizar um certificado digital em seu nome certificando-o da conclusão deste.</p>',
            image: `${baseUrl}img/undraw_youtube_tutorial_2gn3.svg`,
            imageAlign: 'right',
            title: '<h1 class="sub-titulo">Curso Integrações Gerencianet</h1>',
          },
        ]}
      </Block>
    );

    /*const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <br/><br/><h1 className="sub-titulo">Integrações Gerencianet em números</h1>
      </div>
    );*/

    const Features = () => (
      <Block>
        {[
          {
            title: '<h1 class="sub-titulo">Suporte técnico e Integração via API</h1><br/><br/>',
            content: '<section class="section-8 numeros-gerencianet"><div class="container"><div class="row"><div class="col-lg-10 col-md-12 col-12 mx-md-auto"><ul class="list-numbers aos-animate" data-aos=""><li> <i class="icon-transacoes-anuais"><img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/icon-infografico-numeros-gerencianet-1.svg" alt="" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/icon-infografico-numeros-gerencianet-1.svg" data-loaded="true"></i> <span>Ambiente</span> <span><b> SANDBOX</b></span> <span> Teste sua integração<br>sem complicações</span> <img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" alt="" class="sombra-icon" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" data-loaded="true"></li><li> <i><img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/icon-infograficos-numeros-gerencianet-2.svg" alt="" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/icon-infograficos-numeros-gerencianet-2.svg" data-loaded="true"></i> <span>Consultoria</span> <span><b> TÉCNICA</b></span> <span> Tire suas dúvidas<br> com desenvolvedores</span> <img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" alt="" class="sombra-icon" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" data-loaded="true"></li><li> <i><img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/selo-12-anos-gerencianet.svg" alt="" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/svg/selo-12-anos-gerencianet.svg" data-loaded="true"></i> <span>Acesse</span> <span><b> GITHUB</b></span> <span> Projetos exclusivos<br>para sua integração</span> <img data-lazy="" data-src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" alt="" class="sombra-icon" src="https://gerencianet.com.br/wp-content/themes/Gerencianet/assets/images/sombra-numeros-gerencianet.png" data-loaded="true"></li></ul></div></div></div></section>'
          },
        ]}
       </Block>
    );

    const Description = () => (
      <Block background="light">
        {[
          {
            content: '<p align="justify" class="corpo2">Conheça os sistemas <strong><a href="#" style="color: #008996;"">Parceiros Oficiais da Gerencianet</a></strong> cuja integração com nossa API é nativa. Assim, você pode utilizar os serviços oferecidos pela Gerencianet de uma maneira simples e rápida, apenas preenchendo algumas configurações em seu sistema, de acordo com o manual da empresa proprietária do software.<br><br/>Seja também um <strong style="color: #008996;">parceiro</strong>!<br/><br/>Para a Gerencianet, este programa de parceria é sinônimo de um relacionamento com benefícios para ambas as partes, com desafios, metas, respeito, transparência e ganhos reais. <strong><a href="https://gerencianet.com.br/parceiros/" style="color: #008996;"> Quero fazer parte.</a></strong></p>',
            image: `${baseUrl}img/parcerio-seguranca.png`,
            imageAlign: 'left',
            title: '<h1 class="sub-titulo">Sistemas integrados <strong>parceiros</strong> da gerencianet</h1>',
          },
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
          <br/><br/><h1 className="sub-titulo"><br/><br/>FACILITE A SUA INTEGRAÇÃO COM AS NOSSAS SDKS</h1><br/>
          <div align="center" className="corpo">Confira nossa documentação e <strong>integre de forma facilitada</strong></div><br/><br/>
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
          <Apresentacao />
          <TryOut />
          <LearnHow />
          <Features />
          <Description />
          <Showcase />
        </div>
      </div>
    );
  }
}

/*Index.defaultProps = {
  language: 'pt-br',
};*/

module.exports = Index;