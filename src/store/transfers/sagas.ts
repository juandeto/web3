import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import * as api from '../../utils/apis'
import { TransferActionTypes, ActionTransfer } from './types'
import {setTransferSuccess, setTransferFail, setApproveSuccess, setApproveFail } from './actions'
import { ApplicationState } from 'store'


type ResponseTransfer = {
  error: any,
  data: any
}

function* approve(action: ActionTransfer) {

  try {
    // To call async functions, use redux-saga's `call()`.
    const  res: ResponseTransfer = yield call(api.approveToken, action.payload)

    if(res.error instanceof Error){
      yield put(setApproveFail(res.error))
    }else {
      yield put(setApproveSuccess())
    }

} catch (err) {
      yield(setApproveFail(err))
    }
}


function* sendTransfer(action: ActionTransfer) {
    
    try {
      // To call async functions, use redux-saga's `call()`.
      const  res: ResponseTransfer = yield call(api.transferFrom, action.payload)
  
      if(res.error instanceof Error){
        yield put(setTransferFail(res.error))
      }else {
        yield put(setTransferSuccess())
      }
  
  } catch (err) {
        yield(setTransferFail(err))
      }
  }
  
  




function* watchApproveRequest() {
    yield takeEvery(TransferActionTypes.SET_APPROVE_SEND, approve)
}
  
  
function* watchTransferRequest() {
    yield takeEvery(TransferActionTypes.SET_TRANSFER_SEND, sendTransfer)
}
  

function* transfersSaga() {
  yield all([fork(watchApproveRequest), fork(watchTransferRequest)])
}

export default transfersSaga