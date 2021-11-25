import { Reducer } from 'redux'

import { Transfer, TransferActionTypes } from './types'

export const initialState: Transfer =  {
    targetWallet: "",
    loadingTransfer: false,
    loadingApprove: false,
    errorApprove: null,
    errorTransfer: null,
}


const reducer: Reducer<Transfer> = (state = initialState, action) => {
    switch (action.type) {
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
        return { ...state, loadingTransfer: true }
      }
      case TransferActionTypes.SET_APPROVE_SUCCESS: {
        return { ...state, loadingApprove: false }
      }
      case TransferActionTypes.SET_APPROVE_FAIL: {
        return { ...state, loadingApprove: false, errorApprove: action.payload }
      }
      
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as transfersReducer }