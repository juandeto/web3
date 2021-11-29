import { useContext, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { TokenBalance } from 'store/userWallet/types'
import { IApproved } from 'store/transfers/types'
import Button from 'components/shared/ul/Button'
import Spinner from 'components/shared/ul/Spinner'
import { setApproveSend, setTransferSend } from 'store/transfers/actions'
import { ApplicationState } from 'store'
import { useContract } from 'config/ContractHook'
import GlassCard from 'components/shared/ul/CardInput'
import FormattedBalance from 'components/shared/FormattedBalance'
import 'styles/components/layout/layout.scss'

interface PropsFromParent {
    token: TokenBalance
}

interface PropsFromState {
    targetWallet: string
    loadingApprove: boolean
    loadingTransfer: boolean
    approved: Array<IApproved>
    tokens: TokenBalance[]
}

interface PropsFromDispatch {
    setApproveSend: typeof setApproveSend
    setTransferSend: typeof setTransferSend
}


type AmountState = {
    value: string
    error: boolean
}

type AllProps = PropsFromState & PropsFromDispatch & PropsFromParent


const TransferCard: React.FC<AllProps> = (props) => {
    const [amount, setAmount] = useState<AmountState>({value: "", error: false})
    const {userAddress, signingProvider} = useContext(NetworkContext)
    const {
        setApproveSend, 
        setTransferSend,
        targetWallet,
        loadingApprove,
        loadingTransfer,
        token,
        approved
    } = props
    const contract = useContract(token.address)

    
   const handleAmountValue = (value:string) => {
       
    const isValidInput = validateAmount(value)
    setAmount({value, error: isValidInput?.length > 0})
   }

    //search for the current token in approved, an array of tokens that were approved
   const getIndexInApproved = () => approved?.findIndex(item => item.name === token?.name) 

   
   const validateAmount = (input: string) => {
        if(!targetWallet){
            return "You forgot to write your target wallet"
        }
        if(Number(token.balance) < Number(input)){
            return "Your input amount is greater than your balance."
        }
        if(0 > Number(input)){
            return "You can not write a negative amount."
        }
        if(getIndexInApproved() !== -1 && approved[getIndexInApproved()].approved && Number(approved[getIndexInApproved()].amountApproved) < Number(input)){
            return "This amount is greater than the amount approved. Change your allowance first!"
        }

        return ""
   }



    const sendTransfer = () => {
        if(getIndexInApproved() === -1){
            return false
        }
        const tx = {
            amount: amount.value,
            contract: contract,
            targetWallet: targetWallet,
            token: token,
            userAddress: userAddress,
            signingProvider: signingProvider
        }
        setTransferSend(tx)
        setAmount({...amount, value: ""})
    }


    const approveTransfer = () => {
        const tx = {
            amount: amount.value,
            contract: contract,
            targetWallet: targetWallet,
            token: token,
            userAddress: userAddress,
            signingProvider: signingProvider
        }
        setApproveSend(tx)
        setAmount({...amount, value: ""})
    }

    const editAllowance = () => {
        const tx = {
            amount: "0",
            contract: contract,
            targetWallet: targetWallet,
            token: token,
            userAddress: userAddress,
            signingProvider: signingProvider
        }
        setApproveSend(tx)
        setAmount({...amount, value: ""})
    }

    const hanldeDisableApprove = () => amount.error || !amount.value || loadingApprove || !targetWallet


    const handleDisableTransfer = () => hanldeDisableApprove() || getIndexInApproved() === -1 || loadingTransfer || !approved[getIndexInApproved()]?.approved
    

    const handleAllowance = () => {
        if(getIndexInApproved() === -1){
            return `First you need to set the amount of ${token?.name} and approve them.`
        }else{
            return `You can transfer up to ${approved[getIndexInApproved()]?.amountApproved} ${approved[getIndexInApproved()].name}.`
        }
    }



    return <>
                <div className="tranferCard_container">
                <GlassCard >
                    <div className="transferCard_content">
                        <FormattedBalance token={token}/>
                       {
                       (loadingTransfer  || loadingApprove) ?
                       <Spinner /> :
                       <>
                        <div className="tranferCard_inputContainer">
                            <label className="tranferCard_label">Allowance: <span>{handleAllowance()}</span></label>
                        </div>
                        <div className="tranferCard_inputContainer">
                            <label className="tranferCard_label">Amount: 
                                <input 
                                onChange={e => handleAmountValue(e.target.value)}
                                type="number" 
                                value={amount.value}/>
                            </label>  
                        </div>
                        </>
                        }
                        <div className="tranferCard_button">
                            {
                                getIndexInApproved() !== -1 && approved[getIndexInApproved()]?.approved ?
                                <Button 
                                disabled={hanldeDisableApprove()}
                                label={`${loadingApprove? "Loading...": "EDIT ALOWANCE"}`}
                                type="primary" 
                                cta={() => editAllowance()}/>:
                                <Button 
                                disabled={hanldeDisableApprove()}
                                label={`${loadingApprove? "Loading...": "APPROVE"}`}
                                type="primary" 
                                cta={() => approveTransfer()}/>
                            }
                            <Button 
                            disabled={handleDisableTransfer()}
                            label={`${loadingTransfer ? "Loading...": "TRANSFER"}`}
                            type="secondary" 
                            cta={() => sendTransfer()}/>
                        </div>
                    </div>
                </GlassCard>
                {amount?.error && <p className="tranferCard_error">{validateAmount(amount.value)}</p>}
                </div>
            </>
}



const mapStateToProps = ({ transfers, wallet }: ApplicationState) => ({
    targetWallet: transfers.targetWallet,
    loadingTransfer: transfers.loadingTransfer,
    loadingApprove: transfers.loadingApprove,
    approved: transfers.approved,
    tokens: wallet.tokens
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    setApproveSend: setApproveSend,
    setTransferSend: setTransferSend
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransferCard);
