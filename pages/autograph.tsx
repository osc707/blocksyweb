import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import {
  AutographPhysicalFile,
  VerifyIPFSFile,
  VerifyPhysicalFile
} from '../components/Autograph'
import Layout from '../components/Layout'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../lib/contexts'
import {
  calcTokensRequired,
  fetchSavedWallet,
  fetchWalletsAndPrices,
  getWalletAddress
} from '../services/autograph.service'

const gradient = 'linear-gradient(310deg, rgba(106,17,203,.8) 0%, rgba(37,117,252,.8) 100%)';

const Autograph = (): JSX.Element => {
  const { setCurrentPage } = useContext(CurrentPageContext);
  const { setOggData } = useContext(OggDataContext);
  const { setHasNav } = useContext(NavVisibleContext);
  const { setIsFullPage } = useContext(FullPageContext);
  const [wallet, setWallet] = useState(null);
  const [transId, setTransId] = useState('null');
  const [chain, setChain] = useState(null);
  const [wallets, setWallets] =  useState([]);
  const [prices, setPrices] =  useState([]);
  
  useEffect(() => {
    setCurrentPage('autograph');
    setIsFullPage(false);
    setHasNav(true);
    setOggData({
      ogTitle: 'Autograph',
      ogImg: null,
    });
    setWallet(fetchSavedWallet());

    fetchWalletsAndPrices().then((resp) => {
      setWallets(resp.wallets);
      setPrices(resp.prices);
    });
  }, []);

  useEffect(() => {
    if (wallet && transId) {
      // we have a 
      console.log('valid transaction');
    }
  }, [wallet, transId]);

  const walletSelected = (ticker: string) => {
    const cost = calcTokensRequired(ticker, prices);
    const walletAddress = getWalletAddress(ticker, wallets);
    console.log(cost, walletAddress);
    // complete getting wallet address and launch payment window
  }

  return (
    <Layout>
      <div className='autograph'>
        <h2 className='text-center'>Autograph</h2>
        {(wallet && transId) && (
          <div className='row justify-between'>
            <AutographPhysicalFile
              wallet={wallet}
            />
            <VerifyPhysicalFile/>
            <VerifyIPFSFile/>
          </div>
        )}
        {(!wallet && !transId) && (
          <>
            <div className='container mx-auto'>
              <section className='mb-20'>
                <div className='grid md:grid-cols-3 gap-4 flex justify-center'>
                  <div className='mb-6 lg:mb-0'>
                    <div className='block rounded-lg shadow-lg text-white relative overflow-hidden bg-no-repeat bg-cover' style={{ backgroundPosition: '50%' }}>
                      <Image src="https://mdbootstrap.com/img/Photos/new-templates/img9.jpg" alt='' />
                      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed' style={{ background: gradient }}>
                        <div className='flex justify-center items-center h-full'>
                          <div className='opacity-100 p-6 lg:p-12 text-center'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bed" className='w-7 h-7 mb-12 mx-auto' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                              <path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"></path>
                            </svg>
                            <h2 className='text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium mb-6'>Live and relax in the best places</h2>
                            <p className='mb-12 md:mb-10 lg:mb-12'>Houses and apartaments offer</p>
                            <button type="button" className='inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' data-mdb-ripple="true" data-mdb-ripple-color="light">Get started</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mb-6 lg:mb-0'>
                    <div className='block rounded-lg shadow-lg text-white relative overflow-hidden bg-no-repeat bg-cover' style={{ backgroundPosition: '50%' }}>
                      <Image src="https://mdbootstrap.com/img/Photos/new-templates/img10.jpg" alt=''/>
                      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed' style={{ background: gradient }}>
                        <div className='flex justify-center items-center h-full'>
                          <div className='opacity-100 p-6 lg:p-12 text-center'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dharmachakra" className='w-7 h-7 mb-12 mx-auto' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M495 225.06l-17.22 1.08c-5.27-39.49-20.79-75.64-43.86-105.84l12.95-11.43c6.92-6.11 7.25-16.79.73-23.31L426.44 64.4c-6.53-6.53-17.21-6.19-23.31.73L391.7 78.07c-30.2-23.06-66.35-38.58-105.83-43.86L286.94 17c.58-9.21-6.74-17-15.97-17h-29.94c-9.23 0-16.54 7.79-15.97 17l1.08 17.22c-39.49 5.27-75.64 20.79-105.83 43.86l-11.43-12.95c-6.11-6.92-16.79-7.25-23.31-.73L64.4 85.56c-6.53 6.53-6.19 17.21.73 23.31l12.95 11.43c-23.06 30.2-38.58 66.35-43.86 105.84L17 225.06c-9.21-.58-17 6.74-17 15.97v29.94c0 9.23 7.79 16.54 17 15.97l17.22-1.08c5.27 39.49 20.79 75.64 43.86 105.83l-12.95 11.43c-6.92 6.11-7.25 16.79-.73 23.31l21.17 21.17c6.53 6.53 17.21 6.19 23.31-.73l11.43-12.95c30.2 23.06 66.35 38.58 105.84 43.86L225.06 495c-.58 9.21 6.74 17 15.97 17h29.94c9.23 0 16.54-7.79 15.97-17l-1.08-17.22c39.49-5.27 75.64-20.79 105.84-43.86l11.43 12.95c6.11 6.92 16.79 7.25 23.31.73l21.17-21.17c6.53-6.53 6.19-17.21-.73-23.31l-12.95-11.43c23.06-30.2 38.58-66.35 43.86-105.83l17.22 1.08c9.21.58 17-6.74 17-15.97v-29.94c-.01-9.23-7.8-16.54-17.01-15.97zM281.84 98.61c24.81 4.07 47.63 13.66 67.23 27.78l-42.62 48.29c-8.73-5.44-18.32-9.54-28.62-11.95l4.01-64.12zm-51.68 0l4.01 64.12c-10.29 2.41-19.89 6.52-28.62 11.95l-42.62-48.29c19.6-14.12 42.42-23.71 67.23-27.78zm-103.77 64.33l48.3 42.61c-5.44 8.73-9.54 18.33-11.96 28.62l-64.12-4.01c4.07-24.81 13.66-47.62 27.78-67.22zm-27.78 118.9l64.12-4.01c2.41 10.29 6.52 19.89 11.95 28.62l-48.29 42.62c-14.12-19.6-23.71-42.42-27.78-67.23zm131.55 131.55c-24.81-4.07-47.63-13.66-67.23-27.78l42.61-48.3c8.73 5.44 18.33 9.54 28.62 11.96l-4 64.12zM256 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm25.84 125.39l-4.01-64.12c10.29-2.41 19.89-6.52 28.62-11.96l42.61 48.3c-19.6 14.12-42.41 23.71-67.22 27.78zm103.77-64.33l-48.29-42.62c5.44-8.73 9.54-18.32 11.95-28.62l64.12 4.01c-4.07 24.82-13.66 47.64-27.78 67.23zm-36.34-114.89c-2.41-10.29-6.52-19.89-11.96-28.62l48.3-42.61c14.12 19.6 23.71 42.42 27.78 67.23l-64.12 4z"></path></svg>
                            <h2 className='text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium mb-6'>Calm down and find yourself</h2>
                            <p className='mb-12 md:mb-10 lg:mb-12'>Meditation and retreats offer</p>
                            <button type="button" className='inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' data-mdb-ripple="true" data-mdb-ripple-color="light">Get started</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mb-0'>
                    <div className='block rounded-lg shadow-lg text-white relative overflow-hidden bg-no-repeat bg-cover' style={{ backgroundPosition: '50%' }}>
                      <Image src="https://mdbootstrap.com/img/Photos/new-templates/img11.jpg" alt=''/>
                      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed' style={{ background: gradient }}>
                        <div className='flex justify-center items-center h-full'>
                          <div className='opacity-100 p-6 lg:p-12 text-center'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="pagelines" className='w-7 h-7 mb-12 mx-auto' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path fill="currentColor" d="M384 312.7c-55.1 136.7-187.1 54-187.1 54-40.5 81.8-107.4 134.4-184.6 134.7-16.1 0-16.6-24.4 0-24.4 64.4-.3 120.5-42.7 157.2-110.1-41.1 15.9-118.6 27.9-161.6-82.2 109-44.9 159.1 11.2 178.3 45.5 9.9-24.4 17-50.9 21.6-79.7 0 0-139.7 21.9-149.5-98.1 119.1-47.9 152.6 76.7 152.6 76.7 1.6-16.7 3.3-52.6 3.3-53.4 0 0-106.3-73.7-38.1-165.2 124.6 43 61.4 162.4 61.4 162.4.5 1.6.5 23.8 0 33.4 0 0 45.2-89 136.4-57.5-4.2 134-141.9 106.4-141.9 106.4-4.4 27.4-11.2 53.4-20 77.5 0 0 83-91.8 172-20z"></path>
                            </svg>
                            <h2 className='text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium mb-6'>Discover nature around the world</h2>
                            <p className='mb-12 md:mb-10 lg:mb-12'>Ethical and safe tours offer</p>
                            <button type="button" className='inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' data-mdb-ripple="true" data-mdb-ripple-color="light">Get started</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className='row'>
              {wallets.map((wallet: any) => (
                // https://codepen.io/w3collective/pen/PoZyZEg
                // Todo: launch modal with address info
                <div className='flip' key={wallet.ticker.replace('$', '')}>
                  <div className='flip-content'>
                    <div className={ 'flip-front ' + wallet.ticker.replace('$', '') }>
                      <p>Pay with {wallet.ticker}</p>
                    </div>
                    <div className='flip-back'>
                      <button
                        onClick={() => walletSelected(wallet.ticker)}
                      >View {wallet.ticker} info</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
};

export const getServerSideProps = async () => ({
  props: {},
})

export default Autograph;