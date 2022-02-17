import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import { ToastContext } from '../../lib/contexts'

// Display IPFS image on file onChange
// send data to node backend for verification

// TODO: pick image to sell, add: EXIF and autograph, sell on opensea
// TODO: fetch from IPFS, test if EXIF data and autograph still exist
const VerifyIPFSFile = (): JSX.Element => {
  const { setToastData } = useContext(ToastContext);
  const [cid, setCID] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onCIDChange = (e: any): void => {
    setCID(e.target.value);
  };

  const submitForm = async (e: any): Promise<any> => {
    e.preventDefault();
    if (!disabled) {
      setLoading(true);
      const formData = {
        cid
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/autograph/ipfs`, 
        formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // decide how to present the data
      const { data } = res;
      console.log(data);
      setLoading(false);
      setToastData({
        show: true,
        type: data.status,
        title: 'IPFS Results',
        msg: (
          <>
            <div className='font-bold'>File</div>
            <div><a href={data.ipfs}>{data.ipfs}</a></div>
            <div className='font-bold mt-2'>Autographed by</div>
            <div>{data.autograph}</div>
          </>
        )
      });
    }
  };

  useEffect(() => {
    if (!cid) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [cid])

  return (
    <div className='w-1/3 px-4'>
      <h3>IPFS: Verify autograph</h3>
      <form onSubmit={submitForm}>
        <label className="block text-sm font-medium text-gray-700 mt-4">
          IPFS CID
        </label>
        <input
          type="text" 
          name="cid" 
          id="cid" 
          onChange={onCIDChange}
          className='input'
        />
        <input
          type="submit"
          disabled={disabled}
          value="Verify autograph"
          className='btnCta my-2'
        />
      </form>
    </div>
  );
};

export default VerifyIPFSFile;