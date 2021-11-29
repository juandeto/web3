import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import { BalancesActionTypes, ActionBalance, TokenBalance } from './types'
import {  setBalance, setErrorOnFetchBalance } from './actions'
import * as ethers from 'ethers'
import { ApplicationState } from 'store'


type ResponseFetchBalance = Error | ethers.BigNumberish

function* useBalance(action: ActionBalance) {
  const { token } = action.payload
  const state: ApplicationState = yield select(state => state);
  try {

    const  res: ResponseFetchBalance = yield call(action.payload.contract?.balanceOf, action.payload.userAddress)
    if(res instanceof Error){

      yield put(setErrorOnFetchBalance({
        error: res,
        tokenName: token.name
      }))

    }else {
      const cloneTokens = [ ...state.wallet.tokens ]
      const updatedTokens = cloneTokens.map((t:TokenBalance) => {
        if(t.address === token.address){
          const formatBalance = ethers.utils.formatUnits(res, token.decimals)
            t.balance = formatBalance
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