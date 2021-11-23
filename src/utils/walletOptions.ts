
const rpcUrl = 'https://mainnet.infura.io/v3/21BqZ4Gv7tsZ8mxmpZFmb0rr3q0';


const walletOptions = [
    { walletName: 'metamask' },
    {
      walletName: 'trezor',
      appUrl: 'https://reactdemo.blocknative.com',
      email: 'aaron@blocknative.com',
      rpcUrl,
    },
    {
      walletName: 'ledger',
      rpcUrl,
    },
    { walletName: 'dapper' },
    { walletName: 'coinbase' },
    { walletName: 'status' },
    { walletName: 'walletLink', rpcUrl },
    {
      walletName: 'portis',
      apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
    },
    { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
    { walletName: 'unilogin' },
    { walletName: 'torus' },
    { walletName: 'squarelink', apiKey: '87288b677f8cfb09a986' },
    { walletName: 'authereum', disableNotifications: true },
    { walletName: 'trust', rpcUrl },
    {
      walletName: 'walletConnect',
      infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8',
    },
    { walletName: 'opera' },
    { walletName: 'operaTouch' },
    { walletName: 'imToken', rpcUrl },
    { walletName: 'meetone' },
  ]

  export default walletOptions