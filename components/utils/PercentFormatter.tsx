import React from 'react'

const PercentFormatter = ({ value }): JSX.Element => {
  const userLanguage = window.navigator.language;
  console.log(userLanguage);
  return (
    <React.Fragment>
      {new Intl.NumberFormat('en-US', { style: 'percent' }).format(value)}
    </React.Fragment>
  );
};

export default PercentFormatter;