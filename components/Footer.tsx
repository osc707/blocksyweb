import { version } from '../package.json'
import { useTranslation } from 'next-i18next'


const Footer = (): JSX.Element => {

  const { t } = useTranslation('common')

  return (
    <footer>
      <p>
        {t('footer')} | {version}
      </p>
    </footer>
  );
};

export default Footer;