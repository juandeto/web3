import { combineReducers, Action, Reducer } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { WalletBalances } from './userWallet/types'
import { walletReducer } from './userWallet/reducer'
import BalancesSaga from './userWallet/sagas'
import { History } from 'history'



export interface ApplicationState {
  wallet: WalletBalances
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    wallet: walletReducer,
    router: connectRouter(history)
  })


  export function* rootSaga() {
    yield all([fork(BalancesSaga)])
  }