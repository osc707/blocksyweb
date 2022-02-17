import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

import { InvestorCodeView, InvestorFormView } from '../components/Investor'
import Layout from '../components/Layout'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../lib/contexts'
import { currencyList } from '../lib/utils'

const Investor = (): JSX.Element => {
  const { setCurrentPage } = useContext(CurrentPageContext);
  const { setOggData } = useContext(OggDataContext);
  const { setHasNav } = useContext(NavVisibleContext);
  const { setIsFullPage } = useContext(FullPageContext);
  const [coinCount, setCoinCount] = useState([1]);
  const [response, setResponse] = useState(null);
  const [formView, setFormView] = useState(true);
  const [matrix, setMatrix] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [investment, setInvestment] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [hideInstructions, setHideInstructions] = useState(true);

  const submitForm = async (e: any): Promise<any> => {
    e.preventDefault();
    const formData = {
      amount: Number(investment),
      matrix: null,
      currency: selectedCurrency
    };
    if (matrix) {
      formData.matrix = JSON.parse(matrix);
    }
    if (formValues) {
      formData.matrix = formValues;
      setMatrix(JSON.stringify(formValues));
      setFormValues(null);
      setFormView(false);
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/investor/calculate`,
      formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const { data } = res;
    setResponse(data);
  };

  const handleTabChange = (formView: boolean): void => {
    if (formView) {
      setMatrix(null);
    } else {
      setFormValues(null);
    }
    setFormView(formView);
  };

  const handleInvestmentChange = (e: any): void => {
    if (e.target.value) {
      setInvestment(Number(e.target.value));
    } else {
      setInvestment(0);
    }
  };

  const handleCurrencyChange = (e:any): void => {
    setSelectedCurrency(e.target.value);
  };

  useEffect(() => {
    setCurrentPage('investor');
    setIsFullPage(false);
    setHasNav(true);
    setOggData({
      ogTitle: 'Dollar-cost averaging Investor tool',
      ogImg: null,
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
                      How does this tool work?&nbsp;
                      {hideInstructions && (
                        <Link href={'#'}><a onClick={() => setHideInstructions(false)}>show instructions</a></Link>
                      )}
                      {!hideInstructions && (
                        <Link href={'#'}><a onClick={() => setHideInstructions(true)}>hide instructions</a></Link>
                      )}
                      {!hideInstructions && (
                        <>
                          <ol>
                            <li>Enter the <strong>investment amount</strong></li>
                            <li>Select the <strong>currency</strong></li>
                            <li>Select the <strong>number of investments</strong> you are going to split your investment amount into. Example: BTC &amp; ETH, select 2</li>
                            <li>Fill out the <strong>Investment Matrix</strong></li>
                              <ol>
                                <li>Enter the <strong>coin ticker</strong> the ticker assigned for the coin. BTC for Bitcoin, ETH for Ethereum, etc.</li>
                                <li>Enter the <strong>percentage of purchase</strong>, this is the percentage of the total investment that you would like to allocate to this asset. Only numbers, no % sign</li>
                                <li>Enter the <strong>max price</strong> you would purchase this asset for. Example, 65000. Only numbers no currency symbols</li>
                                <li>Enter an <strong>alternate purchase</strong> ticker symbol. In case your primary choice is above your *max price*, it will suggest that instead of the initial ticker entered.</li>
                              </ol>
                            <li>Click <strong>Validate</strong> this ensures the form is valid</li>
                            <li>Click <strong>Generate</strong></li>
                          </ol>
                          Read more <Link href={'/posts/dollar-cost-averaging-and-using-the-investor-tool'}><a>dollar-cost averaging (DCA)</a></Link> post.
                          I hope you find this helpful. If you have any questions or comments, please visit our <Link href={'https://discord.com/channels/942668760765050900/942669903306035270'}><a>discord</a></Link>
                        </>
                      )}
                    </div>
                    <div className="col-span-8">
                      <div className="flex items-center justify-center">
                        <div className="inline-flex" role="group">
                          <button 
                            onClick={(e) => { e.preventDefault(); handleTabChange(true); }}
                            type="button" 
                            className="bg-indigo-600 disabled:bg-gray-300 rounded-l inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
                            disabled={formView}>
                              Form
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); handleTabChange(false); }}
                            type="button" 
                            className="bg-indigo-600 disabled:bg-gray-300 rounded-r inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
                            disabled={!formView}>
                              Code view
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Investment amount</label>
                      <input
                        onChange={handleInvestmentChange}
                        type="number"
                        name="amount" 
                        id="amount" 
                        placeholder="5000" 
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required={true}
                      />
                    </div>
                    <div className={(formView) ? "col-span-2" : "col-span-4"}>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Currency</label>
                      <input 
                        onChange={handleCurrencyChange}
                        defaultValue='USD'
                        id="currency" 
                        list="currencies"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <datalist id="currencies">
                        {currencyList.map((currency: any) => (
                          <option value={currency.code} key={currency.code}>
                            {currency.code} {currency.desc}
                          </option>
                        ))}
                      </datalist>
                    </div>
                    {formView && (
                      <InvestorFormView
                        coinCount={coinCount}
                        setCoinCount={setCoinCount}
                        setFormValues={setFormValues}
                      />
                    )}
                    {!formView && (
                      <InvestorCodeView
                        matrix={matrix}
                        setMatrix={setMatrix}
                        response={response}
                      />
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    disabled={!matrix && !formValues}
                    onClick={submitForm}
                    type="submit" 
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Generate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investor;