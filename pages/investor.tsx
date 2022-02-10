import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

import { InvestorCodeView, InvestorFormView } from '../components/Investor'
import Layout from '../components/Layout'
import { CurrentPageContext, OggDataContext } from '../lib/contexts'
import { currencyList } from '../lib/utils'

const Investor = (): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const [coinCount, setCoinCount] = useState([1]);
  const [response, setResponse] = useState(null);
  const [formView, setFormView] = useState(true);
  const [matrix, setMatrix] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [investment, setInvestment] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

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
      'http://localhost:3000/investor/calculate',
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
  }
  
  const color = 'grey';

  useEffect(() => {
    setCurrentPage('investor');
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
                      How does this tool work? Read our <Link href={'/posts/dollar-cost-averaging-and-using-the-investor-tool'}><a>dollar-cost averaging (DCA)</a></Link> post.
                    </div>
                    <div className="col-span-8">
                      <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                          <a className={
                              "text-xs font-bold uppercase px-5 py-3 rounded block leading-normal " +
                              ((formView) ? `text-white bg-${color}-600` : `text-black bg-white`)
                            }
                            onClick={(e) => { e.preventDefault(); handleTabChange(true); }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                          >
                            Form
                          </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                          <a
                            className={
                              "text-xs font-bold uppercase px-5 py-3 rounded block leading-normal " +
                              ((!formView) ? `text-white bg-${color}-600` : `text-black bg-white`)
                            }
                            onClick={(e) => { e.preventDefault(); handleTabChange(false); }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                          >
                            Code view
                          </a>
                        </li>
                      </ul>
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
                      <select 
                        onChange={handleCurrencyChange}
                        defaultValue={'USD'}
                        id="currency" 
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        {currencyList.map((currency: any) => (
                          <option value={currency.code} key={currency.code}>
                            {currency.code} {currency.desc}
                          </option>
                        ))}
                      </select>
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
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Fetch
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