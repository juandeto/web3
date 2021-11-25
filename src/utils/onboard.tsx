import Onboard from 'bnc-onboard'
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces'

const INFURA_ID = process.env.REACT_APP_INFURA_ID
const appName = 'Wonderland'
const networkId = 4 //by default
const rpcUrl = `https://rinkeby.infura.io/v3/${INFURA_ID}`
const dappId = process.env.REACT_APP_BLOCKNATIVE_API_KEY

// TODO(odd-amphora): Add support for Formatic, Portis, etc. if requested.
export function initOnboard(subscriptions: Subscriptions) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          email: 'me.jango@protonmail.com',
          rpcUrl,
        },
        {
          walletName: 'ledger',
          rpcUrl,
        },
        {
          walletName: 'walletConnect',
          infuraKey: `${process.env.REACT_APP_INFURA_ID}`,
        },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl },
        { walletName: 'gnosis' },
        { walletName: 'keystone', appName: 'React Demo', rpcUrl },
        {
          walletName: 'lattice',
          appName,
          rpcUrl,
        },
        { walletName: 'trust', rpcUrl },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'authereum', disableNotifications: true },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
    ],
  })
}
