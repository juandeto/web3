import { Contract } from "ethers";
import { Web3Provider } from '@ethersproject/providers'
import { TokenBalance } from 'store/userWallet/types'

export enum TransferActionTypes {
    SET_TARGET_WALLET_TRANSFER= '@@userTransfers/SET_TARGET_WALLET_TRANSFER',
    SET_APPROVE_SEND = '@@userTransfers/SET_APPROVE_SEND',
    SET_APPROVE_SUCCESS = '@@userTransfers/SET_APPROVE_SUCCESS',
    SET_APPROVE_FAIL = '@@userTransfers/SET_APPROVE_FAIL',
    SET_TRANSFER_SEND = '@@userTransfers/SET_TRANSFER_SEND',
    SET_TRANSFER_SUCCESS = '@@userTransfers/SET_TRANSFER_SUCCESS',
    SET_TRANSFER_FAIL = '@@userTransfers/SET_TRANSFER_FAIL'
}


export interface ActionTransfer {
    error?: any
    meta?: any
    payload: ITransaction
    type: any
}


export interface ITransaction {
    amount: string
    contract: Contract
    targetWallet: string
    token: TokenBalance,
    userAddress?: string
    signingProvider?: Web3Provider
}


export interface IApproved {
    name?: string
    approved: boolean
    amountApproved: string
} 


export interface Transfer {
    readonly targetWallet: string
    readonly loadingTransfer: boolean
    readonly loadingApprove: boolean
    readonly errorTransfer: any
    readonly errorApprove: any
    readonly approved: IApproved[]
}

