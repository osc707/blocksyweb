import Footer from '../components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Header from '../components/Header';

const HomePage = (): JSX.Element => {

  const { t } = useTranslation('common')

  return (
    <>
      <Header />
      <div>Blocksyweb</div>
      <Footer />
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});


export default HomePage;