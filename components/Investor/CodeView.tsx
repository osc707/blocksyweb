import React, { useEffect, useState } from 'react'

import { CopyIcon } from '../Icons'
import { Copy } from '../utils'

const InvestorCodeView = ({ matrix, setMatrix, response }): JSX.Element => {
  const [css, setCss] = useState('col-span-8');
  const handleOnChange = (e: any) => setMatrix(e.target.value);

  useEffect(() => {
    if (response) {
      setCss('col-span-4');
    }
  }, [response]);

  const formatResponse = (resp: any): JSX.Element => {
    return (
      <tbody>
        {resp?.purchases.map((item: any) => (
          <tr key={item.ticker}>
            <td className="border border-slate-300 py-2 px-4 text-left">{item.ticker}</td>
            <td className="border border-slate-300 py-2 px-4 text-right">{item.buyAmount} {item.currency}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <div className={css}>
        <label htmlFor="codeView" className="block text-sm font-medium text-gray-700">
          Matrix
          {response && (
            <Copy elmId="codeView">
              <CopyIcon modClass="ml-1" />
            </Copy>
          )}
        </label>
        <textarea 
          onChange={handleOnChange}
          id="codeView"
          name="codeView"
          className="form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
          rows={16}
          defaultValue={matrix}
          required={true}
          placeholder='[
            { "ticker": "BTC", "percent": 30, "maxPrice": 65000, "alt": "GUSD" },
            { "ticker": "ETH", "percent": 20, "maxPrice": 4900, "alt": "GUSD" },
            { "ticker": "ADA", "percent": 20, "maxPrice": 3.00, "alt": "GUSD" },
            { "ticker": "MATIC", "percent": 20, "maxPrice": 3.75, "alt": "GUSD" },
            { "ticker": "ONE", "percent": 10, "maxPrice": 0.50, "alt": "GUSD" }
          ]'></textarea>
      </div>
      {response && (
        <div className={css}>
          <label className="mt-6 block text-sm font-medium text-gray-700">Results</label>
          <table className="border-collapse border border-slate-400 w-full">
            <thead>
              <tr>
                <th className="border border-slate-300 py-2 px-4 text-left font-bold">Coin</th>
                <th className="border border-slate-300 py-2 px-4 text-right font-bold">Amount</th>
              </tr>
            </thead>
            {formatResponse(response)}
          </table>
          <div
            id="responseView"
            className="form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
          ></div>
        </div>
      )}
    </>
  )
};

export default InvestorCodeView;