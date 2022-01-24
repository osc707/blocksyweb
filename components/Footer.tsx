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
        {`Copyright ${new Date().getFullYear()}`} | {version}
      </p>
    </footer>
  );
};

export default Footer;