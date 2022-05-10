import Head from 'next/head'
import Script from 'next/script'
import { useContext } from 'react'

import { OggDataContext } from '../lib/contexts'

const HeadComponent = (): JSX.Element => {
  const { oggData, setOggData } = useContext(OggDataContext);

  return (
    <>
      <Head>
        <title>{oggData.ogTitle + ' | Blocksyweb'}</title>
        <meta property="og:title" content={oggData.ogTitle} />
        {oggData.ogDesc && (
          <meta property="og:description" content={oggData.ogDesc} />
        )}
        {oggData.ogUrl && (
          <meta property="og:url" content={oggData.ogUrl} />
        )}
        {oggData.ogImg && (
          <meta property="og:image" content={oggData.ogImg} />
        )}
        <link rel="icon" href="/icons/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XEKMHVK2QB"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments) };
              gtag('js', new Date());
              gtag('config', 'G-XEKMHVK2QB');
            `
          }}
        />
      </Head>
    </>
  );
};

export default HeadComponent;