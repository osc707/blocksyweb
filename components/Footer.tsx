import { version } from '../package.json'

const Footer = ({ show = true}): JSX.Element => {

  if (!show) {
    return <></>;
  }
  
  return (
    <footer>
      <p>
        {`Copyright ${new Date().getFullYear()}`} | {version}
      </p>
    </footer>
  );
};

export default Footer;