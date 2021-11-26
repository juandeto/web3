import * as React from 'react'
import { connect } from 'react-redux'
import Button from 'components/shared/ul/Button'
import { setTargetWallet as setTargetWalletAction} from 'store/transfers/actions'
import { ApplicationState } from 'store'
import 'styles/components/layout/layout.scss'


interface PropsFromState {
    targetWallet: string
}

interface PropsFromDispatch {
    setTargetWallet: typeof setTargetWalletAction
}

type AllProps = PropsFromState & PropsFromDispatch

type inputVal = {
    value: string,
    error: boolean
}

const TargetWallet: React.FC<AllProps> = (props) => {
    const [inputValue, setInputValue] = React.useState<inputVal>({value: "", error: false})
    const [showError, setShowError] = React.useState<boolean>(false)
    const {
        targetWallet,
        setTargetWallet
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
        setTargetWallet("")
    }


      return <>
                <div className="walletTarget_container">
                    <label className="walletTarget_label">Set target wallet</label>
                    <div className="walletTarget_actions">
                        <div className="walletTarget_value">

                        {targetWallet ? 
                        <p>{targetWallet}</p> :
                        <input 
                            placeholder="Example: 0x63639D1C5C3B89B0601D22692d1580844944e366"
                            value={inputValue.value} 
                            type="text" 
                            name="targetWallet" 
                            onChange={( e )=> handleChange(e.target.value)} 
                            onBlur={handleBlur}/> }
                        </div>

                       {!targetWallet && <Button label="Set" disabled={inputValue.error || inputValue.value === ""} type="secondary" cta={() => setTargetWallet(inputValue.value)}/>}
                       <Button label="Clear" type="primary" cta={handleClear}/>
                    </div>
                    {showError && <p className="walletTarget_invalid">{validateAddress(inputValue.value)}</p>}
                </div>
            </>
}



const mapStateToProps = ({ transfers }: ApplicationState) => ({
    targetWallet: transfers.targetWallet
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    setTargetWallet:  setTargetWalletAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TargetWallet);
