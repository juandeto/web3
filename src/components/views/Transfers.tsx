import * as React from 'react'
import { NetworkContext } from 'config/networkContext'
import { connect } from 'react-redux'
import { ApplicationState } from 'store'
import { getBalance as getBalanceAction, setUsdcErrorOnFetchBalance, setDaiErrorOnFetchBalance } from 'store/userWallet/actions'
import { RouteComponentProps } from 'react-router-dom'
import Balances from 'components/layout/Balances'
import WalletWidget from 'components/layout/WalletWidget'
import 'styles/components/views/transfers.scss'



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

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps


const Transfers: React.FC<AllProps> = props => {
  
  const { userAddress } = React.useContext(NetworkContext)


  return (
    <>
      <div className="transfers__container">
        <div className="transfers__walletInfo">
          <WalletWidget userAddress={userAddress}/> <Balances />
        </div>
      </div>
    </>
  )
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
  )(Transfers);