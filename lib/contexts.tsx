import { createContext } from 'react'


export const CurrentPageContext = createContext({
  currentPage: 'home',
  setCurrentPage: null
});

export const NavVisibleContext = createContext({
  hasNav: true,
  setHasNav: null
});

export const FullPageContext = createContext({
  isFullPage: false,
  setIsFullPage: null
});

export const OggDataContext = createContext({
  oggData: null,
  setOggData: null,
});

export const ToastContext = createContext({
  toastData: null,
  setToastData: null,
});