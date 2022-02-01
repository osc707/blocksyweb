import axios from 'axios'
import { useState } from 'react'

const VerifyPhysicalFile = (): JSX.Element => {
  const [file, setFile] = useState(null);
  const [wallet, setWallet] = useState(null);

  const onFileChange = (event: any) => {
    console.log('in onfileChange');
    setFile(event.target.files[0]);
  };
  const onWalletChange = (event: any) => setWallet(event.target.value);

  const submitForm = async (e: any): Promise<any> => {
    const formData = new FormData();
    e.preventDefault();
    formData.append('wallet', wallet);
    formData.append('art', file, file.name);

    const res = await axios.post('http://localhost:3000/autograph/verify', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    // decide how to present the data
    const { data } = res;
    console.log(data);
  }

  const isDisabled = file === null || wallet === null;

  return (
    <div className='row'>
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
            type="file" 
            name="art" 
            id="art" 
            accept="image/png, image/jpeg"
            onChange={onFileChange} />
          <br/>
          <input
            type="submit"
            disabled={isDisabled}
            value="Autograph art"/>
        </form>
      </div>
      {file && (
        <div>
          <img src={URL.createObjectURL(file)}/>
        </div>
      )}
    </div>
  )
};

export default VerifyPhysicalFile;