import { action } from 'typesafe-actions'
import { BalancesActionTypes, PayloadBalance, ErrorOnFetch, TokenBalance } from './types'


export const getBalance = (data: PayloadBalance) => action(BalancesActionTypes.GET_BALANCE, data)
export const setBalance = (balance: TokenBalance[]) => action(BalancesActionTypes.BALANCE_FETCH_SUCCESS, balance)
export const setErrorOnFetchBalance= (error: ErrorOnFetch) => action(BalancesActionTypes.SET_ERROR_ON_FETCH, error)
