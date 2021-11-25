import { Contract } from '@ethersproject/contracts'


export enum BalancesActionTypes {
    GET_BALANCE = '@@userWallet/GET_BALANCE',
    BALANCE_FETCH_SUCCESS = '@@userWallet/BALANCE_FETCH_SUCCESS',
    SET_ERROR_ON_FETCH = '@@userWallet/SET_ERROR_ON_FETCH',
}


export type Tokens = "USDC" | "DAI" | undefined


export interface ActionBalance {
    error?: any
    meta?: any
    payload: PayloadBalance
    type: BalancesActionTypes
}


export interface PayloadBalance {
    contract?: Contract
    userAddress?: string
    tokenName: Tokens
}


export interface TokenBalance {
    name: Tokens
    balance: string
}


export interface ErrorOnFetch {
    error: any,
    tokenName: Tokens
}


export interface WalletBalances {
    readonly tokens: TokenBalance[]
    readonly errorOnFetch: ErrorOnFetch
}
  