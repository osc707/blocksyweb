import '../public/styles/app.scss'

import { useEffect, useMemo, useState } from 'react'

import { GrayMatter } from '../lib/constants'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../lib/contexts'

const MyApp = ({ Component, pageProps }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const currentPageValue = useMemo(
    () => ({ currentPage, setCurrentPage }), 
    [currentPage]
  );

  const [hasNav, setHasNav] = useState(true);
  const hasNavValue = useMemo(
    () => ({ hasNav, setHasNav }), 
    [hasNav]
  );

  const [isFullPage, setIsFullPage] = useState(false);
  const isFullPageValue = useMemo(
    () => ({ isFullPage, setIsFullPage }),
    [isFullPage]
  );

  const [oggData, setOggData] = useState({
    ogTitle: 'Block chain, Crypto, NFTs tools and information',
    ogImg: null,
    tags: [],
    amzn: null,
    tb: null,
    date: null,
    ogDesc: null,
    ogUrl: null,
  } as GrayMatter);
  const oggDataValue = useMemo(
    () => ({ oggData, setOggData }),
    [oggData.ogTitle, oggData.ogUrl]
  );

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (reg) => console.log('SW registered', reg.scope),
          (err) => console.log('SW failed', err)
        );
      });
    }
  }, []);

  return (
    <CurrentPageContext.Provider value={currentPageValue}>
      <NavVisibleContext.Provider value={hasNavValue}>
        <FullPageContext.Provider value={isFullPageValue}>
          <OggDataContext.Provider value={oggDataValue}>
            <Component {...pageProps} />
          </OggDataContext.Provider>
        </FullPageContext.Provider>
      </NavVisibleContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export default MyApp;