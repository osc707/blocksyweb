import * as coins from './coingecko.json'

export const currencyList = [
  { code: 'USD', desc: 'United States Dollar' },
  { code: 'AED', desc: 'United Arab Emirates Dirham' },
  { code: 'ARS', desc: 'Argentine Peso' },
  { code: 'AUD', desc: 'Australian Dollar' },
  { code: 'BDT', desc: 'Bangladeshi Taka' },
  { code: 'BHD', desc: 'Bahraini Dinar' },
  { code: 'BMD', desc: 'Bermudian Dollar' },
  { code: 'BRL', desc: 'Brazil Real' },
  { code: 'CAD', desc: 'Canadian Dollar' },
  { code: 'CHF', desc: 'Swiss Franc' },
  { code: 'CLP', desc: 'Chilean Peso' },
  { code: 'CZK', desc: 'Czech Koruna' },
  { code: 'DKK', desc: 'Danish Krone' },
  { code: 'GBP', desc: 'British Pound Sterling' },
  { code: 'HKD', desc: 'Hong Kong Dollar' },
  { code: 'HUF', desc: 'Hungarian Forint' },
  { code: 'ILS', desc: 'Israeli New Shekel' },
  { code: 'INR', desc: 'Indian Rupee' },
  { code: 'KWD', desc: 'Kuwaiti Dinar' },
  { code: 'LKR', desc: 'Sri Lankan Rupee' },
  { code: 'MMK', desc: 'Burmese Kyat' },
  { code: 'MXN', desc: 'Mexican Peso' },
  { code: 'MYR', desc: 'Malaysian Ringgit' },
  { code: 'NGN', desc: 'Nigerian Naira' },
  { code: 'NOK', desc: 'Norwegian Krone' },
  { code: 'NZD', desc: 'New Zealand Dollar' },
  { code: 'PHP', desc: 'Philippine Peso' },
  { code: 'PKR', desc: 'Pakistani Rupee' },
  { code: 'PLN', desc: 'Polish Zloty' },
  { code: 'SAR', desc: 'Saudi Riyal' },
  { code: 'SEK', desc: 'Swedish Krona' },
  { code: 'SGD', desc: 'Singapore Dollar' },
  { code: 'THB', desc: 'Thai Baht' },
  { code: 'TRY', desc: 'Turkish Lira' },
  { code: 'UAH', desc: 'Ukrainian hryvnia' },
  { code: 'VEF', desc: 'Venezuelan bolívar fuerte' },
  { code: 'VND', desc: 'Vietnamese đồng' },
  { code: 'ZAR', desc: 'South African Rand' },
  { code: 'XDR', desc: 'IMF Special Drawing Rights' }
];

export const getCurrencyByCode = (code: string) : any => {
  return currencyList.filter((currency) => currency.code === code)[0];
};

type Coin = {
  id: string,
  symbol: string,
  name: string,
};

export const supportedCoins = (): Coin[] => coins.map((coin: Coin) => ({ id: coin.id, symbol: coin.symbol.toUpperCase(), name: coin.name }));