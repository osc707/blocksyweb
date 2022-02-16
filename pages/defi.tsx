import { format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'

import { Chart, Table } from '../components/Defi'
import Layout from '../components/Layout'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../lib/contexts'
import { dateFormat, isDataStale, setView } from '../services/defi.service'


const Defi = (): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);
  const { isFullPage, setIsFullPage } = useContext(FullPageContext);

  const [byValue, setByValue] = useState(true);
  const [data, setData] = useState(null);
  const [chartView, setChartView] = useState(true);
  const [showGains, setShowGains] = useState(false);

  const windowResize = (): void => {
    window.addEventListener('resize', () => {
      setView(setChartView);
    });
  }

  const loadData = (): void => {
    const savedData = localStorage.getItem('defiData');
    const lastSavedDate = localStorage.getItem('defiDate');

    if (lastSavedDate && savedData && !isDataStale(lastSavedDate)) {
      const data = JSON.parse(savedData);
      setData(data);
      return;
    }
    // load from nodejs
    fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/defi/data`
    ).then(response => response.json()).then((resData) => {
      localStorage.setItem('defiData', JSON.stringify(resData));
      localStorage.setItem('defiDate', `${format(new Date(), dateFormat)}`);
      setData(resData);
    })
  };

  useEffect(() => {
    setCurrentPage('blog');
    setIsFullPage(false);
    setHasNav(true);
    setOggData({
      ogTitle: 'Our defi investments',
      ogImg: null,
    });
    setView(setChartView);
    loadData();
    windowResize();
    setShowGains(
      new URLSearchParams(window.location.search).has('blocksyweb')
    );
  }, []);

  return (
    <Layout>
      <h2>My defi investments</h2>
      <p>This page is not investment advice. If you are seeing this it's because you found it. Always do your own research (DYOR).</p>
      {!data && (
        <div className='loading'>
          <img src='/images/Spinner.gif' />
        </div>
      )}
      {data && (
        <div className='flex items-center justify-center'>
          <div className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg' role="toolbar">
            <button
              onClick={() => setByValue(true)}
              type="button"
              className='rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'>
              $ value
            </button>
            <button
              onClick={() => setByValue(false)}
              type="button"
              className='rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'>
              # coins
            </button>
          </div>
        </div>
      )}
      {data && chartView && (
        <Chart
          data={data}
          byValue={byValue}
          showGains={showGains}
        />
      )}
      {data && !chartView && (
        <Table
          data={data}
          byValue={byValue}
          showGains={showGains}
        />
      )}
    </Layout>
  )
}

export default Defi;