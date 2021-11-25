import * as React from 'react'
import { NetworkContext } from 'config/networkContext'
import { RouteComponentProps } from 'react-router-dom'
import Balances from 'components/layout/Balances'
import WalletWidget from 'components/layout/WalletWidget'
import TargetWallet from 'components/layout/TargetWallet'
import 'styles/components/views/transfers.scss'



type AllProps = RouteComponentProps


const Transfers: React.FC<AllProps> = props => {
  
  const { userAddress } = React.useContext(NetworkContext)


  return (
    <>
      <div className="transfers__container">
        <div className="transfers__walletInfo">
          <WalletWidget userAddress={userAddress}/> <Balances />
        </div>
        <div className="transfers__wrapper">
          <TargetWallet />
        </div>
      </div>
    </>
  )
}





export default Transfers;