import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import { BalancesActionTypes, ActionBalance, WalletBalances, TokenBalance } from './types'
import {  setBalance, setErrorOnFetchBalance } from './actions'
import * as api from '../../utils/apis'
import { ApplicationState } from 'store'


const usdcAddress: string = process.env.REACT_APP_USDCD_ADDRESS as string
const daiAddress: string = process.env.REACT_APP_DAI_ADDRESS as string

type ResponseFetchBalance = {
  error: any,
  data: string
}

function* useBalance(action: ActionBalance) {
  const { token } = action.payload
  const state: ApplicationState = yield select(state => state);
  try {
    // To call async functions, use redux-saga's `call()`.
    const  res: ResponseFetchBalance = yield call(api.getBalance, action.payload)

    if(res.error instanceof Error){

      yield put(setErrorOnFetchBalance({
        error: res.error,
        tokenName: token.name
      }))

    }else {

      const cloneTokens = [ ...state.wallet.tokens ]
      const updatedTokens = cloneTokens.map((t:TokenBalance) => {
        if(t.address === token.address){
            t.balance = res.data
        }
        return t
      })

      yield put(setBalance(updatedTokens))

    }

  } catch (err) {

      yield(setErrorOnFetchBalance({
        error: err,
        tokenName: token.name
      }))

}
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchBalanceRequest() {
  yield takeEvery(BalancesActionTypes.GET_BALANCE, useBalance)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* balancesSaga() {
  yield all([fork(watchFetchBalanceRequest)])
}

export default balancesSaga