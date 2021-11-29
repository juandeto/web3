import { action } from 'typesafe-actions'
import { TransferActionTypes, ITransaction, IApproved } from './types'


export const setTargetWallet = (target: string) => action(TransferActionTypes.SET_TARGET_WALLET_TRANSFER, target)
export const setApproveSend= (data: ITransaction) => action(TransferActionTypes.SET_APPROVE_SEND, data)
export const setTransferSend= (data: ITransaction) => action(TransferActionTypes.SET_TRANSFER_SEND, data)
export const setTransferSuccess = () => action(TransferActionTypes.SET_TRANSFER_SUCCESS)
export const setTransferFail = (error: any) => action(TransferActionTypes.SET_TRANSFER_FAIL, error)
export const setApproveSuccess = (data: IApproved[]) => action(TransferActionTypes.SET_APPROVE_SUCCESS, data)
export const setApproveFail = (error: any) => action(TransferActionTypes.SET_APPROVE_FAIL, error)