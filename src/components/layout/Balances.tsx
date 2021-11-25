import {useEffect, useContext, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { getBalance as getBalanceAction, setUsdcErrorOnFetchBalance, setDaiErrorOnFetchBalance } from 'store/userWallet/actions'
import { ApplicationState } from 'store'
import ErrorModal from 'components/shared/ErrorModal'
import { PayloadBalance } from 'store/userWallet/types'

import 'styles/components/layout/layout.scss'


const usdcAddress: string = process.env.REACT_APP_USDCD_ADDRESS as string
const daiAddress: string = process.env.REACT_APP_DAI_ADDRESS as string

interface PropsFromState {
    usdcBalance?: string | undefined
    daiBalance?: string | undefined
    errorOnFetchUsdc?: TypeError | string
    errorOnFetchDai?: TypeError | string
}

interface PropsFromDispatch {
    getBalance: typeof getBalanceAction
    setDaiErrorOnFetchBalance: typeof setDaiErrorOnFetchBalance
    setUsdcErrorOnFetchBalance: typeof setUsdcErrorOnFetchBalance
}

type ModalState ={
    show: boolean,
    type: TypeError | null,
    msg: string
  }

type AllProps = PropsFromState & PropsFromDispatch


const Balances: React.FC<AllProps> = (props) => {
    const [showModal, setShowModal] = useState<ModalState>({show: false, type: null, msg: ""})

    const {
        signingProvider,
        userAddress
      } = useContext(NetworkContext)

    const {
      getBalance
    } = props
    
    const getCoinBalance = (address: string, decimals: number) => {
      const data: PayloadBalance = {
       contractAddress: address,
       signingProvider: signingProvider,
       userAddress: userAddress,
       decimals: decimals
     }
     getBalance(data)
   }

   const resetError = () => {
    setUsdcErrorOnFetchBalance("")
    setDaiErrorOnFetchBalance("")
   }

   const closeModal = () => {
      setShowModal({
        show: false,
        type: null,
        msg: ""
      })
   }

    useEffect(() => {
      getCoinBalance(usdcAddress, 6)
    }, [signingProvider, userAddress])

    useEffect(() => {
      getCoinBalance(daiAddress, 18)
    }, [signingProvider, userAddress])

    useEffect(() => {
      if(props.errorOnFetchDai instanceof Error){
        setShowModal({
          show: true,
          type: props.errorOnFetchDai,
          msg: "Hubo un error al intentar cargar su balance de DAI"
        })
      }else if(props.errorOnFetchUsdc instanceof Error){
        setShowModal({
          show: true,
          type: props.errorOnFetchUsdc,
          msg: "Hubo un error al intentar cargar su balance de USDC"
        })
      }else{
        closeModal()
      }
    },[props.errorOnFetchDai, props.errorOnFetchUsdc])

const parseBalance = (str:string | undefined) => parseInt(str || "").toFixed(2)

      return <>
                <div className="balances_container">
                    <h3>Your account balances:</h3>
                    <div className="balances_wrapper">
                        <h3>{parseBalance(props.usdcBalance) || 0.00}</h3>
                        <p>USDC</p>
                    </div>
                    <div className="balances_wrapper">
                        <h3>{parseBalance(props.daiBalance) || 0.00}</h3>
                        <p>DAI</p>
                    </div>
                </div>
                <ErrorModal 
                type={showModal.type} 
                show={showModal.show} 
                msg={showModal.msg} 
                onAfter={resetError}
                close={closeModal}
                />
            </>
}



const mapStateToProps = ({ wallet }: ApplicationState) => ({
    usdcBalance: wallet.usdcBalance,
    daiBalance: wallet.daiBalance,
    errorOnFetchUsdc: wallet.errorOnFetchUsdc,
    errorOnFetchDai: wallet.errorOnFetchDai,
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    getBalance:  getBalanceAction,
    setUsdcErrorOnFetchBalance: setUsdcErrorOnFetchBalance,
    setDaiErrorOnFetchBalance:setDaiErrorOnFetchBalance
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Balances);
