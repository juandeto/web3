import { useContext, useEffect, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { TokenBalance } from 'store/userWallet/types'
import { IApproved,IAllowance } from 'store/transfers/types'
import Button from 'components/shared/ul/Button'
import Spinner from 'components/shared/ul/Spinner'
import { setApproveSend, setTransferSend, getAllowance, setApproveSuccess } from 'store/transfers/actions'
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
    delegateWallet: string
    loadingApprove: boolean
    loadingTransfer: boolean
    allowances: Array<IApproved>
    tokens: TokenBalance[]
    
}

interface PropsFromDispatch {
    setApproveSend: typeof setApproveSend
    setTransferSend: typeof setTransferSend
    getAllowance: typeof getAllowance
    setApproveSuccess: typeof setApproveSuccess
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
        getAllowance,
        targetWallet,
        delegateWallet,
        loadingApprove,
        loadingTransfer,
        token,
        allowances
    } = props
    const contract = useContract(token.address)

    useEffect(() => {
        if (delegateWallet){
            const payload: IAllowance  = {
                contract: contract,
                delegateWallet: delegateWallet,
                token: token,
                userAddress: userAddress
            }
            console.log('PAYLOAD!: ', payload)
            getAllowance(payload)
        }
    }, [delegateWallet, userAddress, loadingApprove, loadingTransfer])

    
   const handleAmountValue = (value:string) => {
       
    const isValidInput = validateAmount(value)
    setAmount({value, error: isValidInput?.length > 0})
   }

    //search for the current token in allowances, an array of tokens that were allowances
   const getIndexInAllowances = () => allowances?.findIndex(item => item.name === token?.name) 

   
   const validateAmount = (input: string) => {
        if(!delegateWallet){
            return "You forgot to write your target wallet"
        }
        if(Number(token.balance) < Number(input)){
            return "Your input amount is greater than your balance."
        }
        if(0 > Number(input)){
            return "You can not write a negative amount."
        }

        return ""
   }



    const sendTransfer = () => {
        if(getIndexInAllowances() === -1){
            return false
        }
        const tx = {
            amount: amount.value,
            contract: contract,
            targetWallet: targetWallet,
            token: token,
            userAddress: userAddress,
            signingProvider: signingProvider,
            delegateWallet: delegateWallet
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
            signingProvider: signingProvider,
            delegateWallet: delegateWallet
        }
        setApproveSend(tx)
        setAmount({...amount, value: ""})
    }

    const resetApproved = () => {
        const tx = {
            amount: "0",
            contract: contract,
            targetWallet: targetWallet,
            token: token,
            userAddress: userAddress,
            signingProvider: signingProvider,
            delegateWallet: delegateWallet
        }
        setApproveSend(tx)
        setAmount({...amount, value: ""})
    }

    const hanldeDisableApprove = () => amount.error || !amount.value || loadingApprove || !delegateWallet 


    const handleDisableTransfer = () => hanldeDisableApprove() || loadingTransfer || !targetWallet
    

    const handleAllowance = () => {
        console.log("allowances in hanldeAllowances: ", allowances)
        if(getIndexInAllowances() !== -1 && delegateWallet){
            return `You can transfer up to ${allowances[getIndexInAllowances()].amount} ${allowances[getIndexInAllowances()].name}.`
        } else {
            return "No allowance"
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
                                getIndexInAllowances() !== -1 && delegateWallet && allowances[getIndexInAllowances()].amount !== "0.0"?
                                <Button 
                                disabled={hanldeDisableApprove()}
                                label={`${loadingApprove? "Loading...": "RESET ALLOWANCE"}`}
                                type="primary" 
                                cta={() => resetApproved()}/>:
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
    delegateWallet: transfers.delegateWallet,
    loadingTransfer: transfers.loadingTransfer,
    loadingApprove: transfers.loadingApprove,
    allowances: transfers.allowances,
    tokens: wallet.tokens
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    setApproveSend: setApproveSend,
    setTransferSend: setTransferSend,
    getAllowance: getAllowance,
    setApproveSuccess: setApproveSuccess
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransferCard);
