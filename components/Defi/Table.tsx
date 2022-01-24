import React from 'react'

import Gains from './Gains'

const Table = ({ data, byValue, showGains }): JSX.Element => {
  const formattedGains = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.gains);
  const gains = `Gains: ${formattedGains}, updated ${data.date}`;
  const values = (byValue) ? data.byValue : data.byVolume;
  const label = (byValue) ? 'Percent by $ value' : 'Percent by # of coins';

  return (
    <div className='mt-4'>
      {showGains && (
        <Gains gains={gains}/>
      )}
      <table className='min-w-full'>
        <thead className='bg-white border-b'>
          <tr>
            <th scope="col" className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Asset</th>
            <th scope="col" className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {values.map((coin: any, i: number) => {
            const trBg = (i % 2 === 0) ? 'bg-gray-100 border-b' : 'bg-white border-b';
            return (
              <tr key={coin.name} className={trBg}>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {coin.name}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {new Intl.NumberFormat().format(coin.percentage)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;