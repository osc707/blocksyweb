import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useContext } from 'react'

import { OggDataContext } from '../lib/contexts'

const HeadComponent = (): JSX.Element => {

  const { t } = useTranslation('common')
  const { oggData, setOggData } = useContext(OggDataContext);

  return (
    <>
      <Head>
        <title>{oggData.title}</title>
        <meta property="og:title" content={oggData.ogTitle} />
        {oggData.desc && (
          <meta property="og:description" content={oggData.ogDesc} />
        )}
        {oggData.url && (
          <meta property="og:url" content={oggData.ogUrl} />
        )}
        {oggData.image && (
          <meta property="og:image" content={oggData.ogImg} />
        )}
        <link href='https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css' rel='stylesheet' />
      </Head>
    </>
  );
};

export default HeadComponent;