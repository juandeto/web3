import {useEffect, useContext, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { Tokens, TokenBalance, ErrorOnFetch } from 'store/userWallet/types'
import { getBalance as getBalanceAction, setErrorOnFetchBalance} from 'store/userWallet/actions'
import { ApplicationState } from 'store'
import FormattedBalance from 'components/shared/FormattedBalance'
import ErrorModal from 'components/shared/ErrorModal'
import { useContract } from 'config/ContractHook'
import { PayloadBalance } from 'store/userWallet/types'
import { Contract } from '@ethersproject/contracts'
import 'styles/components/layout/layout.scss'


const usdcAddress: string = process.env.REACT_APP_USDCD_ADDRESS as string
const daiAddress: string = process.env.REACT_APP_DAI_ADDRESS as string

interface PropsFromState {
    tokens?: TokenBalance[]
    errorOnFetch?: ErrorOnFetch
}

interface PropsFromDispatch {
    getBalance: typeof getBalanceAction
    setErrorOnFetchBalance: typeof setErrorOnFetchBalance
}

type ModalState ={
    show: boolean,
    type: any,
    msg: string
  }

type AllProps = PropsFromState & PropsFromDispatch


const Balances: React.FC<AllProps> = (props) => {
    const [showModal, setShowModal] = useState<ModalState>({show: false, type: null, msg: ""})
    const contractUsdc = useContract(usdcAddress)
    const contractDai = useContract(daiAddress)

    const {
        signingProvider,
        userAddress
      } = useContext(NetworkContext)

    const {
      tokens, 
      errorOnFetch,
      getBalance
    } = props
    

    const getCoinBalance = (contract: Contract | undefined, name: Tokens) => {
      const data: PayloadBalance = {
       contract: contract,
       userAddress: userAddress,
       tokenName: name
     }
     getBalance(data)
   }


   const resetError = () => {
     console.log('resetea el error')
    setErrorOnFetchBalance({
      error: null,
      tokenName: undefined
    })
   }

   const closeModal = () => {
      setShowModal({
        show: false,
        type: null,
        msg: ""
      })
   }

  useEffect(() => {
      getCoinBalance(contractUsdc, "USDC")
      getCoinBalance(contractDai, "DAI")
    }, [signingProvider, userAddress])



    useEffect(() => {
      if(errorOnFetch?.error){
        setShowModal({
          show: true,
          type: errorOnFetch?.error,
          msg: `Hubo un error al intentar cargar sus balances de ${errorOnFetch?.tokenName || "algunos tokens" }`
        })
      } else {
        closeModal()
      }
    },[errorOnFetch])



      return <>
                <div className="balances_container">
                  <h3>Your account balances:</h3>
                  {
                  tokens?.map((token: TokenBalance )=> <FormattedBalance token={token}/>)
                  }
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
    tokens: wallet.tokens,
    errorOnFetc: wallet.errorOnFetch,
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    getBalance:  getBalanceAction,
    setErrorOnFetchBalance: setErrorOnFetchBalance
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Balances);
