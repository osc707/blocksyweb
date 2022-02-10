import { version } from '../package.json'
import { InvestmentDisclaimer } from './utils'

const Footer = ({ show = true}): JSX.Element => {

  if (!show) {
    return <></>;
  }
  
  return (
    <footer>
      <p>
        {`Copyright ${new Date().getFullYear()}`} | {version}
      </p>
      <InvestmentDisclaimer/>
    </footer>
  );
};

export default Footer;