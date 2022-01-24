import { useTranslation } from 'next-i18next'

import { version } from '../package.json'


const Footer = ({ show = true}): JSX.Element => {

  if (!show) {
    return <></>;
  }

  const { t } = useTranslation('common');
  
  return (
    <footer>
      <p>
        {`${t('footer')} ${new Date().getFullYear()}`} | {version}
      </p>
    </footer>
  );
};

export default Footer;