const users = [
    {
        caption: "User1",
        image: "/img/favicon.png",
        infoLink: "https://",
        pinned: true
    }
];

const siteConfig = {
    title: "Gerencianet Integrações",
    tagline: "Documentação Técnica API",
    url: "https://gerencianet.com.br",
    baseUrl: "/",

    projectName: "doc-gerencianet",
    organizationName: "Gerencianet Pagamentos do Brasil",
    disableHeaderTitle: true,

    headerLinks: [
        { doc: "doc1", label: "Documentação" },
        { href: "https://github.com/gerencianet/", label: "GitHub" },
        {
            href: "https://gerencianet.com.br/central-de-ajuda/api/",
            label: "FAQs"
        },
        { href: "https://discord.gg/djJ5PHC", label: "Discord" },
        { page: "help", label: "Ajuda" },
        { languages: false }
    ],

    users,

    headerIcon: "img/gerencianet-logo.png",
    footerIcon: "img/favicon-footer.png",
    favicon: "img/favicon-32x32.png",

    colors: {
        primaryColor: "#323232",
        secondaryColor: "#008996"
    },

    fonts: {
        myFont: ["Bebas Neue Font"],
        myOtherFont: ["-apple-system", "system-ui"]
    },

    copyright:
        "© 2007-${new Date().getFullYear()} Gerencianet. Todos os direitos reservados. CNPJ: 09.089.356/0001-18",

    highlight: {
        theme: "monokai"
    },

    // Add custom scripts
    scripts: ["https://buttons.github.io/buttons.js"],

    script: [(id = "ze-snippet"), (src = "")],

    stylesheets: [
        {
            href:
                "https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap",
            type: "text/css"
        }
    ],

    onPageNav: "separate",

    cleanUrl: true,
    useEnglishUrl: false,

    ogImage: "img/undraw_online.svg",
    twitterImage: "img/undraw_tweetstorm.svg",

    docsSideNavCollapsible: true
};

module.exports = siteConfig;
