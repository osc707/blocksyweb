import { useContext, useEffect } from 'react'

// Display IPFS image on file onChange
// send data to node backend for verification

// TODO: pick image to sell, add: EXIF and autograph, sell on opensea
// TODO: fetch from IPFS, test if EXIF data and autograph still exist

const submitForm = () => {};
const onWalletChange = () => {};
const onFileChange = () => {};
const isDisabled = true;

const VerifyIPFSFile = (): JSX.Element => {

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="wallet"
          id="wallet"
          onChange={onWalletChange}
        />
        <br/>
        <input
          type="text" 
          name="cid" 
          id="cid" 
          onChange={onFileChange} />
        <br/>
        <input
          type="submit"
          disabled={isDisabled}
          value="Autograph art"/>
      </form>
    </div>
  );
};

export default VerifyIPFSFile;