import { version } from '../package.json'
import DiscordIcon from './Icons/DiscordIcon'
import TwitterIcon from './Icons/TwitterIcon'
import { InvestmentDisclaimer } from './utils'

const Footer = ({ show = true}): JSX.Element => {

  if (!show) {
    return <></>;
  }
  
  return (
    <footer className='flex flex-col'>
      <div className='flex flex-row flex-nowrap justify-between'>
        <div className='ml-2'>{`Copyright ${new Date().getFullYear()}`} | {version}</div>
        <div>
          <a href="http://www.twitter.com/Blocksyweb"
            aria-label="Link to our twitter profile"
            target="_blank"
            rel="noopener noreferrer">
              <TwitterIcon modClass={'mr-2'}/>
          </a>
          <a href="https://discord.com/channels/942668760765050900/942668761650061344"
            aria-label="Link to our discord server"
            target="_blank"
            rel="noopener noreferrer">
              <DiscordIcon modClass={'mr-2'}/>
          </a>
        </div>
      </div>
      <InvestmentDisclaimer/>
    </footer>
  );
};

export default Footer;