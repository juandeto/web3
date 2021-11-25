import { Web3Provider } from '@ethersproject/providers'
import { NetworkContext } from 'config/networkContext'
import { useEffect, useState } from 'react'
import { initOnboard } from 'utils/onboard'
import { API, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces'

const KEY_SELECTED_WALLET = 'selectedWallet'
type ChildElems = (JSX.Element | null) | (JSX.Element | null)[]

export default function Network({ children }: { children: ChildElems }) {

  const [signingProvider, setSigningProvider] = useState<Web3Provider | undefined>()
  const [network, setNetwork] = useState<string>()
  const [account, setAccount] = useState<string | undefined>()
  const [onboard, setOnboard] = useState<API>()

  const resetWallet = () => {
    onboard?.walletReset()
    setSigningProvider(undefined)
    window.localStorage.setItem(KEY_SELECTED_WALLET, '')
  }

  const selectWallet = async () => {
    resetWallet()

    // Open select wallet modal.
    const selectedWallet = await onboard?.walletSelect()

    // User quit modal.
    if (!selectedWallet) {
      return
    }

    // Wait for wallet selection initialization
    await onboard?.walletCheck()
  }

  const logOut = async () => {
    resetWallet()
  }

  const initializeWallet = () => {
    if (onboard) return

    const selectWallet = async (newWallet: Wallet) => {
      if (newWallet.provider) {
        // Reset the account when a new wallet is connected, as it will be resolved by the provider.
        setAccount(undefined)
        window.localStorage.setItem(KEY_SELECTED_WALLET, newWallet.name || '')
        setSigningProvider(new Web3Provider(newWallet.provider))
      } else {
        resetWallet()
      }
    }
    const config: Subscriptions = {
      address: setAccount,
      wallet: selectWallet,
    }
    setOnboard(initOnboard(config))
  }


  const refreshNetwork = () => {
    async function getNetwork() {
      await signingProvider?.ready

      const network = signingProvider?.network?.chainId === 4
        ? process.env.REACT_APP_NETWORK_NAME
        : undefined

      setNetwork(network)
    }
    getNetwork()
  }

  const reconnectWallet = () => {
    const previouslySelectedWallet =
      window.localStorage.getItem(KEY_SELECTED_WALLET)
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }

  useEffect(initializeWallet, [])
  useEffect(refreshNetwork, [signingProvider, network])
  useEffect(reconnectWallet, [onboard])

  return (
    <NetworkContext.Provider
      value={{
        signerNetwork: network,
        signingProvider:
          signingProvider && account
            ? signingProvider
            : undefined,
        userAddress: account,
        onSelectWallet: selectWallet,
        onLogOut: logOut,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}