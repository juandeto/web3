import { Reducer } from 'redux'

import { WalletBalances, BalancesActionTypes } from './types'

export const initialState: WalletBalances =  {
    tokens: [
      {
        name: 'USDC',
        balance: '0',
      },
      {
        name: 'DAI',
        balance: '0',
      }
    ],
    errorOnFetch:{
      error: null,
      tokenName: undefined
    }
}


const reducer: Reducer<WalletBalances> = (state = initialState, action) => {
    switch (action.type) {
      case BalancesActionTypes.BALANCE_FETCH_SUCCESS:{
        return { ...state, tokens: action.payload }
      }
      case BalancesActionTypes.SET_ERROR_ON_FETCH: {
        return { ...state, errorOnFetch: action.payload }
      }
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as walletReducer }