import { action } from 'typesafe-actions'
import { Ens, WalletActionTypes } from './types'
import { Wallet } from 'bnc-onboard/dist/src/interfaces'


export const setAddress = (address: string) => action(WalletActionTypes.SET_ADDRESS, address)
export const setWallet = (wallet: Wallet) => action(WalletActionTypes.SET_WALLET, wallet)
export const setEns = (ens: Ens) => action(WalletActionTypes.SET_ENS, ens)
export const setBalance = (balance: string) => action(WalletActionTypes.SET_BALANCE, balance)
export const setNetwork = (network: number) => action(WalletActionTypes.SET_NETWORK, network)
