import { useContext, useState } from 'react'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { PageBgContext } from '../lib/contexts'
import HeadComponent from './HeadComponent'

const Layout = ({ children }): JSX.Element => {
  const { pageCss, setPageCss } = useContext(PageBgContext);

  return (
    <>
      <HeadComponent />
      <Nav />
      <div className={pageCss}>
        {children}  
      </div>
      <Footer />
    </>
  )
};

export default Layout;