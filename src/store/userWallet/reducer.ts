import { Reducer } from 'redux'

import { WalletBalances, BalancesActionTypes } from './types'

export const initialState: WalletBalances =  {
    tokens: [
      {
        name: 'Usdc',
        balance: '0',
        address: process.env.REACT_APP_USDCD_ADDRESS as string,
        decimals: 6
      },
      {
        name: 'Dai',
        balance: '0',
        address: process.env.REACT_APP_DAI_ADDRESS as string,
        decimals: 18
      }
    ],
    errorOnFetch:{
      error: null,
      tokenName: undefined
    },
    isLoadingFetchBalance: false
}


const reducer: Reducer<WalletBalances> = (state = initialState, action) => {
    switch (action.type) {
      case BalancesActionTypes.GET_BALANCE:{
        return { ...state, isLoadingFetchBalance: true}
      }
      case BalancesActionTypes.BALANCE_FETCH_SUCCESS:
        return { ...state, isLoadingFetchBalance: !state.isLoadingFetchBalance, tokens: [...action.payload] }
      
      case BalancesActionTypes.SET_ERROR_ON_FETCH: {
        return { ...state, isLoadingFetchBalance: !state.isLoadingFetchBalance, errorOnFetch: action.payload }
      }
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as walletReducer }