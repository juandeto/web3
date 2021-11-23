import { API, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces'


  export interface Ens {
      name: string
      avatar: string,
      getText: () => void | null
      contentash: string
  }

export enum WalletActionTypes {
    SET_ADDRESS = '@@userWallet/SET_ADDRESS',
    SET_NETWORK = '@@userWallet/SET_NETWORK',
    SET_BALANCE = '@@userWallet/SET_BALANCE',
    SET_WALLET = '@@userWallet/SET_WALLET',
    SET_ENS = '@@userWallet/SET_ENS',
    SET_ONBOARD = '@@userWallet/SET_ONBOARD'
  }

export interface WalletState {
    readonly address?: string
    readonly ens?: Ens
    readonly network?: number
    readonly balance?: string
    readonly wallet?: Wallet
    readonly onboard?: API
}
  