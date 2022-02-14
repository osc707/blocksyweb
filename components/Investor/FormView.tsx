import React, { useEffect, useState } from 'react'

const InvestorFormView = ({ coinCount, setCoinCount, setFormValues }): JSX.Element => {
  const fieldNames = ['ticker', 'percent', 'maxPrice', 'alt'];
  const [validForm, setValidForm] = useState(false);

  const validateForm = (e: any): void => {
    e.preventDefault();
    const formData = [];
    let hasError = false;
    for (let i = 0; i < coinCount.length; i++) {
      const formElm = {};
      fieldNames.forEach((name) => {
        const fieldIdx = i + 1;
        const elm = document.getElementById(`${name}-${fieldIdx}`) as HTMLInputElement;
        if (elm.value.length > 0) {
          formElm[`${name}`] = elm.value;
        } else {
          hasError = true;
        }
      });
      formData.push(formElm);
    }
    if (!hasError) {
      setFormValues(formData);
    }
  };

  const validate = (e: any): void => {
    var elm = (e.target as HTMLInputElement);
    elm.classList.remove('invalid:border-red-500');
    if (!elm.value || elm.value.trim().length < 1) {
      elm.classList.add('invalid:border-red-500');
      setValidForm(false);
    }
  };

  useEffect(() => {
    if (validForm) {
      validateForm(new Event('from-form'));
    }
  }, [validForm]);

  return (
    <>
      <div className="col-span-2 sm:col-span-2">
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
          {[1,2,3,4,5].map((item) => (<option key={item} value={item}>{item}</option>))}
        </select>
      </div>
      <div className="col-span-8"><h3>Investment Matrix</h3></div>
      {coinCount.map((idx: number) => (
        <React.Fragment key={idx}>
          <div className="col-span-8 sm:col-span-2 lg:col-span-2">
            <label htmlFor={`ticker-${idx}`} className="block text-sm font-medium text-gray-700">Coin ticker</label>
            <input required={true} 
              onBlur={validate}
              type="text" 
              name={`ticker-${idx}`} 
              id={`ticker-${idx}`} 
              placeholder="BTC" 
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-8 sm:col-span-2 lg:col-span-2">
            <label htmlFor={`percent-${idx}`} className="block text-sm font-medium text-gray-700">Percentage of purchase</label>
            <input 
              onBlur={validate}
              required={true} 
              type="number" 
              min={0}
              max={100}
              name={`percent-${idx}`} 
              id={`percent-${idx}`} 
              placeholder="10" 
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-8 sm:col-span-2 lg:col-span-2">
            <label htmlFor={`maxPrice-${idx}`} className="block text-sm font-medium text-gray-700">Max price</label>
            <input 
              onBlur={validate}
              required={true}
              type="number" 
              min={0}
              name={`maxPrice-${idx}`} 
              id={`maxPrice-${idx}`} 
              placeholder="56000" 
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-8 sm:col-span-2 lg:col-span-2">
            <label htmlFor={`alt-${idx}`} className="block text-sm font-medium text-gray-700">Alternate purchase</label>
            <input 
              onBlur={validate}
              required={true} 
              type="text" 
              name={`alt-${idx}`} 
              id={`alt-${idx}`} 
              placeholder="GUSC" 
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </React.Fragment>
      ))}
      <div className="col-span-8 sm:col-span-2 lg:col-span-2">
        <button
          onClick={validateForm}
          type="submit" 
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Validate
        </button>
      </div>
    </>
  )
}

export default InvestorFormView;