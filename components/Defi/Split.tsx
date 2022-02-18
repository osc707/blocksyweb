import { useEffect, useState } from 'react'

type SplitItem = { 
  index: number,
  value: number,
  percent: number
};

const Split = (): JSX.Element => {
  const [splits, setSplits] = useState(0);
  const [values, setValues] = useState([]);
  const [investment, setInvestment] = useState(0);

  const toggleModal = (): void => {
    document.getElementById('exampleModalCenter').classList.toggle('hidden');
  }

  const showSplits = (splits: number): JSX.Element[] => {
    const elms: JSX.Element[] = [];

    for (let i = 0; i < splits; i++) {
      elms.push(
        <div key={`field-${i}`}>
          <input type="number" 
            className='form-control w-6/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
            id={`percent-${i}`} placeholder="20%" onChange={(evt) => calcValue(i, Number(evt.target.value))} />
          <input type="number" 
            className='form-control w-6/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
            id={`value-${i}`} placeholder="$0.00" value={getValue(i)} readOnly={true} tabIndex={-1}
             />
        </div>
      );
    }
    return elms.map(elm => elm);
  }

  const getValue = (index: number): number => values.filter((item: SplitItem) => item.index === index)[0]?.value;

  const calcValue = (index: number, percent: number): void => {
    const value = investment * (percent / 100);
    const newValues = values.filter((item: SplitItem) => item.index !== index);
    newValues.push({ index, value, percent } as SplitItem);
    setValues(newValues);
  };

  useEffect(() => {
    const newValues = [];
    values.forEach((item: SplitItem) => {
      newValues.push(calcValue(item.index, item.percent));
    });
    setValues(newValues)
  }, [investment])

  return (
    <>
      <div>
        <button 
          type="button" 
          className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModalCenter"
          onClick={toggleModal}>
          Vertically centered modal
        </button>
      </div>
      <div 
        className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-900 z-10'
        id="exampleModalCenter" 
        tabIndex={-1}
        aria-labelledby="exampleModalCenterTitle" 
        aria-modal="true" 
        role="dialog">
        <div className='relative w-6/12 pointer-events-none mx-auto my-24'>
          <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
            <div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
              <h5 className='text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel'>
                Investment splitter
              </h5>
              <button 
                type="button"
                className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                data-bs-dismiss="modal" 
                aria-label="Close"
                onClick={toggleModal}>x</button>
            </div>
            <div className='modal-body relative p-4'>
              <div className='flex justify-center'>
                <div>
                  <div className='form-floating mb-3 xl:w-96'>
                  <input 
                      type="text" 
                      className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
                      id="splits" 
                      placeholder="number of splits"
                      pattern='[0-9]+'
                      onChange={(evt) => setSplits(Number(evt.target.value))} />
                    <input
                      type="number" 
                      className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
                      id="investment" 
                      placeholder="100.00"
                      onChange={(evt) => setInvestment(Number(evt.target.value))} />
                    {showSplits(splits)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
              <button type="button"
                className='inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
                data-bs-dismiss="modal"
                onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Split;