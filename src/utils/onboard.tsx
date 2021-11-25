import Onboard from 'bnc-onboard'
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces'
import { appName, networkId, rpcUrl, dappId} from 'utils/constants'

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
