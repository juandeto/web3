import { combineReducers, Action, Reducer } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { WalletState } from './userWallet/types'
import { walletReducer } from './userWallet/reducer'
import { LayoutState } from './layout/types'
import { layoutReducer } from './layout/reducer'
import { History } from 'history'



export interface ApplicationState {
  layout: LayoutState
  wallet: WalletState
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer,
    wallet: walletReducer,
    router: connectRouter(history)
  })


  // export function* rootSaga() {
  //   yield all([fork(), fork()])
  // }