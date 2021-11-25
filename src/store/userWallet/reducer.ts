import { Reducer } from 'redux'

import { WalletBalances, BalancesActionTypes } from './types'

export const initialState: WalletBalances =  {
    usdcBalance: "0",
    daiBalance: "0",
    errorOnFetchUsdc: undefined,
    errorOnFetchDai: undefined
}


const reducer: Reducer<WalletBalances> = (state = initialState, action) => {
    switch (action.type) {
      case BalancesActionTypes.USDC_FETCH_SUCCESS:{
        return { ...state, usdcBalance: action.payload }
      }
      case BalancesActionTypes.DAI_FETCH_SUCCESS: {
        return { ...state, daiBalance: action.payload }
      }
      case BalancesActionTypes.SET_ERROR_ON_FETCH_DAI: {
        return { ...state, errorOnFetchDai: action.payload }
      }
      case BalancesActionTypes.SET_ERROR_ON_FETCH_USDC: {
        return { ...state, errorOnFetchUsdc: action.payload }
      }
      
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as walletReducer }