enum KEYS {
  WALLET = 'bww'
};

const PRICE = 10;

const serverURL = `${process.env.NEXT_PUBLIC_HOSTNAME}`;
const walletURL = `${serverURL}/wallet/`;

export const chainSelected = (chainId: string): string => {
  return chainId;
};

export const fetchSavedWallet = (): string => window.localStorage.getItem(KEYS.WALLET);

export const fetchSupportedWallets = async (): Promise<any> => {
  const wallets = await fetch(`${walletURL}supported`);
  return wallets.json();
};

export const fetchWalletsAndPrices = async (): Promise<any> => {
  const walletsAndPrices = await fetch(`${walletURL}prices`);
  return walletsAndPrices.json();
}

export const calcTokensRequired = (ticker: string, prices: any[]): number => {
  const price = prices.filter((price) => price.ticker === ticker).map((coin) => coin.price)[0];
  const numOfCoins = PRICE / parseFloat(price);
  return numOfCoins;
}

export const getWalletAddress = (ticker: string, wallets: any[]): string => {
  const walletAddress = wallets.filter((wallet: any) => wallet.ticker === ticker).map((wallet: any) => wallet.address)[0];
  return walletAddress;
}