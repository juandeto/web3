import { Reducer } from 'redux'

import { Transfer, TransferActionTypes } from './types'

export const initialState: Transfer =  {
    targetWallet: "",
    delegateWallet: "",
    loadingTransfer: false,
    loadingApprove: false,
    errorTransfer: null,
    errorApprove: null,
    allowances: [],
    errorAllowances: null
}

const reducer: Reducer<Transfer> = (state = initialState, action) => {
    switch (action.type) {
      case TransferActionTypes.SET_TARGET_WALLET_TRANSFER:{
        return { ...state, targetWallet: action.payload }
      }
      case TransferActionTypes.SET_TARGET_WALLET_DELEGATE:{
        return { ...state, delegateWallet: action.payload }
      }
      case TransferActionTypes.SET_TRANSFER_SEND:{
        return { ...state, loadingTransfer: true }
      }
      case TransferActionTypes.SET_TRANSFER_SUCCESS: {
        return { ...state, loadingTransfer: false }
      }
      case TransferActionTypes.SET_TRANSFER_FAIL: {
        return { ...state, loadingTransfer: false, errorTransfer: action.payload }
      }
      case TransferActionTypes.SET_APPROVE_SEND:{
        return { ...state, loadingApprove: true }
      }
      case TransferActionTypes.SET_APPROVE_SUCCESS: {
        return { ...state, loadingApprove: false}
      }
      case TransferActionTypes.SET_APPROVE_FAIL: {
        return { ...state, loadingApprove: false,  errorApprove: action.payload}
      }
      case TransferActionTypes.SET_ALLOWANCE_SUCCESS:{
        console.log({state: state, payload: action.payload})
        return { ...state, allowances: [ ...state.allowances, action.payload]}
      }
      case TransferActionTypes.SET_ALLOWANCE_SUCCESS_NEW:{
        return { ...state, allowances: action.payload}
      }
      case TransferActionTypes.SET_ALLOWANCE_FAIL:{
        return { ...state, errorAllowances: action.payload}
      }
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as transfersReducer }