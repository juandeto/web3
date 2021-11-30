import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from 'store'
import TargetWallet from 'components/layout/TargetWallet'
import DelegateWallet from 'components/layout/DelegateWallet'
import 'styles/components/layout/layout.scss'


interface PropsFromState {
    targetWallet: string
    delegateWallet: string
}


type AllProps = PropsFromState 


const AddressSetters: React.FC<AllProps> = (props) => {

    const {
        targetWallet,
        delegateWallet
    } = props

  


      return <>
                <DelegateWallet />
               {delegateWallet && <TargetWallet />}
            </>
}



const mapStateToProps = ({ transfers }: ApplicationState) => ({
    targetWallet: transfers.targetWallet,
    delegateWallet: transfers.delegateWallet
  })
  

export default connect(
    mapStateToProps
  )(AddressSetters);
