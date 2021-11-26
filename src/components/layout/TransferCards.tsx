import {useEffect, useContext, useState} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { TokenBalance, ErrorOnFetch } from 'store/userWallet/types'
import { getBalance as getBalanceAction, setErrorOnFetchBalance} from 'store/userWallet/actions'
import { ApplicationState } from 'store'
import ErrorModal from 'components/shared/ErrorModal'
import { PayloadBalance } from 'store/userWallet/types'
import { Contract } from '@ethersproject/contracts'
import TransferCard from 'components/layout/TransferCard'
import erc20abi from 'assets/erc20.json'
import 'styles/components/layout/layout.scss'



interface PropsFromState {
    tokens: TokenBalance[]
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


const TransferCards: React.FC<AllProps> = (props) => {
    const [showModal, setShowModal] = useState<ModalState>({show: false, type: null, msg: ""})

    const {
        signingProvider,
        userAddress
      } = useContext(NetworkContext)

    const {
      tokens, 
      errorOnFetch,
      getBalance
    } = props
    


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
    const getBalances = () =>{
      for (let i = 0; i < tokens.length; i++) {
  
        const data: PayloadBalance = {
          contract:  new Contract(tokens[i].address, erc20abi, signingProvider),
          userAddress: userAddress,
          token: tokens[i]
        }
  
        getBalance(data)
      }
    }
    
    getBalances()
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
                <div className="cards_container">
                  {
                  tokens?.map((token: TokenBalance )=> <TransferCard token={token}/>)
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
  )(TransferCards);
