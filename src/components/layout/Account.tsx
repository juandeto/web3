import * as React from 'react'
import { NetworkContext } from 'config/networkContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import WalletWidget from 'components/layout/WalletWidget'
import Button from 'components/shared/ul/Button'
import 'styles/components/layout/layout.scss'



const Account: React.FC = () => {
  const history = useHistory();
  const {
    signingProvider,
    userAddress,
    onSelectWallet
  } = useContext(NetworkContext)

  const goToTransfers = () => {
    return history.replace('/transfers')
  }

  return (
    <>
      <div>
        {userAddress && (
          <div>
            <WalletWidget userAddress={userAddress} />
          </div>
        )}
        <div>
          {!signingProvider ? (
            <Button type="primary" cta={onSelectWallet} label="Connect your wallet"/>
          ) : (
            <Button type="secondary" cta={goToTransfers} label="Start here"/>
          )}
        </div>
      </div>
    </>
  )
}



export default Account;