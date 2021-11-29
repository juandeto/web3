import {useEffect, useContext, useState, useMemo} from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { TokenBalance, ErrorOnFetch } from 'store/userWallet/types'
import { setTransferFail } from 'store/transfers/actions'
import { getBalance as getBalanceAction, setErrorOnFetchBalance, } from 'store/userWallet/actions'
import { ApplicationState } from 'store'
import ErrorModal from 'components/shared/ErrorModal'
import { PayloadBalance } from 'store/userWallet/types'
import { Contract } from '@ethersproject/contracts'
import TransferCard from 'components/layout/TransferCard'
import erc20abi from 'assets/erc20.json'
import 'styles/components/layout/layout.scss'



interface PropsFromState {
    tokens: TokenBalance[],
    errorOnFetch?: ErrorOnFetch,
    errorTransfer: any
}

interface PropsFromDispatch {
    getBalance: typeof getBalanceAction
    setErrorOnFetchBalance: typeof setErrorOnFetchBalance
    setTransferFail: typeof setTransferFail
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
      getBalance,
      setTransferFail,
      errorTransfer
    } = props



   const resetError = () => {
    setErrorOnFetchBalance({
      error: null,
      tokenName: undefined
    })
    setTransferFail(null)
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

    useEffect(() => {
      if(errorTransfer !== null){
        setShowModal({
          show: true,
          type: errorTransfer?.code,
          msg: `${errorTransfer?.reason || "" }`
        })
      } else {
        closeModal()
      }
    },[errorTransfer])

      return <>
                <div className="cards_container">
                  {
                  tokens?.map((token: TokenBalance )=> <TransferCard key={token.address} token={token}/>)
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



const mapStateToProps = ({ wallet, transfers }: ApplicationState) => ({
    tokens: wallet.tokens,
    errorOnFetc: wallet.errorOnFetch,
    errorTransfer: transfers.errorTransfer
  })
  

const mapDispatchToProps: PropsFromDispatch = {
    getBalance:  getBalanceAction,
    setErrorOnFetchBalance: setErrorOnFetchBalance,
    setTransferFail: setTransferFail
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransferCards);
