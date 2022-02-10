import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { CurrentPageContext, NavVisibleContext } from '../lib/contexts'

type Page = {
  key: string,
  label: string,
  url: string,
  index: number,
};

const navItems: Page[] = [
  {
    key: 'blog',
    label: 'Blog',
    url: '/posts',
    index: 0
  },
  {
    key: 'definitions',
    label: 'Definitions',
    url: '/definitions',
    index: 1
  },
  {
    key: 'investor',
    label: 'Investor',
    url: '/investor',
    index: 2
  },
  // {
  //   key: 'autograph',
  //   label: 'Autograph',
  //   url: '/autograph',
  //   index: 3
  // }
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
    <>
      <nav className='relative w-full flex flex-wrap items-center justify-between py-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-md navbar navbar-expand-lg navbar-bg'>
        <span className='gradient'></span>
        <div className='container-fluid w-full flex flex-wrap items-center justify-between px-4 clickable'>
          {/* <button className='navbar-toggler text-white border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className='w-6' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
              </path>
            </svg>
          </button> */}
          <div className='collapse navbar-collapse flex-grow items-center' id="navbarSupportedContent">
            <ul className='navbar-nav flex flex-row pl-0 list-style-none mr-auto mb-0'>
              <li className='nav-item px-2'>
                <a className='text-xl text-black logo' aria-current="page" href="/">
                  <Image
                    src={'/images/logo-stacked-white.png'}
                    alt={'Blocksyweb logo'}
                    width={54.8}
                    height={47.5}
                  />
                </a>
              </li>
              {(navItems || []).map((item: Page) => {
                const cssClass = (currentPage === item.key) ? 'navItem navItem--active' : 'navItem';
                return (
                  <li key={item.key} className={`nav-item pr-2 ${cssClass}`} onClick={handleClick}>
                    <Link href={item.url}>
                      <a className='nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'>{item.label}</a>
                    </Link>
                  </li>
                );
              })}
              {/* <li className='nav-item pr-2'>
                <a className='nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0' href="#">Features</a>
              </li>
              <li className='nav-item pr-2'>
                <a className='nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0' href="#">Pricing</a>
              </li>
              <li className='nav-item pr-2'>
                <a className='nav-link disabled text-gray-300 p-0'>Disabled</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;