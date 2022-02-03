import React, { useContext, useEffect, useState } from 'react'

import Layout from '../components/Layout'
import {
  CurrentPageContext,
  OggDataContext,
  PageBgContext
} from '../lib/contexts'

const Investor = (): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { pageCss, setPageCss } = useContext(PageBgContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const [coinCount, setCoinCount] = useState([1]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setCurrentPage('investor');
    setPageCss('appContainer appContainer--light');
    setOggData({
      title: 'Investor helper',
      img: null,
    });
  }, []);

  return (
    <Layout>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-8 gap-6">
                    <div className="col-span-8"><h2>Investor</h2></div>
                    <div className="col-span-8">
                      The idea for this is to help you define coins you want to buy, but to set a limit for when to stop buying them. Then instead buy an alternate so when the dip comes, you have cash on hand.
                    </div>
                    <div className="col-span-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Investment amount</label>
                      <input type="text" name="amount" id="amount" placeholder="5000" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div className="col-span-4 sm:col-span-4">
                      <label htmlFor="numOfCoins" className="block text-sm font-medium text-gray-700">Number of investments</label>
                      <select
                        onChange={(evt) => { 
                          const num = Number(evt.target.value);
                          const items = [];
                          for (let i = 0; i < num; i++) {
                            items.push(i);
                          }
                          setCoinCount(items);
                        }}
                        id="numOfCoins"
                        name="numOfCoins" 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    {coinCount.map((idx) => (
                      <React.Fragment key={idx}>
                        <div className="col-span-8 sm:col-span-2 lg:col-span-2">
                          <label htmlFor={`ticker-${idx}`} className="block text-sm font-medium text-gray-700">Coin ticker</label>
                          <input type="text" name={`ticker-${idx}`} id={`ticker-${idx}`} placeholder="BTC" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-8 sm:col-span-2 lg:col-span-2">
                          <label htmlFor={`percent-${idx}`} className="block text-sm font-medium text-gray-700">Percentage of purchase</label>
                          <input type="text" name={`percent-${idx}`} id={`percent-${idx}`} placeholder="10" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-8 sm:col-span-2 lg:col-span-2">
                          <label htmlFor={`maxPrice-${idx}`} className="block text-sm font-medium text-gray-700">Max price</label>
                          <input type="text" name={`maxPrice-${idx}`} id={`maxPrice-${idx}`} placeholder="56000" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-8 sm:col-span-2 lg:col-span-2">
                          <label htmlFor={`altCoin-${idx}`} className="block text-sm font-medium text-gray-700">Alternate purchase</label>
                          <input type="text" name={`altCoin-${idx}`} id={`altCoin-${idx}`} placeholder="GUSC" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Fetch
                  </button>
                </div>
              </div>
            </form>
            {response && (
              <>Has response</>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investor;