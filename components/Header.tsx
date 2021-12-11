import { useTranslation } from 'next-i18next'
import Head from 'next/head';

type ogData = {
  ogImg?: string
}

type HeaderProps = {
  title?: string,
  heading?: string,
  ogData?: ogData,
}

const Header = ({ title, heading, ogData }: HeaderProps): JSX.Element => {

  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{title ? title : t('title')}</title>
        {ogData && (<></>)}
        <link href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css' rel='stylesheet' />
        <link href='https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:600' rel='stylesheet' />
      </Head>
      {heading ? <h1>{heading}</h1> : null}
    </>
  );
};

export default Header;