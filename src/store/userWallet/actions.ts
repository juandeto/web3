import { action } from 'typesafe-actions'
import { BalancesActionTypes, PayloadBalance } from './types'


export const getBalance = (data: PayloadBalance) => action(BalancesActionTypes.GET_BALANCE, data)
export const setUsdcBalance = (usdcBalance: string) => action(BalancesActionTypes.USDC_FETCH_SUCCESS, usdcBalance)
export const setDaiBalance = (daiBalance: string) => action(BalancesActionTypes.DAI_FETCH_SUCCESS, daiBalance)
export const setUsdcErrorOnFetchBalance= (error: TypeError | string) => action(BalancesActionTypes.SET_ERROR_ON_FETCH_USDC, error)
export const setDaiErrorOnFetchBalance= (error: TypeError | string) => action(BalancesActionTypes.SET_ERROR_ON_FETCH_DAI, error)
