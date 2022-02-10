import Image from 'next/image'
import { useContext, useEffect } from 'react'

import Layout from '../components/Layout'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../lib/contexts'

const HomePage = (): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);
  const { isFullPage, setIsFullPage } = useContext(FullPageContext);

  useEffect(() => {
    setCurrentPage('home');
    setIsFullPage(true);
    setOggData({
      ogTitle: 'Block chain, Crypto, NFTs tools and information',
      ogImg: null,
    });
    setHasNav(false);
  }, []);

  return (
    <Layout>
      <div className='home'>
        <section className='mb-20'>
          <div className='p-0 relative overflow-hidden flex items-center bg-cover' style={{ minHeight: '75vh', backgroundImage: 'url(\'/images/home-header.jpg\')' }}>
            <span className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-attachment-fixed bg-gradient-info opacity-80'></span>
            <div className='container z-10 px-6'>
              <div className='grid grid-cols-1'>
                <h1 className='logo' data-test-id="logo">
                  <Image
                    src={'/images/logo-horizontal-white.png'}
                    alt={'Blocksyweb logo'}
                    width={464}
                    height={144}
                  />
                </h1>
                <div className='lg:max-w-2xl my-auto'>
                  <h2 className='text-6xl font-extrabold tracking-tight text-white mb-6'>
                    Helping you learn<br/>
                    <span>about crypto &amp; defi</span>
                  </h2>
                  <p className='text-xl mb-6 text-white opacity-90'>
                    We're busy building our library of easy to-read articles, in-depth analysis and tools to help the beginner, NFT creators, collectors and the defi community at large.
                  </p>
                  <div>
                    <button
                      type="button" 
                      className='px-7 py-3 bg-gray-200 text-gray-900 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-300 ease-in-out mt-6 mr-2'
                      data-test-id="btnComingSoon">
                      Coming soon!
                    </button>
                    {/* <button type="button" className='inline-block px-7 py-3 bg-transparent text-white font-medium text-sm leading-snug uppercase rounded hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out mt-6'>
                      See Demo
                    </button>
                    <button type="button" className='inline-block px-7 py-3 bg-transparent text-white font-medium text-sm leading-snug uppercase rounded hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out mt-6'>
                      See Demo
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute w-full z-10 bottom-0'>
              <svg className='waves' 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
              >
                <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className='simple-waves'>
                  <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                  <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                  <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                  <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
              </svg>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;