import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { ToastContext } from '../../lib/contexts'

const VerifyPhysicalFile = (): JSX.Element => {
  const { setToastData } = useContext(ToastContext);
  const [fileToVerify, setFileToVerify] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const onFileChange = (event: any) => {
    setFileToVerify(event.target.files[0]);
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
          setFileToVerify(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setFileToVerify(e.dataTransfer.files[i]);
      }
    }
  };

  const dragOverHandler = (e: any): void => {
    console.log('File(s) over');
    e.preventDefault();
  };

  const submitForm = async (e: any): Promise<any> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('art', fileToVerify, fileToVerify.name);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/autograph/verify`, 
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    // decide how to present the data
    const { data } = res;
    console.log(data);
    if (data.status === 'SUCCESS') {
      setToastData({
        show: true,
        type: data.status,
        title: 'Verification results',
        msg: (
          <>
            <div className='font-bold mt-2'>Autographed by</div>
            <div>{data.autograph}</div>
          </>
        )
      });
    }
  }

  useEffect(() => {
    if (!fileToVerify) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [fileToVerify]);

  return (
    <div className='w-1/3 px-4'>
      <h3>Verify autograph</h3>
      <form onSubmit={submitForm}>
        <div onDrop={dropHandler} onDragOver={dragOverHandler}>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="artToVerify" 
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file" 
                    name="artToVerify" 
                    id="artToVerify" 
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
        {fileToVerify && (
          <div className='mt-4 mb-2 w-1/1'>
            <Image
              src={URL.createObjectURL(fileToVerify)}
              alt='File preview'
              layout='responsive'
              width={300}
              height={200}
            />
          </div>
        )}
        <input
          type="submit"
          disabled={disabled}
          value="Verify autograph"
          className='btnCta my-2'
        />
      </form>
    </div>
  )
};

export default VerifyPhysicalFile;