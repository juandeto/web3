import { NetworkContext } from 'config/networkContext'
import { useContext } from 'react'

import WalletWidget from 'components/layout/WalletWidget'

export default function Account() {
  const {
    signingProvider,
    userAddress,
    onSelectWallet,
    onLogOut
  } = useContext(NetworkContext)

  return (
    <div>
      <div>
        {userAddress && (
          <div>
            <WalletWidget userAddress={userAddress} />
          </div>
        )}
        <div>
          {!signingProvider ? (
            <button className="button-primary" onClick={onSelectWallet}>Connect</button>
          ) : (
            <button className="button-secondary" onClick={onLogOut}>Logout</button>
          )}
        </div>
      </div>
    </div>
  )
}
