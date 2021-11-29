import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import * as api from '../../utils/apis'
import { TransferActionTypes, ActionTransfer, IApproved } from './types'
import {setTransferSuccess, setTransferFail, setApproveSuccess, setApproveFail } from './actions'
import { ApplicationState } from 'store'
import * as ethers from 'ethers'


type ResponseTransfer = {
  error: any,
  data: any
}

function* approve(action: ActionTransfer) {
  const { token, amount } = action.payload
  const state: ApplicationState = yield select(state => state);
  try {
    // To call async functions, use redux-saga's `call()`.
    const  res: ResponseTransfer = yield call(api.approveToken, action.payload)
    console.log('RES approve!: ', res)

    if(res.error instanceof Error){
      yield put(setApproveFail(res.error))
    }

      const cloneApproved = [ ...state.transfers.approved ]


    //if the coin was never approved we create the obj, else we update the obj
     if(cloneApproved.findIndex(item => item.name === token.name) === -1){
       const newApproved: IApproved = {
         name: token.name,
         approved: true,
         amountApproved: ethers.utils.formatUnits(res.data, token.decimals)
       }
       const updated: IApproved[] = [ ...cloneApproved, newApproved ]
        yield put(setApproveSuccess(updated))
     } else {//if the amount is zero, it means we reset the amount allowed
      const updatedApproved = cloneApproved.map((t:IApproved) => {
        if(t.name === token.name && amount === "0"){
            t.approved = false
            t.amountApproved = amount
        }
        if(t.name === token.name && amount !== "0"){
          t.approved = true
          t.amountApproved = ethers.utils.formatUnits(res.data, token.decimals)
      }
        return t
      })

       yield put(setApproveSuccess(updatedApproved))
     }
     
    

} catch (err) {
      yield(setApproveFail(err))
    }
}


function* sendTransfer(action: ActionTransfer) {
    
    try {
      // To call async functions, use redux-saga's `call()`.
      const  res: ResponseTransfer = yield call(api.transferFrom, action.payload)
      console.log('RES transfer!: ', res)

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