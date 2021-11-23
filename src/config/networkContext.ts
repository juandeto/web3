import { Web3Provider } from '@ethersproject/providers'

import { createContext } from 'react'

export const NetworkContext: React.Context<{
  signingProvider?: Web3Provider
  signerNetwork?: string,
  userAddress?: string,
  onNeedProvider?: () => Promise<void>
  onSelectWallet?: () => void,
  onLogOut?: () => void,
}> = createContext({})
