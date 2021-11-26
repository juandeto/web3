import {useEffect, useContext, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { TokenBalance } from 'store/userWallet/types'
import { ITransaction } from 'store/transfers/types'
import Button from 'components/shared/ul/Button'
import { setApproveSend, setTransferSend, setTransferFail, setApproveFail} from 'store/transfers/actions'
import { ApplicationState } from 'store'
import ErrorModal from 'components/shared/ErrorModal'
import { useContract } from 'config/ContractHook'
import GlassCard from 'components/shared/ul/CardInput'
import FormattedBalance from 'components/shared/FormattedBalance'
import { Contract } from '@ethersproject/contracts'
import 'styles/components/layout/layout.scss'
import transfersSaga from 'store/transfers/sagas'


const usdcAddress: string = process.env.REACT_APP_USDCD_ADDRESS as string
const daiAddress: string = process.env.REACT_APP_DAI_ADDRESS as string

interface PropsFromParent {
    token: TokenBalance
}

interface PropsFromState {
    targetWallet: string
    errorApprove: any
    errorTransfer: any
    loadingApprove: boolean
    loadingTransfer: boolean
}

interface PropsFromDispatch {
    setApproveSend: typeof setApproveSend
    setTransferSend: typeof setTransferSend
    setTransferFail: typeof setTransferFail
    setApproveFail: typeof setApproveFail
}

type ModalState ={
    show: boolean,
    type: any
  }

type AmountState = {
    value: string
    error: boolean
}

type AllProps = PropsFromState & PropsFromDispatch & PropsFromParent


const TransferCard: React.FC<AllProps> = (props) => {
    const [showModal, setShowModal] = useState<ModalState>({show: false, type: null})
    const [amount, setAmount] = useState<AmountState>({value: "0", error: false})
    const [showError, setShowError] = useState<boolean>(false)

    const {
        setApproveSend, 
        setTransferSend,
        targetWallet,
        loadingApprove,
        loadingTransfer,
        errorApprove,
        errorTransfer,
        token
    } = props

    const contract = useContract(token.address)
    
   const resetError = () => {

   }

   const closeModal = () => {
      setShowModal({
        show: false,
        type: null
      })
   }


   const handleAmountValue = (value:string) => {

    const isValidInput = validateAmount(value)

    setAmount({value, error: isValidInput})

    if(showError && isValidInput){
        setShowError(false)
    }
   }

   const validateAmount = (amount: string) => {
        if(Number(token.balance) < Number(amount)){
            return true
        }

        return false
   }

   const handleBlur = () => {
        if(!amount.value){

        } else {
            setShowError(true)
        }
    }

    const sendTransfer = () => {
        const tx = {
            amount: amount.value,
            contract: contract,
            targetWallet: targetWallet,
            token: token
        }
        setTransferSend(tx)
    }

    const approveTransfer = () => {
        const tx = {
            amount: amount.value,
            contract: contract,
            targetWallet: targetWallet,
            token: token
        }
        setApproveSend(tx)
    }

      return <>
                <div className="tranferCard_container">
                <GlassCard >
                    <div className="transferCard_content">
                        <FormattedBalance token={token}/>
                        <div className="tranferCard_inputContainer">
                            <label className="tranferCard_label">Allowance: <span>true</span></label>
                        </div>
                        <div className="tranferCard_inputContainer">
                        <label className="tranferCard_label">Amount: 
                                        <input 
                                        onChange={e => handleAmountValue(e.target.value)}
                                        onBlur={handleBlur}
                                        type="number" 
                                        value={amount.value}/>
                            </label>  
                        </div>
                        <div className="tranferCard_button">
                            <Button 
                            disabled={amount.error || amount.value === "0"}
                            label={`${loadingApprove? "Loading...": "APPROVE"}`}
                            type="primary" 
                            cta={() => approveTransfer()}/>
                            <Button 
                            disabled={amount.error || amount.value === "0"}
                            label={`${loadingTransfer ? "Loading...": "TRANSFER"}`}
                            type="secondary" 
                            cta={() => sendTransfer()}/>
                        </div>
                    </div>
                </GlassCard>
                {showError && <p className="tranferCard_error">Can't transfer this amount. It is greater than your balance.</p>}
                </div>
                <ErrorModal 
                type={showModal.type} 
                show={showModal.show}
                onAfter={resetError}
                close={closeModal}
                />
            </>
}



const mapStateToProps = ({ transfers }: ApplicationState) => ({
    targetWallet: transfers.targetWallet,
    errorApprove: transfers.errorApprove,
    errorTransfer: transfers.errorTransfer,
    loadingTransfer: transfers.loadingTransfer,
    loadingApprove: transfers.loadingApprove
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    setApproveSend: setApproveSend,
    setTransferSend: setTransferSend,
    setTransferFail: setTransferFail,
    setApproveFail: setApproveFail,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransferCard);
