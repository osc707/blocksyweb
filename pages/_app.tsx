import '../public/styles/app.scss'

import { useEffect, useMemo, useState } from 'react'

import { GrayMatter } from '../lib/constants'
import {
  CurrentPageContext,
  NavVisibleContext,
  OggDataContext,
  PageBgContext
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

  const [pageCss, setPageCss] = useState('appContainer');
  const pageCssValue = useMemo(
    () => ({ pageCss, setPageCss }),
    [pageCss]
  );

  const [oggData, setOggData] = useState({
    ogTitle: 'Blocksyweb: Block chain, Crypto, NFTs tools and information',
    img: null,
    tags: [],
    amzn: null,
    tb: null,
    date: null,
    ogDesc: null,
    ogUrl: null,
    ogImg: null,
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
        <PageBgContext.Provider value={pageCssValue}>
          <OggDataContext.Provider value={oggDataValue}>
            <Component {...pageProps} />
          </OggDataContext.Provider>
        </PageBgContext.Provider>
      </NavVisibleContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export default MyApp;