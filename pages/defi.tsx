import { useTranslation } from 'next-i18next'
import { useContext, useEffect, useState } from 'react'

import Chart from '../components/Defi/Chart'
import Table from '../components/Defi/Table'
import Layout from '../components/Layout'
import {
  CurrentPageContext,
  OggDataContext,
  PageBgContext
} from '../lib/contexts'

const Defi = (): JSX.Element => {

  const { t } = useTranslation('common');
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { pageCss, setPageCss } = useContext(PageBgContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  const [byValue, setByValue] = useState(true);
  const [data, setData] = useState(null);
  const [chartView, setChartView] = useState(true);
  const [showGains, setShowGains] = useState(false);

  const setView = (): void => {
    (window.matchMedia('(min-width: 1000px)').matches) ? setChartView(true) : setChartView(false);
  }

  const windowResize = (): void => {
    window.addEventListener('resize', () => {
      setView();
    });
  }

  const isDataStale = (startDate: string): boolean => {
    const milliSecondsInADay = 86_400_000;
    const numberOfDays = 3;
    const min = milliSecondsInADay * numberOfDays;
    const today = new Date().getMilliseconds();
    const compareDate = new Date(startDate).getMilliseconds();
    const diff = today - compareDate;
    return diff > min;
  };

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
      'https://api.oscarscampos.com/defi/data'
      // 'http://localhost:3000/defi/data'
    ).then(response => response.json()).then((resData) => {
      localStorage.setItem('defiData', JSON.stringify(resData));
      localStorage.setItem('defiDate', `${new Date()}`);
      setData(resData);
    })
  };

  useEffect(() => {
    setCurrentPage('blog');
    setPageCss('appContainer appContainer--light');
    setOggData({
      title: 'My defi investments',
      img: null,
    });
    setView();
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