import { Web3Provider } from '@ethersproject/providers'

export enum BalancesActionTypes {
    GET_BALANCE = '@@userWallet/GET_BALANCE',
    USDC_FETCH_SUCCESS = '@@userWallet/USDC_FETCH_BALANCE',
    DAI_FETCH_SUCCESS = '@@userWallet/DAI_FETCH_BALANCE',
    SET_ERROR_ON_FETCH_DAI = '@@userWallet/SET_ERROR_ON_FETCH_DAI',
    SET_ERROR_ON_FETCH_USDC = '@@userWallet/SET_ERROR_ON_FETCH_USDC'
}


export interface PayloadBalance {
    contractAddress: string
    signingProvider?: Web3Provider
    userAddress?: string
    decimals: number
}

export interface ActionBalance {
    error?: any
    meta?: any
    payload: PayloadBalance
    type: BalancesActionTypes
}

export interface WalletBalances {
    readonly usdcBalance: string
    readonly daiBalance: string
    readonly errorOnFetchUsdc?: TypeError | string
    readonly errorOnFetchDai?: TypeError | string
}
  