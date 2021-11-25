import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { BalancesActionTypes, ActionBalance } from './types'
import {  setUsdcBalance, setDaiBalance, setUsdcErrorOnFetchBalance, setDaiErrorOnFetchBalance } from './actions'
import * as api from '../../utils/apis'


const usdcAddress: string = process.env.REACT_APP_USDCD_ADDRESS as string
const daiAddress: string = process.env.REACT_APP_DAI_ADDRESS as string

type ResponseFetchBalance = {
  error: string | TypeError,
  data: string
}

function* handleFetchBalance(action: ActionBalance) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const  res: ResponseFetchBalance = yield call(api.getBalance, action.payload)
    console.log(res)
    const { contractAddress } = action.payload
    const isError = res.error instanceof Error
    console.log("is error: ", isError, contractAddress, usdcAddress)
    if(isError && contractAddress === usdcAddress){
      console.log()
      yield put(setUsdcErrorOnFetchBalance(res.error))
    }
    if(isError && contractAddress === daiAddress){
      yield put(setDaiErrorOnFetchBalance(res.error))
    }
    if(contractAddress === usdcAddress){
      yield put(setUsdcBalance(res.data))
    }
    if(contractAddress === usdcAddress){
      yield put(setDaiBalance(res.data))
    }
    
  } catch (err) {
    const { contractAddress } = action.payload
    if (err instanceof Error && err.stack) {
      if(contractAddress === usdcAddress){
        yield put(setUsdcErrorOnFetchBalance(err.stack))
      }else{
        yield put(setDaiErrorOnFetchBalance(err.stack))
      }
    } else {
      if(contractAddress === usdcAddress){
        yield put(setUsdcErrorOnFetchBalance('An unknown error occured.'))
      }else {
        yield put(setDaiErrorOnFetchBalance('An unknown error occured.'))
      }
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchBalanceRequest() {
  yield takeEvery(BalancesActionTypes.GET_BALANCE, handleFetchBalance)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* balancesSaga() {
  yield all([fork(watchFetchBalanceRequest)])
}

export default balancesSaga