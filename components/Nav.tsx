import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { CurrentPageContext, NavVisibleContext } from '../lib/contexts'

type Page = {
  key: string,
  label: string,
  url: string,
  index: number,
  enabled: boolean,
};

const navItems: Page[] = [
  {
    key: 'blog',
    label: 'Blog',
    url: '/posts',
    index: 0,
    enabled: true,
  },
  {
    key: 'definitions',
    label: 'Definitions',
    url: '/definitions',
    index: 1,
    enabled: true,
  },
  {
    key: 'investor',
    label: 'Investor',
    url: '/investor',
    index: 2,
    enabled: true,
  },
  {
    key: 'autograph',
    label: 'Autograph',
    url: '/autograph',
    index: 3,
    enabled: false,
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
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);
  
  if (!hasNav) {
    return (<></>);
  }

  return (
    <>
      <nav className='fixed w-full flex flex-wrap items-center justify-between py-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-md navbar navbar-expand-lg navbar-bg z-50'>
        <span className='gradient'></span>
        <div className='container-fluid w-full flex flex-wrap items-center justify-between px-4 clickable'>
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
              {(navItems || []).filter((page: Page) => page.enabled).map((page: Page) => {
                const cssClass = (currentPage === page.key) ? 'navItem navItem--active' : 'navItem';
                return (
                  <li key={page.key} className={`nav-item pr-2 ${cssClass}`}>
                    <Link href={page.url}>
                      <a className='nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'>{page.label}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;