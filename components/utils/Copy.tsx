import React from 'react'

type CopyProps = {
  elmId: string,
  children: React.ReactNode
};

const Copy = ({ elmId, children }: CopyProps): JSX.Element => {

  const copyText = (e: any): void => {
    e.preventDefault();
    const elm = (document.getElementById(elmId) as HTMLInputElement).value;
    navigator.clipboard.writeText(elm);
  }

  return (
    <span
      style={{ display: 'inline-block', verticalAlign: 'bottom', cursor: 'pointer' }} 
      onClick={copyText}>
      {children}
    </span>
  );
};

export default Copy;