import Link from 'next/link'
import { useContext, useState } from 'react'

import { CurrentPageContext, NavVisibleContext } from '../lib/contexts'


const navItems = [
  {
    key: 'home',
    label: 'Home',
    url: '/',
    index: 0
  },
  {
    key: 'blog',
    label: 'Blog',
    url: '/posts',
    index: 1
  },
  {
    key: 'autograph',
    label: 'Autograph',
    url: '/autograph',
    index: 2
  }
].sort(({ index: a }, { index: b }) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  });

const Nav = (): JSX.Element => {

  const [open, setOpen] = useState(false);
  const show = true;
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);

  const [ backdropVisible, setBackdropVisible ] = useState(false);
  const [ navOpen, setNavOpen ] = useState(false);

  const hideNav = (toggle: boolean): void => {
    if (toggle) {
      setBackdropVisible(toggle);
      setTimeout(() => {
        setNavOpen(toggle);
      }, 100);
    } else {
      setNavOpen(toggle);
      setTimeout(() => {
        setBackdropVisible(toggle);
      }, 250);
    }
  };

  const handleClick = (e):void => {
    e.stopPropagation();
    hideNav(true);
  }
  
  if (!hasNav) {
    return (<></>);
  }

  const navContainerCss = (navOpen) ? 'navContainer navContainer--open' : 'navContainer navContainer--close';
  const navCss = (navOpen) ? 'nav nav--open' : 'nav nav--hide';
  const backdropCss = (backdropVisible) ? 'nav--backdrop' : 'nav--backdrop--hide';
  const navToggleCss = (navOpen) ? 'navToggle' : 'navToggle navToggle--closed';

  return (
    <div className={navContainerCss}>
      <div className='row navLogo--Container'>
        <div
          className={navToggleCss}
          onClick={() => hideNav(!navOpen)}>
        </div>
        <h1 className='navLogo logo'>Blocksyweb</h1>
      </div>
      <div
        className={backdropCss}
        onClick={() => hideNav(false)}>
        <div className={navCss}>
          {(navItems || []).map((item: any) => {
            const cssClass = (currentPage === item.key) ? 'navItem navItem--active' : 'navItem';
            return (
              <div key={item.key} className={cssClass} onClick={handleClick}>
                <Link href={item.url}>
                  <a>{item.label}</a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Nav;