import { useContext, useState } from 'react'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { FullPageContext } from '../lib/contexts'
import HeadComponent from './HeadComponent'

const Layout = ({ children }): JSX.Element => {
  const { isFullPage, setIsFullPage } = useContext(FullPageContext);

  return (
    <>
      <HeadComponent />
      <Nav />
      <div className={(!isFullPage) ? 'appContainer appContainer--light px-8 py-24' : 'appContainer appContainer--light'}>
        {children}  
      </div>
      <Footer />
    </>
  )
};

export default Layout;