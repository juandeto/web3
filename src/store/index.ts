import { combineReducers, Action, Reducer } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { WalletBalances } from './userWallet/types'
import { walletReducer } from './userWallet/reducer'
import { transfersReducer } from './transfers/reducer'
import BalancesSaga from './userWallet/sagas'
import { Transfer } from './transfers/types'
import transfersSaga from './transfers/sagas'
import { History } from 'history'



export interface ApplicationState {
  wallet: WalletBalances
  router: RouterState
  transfers: Transfer
}

export const createRootReducer = (history: History) =>
  combineReducers({
    wallet: walletReducer,
    transfers: transfersReducer,
    router: connectRouter(history)
  })


  export function* rootSaga() {
    yield all([fork(BalancesSaga), fork(transfersSaga)])
  }