import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { PageBgContext } from '../lib/contexts'
import HeadComponent from './HeadComponent'

const Layout = ({ children }): JSX.Element => {
  const { t } = useTranslation('common');
  const { pageCss, setPageCss } = useContext(PageBgContext);

  return (
    <>
      <HeadComponent />
      <div className={pageCss}>
        {children}  
      </div>
      <Footer />
      <Nav />
    </>
  )
};

export default Layout;