import * as React from 'react'
import { NetworkContext } from 'config/networkContext'
import 'styles/components/views/transfers.scss'
import TotalCards from 'components/layout/TotalCards'
import AddressSetters from 'components/layout/AddressSetters'




const Transfers: React.FC = ( ) => {

  return (
    <>
      <div className="transfers__container">
        <div className="transfers__walletInfo">
          <AddressSetters />
        </div>
        <section className="transfers__wrapper">
          <TotalCards />
        </section>
      </div>
    </>
  )
}





export default Transfers;