import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { getStaticAssetPath } from '@utils';
import { SafeText } from '@components';

type MyDocumentProps = {
  host: string | undefined;
} & DocumentInitialProps;

const MyDocument = ({ host }: MyDocumentProps): JSX.Element => {
  const renderAnalyticsHead = () => {
    if (host !== 'd4x.app') {
      return '';
    }

    const googleTagManager = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P4LPDR8C');
    `;

    const cookie3 = `
      var cookie3Options = {"siteId":363,"additionalTracking":true,"cookielessEnabled":true}

      window._paq = window._paq || [];
      (function () {
          var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
          g.async = true; g.src = 'https://cdn.cookie3.co/scripts/analytics/latest/cookie3.analytics.min.js'; s.parentNode.insertBefore(g, s);
      })();
  `;

    return `${googleTagManager} ${cookie3}`;
  };

  const renderAnalytics = () => {
    if (host !== 'd4x.app') {
      return '';
    }

    const googleTagManagerNoScript = `
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4LPDR8C"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
    `;

    const metaPixel = `
      <!-- Meta Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '865413495098783');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=865413495098783&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Meta Pixel Code -->
    `;

    return <SafeText content={`${googleTagManagerNoScript} ${metaPixel}`} />;
  };

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Source+Code+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={getStaticAssetPath('reset.css', 'css')} />
        <script dangerouslySetInnerHTML={{ __html: renderAnalyticsHead() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        {renderAnalytics()}
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  return { ...initialProps, host: ctx?.req?.headers?.host };
};

export default MyDocument;
