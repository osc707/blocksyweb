import { createContext } from 'react'


export const CurrentPageContext = createContext({
  currentPage: 'home',
  setCurrentPage: null
});

export const NavVisibleContext = createContext({
  hasNav: true,
  setHasNav: null
});

export const PageBgContext = createContext({
  pageCss: 'appContainer',
  setPageCss: null
});

export const OggDataContext = createContext({
  oggData: null,
  setOggData: null,
});