import * as React from 'react'
import { connect } from 'react-redux'
import Button from 'components/shared/ul/Button'
import { setDelegateWallet as setDelegateWalletAction} from 'store/transfers/actions'
import { ApplicationState } from 'store'
import 'styles/components/layout/layout.scss'


interface PropsFromState {
    delegateWallet: string
}

interface PropsFromDispatch {
    setDelegateWallet: typeof setDelegateWalletAction
}

type AllProps = PropsFromState & PropsFromDispatch

type inputVal = {
    value: string,
    error: boolean
}

const DelegateWallet: React.FC<AllProps> = (props) => {
    const [inputValue, setInputValue] = React.useState<inputVal>({value: "", error: false})
    const [showError, setShowError] = React.useState<boolean>(false)
    const {
        delegateWallet,
        setDelegateWallet
    } = props

    const handleChange = (input: string) => {

        const value = input.trim().toLocaleLowerCase()

        const isValidInput = validateAddress(value)

        setInputValue({value, error: !(isValidInput.length === 0)})

        if(showError && isValidInput.length === 0){
            setShowError(false)
        }
        
    }

    const handleBlur = () => {
        if(!inputValue.value){

        } else {
            setShowError(true)
        }
    }

    const validateAddress = (value: string) => {
        const regEx = /^0x[a-fA-F0-9]{40}$/
        if(!value){
            return "The current target can not be empty"
        } else if(!regEx.test(value)){
            return "The current target wallet doesn't has the correct format"
        } else {
            return ""
        }
    }

    const handleClear = () => {
        setInputValue({value: "", error: false})
        setDelegateWallet("")
    }


      return <>
                <div className="walletTarget_container">
                    <label className="walletTarget_label">Give someone control over amount of your tokens (token approve function)</label>
                    <div className="walletTarget_actions">
                        <div className="walletTarget_value">

                        {delegateWallet ? 
                        <p>{delegateWallet}</p> :
                        <input 
                            placeholder="Enter the address that will have this control..."
                            value={inputValue.value} 
                            type="text" 
                            name="delegateWallet" 
                            onChange={( e )=> handleChange(e.target.value)} 
                            onBlur={handleBlur}/> }
                        </div>

                       {!delegateWallet && <Button label="Set" disabled={inputValue.error || inputValue.value === ""} type="secondary" cta={() => setDelegateWallet(inputValue.value)}/>}
                       <Button label="Clear" type="primary" cta={handleClear}/>
                    </div>
                    {showError && <p className="walletTarget_invalid">{validateAddress(inputValue.value)}</p>}
                </div>
            </>
}



const mapStateToProps = ({ transfers }: ApplicationState) => ({
    delegateWallet: transfers.delegateWallet
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    setDelegateWallet:  setDelegateWalletAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DelegateWallet);
