import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import * as api from '../../utils/apis'
import { TransferActionTypes, ActionTransfer, IApproved } from './types'
import {setTransferSuccess, setTransferFail, setApproveSuccess, setApproveFail, setAllowanceFail,setAllowanceSuccess } from './actions'
import { ApplicationState } from 'store'
import * as ethers from 'ethers'


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
    } else{
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
  
  

  function* allowances(action: ActionTransfer) {
    const { token } = action.payload
    const state: ApplicationState = yield select(state => state);
    const allowancesArray = state.transfers.allowances
    try {
      const  res: ethers.BigNumberish | TypeError = yield call(action.payload.contract?.allowance, action.payload.userAddress, state.transfers.delegateWallet)

      if(res instanceof Error){
  
        yield put(setAllowanceFail(res))
  
      }else {
        let newAllowances = []
        const indexCurrent = allowancesArray.findIndex(t => t.name === token.name)
        const formatted: IApproved = {
          name: token.name,
          amount: ethers.utils.formatUnits(res, token.decimals)
        }

        if(indexCurrent === -1){
          newAllowances = [ ...allowancesArray,formatted ]
        } else{
          newAllowances = [ ...allowancesArray ]
          newAllowances[indexCurrent].amount = ethers.utils.formatUnits(res, token.decimals)
        }

        yield put(setAllowanceSuccess(newAllowances))
  
      }
  
    } catch (err) {
  
        yield(setAllowanceFail(err))
  
  }
  }


function* watchApproveRequest() {
    yield takeEvery(TransferActionTypes.SET_APPROVE_SEND, approve)
}

function* watchAllowanceRequest() {
  yield takeEvery(TransferActionTypes.GET_ALLOWANCE, allowances)
}
  
  
function* watchTransferRequest() {
    yield takeEvery(TransferActionTypes.SET_TRANSFER_SEND, sendTransfer)
}
  

function* transfersSaga() {
  yield all([fork(watchApproveRequest), fork(watchTransferRequest), fork(watchAllowanceRequest)])
}

export default transfersSaga