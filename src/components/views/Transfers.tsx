import * as React from 'react'
import { NetworkContext } from 'config/networkContext'
import WalletWidget from 'components/layout/WalletWidget'
import TargetWallet from 'components/layout/TargetWallet'
import 'styles/components/views/transfers.scss'
import TotalCards from 'components/layout/TotalCards'





const Transfers: React.FC = ( ) => {
  
  const { userAddress } = React.useContext(NetworkContext)


  return (
    <>
      <div className="transfers__container">
        <div className="transfers__walletInfo">
          <WalletWidget userAddress={userAddress}/> 
          <TargetWallet />
        </div>
        <section className="transfers__wrapper">
          <TotalCards />
        </section>
      </div>
    </>
  )
}





export default Transfers;