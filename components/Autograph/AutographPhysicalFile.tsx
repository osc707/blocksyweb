import axios from 'axios'
import { useState } from 'react'

const AutographPhysicalFile = ({ wallet }): JSX.Element => {
  const [file, setFile] = useState(null);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const dropHandler = (e: any): void => {
    console.log('File(s) dropped');
    e.preventDefault();
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          setFile(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        setFile(e.dataTransfer.files[i]);
      }
    }
  };

  const dragOverHandler = (e: any): void => {
    console.log('File(s) over');
    e.preventDefault();
  };
  
  const onWalletChange = (event: any) => wallet = event.target.value;

  const submitForm = async (e: any): Promise<any> => {
    const formData = new FormData();
    e.preventDefault();
    formData.append('wallet', wallet);
    formData.append('art', file, file.name);

    const res = await axios.post(`${process.env.NEXT_PUBLIC_HOSTNAME}/autograph/add`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    const { data } = res;

    if (data.status === 'SUCCESS') {
      window.open(`${process.env.NEXT_PUBLIC_HOSTNAME}/autograph/download?f=${data.data}`);
    }
  };

  const isDisabled = file === null || wallet === null;

  return (
    <div className='w-1/3 px-4'>
      <h3>Autograph new file</h3>
      <form onSubmit={submitForm}>
        <label className="block text-sm font-medium text-gray-700">
          Wallet
        </label>
        <input
          type="text"
          name="wallet"
          id="wallet"
          onChange={onWalletChange}
          defaultValue={wallet}
          readOnly={true}
          className='input'
        />
        <div onDrop={dropHandler} onDragOver={dragOverHandler}>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="art" 
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file" 
                    name="art" 
                    id="art" 
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG or JPG
              </p>
            </div>
          </div>
        </div>
        {file && (
          <div className='mt-4 mb-2'>
            <img src={URL.createObjectURL(file)}/>
          </div>
        )}
        <input
          type="submit"
          disabled={isDisabled}
          value="Autograph"
          className='btnCta my-2'
        />
      </form>
    </div>
  )
};

export default AutographPhysicalFile;