import { Reducer } from 'redux'
import { WalletState, WalletActionTypes } from './types'

export const initialState: WalletState =  {
    address: undefined,
    ens: undefined,
    network: 4, //rinkeby network set by default
    balance: undefined,
    wallet: undefined
}


const reducer: Reducer<WalletState> = (state = initialState, action) => {
    switch (action.type) {
      case WalletActionTypes.SET_ADDRESS:{
        return { ...state, address: action.payload }
      }
      case WalletActionTypes.SET_BALANCE: {
        return { ...state, balance: action.payload }
      }
      case WalletActionTypes.SET_ENS: {
        return { ...state, ens: action.payload }
      }
      case WalletActionTypes.SET_NETWORK: {
        return { ...state, network: action.payload }
      }
      case WalletActionTypes.SET_WALLET: {
        return { ...state, wallet: action.payload }
      }
      default: {
        return state
      }
    }
  }
  
  // Instead of using default export, we use named exports. That way we can group these exports
  // inside the `index.js` folder.
  export { reducer as walletReducer }